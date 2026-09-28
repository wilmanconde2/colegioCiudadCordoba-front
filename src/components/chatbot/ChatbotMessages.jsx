import PropTypes from 'prop-types';

const renderMessageText = (text) => {
  if (typeof text !== 'string') return null;

  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  const urlOccurrences = new Map();

  return parts.map((part) => {
    const isUrl = part.startsWith('http://') || part.startsWith('https://');
    if (!isUrl) return part;

    const normalizedUrl = part.replace(/[),.;!?]+$/, '');
    const trailingCharacters = part.slice(normalizedUrl.length);
    const occurrence = (urlOccurrences.get(normalizedUrl) || 0) + 1;
    urlOccurrences.set(normalizedUrl, occurrence);

    return (
      <span key={`${normalizedUrl}-${occurrence}`}>
        <a href={normalizedUrl} target='_blank' rel='noopener noreferrer'>
          Abrir enlace
        </a>
        {trailingCharacters}
      </span>
    );
  });
};

const ChatbotMessages = ({ messages, isLoading, messagesEndRef }) => (
  <div
    className='chatbot__messages'
    role='log'
    aria-label='Conversación con Keyla'
    aria-relevant='additions'
  >
    {messages.map((message) => (
      <div key={message.id} className={`chatbot__message chatbot__message--${message.role}`}>
        {renderMessageText(message.text)}
      </div>
    ))}

    {isLoading && (
      <div
        className='chatbot__message chatbot__message--assistant'
        aria-label='Keyla está consultando información'
      >
        Consultando información...
      </div>
    )}

    <div ref={messagesEndRef} />
  </div>
);

ChatbotMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['user', 'assistant']).isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  messagesEndRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

export default ChatbotMessages;
