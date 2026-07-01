// src/main.jsx

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/index.scss';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default {
  // variables de entorno
};
