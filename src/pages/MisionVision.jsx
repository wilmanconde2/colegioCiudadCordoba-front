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
            Somos una institución educativa de carácter privado, que ofrece los niveles desde Pre-escolar hasta la media técnica comercial e industrial, fundamentada en la formación académica, deportiva, cultural, artística y de valores, utilizando la ciencia y la tecnología como una herramienta que contribuye al desarrollo de competencias laborales.
          </p>

          <h1>Visión</h1>
          <p>
            Seguir posicionándonos como la mejor alternativa educativa de las instituciones del calendario A en Santiago de Cali para el año lectivo 2.025, en los procesos de formación académica y personal, destacando los valores morales, sociales, ambientales y tecnológicos.
          </p>
        </div>
      </div>
    </>
  );
};

export default MisionVision;
