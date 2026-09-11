import { chatbotHandler } from './chatbot-handler.js';

// Netlify extracts native rateLimit config only for its modern default export.
// Keep the event-based application contract isolated from the transport adapter.
export const netlifyChatbotHandler = async (request) => {
  const result = await chatbotHandler({
    httpMethod: request.method,
    headers: Object.fromEntries(request.headers),
    body: request.method === 'POST' ? await request.text() : '',
  });
  return new Response(result.body, { status: result.statusCode, headers: result.headers });
};
