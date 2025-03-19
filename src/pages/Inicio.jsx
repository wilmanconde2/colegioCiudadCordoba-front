import useTitulo from '../hooks/useTitulo';
import Formulario from '../components/Formulario';
import Footer from '../components/Footer';

const Inicio = () => {
  useTitulo('Inicio');

  return (
    <>
      <div className="fullContainer">
        <div>
          <img className='imagen' src="/background1.webp" alt="imagen" />
        </div>
        <div className='backgroundContainerText'>
          <h1>Paz * Progreso * Futuro</h1>
          <h2>
            ¡Una comunidad acogedora que inspira posibilidades, conecta personas y estimula el
            aprendizaje!
          </h2>
        </div>
        <Formulario />
      </div>
    </>
  );
};

export default Inicio;
