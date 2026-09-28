// src/App.jsx

import { BrowserRouter } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import Rutas from './routes/Rutas';
import Header from './components/Header';
import Footer from './components/Footer';
import BotonWhatsapp from './components/BotonWhatsapp';
import Chatbot from './components/Chatbot';
import ErrorBoundary from './components/ErrorBoundary';

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
          <Chatbot />
          <BotonWhatsapp />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
