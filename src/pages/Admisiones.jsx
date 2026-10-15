import { useId, useMemo, useRef, useState } from 'react';
import useTitulo from '../hooks/useTitulo';
import { ROUTE_METADATA } from '../constants/seo';
import { loadAdmitidos } from '../utils/loadAdmitidos';
import {
  filterAdmitidos,
  MIN_ADMISSIONS_QUERY_LENGTH,
  normalizeAdmissionsText,
} from '../utils/admisionesUtils';

const Admisiones = () => {
  useTitulo(ROUTE_METADATA['/admisiones'].title, ROUTE_METADATA['/admisiones'].description);

  const listboxId = useId();
  const loadingRef = useRef(false);
  const [admitidos, setAdmitidos] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [listDismissed, setListDismissed] = useState(false);

  const normalizedQuery = normalizeAdmissionsText(query);
  const canSearch =
    normalizedQuery.replace(/\s/g, '').length >= MIN_ADMISSIONS_QUERY_LENGTH;
  const matches = useMemo(() => filterAdmitidos(admitidos, query), [admitidos, query]);
  const isListboxOpen = canSearch && matches.length > 0 && !selected && !listDismissed;
  const showNoResults = canSearch && hasLoaded && !loading && !error && !matches.length && !selected;

  async function ensureLoaded() {
    if (hasLoaded || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError('');

    try {
      setAdmitidos(await loadAdmitidos());
      setHasLoaded(true);
    } catch {
      setError('No fue posible consultar el listado. Intenta nuevamente.');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  function updateQuery(value) {
    setQuery(value);
    setSelected(null);
    setActiveIndex(-1);
    setListDismissed(false);
    setError('');

    if (
      normalizeAdmissionsText(value).replace(/\s/g, '').length >=
      MIN_ADMISSIONS_QUERY_LENGTH
    ) {
      void ensureLoaded();
    }
  }

  function selectAdmitido(admitido) {
    setSelected(admitido);
    setQuery(admitido.nombreCompleto);
    setActiveIndex(-1);
    setListDismissed(true);
  }

  function clearSearch() {
    setQuery('');
    setSelected(null);
    setError('');
    setActiveIndex(-1);
    setListDismissed(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape' && isListboxOpen) {
      event.preventDefault();
      setListDismissed(true);
      setActiveIndex(-1);
      return;
    }

    if (!matches.length || selected) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setListDismissed(false);
      setActiveIndex((current) => (current + 1) % matches.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setListDismissed(false);
      setActiveIndex((current) => (current <= 0 ? matches.length - 1 : current - 1));
    } else if (event.key === 'Enter' && isListboxOpen && activeIndex >= 0) {
      event.preventDefault();
      selectAdmitido(matches[activeIndex]);
    }
  }

  return (
    <section className='admisionesPage' aria-labelledby='admisiones-title'>
      <div className='admisionesPage__intro'>
        <p className='admisionesPage__eyebrow'>Admisiones 2027</p>
        <h1 id='admisiones-title'>Consulta de admitidos</h1>
      </div>

      <div className='admisionesSearch'>
        <label htmlFor='admisiones-search'>Buscar estudiante</label>
        <div className='admisionesSearch__field'>
          <input
            id='admisiones-search'
            type='search'
            role='combobox'
            aria-autocomplete='list'
            aria-expanded={isListboxOpen}
            aria-controls={listboxId}
            aria-activedescendant={
              activeIndex >= 0 && isListboxOpen
                ? `${listboxId}-option-${activeIndex}`
                : undefined
            }
            autoComplete='off'
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            onFocus={() => {
              if (canSearch) void ensureLoaded();
            }}
            onKeyDown={handleKeyDown}
            placeholder='nombres o apellidos'
          />

          {isListboxOpen && (
            <div id={listboxId} className='admisionesSearch__options' role='listbox' aria-label='Estudiantes admitidos encontrados'>
              {matches.map((admitido, index) => (
                <button
                  id={`${listboxId}-option-${index}`}
                  key={`${admitido.nombreCompleto}\u0000${admitido.grado}\u0000${admitido.observacion}`}
                  type='button'
                  role='option'
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? 'is-active' : ''}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectAdmitido(admitido)}
                >
                  <span>{admitido.nombreCompleto}</span>
                  <small>Grado {admitido.grado}</small>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='admisionesSearch__status' aria-live='polite'>
          {loading && <p>Cargando listado de admitidos…</p>}
          {error && <p className='admisionesSearch__error'>{error}</p>}
          {showNoResults && <p>No se encontraron coincidencias para la búsqueda.</p>}
          {!loading && !error && canSearch && matches.length > 0 && !selected && (
            <p>{matches.length} {matches.length === 1 ? 'coincidencia encontrada' : 'coincidencias encontradas'}.</p>
          )}
        </div>

        <button
          className='btn btn-primary admisionesSearch__clear'
          type='button'
          onClick={clearSearch}
          disabled={!query && !selected && !error}
        >
          Limpiar búsqueda
        </button>
      </div>

      {selected && (
        <article className='admisionesResult' aria-labelledby='admisiones-result-title'>
          <h2 id='admisiones-result-title'>Resultado de la consulta</h2>
          <dl>
            <div>
              <dt>Nombre completo</dt>
              <dd>{selected.nombreCompleto}</dd>
            </div>
            <div>
              <dt>Grado</dt>
              <dd>{selected.grado}</dd>
            </div>
            <div>
              <dt>Observación</dt>
              <dd>{selected.observacion || 'Sin observación registrada.'}</dd>
            </div>
          </dl>
          <p className='admisionesResult__contactNote'>
            <strong>NOTA:</strong> Si tienes dudas, contáctanos al{' '}
            <a href='tel:+573104280125'>3104280125</a> o escríbenos por{' '}
            <a
              href='https://wa.me/573104280125'
              target='_blank'
              rel='noopener noreferrer'
            >
              WhatsApp
            </a>
            .
          </p>
        </article>
      )}
    </section>
  );
};

export default Admisiones;
