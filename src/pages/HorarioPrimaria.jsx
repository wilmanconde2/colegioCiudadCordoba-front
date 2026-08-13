// src/pages/HorarioPrimaria.jsx

import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

const Primaria = () => {
  useTitulo('Horario Primaria');

  return (
    <>
      <div className='fullContainerPrimaria'>
        <h1>Horario de Atención Profesores Primaria</h1>
        <div className='imgPrimariaContainer'>
          <img className='imagen imgPrimaria' src={CLOUDINARY_ASSETS.horarioPrimaria} alt='horarioPrimaria' width='3900' height='2550' />
        </div>
      </div>
    </>
  );
};

export default Primaria;
