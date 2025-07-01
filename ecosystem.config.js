module.exports = {
  apps: [
    {
      name: 'lirbrary-ssg',
      script: 'npm',
      args: 'start',
      cwd: '/www/wwwroot/library-ssg',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
