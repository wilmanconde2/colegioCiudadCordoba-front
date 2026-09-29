// src/App.jsx

import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import Rutas from './routes/Rutas';
import Header from './components/Header';
import Footer from './components/Footer';
import BotonWhatsapp from './components/BotonWhatsapp';
import ErrorBoundary from './components/ErrorBoundary';

const Chatbot = lazy(() => import('./components/Chatbot'));

const DeferredChatbot = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const loadChatbot = () => setShouldLoad(true);

    if ('requestIdleCallback' in window) {
      const idleCallbackId = window.requestIdleCallback(loadChatbot, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = window.setTimeout(loadChatbot, 1000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <Chatbot />
    </Suspense>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <div className='app-layout'>
          <main className='main-content'>
            <Header />
            <Rutas />
          </main>
          <Footer />
          <DeferredChatbot />
          <BotonWhatsapp />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
