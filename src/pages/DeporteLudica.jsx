import useTitulo from '../hooks/useTitulo';

const deporteLudica = () => {
  useTitulo('Deporte y Ludica');

  return (
    <>
      <div className='fullContainerLudica'>
        <h1>Formacion Deportiva y Ludica</h1>
        <div className='imgLudicaContainer'>
          <img className='imagen imgLudica' src='/deporteLudica.png' alt='depor' />
        </div>
      </div>
    </>
  );
};

export default deporteLudica;
