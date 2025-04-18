import useTitulo from '../hooks/useTitulo';

const Modalidades = () => {
  useTitulo('Modalidades');

  return (
    <>
      <div className='fullContainerModalidades'>
        <div className='imgComercialContainer'>
          <img className='imgComercial' src='/comercial.jpg' alt='' />
        </div>
        <div className='container modText'>
          <h2>MODALIDAD COMERCIAL</h2>
          <p>
            CONTABILIDAD Bachillerato comercial de sexto (6º) a undécimo (11º), con clases
            sistematizadas, además en convenio con el SENA con el programa de formación titulado:
            CONTABILIZACIÓN DE OPERACIONES COMERCIALES
            <br />
            <br />
            ARTES PLÁSTICAS Área incluida en la técnica comercial, donde los estudiantes aprenden:
            cerámica, vitrales, pintura en tela, oleo y arte barroco.
          </p>
        </div>
        <div className='imgIndustrialContainer'>
          <img className='imgIndustrial' src='/industrial.jpg' alt='' />
        </div>
        <div className='container modText'>
          <h2>MODALIDAD INDUSTRIAL</h2>
          <p>
            ELECTRICIDAD-ELECTRÓNICA Bachillerato industrial de sexto (6º) a undécimo (11º) con
            clases en el aula multipropósito (Taller propuesto por el SENA) con el cual tenemos
            convenio en el programa de formación titulada: INSTALACIONES ELÉCTRICAS RESIDENCIALES
            <br />
            <br />
            DIBUJO TÉCNICO Aula de dibujo técnico para la elaboración de planos y maquetas, que
            pueden diseñar apoyándose en programas de Autocad y diseño arquitectónico
          </p>
        </div>
      </div>
    </>
  );
};

export default Modalidades;
