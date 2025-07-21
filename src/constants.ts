export const MAX_MESSAGE_LENGTH = 1024; // Telegram's max message length

export const SHORTER_PROMPT = `IMPORTANT: ALWAYS respond in the EXACT SAME LANGUAGE as the input text. If the text is in Spanish, respond in Spanish. If it's in English, respond in English, etc.

Create an EXTREMELY CONCISE summary of the text below. Maximum 7 bullet points and a 1-liner summary (max 100 characters). Start each bullet point with a matching emoji. Be very brief and focus only on the most essential information.

DO NOT add any additional comments, explanations, or meta-commentary. ONLY provide the requested summary format.

REMEMBER: Your response must be in the same language as the original text below.

Text: `;

export const GEMINI_MODEL = 'gemini-2.5-flash';
