import { useEffect } from 'react';

const useTitulo = (textoTitulo = 'Sin titulo') => {
  useEffect(() => {
    document.title = `Colegio Ciudad Cordoba - ${textoTitulo}`;
  }, []);
};

export default useTitulo;
