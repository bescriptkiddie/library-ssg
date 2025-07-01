#!/bin/bash

echo "🚀 开始部署 Library-SSG..."

# 1. 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 2. 安装依赖
echo "📦 安装依赖..."
npm install

# 3. 构建项目
echo "🔨 构建项目..."
npm run build

# 4. 重启PM2应用
echo "🔄 重启应用..."
pm2 restart library-ssg

# 5. 显示状态
echo "✅ 部署完成！"
pm2 status
pm2 logs library-ssg --lines 10
