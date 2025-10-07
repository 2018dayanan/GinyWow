# Server Deployment Guide for GinyWow

This guide will help you deploy your GinyWow application build files to a server.

## Prerequisites

- Node.js 18+ installed on your server
- A server with public IP address
- Domain name (optional but recommended)
- SSL certificate (for HTTPS)

## Build Files Structure

Your application has been built and the files are located in:

- **Server files**: `dist/index.js` (Node.js server)
- **Client files**: `dist/public/` (Static React app files)

## Deployment Options

### Option 1: Simple Node.js Server Deployment

#### Step 1: Prepare Your Server

1. **Upload files to your server:**

   ```bash
   # Upload the entire dist folder to your server
   scp -r dist/ user@your-server-ip:/path/to/your/app/
   scp package.json user@your-server-ip:/path/to/your/app/
   scp package-production.json user@your-server-ip:/path/to/your/app/
   ```

2. **Install dependencies on server:**
   ```bash
   # On your server
   cd /path/to/your/app/
   npm install --production
   ```

#### Step 2: Start the Application

```bash
# Start the server
NODE_ENV=production node dist/index.js
```

#### Step 3: Configure Process Manager (PM2)

For production, use PM2 to manage your Node.js process:

```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'ginywow',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Option 2: Docker Deployment

#### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built application
COPY dist/ ./dist/

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
```

#### Step 2: Build and Run Docker Container

```bash
# Build Docker image
docker build -t ginywow-app .

# Run container
docker run -d -p 5000:5000 --name ginywow ginywow-app
```

### Option 3: Nginx + Node.js (Recommended for Production)

#### Step 1: Install Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### Step 2: Configure Nginx

Create `/etc/nginx/sites-available/ginywow`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Serve static files directly
    location /assets/ {
        alias /path/to/your/app/dist/public/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy API requests to Node.js
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve the React app
    location / {
        try_files $uri $uri/ /index.html;
        root /path/to/your/app/dist/public;
        index index.html;
    }
}
```

#### Step 3: Enable Site and Start Services

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/ginywow /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Start your Node.js app with PM2
pm2 start dist/index.js --name ginywow
```

## Environment Variables

Create a `.env` file on your server:

```bash
NODE_ENV=production
PORT=5000
# Add any other environment variables your app needs
```

## SSL/HTTPS Setup (Recommended)

### Using Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logs

### PM2 Monitoring

```bash
# View logs
pm2 logs ginywow

# Monitor processes
pm2 monit

# Restart application
pm2 restart ginywow
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

## Performance Optimization

### 1. Enable Gzip Compression

Add to your Nginx configuration:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### 2. Set Cache Headers

```nginx
# For static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## Troubleshooting

### Common Issues

1. **Port already in use:**

   ```bash
   sudo lsof -i :5000
   sudo kill -9 <PID>
   ```

2. **Permission issues:**

   ```bash
   sudo chown -R www-data:www-data /path/to/your/app/
   ```

3. **Node.js not found:**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

### Health Check

Test your deployment:

```bash
# Check if server is running
curl http://your-server-ip:5000

# Check if static files are served
curl http://your-server-ip/assets/index-6y_cbAAx.css
```

## Security Considerations

1. **Firewall Configuration:**

   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

2. **Keep Dependencies Updated:**

   ```bash
   npm audit
   npm update
   ```

3. **Use Environment Variables for Secrets:**
   - Never commit API keys or secrets to version control
   - Use environment variables for sensitive configuration

## Backup Strategy

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf ginywow_backup_$DATE.tar.gz /path/to/your/app/
```

This guide should help you successfully deploy your GinyWow application to a server. Choose the deployment option that best fits your needs and infrastructure.
