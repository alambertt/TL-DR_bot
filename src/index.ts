import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.BOT_TOKEN;
if (!token) throw new Error('BOT_TOKEN is missing');
const bot = new Telegraf(token);
bot.start(ctx => ctx.reply('Welcome to TL;DR_bot!'));
bot.on('text', ctx => ctx.reply('Processing...'));
bot.launch();

