import useTitulo from '../hooks/useTitulo';

const Cronograma2026 = () => {
  useTitulo('Cronograma 2026');

  return (
    <>
      <div className='fullContainerCostos'>
        <h1>Cronograma 2026</h1>
        <div className='imgCostosContainer'>
          <img src='/cronograma2026.png' alt='cronograma2026' className='imgCostos' />
        </div>
      </div>
    </>
  );
};

export default Cronograma2026;
