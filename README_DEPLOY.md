# Быстрая инструкция по деплою

## На сервере Ubuntu

### 1. Установка Docker

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
sudo systemctl enable docker
sudo systemctl start docker
```

### 2. Клонирование репозитория

```bash
cd /var/www
sudo git clone https://github.com/alex1c/pipetkaonline.ru.git pipetkaonline.ru
sudo chown -R $USER:$USER /var/www/pipetkaonline.ru
cd pipetkaonline.ru
```

### 3. Настройка Apache

```bash
# Установка модулей
sudo a2enmod proxy proxy_http proxy_wstunnel rewrite ssl headers
sudo systemctl restart apache2

# Копирование конфигурации
sudo cp apache/pipetkaonline.ru.conf /etc/apache2/sites-available/
sudo a2ensite pipetkaonline.ru.conf
sudo systemctl restart apache2
```

### 4. Первый запуск

```bash
chmod +x deploy.sh
./deploy.sh
```

## Настройка GitHub Actions

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте секреты:
   - `SSH_HOST` - IP или домен сервера
   - `SSH_USER` - имя пользователя для SSH
   - `SSH_PRIVATE_KEY` - приватный SSH ключ
   - `SSH_PORT` - порт SSH (обычно 22)

## После этого

Каждый push в `main` автоматически обновит сайт на сервере!

## Порт

Приложение работает на порту **3002** (внутри контейнера 3000, снаружи 3002).

Apache проксирует запросы с 80/443 на 3002.

