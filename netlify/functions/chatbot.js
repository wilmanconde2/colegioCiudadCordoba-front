import { netlifyChatbotHandler } from './_chatbot/netlify-handler.js';
export default netlifyChatbotHandler;

// Keep literal configuration here for Netlify's static extraction.
// Update both endpoints together; each Function has its own native rule.
export const config = {
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};
