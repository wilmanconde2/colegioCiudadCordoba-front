import useTitulo from '../hooks/useTitulo';

const deporteLudica = () => {
  useTitulo('Deporte y Ludica');

  return (
    <>
      <div className='fullContainerLudica'>
        <h1>Formación Deportiva y Lúdica</h1>
        <div className='imgLudicaContainer'>
          <img className='imagen imgLudica' src='/deporteLudica.png' alt='depor' />
        </div>
      </div>
    </>
  );
};

export default deporteLudica;
