import useTitulo from '../hooks/useTitulo';
import Formulario from '../components/Formulario';

const Inicio = () => {
  useTitulo('Inicio');

  return (
    <>
      <div>
        <img className='imagen' src="/background.png" alt="imagen" />
      </div>
      <div className='backgroundContainerText'>
        <h1>Paz * Progreso * Futuro</h1>
        <h2>
          ¡Una comunidad acogedora que inspira posibilidades, conecta personas y estimula el
          aprendizaje!
        </h2>
      </div>
      <Formulario />
      <div className='high'>
        {/* TODO borrar div al terminar */}
      </div>
    </>
  );
};

export default Inicio;
