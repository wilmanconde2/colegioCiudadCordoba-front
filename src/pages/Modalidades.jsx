import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

const Modalidades = () => {
  useTitulo('Modalidades');

  return (
    <>
      <div className='fullContainerModalidades'>
        <div className='imgComercialContainer'>
          <img className='imgComercial' src={CLOUDINARY_ASSETS.comercial} alt='comercial' width='600' height='428' />
        </div>
        <div className='container modText'>
          <h2>MODALIDAD COMERCIAL</h2>
          <p>
            En bachillerato, los estudiantes que escogen la modalidad comercial, además de sus áreas
            básicas y fundamentales, trabajan asignaturas como contabilidad, técnicas de oficina,
            legislación laboral, legislación comercial, ciencia y tecnología, y emprendimiento.
          </p>
        </div>
        <div className='imgIndustrialContainer'>
          <img className='imgIndustrial' src={CLOUDINARY_ASSETS.industrial} alt='industrial' width='600' height='428' />
        </div>
        <div className='container modText'>
          <h2>MODALIDAD INDUSTRIAL</h2>
          <p>
            En bachillerato, los estudiantes que escogen la modalidad industrial, además de sus
            áreas básicas y fundamentales, trabajan asignaturas como dibujo técnico, electricidad,
            electrónica, robótica y emprendimiento.
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
