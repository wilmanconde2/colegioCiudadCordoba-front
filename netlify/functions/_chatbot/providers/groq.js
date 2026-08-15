import { createOpenAICompatibleProvider } from './openai-compatible.js';

export const createGroqProvider = () =>
  createOpenAICompatibleProvider({
    name: 'groq',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b',
  });
