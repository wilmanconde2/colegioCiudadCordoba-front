import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

const DeporteLudica = () => {
  useTitulo('Deporte y Ludica');

  return (
    <>
      <div className='fullContainerLudica'>
        <h1>Formación Deportiva y Lúdica</h1>
        <div className='imgLudicaContainer'>
          <img
            className='imagen imgLudica'
            src={CLOUDINARY_ASSETS.horarioLudicas}
            alt='Horario de áreas deportivas y lúdicas 2026'
            loading='lazy'
            decoding='async'
          />
        </div>
      </div>
    </>
  );
};

export default DeporteLudica;
