// src/pages/HorarioPsicologia.jsx

import useTitulo from '../hooks/useTitulo';

const HorarioPsicologia = () => {
  useTitulo('Horario Psicología');

  return (
    <>
      <div className='fullContainerPsicologia'>
        <h1>Horario de Atención Psicología</h1>
        <div className='imgPsicologiaContainer'>
          <img
            className='imagen imgPsicologia'
            src='/horarioPsicologia.webp'
            alt='horarioPsicologia'
          />
        </div>
      </div>
    </>
  );
};

export default HorarioPsicologia;
