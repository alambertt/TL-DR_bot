import { Database } from 'bun:sqlite';

// Initialize the database
const db = new Database('logs.sqlite', { create: true });

// Create the logs table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS operations_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    level TEXT NOT NULL,
    event TEXT NOT NULL,
    message TEXT,
    user_id INTEGER,
    chat_id INTEGER,
    chat_title TEXT
  );
`);

export type LogLevel = 'INFO' | 'ERROR' | 'WARN' | 'DEBUG';

export interface LogDetails {
  level: LogLevel;
  event: string;
  message?: string;
  userId?: number;
  chatId?: number;
  chatTitle?: string;
}

/**
 * Logs an operation to the SQLite database.
 * @param details - The details of the log entry.
 */
export function logOperation(details: LogDetails) {
  const { level, event, message, userId, chatId, chatTitle } = details;
  try {
    db.run(
      'INSERT INTO operations_log (level, event, message, user_id, chat_id, chat_title) VALUES (?, ?, ?, ?, ?, ?)',
      [level, event, message || null, userId || null, chatId || null, chatTitle || null]
    );
  } catch (error) {
    console.error('❌ Failed to write to log database:', error);
  }
}
