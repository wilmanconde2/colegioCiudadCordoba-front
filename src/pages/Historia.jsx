import useTitulo from '../hooks/useTitulo';

const Historia = () => {
  useTitulo('Historia');

  return (
    <>

      <div className="fullContainer">

        <div >
          <img className="imagen" src="/background.jpg" alt="" />
        </div>
        <div className="texto">
          <h1>RESEÑA HISTÓRICA: AÑO 1990 - 2009</h1>
          <p>La idea de fundar el colegio Ciudad Córdoba fue gestada por el señor Licenciado ARMANDO GORDILLO LÓPEZ, PATRICIA CONDE y JULIO CÉSAR CEBALLOS, quienes luego de un estudio realizado en la zona, vieron la posibilidad de  proporcionarle a la comunidad del sector, un centro educativo que cubriera una de las necesidades prioritarias como es la educación.
            <br />
            El colegio como institución educativa, inició sus funciones académicas a partir del año lectivo 1990 - 1991 con educación preescolar (transición), básica primaria y básica secundaria (grados 6º y 7º) modalidad comercial; jornada de la mañana y jornada de la tarde.
            <br />
            Actualmente contamos con las modalidades comercial e industrial, hasta grado 11º, según licencia de funcionamiento, resolución Nº 4143.2.21.8853 de Octubre 19 de 2009.
            <br />
            En el año lectivo 2005-2006 se suscribió contrato con la Secretaría de Educación Municipal, en el llamado Plan de Cobertura, beneficiando a 210 estudiantes de estrato 0-1 y 2.
            <br />
            A partir del año lectivo 2007-2008 se inició el proceso del convenio de integración con el SENA, con la capacitación correspondiente para acreditación y certificación.
            <br />
            Se inició la dotación del aula multipropósito, para las especialidades de electricidad/electrónica, asesorada y orientada por APROPSENA.
            <br />
            - Dos (2) salas de informática con 21 computadores cada una.
            <br />
            - Enero 2010, nos vinculamos al proceso integral de gestión de calidad con la Fundación  CremHelado - Proyecto Educativo Lideres Siglo XXI.</p>
        </div>
      </div>
    </>
  )
}

export default Historia