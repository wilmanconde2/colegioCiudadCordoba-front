// src/App.jsx

import { BrowserRouter } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import Rutas from './routes/Rutas';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import BotonWhatsapp from './components/BotonWhatsapp';
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className='app-layout'>
        <PageLoader>
          <main className='main-content'>
            <Header />
            <Rutas />
          </main>
          <Footer />
          <Chatbot />
          <BotonWhatsapp />
        </PageLoader>
      </div>
    </BrowserRouter>
  );
};

export default App;
