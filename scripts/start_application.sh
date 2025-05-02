#!/bin/bash
# Script to start the application

# Restart nginx to apply new configuration
echo "Restarting nginx service..."
systemctl restart nginx

# Check if nginx is running
if systemctl is-active --quiet nginx; then
    echo "Nginx service is running."
else
    echo "ERROR: Nginx service failed to start."
    systemctl status nginx
    exit 1
fi

echo "Application started successfully."
