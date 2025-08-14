import useTitulo from '../hooks/useTitulo';

const Secundaria = () => {
  useTitulo('Horario Secundaria');

  return (
    <>
      <div className='fullContainerSecundaria'>
        <h1>Horario de Atención Profesores Secundaria</h1>
        <div className='imgSecundariaContainer'>
          <img
            className='imagen imgSecundaria'
            src='horarioSecundaria1.png'
            alt='horarioSecundaria'
          />
        </div>
        <div className='imgSecundariaContainer'>
          <img
            className='imagen imgSecundaria'
            src='horarioSecundaria2.png'
            alt='horarioSecundaria'
          />
        </div>
      </div>
    </>
  );
};

export default Secundaria;
