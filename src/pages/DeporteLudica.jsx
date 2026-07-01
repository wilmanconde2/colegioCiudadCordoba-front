import useTitulo from '../hooks/useTitulo';

const deporteLudica = () => {
  useTitulo('Deporte y Ludica');

  return (
    <>
      <div className='fullContainerLudica'>
        <h1>Formación Deportiva y Lúdica</h1>
        <div className='imgLudicaContainer'>
          <img className='imagen imgLudica' src='/deporteLudica.webp' alt='deporte y ludica' />
        </div>
      </div>
    </>
  );
};

export default deporteLudica;
