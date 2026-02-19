#!/bin/bash

# Update and Upgrade
echo "Starting server setup..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js (Version 20)
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Git and Nginx
echo "Installing Git and Nginx..."
sudo apt-get install -y git nginx

# Install PM2 globally
echo "Installing PM2..."
sudo npm install -g pm2

# Install Certbot for SSL
echo "Installing Certbot..."
sudo apt-get install -y certbot python3-certbot-nginx

# Setup Firewall (UFW)
echo "Configuring Firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "Setup Complete! Node $(node -v) and NPM $(npm -v) are installed."
