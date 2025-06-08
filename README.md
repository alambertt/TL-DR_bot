# TL;DR Bot

A Telegram bot built with TypeScript and Bun that provides quick summaries and responses to user messages.

## Features

- Welcome message for new users
- Text message processing
- Built with Telegraf (Telegram Bot API)
- TypeScript support
- Environment-based configuration

## Prerequisites

Before setting up the project, make sure you have:

- [Bun](https://bun.sh/) installed on your system
- A Telegram Bot Token (obtain from [@BotFather](https://t.me/botfather) on Telegram)

## Setup

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd TL;DR_bot
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure environment variables** (see Environment Configuration section below)

## Environment Configuration

Create a `.env` file in the root directory of the project with the following variables:

```env
# Telegram Bot Configuration
BOT_TOKEN=your_telegram_bot_token_here
```

### Getting Your Bot Token

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Start a conversation with BotFather
3. Send `/newbot` command
4. Follow the instructions to create your bot
5. Copy the bot token provided by BotFather
6. Paste it in your `.env` file as the `BOT_TOKEN` value

### Example .env file

```env
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ123456789
```

## Running the Application

Once you have installed dependencies and configured your environment variables:

```bash
bun start
```

This command will:
- Start the Telegram bot
- Connect to the Telegram API using your bot token
- Begin listening for messages

## Project Structure

```
TL;DR_bot/
├── src/
│   └── index.ts          # Main application entry point
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables (create this)
└── README.md            # This file
```

## Dependencies

- **telegraf**: Telegram Bot API framework for Node.js
- **dotenv**: Loads environment variables from .env file
- **typescript**: TypeScript language support
- **@types/node**: TypeScript definitions for Node.js

## Bot Commands

- `/start` - Welcome message for new users
- Any text message - Bot responds with "Processing..."

## Development

### Adding New Features

1. Edit `src/index.ts` to add new bot commands or message handlers
2. Use the Telegraf documentation for available methods: [Telegraf Docs](https://telegraf.js.org/)
3. Restart the bot after making changes:
   ```bash
   bun start
   ```

### Environment Variables

All environment variables should be added to the `.env` file. Never commit this file to version control as it contains sensitive information.

## Security Notes

- Keep your `BOT_TOKEN` secure and never share it publicly
- Add `.env` to your `.gitignore` file to prevent accidentally committing secrets
- Consider using environment variable validation for production deployments

## Troubleshooting

### Common Issues

1. **"BOT_TOKEN is missing" error**
   - Ensure you have created a `.env` file in the root directory
   - Verify the token is correctly set in the `.env` file
   - Make sure there are no extra spaces or quotes around the token

2. **Bot not responding**
   - Check that your bot token is valid
   - Ensure the bot is not already running elsewhere
   - Verify your internet connection

3. **Dependencies not installing**
   - Make sure Bun is properly installed: `bun --version`
   - Try removing `node_modules` and running `bun install` again

## License

This project is available for personal and educational use.

# TL;DR Bot

A Telegram bot for summarizing content.

## Setup

### Prerequisites

- [Bun](https://bun.sh) runtime
- A Telegram bot token from [@BotFather](https://t.me/BotFather)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure environment variables:
   - Copy the `.env` file and replace `your_telegram_bot_token_here` with your actual bot token from BotFather
   - To get a bot token:
     1. Message [@BotFather](https://t.me/BotFather) on Telegram
     2. Send `/newbot` command
     3. Follow the prompts to create your bot
     4. Copy the token provided

### Running the Bot

```bash
bun run src/index.ts
```

## Environment Variables

- `BOT_TOKEN`: Your Telegram bot token (required)

## Project Structure

- `src/`: Main source code
- `ts/`: Additional TypeScript files
- `.env`: Environment configuration (not committed to git)

This project was created using `bun init` and uses [Bun](https://bun.sh) as the JavaScript runtime.

