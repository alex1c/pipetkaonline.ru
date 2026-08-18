#!/usr/bin/env bash

set -Eeuo pipefail

readonly DEPLOY_ROOT="/var/www/pipetkaonline.ru"
readonly ENV_FILE="${PIPETKA_ENV_FILE:-/etc/pipetkaonline/pipetkaonline.env}"
readonly HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3002/api/health}"
readonly HEALTH_ATTEMPTS="${HEALTH_ATTEMPTS:-30}"
readonly HEALTH_DELAY_SECONDS="${HEALTH_DELAY_SECONDS:-5}"
readonly DEPLOY_SHA="${DEPLOY_SHA:?DEPLOY_SHA is required}"

log() {
  printf '[deploy] %s\n' "$*"
}

diagnostics() {
  log "docker compose ps:"
  docker compose ps || true
  log "last application logs:"
  docker compose logs --no-color --tail=80 app 2>&1 \
    | sed -E 's/(TELEGRAM_BOT_TOKEN|TELEGRAM_CHAT_ID)([=:])[^[:space:]]+/\1\2[REDACTED]/g' \
    || true
}

has_required_env() {
  local name="$1"
  grep -Eq "^[[:space:]]*(export[[:space:]]+)?${name}[[:space:]]*=[[:space:]]*[^[:space:]#]" "$ENV_FILE"
}

wait_for_health() {
  local attempt=0
  while (( attempt < HEALTH_ATTEMPTS )); do
    attempt=$((attempt + 1))
    if curl --fail --silent --show-error --max-time 5 -o /dev/null "$HEALTH_URL"; then
      log "health check passed on attempt ${attempt}"
      return 0
    fi
    sleep "$HEALTH_DELAY_SECONDS"
  done
  return 1
}

rollback() {
  if [[ -z "$ROLLBACK_IMAGE_ID" ]]; then
    log "no previous application image is available for rollback"
    diagnostics
    return 1
  fi
  log "restoring previous application image ${ROLLBACK_IMAGE_ID}"
  if ! docker image tag "$ROLLBACK_IMAGE_ID" "$APP_IMAGE"; then
    log "rollback image restore failed"
    diagnostics
    return 1
  fi
  if ! docker compose up -d --force-recreate --remove-orphans; then
    log "rollback container start failed"
    diagnostics
    return 1
  fi
  if ! wait_for_health; then
    log "rollback health check failed"
    diagnostics
    return 1
  fi
  log "rollback completed successfully; repository remains at ${DEPLOY_SHA}"
}

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
if [[ "$PWD" != "$SCRIPT_DIR" || "$SCRIPT_DIR" != "$DEPLOY_ROOT" ]]; then
  printf 'deploy.sh must be run from %s\n' "$DEPLOY_ROOT" >&2
  exit 1
fi

if [[ ! -r "$ENV_FILE" ]]; then
  printf 'required environment file is missing or unreadable: %s\n' "$ENV_FILE" >&2
  exit 1
fi
for required_name in TELEGRAM_BOT_TOKEN TELEGRAM_CHAT_ID; do
  if ! has_required_env "$required_name"; then
    printf 'required environment variable is missing or empty: %s\n' "$required_name" >&2
    exit 1
  fi
done

if ! git rev-parse --verify "${DEPLOY_SHA}^{commit}" >/dev/null 2>&1; then
  printf 'DEPLOY_SHA is not available as a commit: %s\n' "$DEPLOY_SHA" >&2
  exit 1
fi
if [[ "$(git rev-parse HEAD)" != "$DEPLOY_SHA" ]]; then
  printf 'checked out HEAD does not match DEPLOY_SHA\n' >&2
  exit 1
fi

readonly APP_IMAGE="$(docker compose config --images | sed -n '1p')"
if [[ -z "$APP_IMAGE" ]]; then
  printf 'could not determine the Docker Compose application image\n' >&2
  exit 1
fi
ROLLBACK_IMAGE_ID="$(docker compose images -q app 2>/dev/null | sed -n '1p')"
readonly ROLLBACK_IMAGE_ID

log "deploying ${DEPLOY_SHA}"
if [[ -n "$ROLLBACK_IMAGE_ID" ]]; then
  log "saved running image ${ROLLBACK_IMAGE_ID} for rollback"
else
  log "no existing application image found; this appears to be an initial deployment"
fi

log "building image before replacing the running container"
if ! docker compose build; then
  log "image build failed; the running container was not replaced"
  diagnostics
  exit 1
fi

log "starting the new container"
if ! docker compose up -d --remove-orphans; then
  log "container replacement failed; attempting rollback"
  rollback || exit 1
  exit 1
fi

if ! wait_for_health; then
  log "new container failed the health gate; attempting rollback"
  diagnostics
  if ! rollback; then
    log "rollback failed; manual intervention is required"
    exit 1
  fi
  exit 1
fi

log "deployment completed for ${DEPLOY_SHA}"
