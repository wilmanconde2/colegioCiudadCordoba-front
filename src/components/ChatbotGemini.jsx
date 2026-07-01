// src/components/ChatbotGemini.jsx

import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_CHATBOT_API_URL || '/.netlify/functions/chatbot-gemini';

const INITIAL_MESSAGES = [
  {
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

const ChatbotGemini = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const askGemini = async (question) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text: cleanQuestion }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: cleanQuestion }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Chatbot error:', data);

        if (data.code === 'QUOTA_EXCEEDED') {
          throw new Error('QUOTA_EXCEEDED');
        }

        if (data.code === 'INVALID_API_KEY') {
          throw new Error('INVALID_API_KEY');
        }

        throw new Error(data?.error || 'No se pudo obtener respuesta.');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.answer || 'No tengo respuesta para esa consulta.',
        },
      ]);
    } catch (error) {
      console.error('Chatbot request error:', error);

      let errorMessage =
        'En este momento no puedo responder. Intenta de nuevo o comunícate con secretaría.';

      if (error.message === 'QUOTA_EXCEEDED') {
        errorMessage =
          'Keyla está atendiendo muchas consultas en este momento. Por favor intenta nuevamente en aproximadamente 1 minuto.';
      }

      if (error.message === 'INVALID_API_KEY') {
        errorMessage =
          'El asistente virtual se encuentra temporalmente en mantenimiento. Por favor intenta nuevamente más tarde.';
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askGemini(input);
  };

  return (
    <div className={`chatbot-gemini ${isOpen ? 'is-open' : ''}`}>
      {isOpen && (
        <section className='chatbot-gemini__panel' aria-label='Asistente virtual del colegio'>
          <header className='chatbot-gemini__header'>
            <div>
              {/* <span className='chatbot-gemini__eyebrow'>Hola, soy Keyla </span> */}
              <h2>¿en qué puedo ayudarte?</h2>
            </div>

            <button
              type='button'
              className='chatbot-gemini__close'
              onClick={() => setIsOpen(false)}
              aria-label='Cerrar asistente virtual'
            >
              <FaTimes aria-hidden='true' />
            </button>
          </header>

          <div className='chatbot-gemini__quick'>
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                type='button'
                onClick={() => askGemini(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>

          <div className='chatbot-gemini__messages'>
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chatbot-gemini__message chatbot-gemini__message--${message.role}`}
              >
                {message.text}
              </div>
            ))}

            {isLoading && (
              <div className='chatbot-gemini__message chatbot-gemini__message--assistant'>
                Consultando información...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className='chatbot-gemini__form' onSubmit={handleSubmit}>
            <input
              type='text'
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder='Escribe tu pregunta...'
              aria-label='Pregunta para el asistente virtual'
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
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label='Abrir asistente virtual del colegio'
      >
        <FaRobot aria-hidden='true' />
        <span>Soy Keyla</span>
      </button>
    </div>
  );
};

export default ChatbotGemini;
