import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';
import { ACADEMIC_CALENDAR_2026 } from '../shared/institutional-data';

const Cronograma2026 = () => {
  useTitulo(ACADEMIC_CALENDAR_2026.title);

  return (
    <>
      <div className='fullContainerCostos'>
        <h1>{ACADEMIC_CALENDAR_2026.title}</h1>
        <div className='imgCostosContainer'>
          <img src={CLOUDINARY_ASSETS.cronograma2026} alt='cronograma2026' className='imgCostos' width='995' height='591' />
        </div>
      </div>
    </>
  );
};

export default Cronograma2026;
