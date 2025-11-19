# Deployment Guide for pipetkaonline.ru

This guide explains how to deploy the Next.js application to an Ubuntu server with Apache and Docker.

## Prerequisites

- Ubuntu server with Apache installed
- Docker and Docker Compose installed
- Git installed
- SSH access to the server
- Domain name configured (pipetkaonline.ru)

## Server Setup

### 1. Install Docker and Docker Compose

```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install -y docker.io docker-compose

# Add user to docker group (replace 'username' with your username)
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
docker-compose --version
```

### 2. Install Apache Modules

```bash
# Enable required Apache modules
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
sudo a2enmod rewrite
sudo a2enmod ssl
sudo a2enmod headers

# Restart Apache
sudo systemctl restart apache2
```

### 3. Clone Repository

```bash
# Navigate to web directory
cd /var/www

# Clone repository (if not already cloned)
sudo git clone https://github.com/alex1c/pipetkaonline.ru.git pipetkaonline.ru

# Set ownership
sudo chown -R $USER:$USER /var/www/pipetkaonline.ru
```

### 4. Configure Environment Variables

```bash
cd /var/www/pipetkaonline.ru

# Create production environment file
nano .env.production

# Add your environment variables:
# TELEGRAM_BOT_TOKEN=your_bot_token
# TELEGRAM_CHAT_ID=your_chat_id
# NODE_ENV=production
```

### 5. Configure Apache

```bash
# Copy Apache configuration
sudo cp apache/pipetkaonline.ru.conf /etc/apache2/sites-available/pipetkaonline.ru.conf

# Enable site
sudo a2ensite pipetkaonline.ru.conf

# Test Apache configuration
sudo apache2ctl configtest

# Restart Apache
sudo systemctl restart apache2
```

### 6. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-apache

# Obtain SSL certificate
sudo certbot --apache -d pipetkaonline.ru -d www.pipetkaonline.ru

# Auto-renewal is set up automatically
```

### 7. Initial Deployment

```bash
cd /var/www/pipetkaonline.ru

# Make deploy script executable
chmod +x deploy.sh

# Run initial deployment
./deploy.sh
```

## GitHub Actions Setup

### 1. Add SSH Secrets to GitHub

Go to your repository settings → Secrets and variables → Actions, and add:

- `SSH_HOST`: Your server IP address or domain
- `SSH_USER`: Your SSH username
- `SSH_PRIVATE_KEY`: Your private SSH key (content of `~/.ssh/id_rsa`)
- `SSH_PORT`: SSH port (usually 22)

### 2. Generate SSH Key (if needed)

```bash
# On your local machine
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Copy public key to server
ssh-copy-id username@your-server-ip

# Add private key to GitHub Secrets
cat ~/.ssh/id_rsa
```

## Automatic Deployment

After setup, every push to the `main` branch will automatically:

1. Pull latest changes from GitHub
2. Stop existing containers
3. Build new Docker image
4. Start containers
5. Show deployment logs

## Manual Deployment

If you need to deploy manually:

```bash
cd /var/www/pipetkaonline.ru
./deploy.sh
```

Or use Docker Compose directly:

```bash
cd /var/www/pipetkaonline.ru
docker-compose down
docker-compose build --no-cache
docker-compose up -d
docker-compose logs -f
```

## Monitoring

### Check Container Status

```bash
docker-compose ps
```

### View Logs

```bash
# All logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Last 50 lines
docker-compose logs --tail=50
```

### Check Application Health

```bash
# Check if container is running
docker ps | grep pipetkaonline

# Test HTTP endpoint
curl http://localhost:3002
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs

# Check container status
docker-compose ps

# Restart container
docker-compose restart
```

### Apache proxy not working

```bash
# Check Apache error logs
sudo tail -f /var/log/apache2/pipetkaonline.ru_error.log

# Test Apache configuration
sudo apache2ctl configtest

# Check if port 3002 is accessible
curl http://localhost:3002
```

### Port conflicts

If port 3002 is already in use, edit `docker-compose.yml`:

```yaml
ports:
  - "3003:3000"  # Change 3002 to 3003
```

And update Apache configuration:

```apache
ProxyPass / http://localhost:3003/
ProxyPassReverse / http://localhost:3003/
```

## Updating Next.js Configuration

If you need to enable standalone output for Docker (required for the Dockerfile):

Add to `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'standalone',
  // ... rest of config
}
```

## Backup

Before major updates, consider backing up:

```bash
# Backup Docker volumes (if any)
docker-compose down
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/pipetkaonline.ru
docker-compose up -d
```

## Security Notes

- Keep Docker and system packages updated
- Use strong SSH keys
- Regularly rotate secrets
- Monitor logs for suspicious activity
- Use firewall (UFW) to restrict access

```bash
# Example firewall rules
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw enable
```

