# TL;DR Bot

A Telegram bot built with TypeScript and Bun that uses Google's Gemini API to provide quick summaries of long messages.

## Features

- **Message Summarization**: Automatically generates a "TL;DR" summary for messages exceeding a defined length.
- **SQLite Logging**: Persistently logs all bot operations (starts, stops, errors, summaries) to a local SQLite database (`logs.sqlite`). See [logging documentation](LOGS_README.md) for more details.
- **Live Log Dashboard**: A web-based dashboard to view, filter, and analyze logs in real-time. Includes auto-refresh, CSV export, and usage statistics.
- **Environment-based Configuration**: Securely manage API keys and bot tokens using a `.env` file.
- **Built with Telegraf**: A powerful and modern framework for building Telegram bots.
- **TypeScript and Bun**: A fast, modern, and type-safe development environment.

## Prerequisites

Before setting up the project, make sure you have:

- [Bun](https://bun.sh/) installed on your system.
- A **Telegram Bot Token** (obtain from [@BotFather](https://t.me/botfather) on Telegram).
- A **Gemini API Key** (obtain from [Google AI Studio](https://aistudio.google.com/app/apikey)).

## Setup

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   cd TL-DR_bot
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Configure environment variables** by creating a `.env` file in the root directory. See the configuration section below.

## Environment Configuration

Create a `.env` file and add the following variables:

```env
# Telegram Bot Token
BOT_TOKEN=your_telegram_bot_token_here

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
```

## Available Scripts

- `bun start`: Starts the Telegram bot.
- `bun run dev`: Runs the bot in watch mode for development.
- `bun run dashboard`: Starts the API server for the log dashboard.

## Running the Application

1. **Start the Bot**:

   ```bash
   bun start
   ```

2. **Run the Log Dashboard**:

   In a separate terminal, run the dashboard server:

   ```bash
   bun run dashboard
   ```

   The dashboard will be available at [http://localhost:5000/dashboard](http://localhost:5000/dashboard).

## Project Structure

```text
TL;DR_bot/
├── src/
│   ├── index.ts          # Main application entry point
│   ├── logger.ts         # SQLite logging module
│   └── constants.ts      # Shared constants
├── server.js             # API server for the dashboard
├── db_viewer_live.html   # HTML for the live dashboard
├── logs.sqlite           # SQLite database file (ignored by .gitignore)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Example environment variables
└── README.md             # This file
```

## Dependencies

- **@google/genai**: Google's Generative AI SDK for Node.js.
- **telegraf**: Telegram Bot API framework.
- **dotenv**: Loads environment variables from a `.env` file.
- **bun:sqlite**: Native SQLite driver for Bun (no installation needed).

## Development

To add new features, edit the files in the `src/` directory. The bot will automatically restart if you are running it with `bun run dev`.
