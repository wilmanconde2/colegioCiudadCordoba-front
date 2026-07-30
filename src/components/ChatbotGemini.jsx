// src/components/ChatbotGemini.jsx

import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';

const CHATBOT_API_URL = '/.netlify/functions/chatbot';

const MAX_MESSAGE_LENGTH = 500;
const REQUEST_TIMEOUT_MS = 30_000;
const MAX_HISTORY_MESSAGES = 6;

let messageSequence = 0;

const createMessageId = () => {
  messageSequence += 1;
  return `message-${Date.now()}-${messageSequence}`;
};

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

const getSafeHistory = (messages) =>
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

const renderMessageText = (text) => {
  if (typeof text !== 'string') return null;

  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  const urlOccurrences = new Map();

  return parts.map((part) => {
    const isUrl = part.startsWith('http://') || part.startsWith('https://');

    if (!isUrl) {
      return part;
    }

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

const ChatbotGemini = () => {
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

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  useEffect(
    () => () => {
      requestControllerRef.current?.abort();
    },
    [],
  );

  const askKeyla = async (question) => {
    const cleanQuestion = question?.toString().trim();

    if (!cleanQuestion || requestInProgressRef.current) {
      return;
    }

    if (cleanQuestion.length > MAX_MESSAGE_LENGTH) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: createMessageId(),
          role: 'assistant',
          text: `La pregunta no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`,
        },
      ]);

      return;
    }

    const conversationHistory = getSafeHistory(messages);

    requestInProgressRef.current = true;
    setIsLoading(true);
    setInput('');

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: createMessageId(),
        role: 'user',
        text: cleanQuestion,
      },
    ]);

    const controller = new AbortController();
    requestControllerRef.current = controller;

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: cleanQuestion,
          history: conversationHistory,
        }),
        signal: controller.signal,
      });

      const rawResponse = await response.text();

      let data = {};

      if (rawResponse) {
        try {
          data = JSON.parse(rawResponse);
        } catch {
          throw new Error('INVALID_SERVER_RESPONSE');
        }
      }

      if (!response.ok) {
        console.error('Chatbot HTTP error:', {
          status: response.status,
          data,
        });

        if (response.status === 429 || data?.code === 'QUOTA_EXCEEDED') {
          throw new Error('QUOTA_EXCEEDED');
        }

        if (
          response.status === 401 ||
          response.status === 403 ||
          data?.code === 'INVALID_API_KEY'
        ) {
          throw new Error('SERVICE_UNAVAILABLE');
        }

        throw new Error(data?.error || 'CHATBOT_REQUEST_FAILED');
      }

      const answer =
        typeof data?.answer === 'string' && data.answer.trim()
          ? data.answer.trim()
          : 'Por ahora no tengo esa información. Puedes comunicarte directamente con el colegio para recibir orientación.';

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: createMessageId(),
          role: 'assistant',
          text: answer,
        },
      ]);
    } catch (error) {
      console.error('Chatbot request error:', error);

      let errorMessage =
        'En este momento no puedo responder. Intenta nuevamente o comunícate con secretaría.';

      if (error?.name === 'AbortError') {
        errorMessage = 'La consulta tardó demasiado tiempo. Por favor intenta nuevamente.';
      } else if (error?.message === 'QUOTA_EXCEEDED') {
        errorMessage =
          'Keyla está atendiendo muchas consultas en este momento. Intenta nuevamente en aproximadamente un minuto.';
      } else if (error?.message === 'SERVICE_UNAVAILABLE') {
        errorMessage =
          'El asistente virtual se encuentra temporalmente en mantenimiento. Intenta nuevamente más tarde.';
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: createMessageId(),
          role: 'assistant',
          text: errorMessage,
        },
      ]);
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

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((previousState) => !previousState);
  };

  return (
    <div className={`chatbot-gemini ${isOpen ? 'is-open' : ''}`}>
      {isOpen && (
        <section
          className='chatbot-gemini__panel'
          aria-label='Asistente virtual del Colegio Ciudad Córdoba'
          aria-live='polite'
        >
          <header className='chatbot-gemini__header'>
            <div>
              <h2>¿En qué puedo ayudarte?</h2>
            </div>

            <button
              type='button'
              className='chatbot-gemini__close'
              onClick={handleClose}
              aria-label='Cerrar asistente virtual'
            >
              <FaTimes aria-hidden='true' />
            </button>
          </header>

          <div className='chatbot-gemini__quick' aria-label='Preguntas frecuentes'>
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

          <div
            className='chatbot-gemini__messages'
            role='log'
            aria-label='Conversación con Keyla'
            aria-relevant='additions'
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-gemini__message chatbot-gemini__message--${message.role}`}
              >
                {renderMessageText(message.text)}
              </div>
            ))}

            {isLoading && (
              <div
                className='chatbot-gemini__message chatbot-gemini__message--assistant'
                aria-label='Keyla está consultando información'
              >
                Consultando información...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className='chatbot-gemini__form' onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type='text'
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
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
        </section>
      )}

      <button
        type='button'
        className='chatbot-gemini__trigger'
        onClick={handleToggle}
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

export default ChatbotGemini;
