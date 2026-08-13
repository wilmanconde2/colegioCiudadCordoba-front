// src/pages/HorarioSecundaria.jsx

import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

const Secundaria = () => {
  useTitulo('Horario Secundaria');

  return (
    <>
      <div className='fullContainerSecundaria'>
        <h1>Horario de Atención Profesores Secundaria</h1>
        <div className='imgSecundariaContainer'>
          <img
            className='imagen imgSecundaria'
            src={CLOUDINARY_ASSETS.horarioSecundaria}
            alt='horarioSecundaria'
            width='3900'
            height='2550'
          />
        </div>
      </div>
    </>
  );
};

export default Secundaria;
