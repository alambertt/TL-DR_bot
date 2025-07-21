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
  }, {
    name: 'tldr-logs-server',
    script: 'bun',
    args: 'run server.js',
    cwd: '/Users/angel/Dev/Telegram_Bots/TL;DR_bot',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: '5000'
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: '5000',
      DEBUG: '*'
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    out_file: './logs/server-out.log',
    error_file: './logs/server-error.log',
    log_file: './logs/server-combined.log',
    time: true
  }]
};

