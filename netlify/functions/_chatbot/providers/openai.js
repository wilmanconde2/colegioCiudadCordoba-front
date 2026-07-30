import { createOpenAICompatibleProvider } from './openai-compatible.js';

export const createOpenAIProvider = () =>
  createOpenAICompatibleProvider({
    name: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-5-mini',
  });
