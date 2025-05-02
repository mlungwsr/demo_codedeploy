#!/bin/bash
# Script to configure nginx for the CodeDeploy website

# Create nginx configuration file
echo "Creating nginx configuration file..."
cat > /etc/nginx/conf.d/codedeploy-demo.conf << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Add security headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript image/svg+xml;
    gzip_min_length 1000;
}
EOF

# Test nginx configuration
echo "Testing nginx configuration..."
nginx -t

# Set proper permissions for website files
echo "Setting proper permissions for website files..."
find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f -exec chmod 644 {} \;

echo "Nginx configuration completed successfully."
