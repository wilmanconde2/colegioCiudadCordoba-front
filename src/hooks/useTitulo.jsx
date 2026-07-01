import { useEffect } from 'react';

const useTitulo = (textoTitulo = 'Sin titulo') => {
  useEffect(() => {
    document.title = `CCC - ${textoTitulo}`;
  }, []);
};

export default useTitulo;
