// Deprecated compatibility alias for existing consumers; use /chatbot for new clients.
// Does not force Gemini: the provider is selected through AI_PROVIDER.
import { chatbotHandler } from './_chatbot/chatbot-handler.js';
export const handler = chatbotHandler;
