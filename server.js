#!/usr/bin/env bun
/**
 * TL;DR Bot Logs API Server - Bun Edition
 * Serves live data from logs.sqlite database for visualization
 */

import { Database } from 'bun:sqlite';
import { file } from 'bun';

const DB_PATH = 'logs.sqlite';
const PORT = 5000;

// Initialize database connection
const db = new Database(DB_PATH);

// Helper function to get all logs with stats
function getLogs() {
  try {
    // Get all logs
    const logs = db.query('SELECT * FROM operations_log ORDER BY timestamp DESC').all();
    
    // Calculate stats
    const totalLogs = logs.length;
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = logs.filter(log => log.timestamp.startsWith(today)).length;
    
    // Unique users and chats
    const uniqueUsers = new Set(logs.filter(log => log.user_id).map(log => log.user_id)).size;
    const uniqueChats = new Set(logs.filter(log => log.chat_id).map(log => log.chat_id)).size;
    
    // Event and level counts
    const eventCounts = {};
    const levelCounts = {};
    
    logs.forEach(log => {
      const event = log.event;
      const level = log.level;
      eventCounts[event] = (eventCounts[event] || 0) + 1;
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });
    
    return {
      logs,
      stats: {
        total_logs: totalLogs,
        today_logs: todayLogs,
        unique_users: uniqueUsers,
        unique_chats: uniqueChats,
        event_counts: eventCounts,
        level_counts: levelCounts
      }
    };
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
}

// Helper function to get recent logs
function getRecentLogs(limit) {
  try {
    const logs = db.query('SELECT * FROM operations_log ORDER BY timestamp DESC LIMIT ?').all(limit);
    return { logs };
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
}

// Helper function to get logs by event type
function getLogsByEvent(eventType) {
  try {
    const logs = db.query('SELECT * FROM operations_log WHERE event = ? ORDER BY timestamp DESC').all(eventType);
    return { logs };
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
}

// Helper function to get logs by user ID
function getLogsByUser(userId) {
  try {
    const logs = db.query('SELECT * FROM operations_log WHERE user_id = ? ORDER BY timestamp DESC').all(userId);
    return { logs };
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Route handler
function handleRequest(req) {
  const url = new URL(req.url);
  const path = url.pathname;
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // API Routes
    if (path === '/api/logs') {
      const data = getLogs();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Recent logs with limit
    const recentMatch = path.match(/^\/api\/logs\/recent\/(\d+)$/);
    if (recentMatch) {
      const limit = parseInt(recentMatch[1]);
      const data = getRecentLogs(limit);
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Logs by event type
    const eventMatch = path.match(/^\/api\/logs\/events\/(.+)$/);
    if (eventMatch) {
      const eventType = decodeURIComponent(eventMatch[1]);
      const data = getLogsByEvent(eventType);
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Logs by user ID
    const userMatch = path.match(/^\/api\/logs\/user\/(\d+)$/);
    if (userMatch) {
      const userId = parseInt(userMatch[1]);
      const data = getLogsByUser(userId);
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Serve HTML dashboard
    if (path === '/dashboard' || path === '/') {
      try {
        const htmlFile = file('./db_viewer_live.html');
        return new Response(htmlFile, {
          headers: { 'Content-Type': 'text/html' }
        });
      } catch (error) {
        return new Response('Dashboard file not found', { status: 404 });
      }
    }
    
    // Root API info
    if (path === '/api' || path === '/api/') {
      const apiInfo = {
        message: 'TL;DR Bot Logs API - Bun Edition',
        version: '1.0.0',
        endpoints: [
          'GET /api/logs - Get all logs with stats',
          'GET /api/logs/recent/<limit> - Get recent logs',
          'GET /api/logs/events/<event_type> - Get logs by event type',
          'GET /api/logs/user/<user_id> - Get logs by user ID',
          'GET /dashboard - View HTML dashboard'
        ]
      };
      return new Response(JSON.stringify(apiInfo, null, 2), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // 404 for other routes
    return new Response('Not Found', { status: 404 });
    
  } catch (error) {
    console.error('Request error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// Check if database exists
if (!await file(DB_PATH).exists()) {
  console.error(`❌ Error: Database file '${DB_PATH}' not found!`);
  process.exit(1);
}

// Start server
Bun.serve({
  port: PORT,
  fetch: handleRequest,
});

console.log('🚀 TL;DR Bot Logs API Server (Bun Edition) Started!');
console.log(`📊 Dashboard available at: http://localhost:${PORT}/dashboard`);
console.log(`🔌 API endpoints available at: http://localhost:${PORT}/api`);
console.log('💡 Press Ctrl+C to stop the server');

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close();
  process.exit(0);
});
