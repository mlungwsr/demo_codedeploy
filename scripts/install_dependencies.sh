#!/bin/bash
# Script to install dependencies for the CodeDeploy website

# Update system packages
echo "Updating system packages..."
dnf update -y

# Install nginx
echo "Installing nginx..."
dnf install -y nginx

# Create directory for the website if it doesn't exist
echo "Creating website directory..."
mkdir -p /var/www/html

# Set proper ownership
echo "Setting proper ownership for /var/www/html..."
chown -R nginx:nginx /var/www/html
chmod -R 755 /var/www/html

# Enable nginx to start on boot
echo "Enabling nginx service to start on boot..."
systemctl enable nginx

echo "Dependencies installation completed successfully."
