import useTitulo from '../hooks/useTitulo';

const MisionVision = () => {
  useTitulo('Misión y Visión');

  return (
    <>
      <div className='fullContainerMiVi'>
        <div className='imgMiViContainer'>
          <img className='imgMiVi' src='/mision.webp' alt='imagen' />
        </div>
        <div className='containerMiVi'>
          <h1>Misión</h1>
          <p>
            Somos una institución educativa de carácter privado, que ofrece los niveles desde
            Pre-escolar hasta la media técnica comercial e industrial, fundamentada en la formación
            académica, deportiva, cultural, artística y de valores, utilizando la ciencia y la
            tecnología como una herramienta que contribuye al desarrollo de competencias laborales.
          </p>

          <h1>Visión</h1>
          <p>
            Para el año 2030, nuestro colegio seguirá posicionado como líder en formación académica
            innovadora, integrando los valores, el arte, la robótica, la tecnología y la
            sostenibilidad ambiental como pilares fundamentales del aprendizaje, impactando a la
            comunidad educativa Cocicor
          </p>
        </div>
      </div>
    </>
  );
};

export default MisionVision;
