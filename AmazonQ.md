# AWS CodeDeploy Deployment Guide

This document explains how to deploy the AWS CodeDeploy demo website to an Amazon Linux 2023 instance using AWS CodeDeploy.

## Prerequisites

1. An AWS account with appropriate permissions
2. An Amazon Linux 2023 EC2 instance with the CodeDeploy agent installed
3. An IAM role for the EC2 instance with permissions for CodeDeploy
4. A CodeDeploy application and deployment group configured

## Deployment Files

The deployment package includes:

- `appspec.yml` - The AWS CodeDeploy application specification file
- `scripts/` - Directory containing deployment scripts
  - `install_dependencies.sh` - Installs nginx and sets up directories
  - `configure_nginx.sh` - Configures nginx for the website
  - `start_application.sh` - Starts the application (restarts nginx)
  - `validate_service.sh` - Validates that the service is running correctly
- Website files (HTML, CSS, JS)

## Deployment Process

1. AWS CodeDeploy reads the `appspec.yml` file
2. The BeforeInstall hook runs `install_dependencies.sh` to install nginx
3. CodeDeploy copies the website files to `/var/www/html`
4. The AfterInstall hook runs `configure_nginx.sh` to set up nginx
5. The ApplicationStart hook runs `start_application.sh` to restart nginx
6. The ValidateService hook runs `validate_service.sh` to verify everything is working

## Manual Deployment Steps

If you want to deploy manually:

1. Create a zip file of the entire project:
   ```
   zip -r codedeploy-demo.zip * -x "*.git*"
   ```

2. Upload the zip file to an S3 bucket:
   ```
   aws s3 cp codedeploy-demo.zip s3://your-bucket-name/
   ```

3. Create a deployment:
   ```
   aws deploy create-deployment \
     --application-name YourApplicationName \
     --deployment-group-name YourDeploymentGroupName \
     --s3-location bucket=your-bucket-name,key=codedeploy-demo.zip,bundleType=zip
   ```

## Troubleshooting

If the deployment fails:

1. Check the CodeDeploy logs in `/var/log/aws/codedeploy-agent/`
2. Check the nginx logs in `/var/log/nginx/`
3. Verify that the EC2 instance has the correct permissions
4. Ensure the CodeDeploy agent is running: `systemctl status codedeploy-agent`
