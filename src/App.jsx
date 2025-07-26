import { BrowserRouter } from 'react-router-dom';
import Rutas from './routes/Rutas';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import BotonWhatsapp from './components/BotonWhatsapp';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app-layout'>
        <PageLoader>
          <main className='main-content'>
            <Header />
            <Rutas />
          </main>
          <Footer />
          <BotonWhatsapp />
        </PageLoader>
      </div>
    </BrowserRouter>
  );
};

export default App;
