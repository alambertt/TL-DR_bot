import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

dotenv.config();
const MAX_MESSAGE_LENGTH = 1024; // Telegram's max message length

const SHORTER_PROMPT = `IMPORTANT: ALWAYS respond in the EXACT SAME LANGUAGE as the input text. If the text is in Spanish, respond in Spanish. If it's in English, respond in English, etc.

Create an EXTREMELY CONCISE summary of the text below. Maximum 7 bullet points and a 1-liner summary (max 100 characters). Start each bullet point with a matching emoji. Be very brief and focus only on the most essential information.

DO NOT add any additional comments, explanations, or meta-commentary. ONLY provide the requested summary format.

REMEMBER: Your response must be in the same language as the original text below.

Text: `;
const GEMINI_MODEL = 'gemini-2.5-flash';

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN is missing from environment variables!');
  console.log('💡 Make sure to create a .env file with your bot BOT_TOKEN:');
  console.log('   BOT_TOKEN=your_telegram_bot_token_here');
  throw new Error('BOT_TOKEN is missing');
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is missing from environment variables!');
  console.log('💡 Make sure to create a .env file with your Gemini API key:');
  console.log('   GEMINI_API_KEY=your_gemini_api_key_here');
  throw new Error('GEMINI_API_KEY is missing');
}
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

let botUsername = '@tldread_bot';

const bot = new Telegraf(BOT_TOKEN);
bot.start(ctx => ctx.reply('Welcome to TL;DR_bot!'));

// Detect messages in group chats (groups and supergroups)
bot.on(message('text'), async ctx => {
  const chatType = ctx.chat.type;

  if (chatType === 'group' || chatType === 'supergroup') {
    // Message from a group chat
    const username = ctx.from?.username || ctx.from?.first_name || 'Unknown user';
    const chatTitle = 'title' in ctx.chat ? ctx.chat.title : 'Unknown group';
    const messageText = ctx.message.text || '';

    // If the bot is mentioned in a reply, generate a TL;DR for the replied-to message
    if (ctx.message.reply_to_message && botUsername && messageText.includes(`@${botUsername}`)) {
      const originalText =
        (ctx.message.reply_to_message as any).text || (ctx.message.reply_to_message as any).caption || '';

      if (originalText.trim().length > 0) {
        let summaryResponse = '';
        const genResponse = await ai.models.generateContentStream({
          model: GEMINI_MODEL,
          contents: SHORTER_PROMPT + `${originalText}`,
        });
        for await (const chunk of genResponse) {
          summaryResponse += chunk.text;
        }
        summaryResponse = summaryResponse.trim().replace(/\* /g, '');

        try {
          await ctx.reply(summaryResponse, {
            reply_parameters: { message_id: ctx.message.reply_to_message.message_id },
            parse_mode: 'Markdown',
          });
        } catch {
          await ctx.reply(summaryResponse, { parse_mode: 'Markdown' });
        }
        console.log(`📝 TL;DR provided for replied message by ${username} in ${chatTitle}`);
        return;
      }
    }

    if (messageText.length > MAX_MESSAGE_LENGTH) {
      let messageResponse = '';
      const response = await ai.models.generateContentStream({
        model: GEMINI_MODEL,
        contents: SHORTER_PROMPT + `${messageText}`,
      });
      for await (const chunk of response) {
        messageResponse += chunk.text;
      }
      messageResponse = messageResponse.trim().replace(/\* /g, '');

      try {
        // Try to reply to the original message
        await ctx.reply(messageResponse, {
          reply_parameters: { message_id: ctx.message.message_id },
          parse_mode: 'Markdown',
        });
      } catch (error) {
        console.log('⚠️ Could not reply to original message, sending as regular message instead');
        // If reply fails, send as a regular message
        await ctx.reply(messageResponse, { parse_mode: 'Markdown' });
      }
      console.log(`📜 Long message from ${username} in ${chatTitle}`);
      return;
    }
  }
});

// Error handling for bot
bot.catch((err, ctx) => {
  console.error('❌ Bot error occurred:', err);
  console.error('Context:', ctx);
});

// Get bot info and launch
bot.telegram
  .getMe()
  .then(botInfo => {
    botUsername = botInfo.username;
    console.log(`🤖 Bot started: @${botInfo.username}`);
  })
  .catch(() => {
    console.log('ℹ️ Could not retrieve bot info');
  });

bot.launch();
console.log('✅ TL;DR bot is running!');

// Enable graceful stop
process.once('SIGINT', () => {
  console.log('🛑 Received SIGINT. Stopping bot gracefully...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('🛑 Received SIGTERM. Stopping bot gracefully...');
  bot.stop('SIGTERM');
});
