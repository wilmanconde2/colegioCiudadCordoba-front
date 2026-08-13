// src/pages/HorarioPsicologia.jsx

import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

const HorarioPsicologia = () => {
  useTitulo('Horario Psicología');

  return (
    <>
      <div className='fullContainerPsicologia'>
        <h1>Horario de Atención Psicología</h1>
        <div className='imgPsicologiaContainer'>
          <img
            className='imagen imgPsicologia'
            src={CLOUDINARY_ASSETS.horarioPsicologia}
            alt='horarioPsicologia'
          />
        </div>
      </div>
    </>
  );
};

export default HorarioPsicologia;
