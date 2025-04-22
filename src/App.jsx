// src/App.jsx
import { BrowserRouter } from 'react-router-dom';

import Rutas from './routes/Rutas';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';

const App = () => {
  return (
    <BrowserRouter>
      <PageLoader>
        <Header />
        <Rutas />
        <Footer />
      </PageLoader>
    </BrowserRouter>
  );
};

export default App;
