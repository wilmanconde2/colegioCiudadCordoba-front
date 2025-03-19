import useTitulo from '../hooks/useTitulo';
import Formulario from '../components/Formulario';

const Inicio = () => {
  useTitulo('Inicio');

  return (
    <>
      <div className="fullContainer">
        <div>
          <img className='imagen' src="/background1.webp" alt="imagen" />
        </div>
        <div className='backgroundContainerText'>
          <h1>Paz - Progreso - Futuro</h1>
          <h2>
            ¡Una comunidad acogedora que inspira posibilidades, conecta personas y estimula el
            aprendizaje!
          </h2>
        </div>
        <Formulario />
        <div className='circular'>
          circular principal
        </div>
        <div className="reporteAcademico">
          reporte academico
        </div>
        <div className="recuperacion">
          recuperacion
        </div>
        <div className="actividadesRecuperacion">
          actividades recuperacion
        </div>
      </div>
    </>
  );
};

export default Inicio;
