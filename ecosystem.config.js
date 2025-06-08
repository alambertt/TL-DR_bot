module.exports = {
  apps: [{
    name: 'tldr-telegram-bot',
    script: 'bun',
    args: 'start',
    cwd: '/Users/angel/Dev/Telegram_Bots/TL;DR_bot',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    env_development: {
      NODE_ENV: 'development',
      DEBUG: '*'
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_file: './logs/combined.log',
    time: true
  }]
};

