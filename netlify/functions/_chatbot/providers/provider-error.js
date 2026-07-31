export class ProviderError extends Error {
  constructor(provider, code, message, status = 500) {
    super(message);
    this.name = 'ProviderError';
    this.provider = provider;
    this.code = code;
    this.status = status;
  }
}

export const classifyHttpError = (provider, status, message = '') => {
  const normalized = message.toLowerCase();

  if (status === 413 || normalized.includes('request too large') || normalized.includes('too many tokens')) {
    return new ProviderError(provider, 'request-too-large', message, status);
  }
  if (status === 429 || normalized.includes('quota') || normalized.includes('rate limit')) {
    return new ProviderError(provider, 'quota', message, status);
  }
  if (status === 401 || status === 403 || normalized.includes('api key') || normalized.includes('unauthorized')) {
    return new ProviderError(provider, 'auth', message, status);
  }
  if (status === 503 || normalized.includes('unavailable') || normalized.includes('high demand')) {
    return new ProviderError(provider, 'unavailable', message, status);
  }

  return new ProviderError(provider, 'api', message, status);
};
