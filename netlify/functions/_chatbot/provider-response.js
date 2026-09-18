import { splitProviderMessages } from './provider-contract.js';
import { ProviderError } from './providers/provider-error.js';
import { addProviderErrorContext, logSafeProviderEvent } from './provider-logging.js';

export const RETRY_INSTRUCTION = 'Responde de forma breve, completa y directa. Prioriza la información esencial y evita explicaciones innecesarias.';

export const buildRetryMessages = messages => {
  const { system, conversation } = splitProviderMessages(messages);
  return [{ role: 'system', content: `${system}\n\n${RETRY_INSTRUCTION}` }, ...conversation];
};

// One generation budget, shared by at most two calls. Adapters retain their defaults.
export const generateChatbotAnswer = async (provider, messages, { requestId } = {}) => {
  const started = performance.now();
  let result;
  try {
    result = await provider.generate({ messages });
  } catch (error) {
    throw addProviderErrorContext(error, {
      stage: 'initial', retryAttempt: 0, durationMs: performance.now() - started,
    });
  }
  if (result.finishReason === 'blocked') {
    logSafeProviderEvent('warn', new ProviderError(provider.name, 'blocked', 'Blocked.', 502), {
      event: 'chatbot_provider_blocked', requestId, provider: provider.name,
      category: 'blocked', stage: 'initial', retryAttempt: 0, durationMs: performance.now() - started,
    });
    throw addProviderErrorContext(new ProviderError(provider.name, 'blocked', 'Respuesta no completa.', 502), {
      stage: 'initial', retryAttempt: 0, durationMs: performance.now() - started,
    });
  }
  if (result.truncated !== true) return result.text;

  logSafeProviderEvent('warn', new ProviderError(provider.name, 'truncated', 'Truncated.', 502), {
    event: 'chatbot_provider_truncated', requestId, provider: provider.name,
    category: 'truncated', stage: 'initial', retryAttempt: 0, durationMs: performance.now() - started,
  });
  const remainingMs = Math.floor(15000 - (performance.now() - started));
  if (remainingMs <= 0) {
    throw addProviderErrorContext(new ProviderError(provider.name, 'timeout', 'Tiempo de espera agotado.', 504), {
      stage: 'retry', retryAttempt: 1, durationMs: performance.now() - started,
    });
  }
  const retryMessages = buildRetryMessages(messages);
  logSafeProviderEvent('info', new ProviderError(provider.name, 'truncated', 'Retry.', 502), {
    event: 'chatbot_provider_retry', requestId, provider: provider.name,
    category: 'truncated', stage: 'retry', retryAttempt: 1, durationMs: performance.now() - started,
  });
  try {
    result = await provider.generate({ messages: retryMessages, timeoutMs: remainingMs });
  } catch (error) {
    throw addProviderErrorContext(error, {
      stage: 'retry', retryAttempt: 1, durationMs: performance.now() - started,
    });
  }
  if (result.truncated || result.finishReason !== 'complete') {
    throw addProviderErrorContext(new ProviderError(provider.name, result.finishReason, 'Respuesta no completa.', 502), {
      stage: 'retry', retryAttempt: 1, durationMs: performance.now() - started,
    });
  }
  return result.text;
};
