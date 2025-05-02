#!/bin/bash
# Script to validate the service is running correctly

# Check if nginx is running
echo "Checking if nginx service is running..."
if systemctl is-active --quiet nginx; then
    echo "Nginx service is running."
else
    echo "ERROR: Nginx service is not running."
    systemctl status nginx
    exit 1
fi

# Check if website files exist
echo "Checking if website files exist..."
if [ -f "/var/www/html/index.html" ] && [ -f "/var/www/html/styles.css" ] && [ -f "/var/www/html/script.js" ]; then
    echo "Website files exist."
else
    echo "ERROR: Website files are missing."
    ls -la /var/www/html
    exit 1
fi

# Test if nginx is serving the website
echo "Testing if nginx is serving the website..."
HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
if [ "$HTTP_RESPONSE" == "200" ]; then
    echo "Website is accessible via HTTP."
else
    echo "ERROR: Website is not accessible. HTTP response code: $HTTP_RESPONSE"
    exit 1
fi

echo "Service validation completed successfully."
