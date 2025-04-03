import useTitulo from '../hooks/useTitulo';

const Cobertura = () => {
  useTitulo('Cobertura');

  return (
    <>
      <div className='fullContainerCobertura'>
        <div className='imgCoberturaContainer'>
            <img className='imgCobertura' src="/cobertura.jpg" alt="cobertura" />
        </div>
        <div className='containerCobertura'>
          <h1>PROGRAMA DE AMPLIACIÓN DE COBERTURA </h1>
          <p>
            Es un programa avalado por el MINISTERIO DE EDUCACIÓN NACIONAL (MEN) y coordinado por las Secretarías de
            Educación a nivel departamental, el cual busca la vinculación de estudiantes que NO tienen acceso a la
            educación en los estratos 1 y 2. 
            <br />
            <br />
            La Fundación Social Educativa PAZ, PROGRESO Y FUTURO en convenio con el
            COLEGIO CIUDAD CÓRDOBA se vincularon al programa desde al año lectivo 2.005. Actualmente, contamos con 237
            estudiantes. Para el año lectivo 2.013, recibiremos en la fundación, niños desde TRANSICIÓN hasta grado
            SÉPTIMO que sean autorizados por la Secretaría de Educación Municipal. No se aceptan en el programa
            estudiantes que están matriculados en el Colegio Ciudad Córdoba (Privado). El programa de ampliación de
            Cobertura se ofrece en las instalaciones del Colegio Ciudad Córdoba UNICAMENTE en la jornada de la tarde de
            lunes a viernes de 12:40 pm a 6:40 pm. 
            <br />
            <br />
            Compartimos a toda la comunidad educativa que en la evaluación del
            Banco de Oferentes del año lectivo 2.012 realizada por la Secretaria de Educación Municipal, la fundación
            social educativa PAZ, PROGRESO Y FUTURO en convenio con el COLEGIO CIUDAD CÓRDOBA obtuvimos la calificación
            más alta de la comuna 15 con 85 puntos. Con lo anterior, demostramos que seguimos siendo una institución de
            calidad que se esmera por brindarle un buen servicio a la comunidad.
          </p>
        </div>
      </div>
    </>
  );
};

export default Cobertura;
