import { useEffect } from 'react';

const useTitulo = (textoTitulo = 'Sin titulo') => {
  useEffect(() => {
    document.title = `CCCC - ${textoTitulo}`;
  }, []);
};

export default useTitulo;
