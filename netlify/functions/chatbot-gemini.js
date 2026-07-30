// Compatibility alias for the legacy endpoint.
// New clients should use /.netlify/functions/chatbot.
import { chatbotHandler } from './_chatbot/chatbot-handler.js';

export const handler = chatbotHandler;
