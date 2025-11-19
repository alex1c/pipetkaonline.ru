#!/bin/bash

# Server setup script for pipetkaonline.ru
# Run this script on your Ubuntu server to set up the environment

set -e

echo "🚀 Setting up pipetkaonline.ru server..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo "❌ Please do not run as root. Use sudo when needed."
   exit 1
fi

# Install Docker
echo "📦 Installing Docker..."
if ! command -v docker &> /dev/null; then
    sudo apt update
    sudo apt install -y docker.io docker-compose
    sudo usermod -aG docker $USER
    sudo systemctl enable docker
    sudo systemctl start docker
    echo "✅ Docker installed"
else
    echo "✅ Docker already installed"
fi

# Install Apache modules
echo "🌐 Configuring Apache..."
sudo a2enmod proxy proxy_http proxy_wstunnel rewrite ssl headers
sudo systemctl restart apache2
echo "✅ Apache modules enabled"

# Clone repository if not exists
if [ ! -d "/var/www/pipetkaonline.ru" ]; then
    echo "📥 Cloning repository..."
    cd /var/www
    sudo git clone https://github.com/alex1c/pipetkaonline.ru.git pipetkaonline.ru
    sudo chown -R $USER:$USER /var/www/pipetkaonline.ru
    echo "✅ Repository cloned"
else
    echo "✅ Repository already exists"
fi

# Setup Apache configuration
echo "⚙️  Setting up Apache configuration..."
cd /var/www/pipetkaonline.ru
if [ -f "apache/pipetkaonline.ru.conf" ]; then
    sudo cp apache/pipetkaonline.ru.conf /etc/apache2/sites-available/pipetkaonline.ru.conf
    sudo a2ensite pipetkaonline.ru.conf
    sudo systemctl restart apache2
    echo "✅ Apache configuration applied"
else
    echo "⚠️  Apache config file not found. Please copy manually."
fi

# Make deploy script executable
chmod +x deploy.sh

echo ""
echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Create .env.production file with your environment variables"
echo "2. Run ./deploy.sh to build and start the application"
echo "3. Configure SSL with: sudo certbot --apache -d pipetkaonline.ru"
echo "4. Set up GitHub Actions secrets for automatic deployment"

