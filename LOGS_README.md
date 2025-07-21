# TL;DR Bot Logs Visualization

This project includes a comprehensive logging visualization system built with **Bun** for consistency with the main project.

## 🚀 Quick Start

### Start the Logs Dashboard Server

```bash
# Start the logs server
bun run logs-server

# Or start in development mode with auto-reload
bun run logs-dev

# Or simply
bun run dashboard
```

The server will start on `http://localhost:5000`

### Access the Dashboard

Open your browser and go to:
- **Live Dashboard**: http://localhost:5000/dashboard
- **API Info**: http://localhost:5000/api

## 📊 Features

### Live Web Dashboard
- **Real-time data** from the SQLite database
- **Auto-refresh** every 30 seconds (optional)
- **Filtering** by event type, log level, and search terms
- **Export to CSV** functionality
- **Responsive design** with live indicators
- **Statistics overview** with counts and breakdowns

### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/logs` | Get all logs with comprehensive statistics |
| `GET /api/logs/recent/{limit}` | Get recent logs (e.g., `/api/logs/recent/10`) |
| `GET /api/logs/events/{event_type}` | Get logs by event type (e.g., `/api/logs/events/BOT_START`) |
| `GET /api/logs/user/{user_id}` | Get logs by user ID (e.g., `/api/logs/user/738668189`) |
| `GET /dashboard` | Serve the HTML dashboard |
| `GET /api` | API information and available endpoints |

### Command Line Access

Quick database queries using sqlite3:

```bash
# View all logs in a formatted table
sqlite3 -header -column logs.sqlite "SELECT * FROM operations_log ORDER BY timestamp DESC;"

# Count logs by event type
sqlite3 logs.sqlite "SELECT event, COUNT(*) as count FROM operations_log GROUP BY event;"

# Today's logs only
sqlite3 -header -column logs.sqlite "SELECT * FROM operations_log WHERE date(timestamp) = date('now') ORDER BY timestamp DESC;"
```

## 🗂 Database Schema

The `logs.sqlite` database contains the `operations_log` table:

```sql
CREATE TABLE operations_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    level TEXT NOT NULL,
    event TEXT NOT NULL,
    message TEXT,
    user_id INTEGER,
    chat_id INTEGER,
    chat_title TEXT
);
```

## 🛠 Technology Stack

- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Database**: SQLite with built-in Bun SQLite driver
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **API**: RESTful endpoints with JSON responses
- **Features**: CORS enabled, error handling, graceful shutdown

## 📈 Dashboard Features

### Statistics Cards
- **Total Logs**: All records in the database
- **Today's Logs**: Logs from today only
- **Unique Users**: Count of distinct user IDs
- **Unique Chats**: Count of distinct chat IDs

### Advanced Features
- **Auto-refresh**: Toggle 30-second automatic updates
- **Filtering**: Filter by event type, log level, or search messages
- **Limit Results**: Show all records or limit to last 10, 50, or 100
- **Export Data**: Download filtered results as CSV
- **Live Indicator**: Visual confirmation of real-time connection

### Event Types
The dashboard automatically detects and filters by these event types:
- `BOT_START` - When the bot initializes
- `TLDR_REPLY` - When bot provides a TL;DR response
- And any other events logged by your bot

## 🔧 Development

### File Structure
```
├── server.js              # Bun server (main logs API)
├── db_viewer_live.html     # Live dashboard HTML
├── db_viewer.html         # Static dashboard HTML  
├── logs.sqlite            # SQLite database
├── logs_api.py            # Python Flask server (alternative)
└── package.json           # Project configuration
```

### Scripts Available
```bash
bun run logs-server    # Start logs server
bun run logs-dev       # Start with auto-reload
bun run dashboard      # Same as logs-server
```

## 🐛 Troubleshooting

### Server Won't Start
- Ensure `logs.sqlite` database file exists
- Check that port 5000 is available
- Verify Bun is installed: `bun --version`

### Dashboard Shows No Data
- Verify the bot has written logs to the database
- Check server console for any error messages
- Test API endpoint directly: `curl http://localhost:5000/api/logs`

### Database Issues
- Check database permissions: `ls -la logs.sqlite`
- Verify database structure: `sqlite3 logs.sqlite ".schema"`
- Check for database locks: `sqlite3 logs.sqlite ".timeout 1000"`

## 🎯 Performance

- **Lightweight**: Pure Bun server with minimal dependencies
- **Fast**: SQLite queries with proper indexing
- **Responsive**: Real-time updates without page refreshes
- **Scalable**: Handles thousands of log entries efficiently

Enjoy monitoring your TL;DR Bot! 🤖✨
