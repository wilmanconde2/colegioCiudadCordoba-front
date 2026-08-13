// src/pages/HorarioCoordinadores.jsx

import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

const HorarioCoordinadores = () => {
  useTitulo('Horario Coordinadores');

  return (
    <>
      <div className='fullContainerCoordinadores'>
        <h1>Horario de Atención Coordinadores</h1>
        <div className='imgCoordinadoresContainer'>
          <img
            className='imagen imgCoordinadores'
            src={CLOUDINARY_ASSETS.horarioCoordinadores}
            alt='horarioCoordinadores'
          />
        </div>
      </div>
    </>
  );
};

export default HorarioCoordinadores;
