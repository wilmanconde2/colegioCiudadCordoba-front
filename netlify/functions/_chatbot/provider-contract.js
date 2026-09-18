/**
 * Server-only contract: one trusted system message, then untrusted conversation.
 * A client-supplied assistant role does not make its content trusted.
 * Validation cannot establish provenance; callers must use prompt.js to build it.
 * No trimming, filtering, retrieval, or mutation occurs here.
 */
export const splitProviderMessages = (messages) => {
  if (!Array.isArray(messages) || messages.length < 2
    || messages[0]?.role !== 'system'
    || messages.at(-1)?.role !== 'user') {
    throw new TypeError('Invalid provider message contract.');
  }
  for (let index = 0; index < messages.length; index += 1) {
    const item = messages[index];
    const roles = index === 0 ? ['system'] : ['user', 'assistant'];
    if (!item || !roles.includes(item.role) || typeof item.content !== 'string'
      || !item.content.trim()) {
      throw new TypeError('Invalid provider message contract.');
    }
  }
  return {
    system: messages[0].content,
    conversation: messages.slice(1).map(({ role, content }) => ({ role, content })),
  };
};
