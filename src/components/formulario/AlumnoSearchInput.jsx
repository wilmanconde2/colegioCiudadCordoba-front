import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

const alumnoShape = PropTypes.shape({
  codigo: PropTypes.string,
  curso: PropTypes.string,
  nombreCompleto: PropTypes.string.isRequired,
});

const AlumnoSearchInput = ({
  activeIndex,
  config,
  error,
  filtered,
  isListboxOpen,
  listboxId,
  loading,
  onActiveIndexChange,
  onFocus,
  onKeyDown,
  onQueryChange,
  onSelect,
  query,
}) => (
  <>
    <label className='Formulario__label' htmlFor='studentSearch'>
      {config.label}
    </label>
    <div className='Formulario__searchWrap'>
      <input
        id='studentSearch'
        className='Formulario__input'
        type='text'
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={config.placeholder}
        aria-label='Buscar estudiante'
        role='combobox'
        aria-autocomplete='list'
        aria-expanded={isListboxOpen}
        aria-controls={listboxId}
        aria-activedescendant={activeIndex >= 0 && isListboxOpen ? `${listboxId}-option-${activeIndex}` : undefined}
        autoComplete='off'
        required
      />
      {loading && (
        <div className='Formulario__loadingRow'>
          <span>Cargando alumnos…</span>
          <ClipLoader size={16} />
        </div>
      )}
      {error && <span className='error Formulario__error'>{error}</span>}
      {isListboxOpen && (
        <div id={listboxId} className='Formulario__dropdown' role='listbox' aria-label='Estudiantes encontrados'>
          {filtered.map((alumno, index) => (
            <button
              id={`${listboxId}-option-${index}`}
              key={`${alumno.nombreCompleto}-${alumno.curso}-${alumno.codigo || 'sin-codigo'}`}
              type='button'
              role='option'
              aria-selected={index === activeIndex}
              className={`Formulario__option ${index === activeIndex ? 'is-active' : ''}`}
              onMouseEnter={() => onActiveIndexChange(index)}
              onClick={() => onSelect(alumno)}
            >
              <span className='Formulario__optionName'>{alumno.nombreCompleto}</span>
              <span className='Formulario__optionCourse'>{alumno.curso}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  </>
);

AlumnoSearchInput.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  config: PropTypes.shape({
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
  filtered: PropTypes.arrayOf(alumnoShape).isRequired,
  isListboxOpen: PropTypes.bool.isRequired,
  listboxId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onActiveIndexChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default AlumnoSearchInput;
