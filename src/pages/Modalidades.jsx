import useTitulo from '../hooks/useTitulo';

const Modalidades = () => {
  useTitulo('Modalidades');

  return (
    <>
      <div className='fullContainerModalidades'>
        <div className='imgComercialContainer'>
          <img className='imgComercial' src='/comercial.webp' alt='comercial' />
        </div>
        <div className='container modText'>
          <h2>MODALIDAD COMERCIAL</h2>
          <p>
            En bachillerato, los estudiantes que escogen la modalidad comercial, además de sus áreas
            básicas y fundamentales, aprenden asignaturas como contabilidad, técnicas de oficina y
            legislaciones en el programa de formación en “CONTABILIZACIÓN DE OPERACIONES COMERCIALES
            Y FINANCIERAS”
          </p>
        </div>
        <div className='imgIndustrialContainer'>
          <img className='imgIndustrial' src='/industrial.webp' alt='industrial' />
        </div>
        <div className='container modText'>
          <h2>MODALIDAD INDUSTRIAL</h2>
          <p>
            En bachillerato, los estudiantes que escogen la modalidad industrial, además de sus
            áreas básicas y fundamentales, aprenden asignaturas como dibujo técnico y
            electricidad-electrónica en el programa de formación en “INSTALACIÓN DE REDES ELÉCTRICAS
            RESIDENCIALES”.
            <br />
            <br />
            En el año lectivo 2.025, los estudiantes de grado 9° y 10° de industrial estarán
            realizando una prueba piloto en el área de Robótica, la cual depende de un resultado
            positivo para ser incluida como el área base de esta modalidad.
          </p>
        </div>
      </div>
    </>
  );
};

export default Modalidades;
