import PropTypes from 'prop-types';

const AlumnoSelectedCard = ({ codigo, config, onCopy, selected }) => (
  <div className='resultadoCodigo Formulario__result'>
    <h3>Resultado</h3>
    <p className='Formulario__resultLine'>
      <strong>Estudiante:</strong> {selected.nombreCompleto}
    </p>
    {selected.curso ? (
      <p className='Formulario__resultLine'>
        <strong>Curso:</strong> {selected.curso}
      </p>
    ) : null}
    {codigo ? (
      <>
        <strong className='Formulario__codeTitle'>{config.resultTitle}</strong>
        <p className='Formulario__codeValue'>{codigo}</p>
        {/* TODO:
          Reactivar cuando se integre la fuente de datos de morosidad/mensualidades.
          La funcionalidad debe mostrar los meses pendientes de pago del estudiante.

          {typeSearch === 'mensualidad' ? (
            <>
              <p className='Formulario__resultLine'>
                <strong>Estado de mensualidad:</strong> Información pendiente por configurar.
              </p>
              <p className='Formulario__resultLine'>
                Cuando esté disponible el archivo de morosos, aquí se mostrará el mes o los
                meses pendientes de pago.
              </p>
            </>
          ) : null}
        */}
        <button className='btn-form' type='button' onClick={onCopy}>
          Copiar código
        </button>
      </>
    ) : (
      <span className='error'>{config.missingMessage}</span>
    )}
  </div>
);

AlumnoSelectedCard.propTypes = {
  codigo: PropTypes.string.isRequired,
  config: PropTypes.shape({
    missingMessage: PropTypes.string.isRequired,
    resultTitle: PropTypes.string.isRequired,
  }).isRequired,
  onCopy: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    curso: PropTypes.string,
    nombreCompleto: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlumnoSelectedCard;
