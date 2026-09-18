import { splitProviderMessages } from './provider-contract.js';
import { ProviderError } from './providers/provider-error.js';

export const RETRY_INSTRUCTION = 'Responde de forma breve, completa y directa. Prioriza la información esencial y evita explicaciones innecesarias.';

export const buildRetryMessages = messages => {
  const { system, conversation } = splitProviderMessages(messages);
  return [{ role: 'system', content: `${system}\n\n${RETRY_INSTRUCTION}` }, ...conversation];
};

// One generation budget, shared by at most two calls. Adapters retain their defaults.
export const generateChatbotAnswer = async (provider, messages) => {
  const started = performance.now();
  let retryAttempted = false;
  let finishReason = 'unknown';
  let retryOutcome = 'not-attempted';
  try {
    let result = await provider.generate({ messages });
    finishReason = result.finishReason;
    if (result.truncated === true) {
      const remainingMs = Math.floor(15000 - (performance.now() - started));
      if (remainingMs <= 0) {
        retryOutcome = 'budget-exhausted';
        throw new ProviderError(provider.name, 'timeout', 'Tiempo de espera agotado.', 504);
      }
      const retryMessages = buildRetryMessages(messages);
      retryAttempted = true;
      retryOutcome = 'error';
      result = await provider.generate({ messages: retryMessages, timeoutMs: remainingMs });
      retryOutcome = result.finishReason;
    }
    if (result.truncated || result.finishReason === 'blocked'
      || (retryAttempted && result.finishReason !== 'complete')) {
      throw new ProviderError(provider.name, result.finishReason, 'Respuesta no completa.', 502);
    }
    return result.text;
  } finally {
    console.info('chatbot provider result', {
      provider: provider.name, finishReason, retryAttempted, retryOutcome,
    });
  }
};
