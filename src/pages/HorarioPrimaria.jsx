import useTitulo from '../hooks/useTitulo';

const Primaria = () => {
  useTitulo('Horario Primaria');

  return (
    <>
      <div className='fullContainerPrimaria'>
        <h1>Horario de Atención Profesores Primaria</h1>
        <div className='imgPrimariaContainer'>
          <img className='imagen imgPrimaria' src='/horarioPrimaria.png' alt='horarioPrimaria' />
        </div>
      </div>
    </>
  );
};

export default Primaria;
