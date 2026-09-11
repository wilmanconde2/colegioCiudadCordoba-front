// Deprecated compatibility alias for existing consumers; use /chatbot for new clients.
// Does not force Gemini: the provider is selected through AI_PROVIDER.
import { netlifyChatbotHandler } from './_chatbot/netlify-handler.js';
export default netlifyChatbotHandler;

// Keep in sync with chatbot.js. Separate Functions do not promise a shared quota.
export const config = {
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};
