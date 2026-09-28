export const MAX_MESSAGE_LENGTH = 500;
export const MAX_HISTORY_MESSAGES = 6;

let messageSequence = 0;

export const createMessageId = () => {
  messageSequence += 1;
  return `message-${Date.now()}-${messageSequence}`;
};

export const getSafeHistory = (messages) =>
  messages
    .filter(
      (message) =>
        message &&
        ['user', 'assistant'].includes(message.role) &&
        typeof message.text === 'string' &&
        message.text.trim(),
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map(({ role, text }) => ({
      role,
      text: text.trim().slice(0, MAX_MESSAGE_LENGTH),
    }));

export const getChatbotErrorMessage = (error) => {
  if (error?.name === 'AbortError') {
    return 'La consulta tardó demasiado tiempo. Por favor intenta nuevamente.';
  }

  if (error?.message === 'RATE_LIMITED') {
    return 'Has realizado varias consultas en poco tiempo. Espera un momento antes de volver a intentarlo.';
  }

  if (error?.message === 'QUOTA_EXCEEDED') {
    return 'Keyla está atendiendo muchas consultas en este momento. Intenta nuevamente en aproximadamente un minuto.';
  }

  if (error?.message === 'SERVICE_UNAVAILABLE') {
    return 'El asistente virtual se encuentra temporalmente en mantenimiento. Intenta nuevamente más tarde.';
  }

  return 'En este momento no puedo responder. Intenta nuevamente o comunícate con secretaría.';
};
