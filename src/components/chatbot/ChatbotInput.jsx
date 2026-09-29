import PropTypes from 'prop-types';
import { FaPaperPlane } from 'react-icons/fa';
import { MAX_MESSAGE_LENGTH } from './chatbotUtils';

const ChatbotInput = ({ input, inputRef, isLoading, onInputChange, onSubmit }) => (
  <form className='chatbot__form' onSubmit={onSubmit}>
    <input
      ref={inputRef}
      type='text'
      value={input}
      onChange={(event) => onInputChange(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
      maxLength={MAX_MESSAGE_LENGTH}
      placeholder='Escribe tu pregunta...'
      aria-label='Pregunta para el asistente virtual'
      autoComplete='off'
      disabled={isLoading}
    />

    <button
      type='submit'
      disabled={isLoading || !input.trim()}
      aria-label='Enviar pregunta'
    >
      <FaPaperPlane aria-hidden='true' />
    </button>
  </form>
);

ChatbotInput.propTypes = {
  input: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ChatbotInput;
