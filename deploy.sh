#!/bin/bash
set -e

cd /www/wwwroot/codexplus.site

echo "📥 Pulling latest changes from main..."
git fetch origin main
git reset --hard origin/main

echo "⚙️ Building & restarting Backend..."
cd /www/wwwroot/codexplus.site/Backend
npm install
npm run build
pm2 restart codexplus-backend

echo "🎨 Building Frontend..."
cd /www/wwwroot/codexplus.site/Frontend
npm install
npm run build

echo "🚀 codexplus.site deployed successfully!"
