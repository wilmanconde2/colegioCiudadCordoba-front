import { createClaudeProvider } from './claude.js';
import { createGeminiProvider } from './gemini.js';
import { createGroqProvider } from './groq.js';
import { createOpenAIProvider } from './openai.js';

const FACTORIES = {
  groq: createGroqProvider,
  gemini: createGeminiProvider,
  openai: createOpenAIProvider,
  claude: createClaudeProvider,
};

export const getProvider = (requestedProvider = process.env.AI_PROVIDER || 'groq') => {
  const name = requestedProvider.toLowerCase().trim();
  const factory = FACTORIES[name];
  if (!factory) throw new Error(`Proveedor no soportado: ${name}`);
  return factory();
};

export const SUPPORTED_PROVIDERS = Object.freeze(Object.keys(FACTORIES));
