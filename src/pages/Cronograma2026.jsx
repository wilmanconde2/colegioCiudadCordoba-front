import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

const Cronograma2026 = () => {
  useTitulo('Cronograma 2026');

  return (
    <>
      <div className='fullContainerCostos'>
        <h1>Cronograma 2026</h1>
        <div className='imgCostosContainer'>
          <img src={CLOUDINARY_ASSETS.cronograma2026} alt='cronograma2026' className='imgCostos' />
        </div>
      </div>
    </>
  );
};

export default Cronograma2026;
