import { useEffect, useRef, useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import ChatbotInput from './ChatbotInput';
import ChatbotMessages from './ChatbotMessages';
import { sendChatMessage } from './chatbotApi';
import {
  createMessageId,
  getChatbotErrorMessage,
  getSafeHistory,
  MAX_MESSAGE_LENGTH,
} from './chatbotUtils';

const REQUEST_TIMEOUT_MS = 30_000;

const INITIAL_MESSAGES = [
  {
    id: 'initial-assistant-message',
    role: 'assistant',
    text: 'Hola. Soy Keyla, asistente virtual del Colegio Ciudad Córdoba. Puedo ayudarte con costos, matrículas, pensiones, pagos, horarios, cronograma y contacto.',
  },
];

const QUICK_QUESTIONS = [
  '¿Cuánto cuesta la matrícula?',
  '¿Cuánto vale la pensión de sexto?',
  '¿Cómo pago por PSE?',
  '¿Cuál es el horario de atención?',
  '¿Cuándo atiende Daniela Caicedo?',
  '¿Quién atiende Quinto 2?',
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const requestControllerRef = useRef(null);
  const requestInProgressRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(
    () => () => {
      requestControllerRef.current?.abort();
    },
    [],
  );

  const addMessage = (role, text) => {
    setMessages((previousMessages) => [
      ...previousMessages,
      { id: createMessageId(), role, text },
    ]);
  };

  const askKeyla = async (question) => {
    const cleanQuestion = question?.toString().trim();
    if (!cleanQuestion || requestInProgressRef.current) return;

    if (cleanQuestion.length > MAX_MESSAGE_LENGTH) {
      addMessage(
        'assistant',
        `La pregunta no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`,
      );
      return;
    }

    const conversationHistory = getSafeHistory(messages);
    requestInProgressRef.current = true;
    setIsLoading(true);
    setInput('');
    addMessage('user', cleanQuestion);

    const controller = new AbortController();
    requestControllerRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const answer = await sendChatMessage({
        message: cleanQuestion,
        history: conversationHistory,
        signal: controller.signal,
      });
      addMessage('assistant', answer);
    } catch (error) {
      addMessage('assistant', getChatbotErrorMessage(error));
    } finally {
      window.clearTimeout(timeoutId);

      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
      }

      requestInProgressRef.current = false;
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void askKeyla(input);
  };

  return (
    <div className={`chatbot ${isOpen ? 'is-open' : ''}`}>
      {isOpen && (
        <section
          className='chatbot__panel'
          aria-label='Asistente virtual del Colegio Ciudad Córdoba'
          aria-live='polite'
        >
          <header className='chatbot__header'>
            <div>
              <h2>¿En qué puedo ayudarte?</h2>
            </div>

            <button
              type='button'
              className='chatbot__close'
              onClick={() => setIsOpen(false)}
              aria-label='Cerrar asistente virtual'
            >
              <FaTimes aria-hidden='true' />
            </button>
          </header>

          <div className='chatbot__quick' aria-label='Preguntas frecuentes'>
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                type='button'
                onClick={() => void askKeyla(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>

          <ChatbotMessages
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
          <ChatbotInput
            input={input}
            inputRef={inputRef}
            isLoading={isLoading}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        </section>
      )}

      <button
        type='button'
        className='chatbot__trigger'
        onClick={() => setIsOpen((previousState) => !previousState)}
        aria-expanded={isOpen}
        aria-label={
          isOpen ? 'Cerrar asistente virtual del colegio' : 'Abrir asistente virtual del colegio'
        }
      >
        <FaRobot aria-hidden='true' />
        <span>Soy Keyla</span>
      </button>
    </div>
  );
};

export default Chatbot;
