import { randomUUID } from 'node:crypto';
import { ProviderError } from './providers/provider-error.js';

const PROVIDERS = new Set(['groq', 'openai', 'gemini', 'claude']);
const CATEGORIES = new Set([
  'api', 'auth', 'blocked', 'empty-response', 'network', 'not-configured',
  'quota', 'request-too-large', 'timeout', 'truncated', 'unavailable', 'unknown',
]);
const EVENTS = new Set([
  'chatbot_provider_error', 'chatbot_provider_truncated', 'chatbot_provider_retry',
  'chatbot_provider_retry_failed', 'chatbot_provider_blocked',
]);
const STAGES = new Set(['initial', 'retry']);
const ERROR_TYPES = new Set(['Error', 'TypeError', 'RangeError', 'SyntaxError', 'ProviderError']);
const SAFE_REQUEST_ID = /^[A-Za-z0-9_-]{1,128}$/;

export const getRequestId = candidate => typeof candidate === 'string' && SAFE_REQUEST_ID.test(candidate)
  ? candidate
  : randomUUID();

const safeDuration = value => Number.isFinite(value) && value >= 0 ? Math.round(value) : 0;

export const addProviderErrorContext = (error, context) => {
  if (error && (typeof error === 'object' || typeof error === 'function')) {
    error.providerStage = STAGES.has(context.stage) ? context.stage : 'initial';
    error.retryAttempt = context.retryAttempt === 1 ? 1 : 0;
    error.durationMs = safeDuration(context.durationMs);
  }
  return error;
};

export const toSafeProviderLog = (error, context) => {
  const category = error instanceof ProviderError && CATEGORIES.has(error.code)
    ? error.code
    : CATEGORIES.has(context.category) ? context.category : 'unexpected';
  const log = {
    event: EVENTS.has(context.event) ? context.event : 'chatbot_provider_error',
    requestId: getRequestId(context.requestId),
    provider: PROVIDERS.has(context.provider) ? context.provider : 'unknown',
    category,
    stage: STAGES.has(context.stage) ? context.stage : 'initial',
    retryAttempt: context.retryAttempt === 1 ? 1 : 0,
    durationMs: safeDuration(context.durationMs),
  };
  if (Number.isInteger(error?.status) && error.status >= 100 && error.status <= 599) {
    log.status = error.status;
  }
  if (category === 'unexpected') {
    log.errorType = ERROR_TYPES.has(error?.name) ? error.name : 'Error';
  }
  return log;
};

export const logSafeProviderEvent = (level, error, context) => {
  const logger = ['error', 'warn', 'info'].includes(level) ? level : 'error';
  console[logger](toSafeProviderLog(error, context));
};
