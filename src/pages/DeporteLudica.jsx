import useTitulo from '../hooks/useTitulo';

const deporteLudica = () => {
  useTitulo('Deporte y Ludica');

  return (
    <>
      <div className='fullContainer'>
        <h1>Formacion Deportiva y Ludicas</h1>
          <img className='imagen imgLudica' src='/deporteLudica.png' alt='depor' />
        </div>
    </>
  );
};

export default deporteLudica;
