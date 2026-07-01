// src/components/BuscadorCursoCard.jsx

import { useMemo, useRef, useState } from 'react';
import ModalInfoCurso from './ModalInfoCurso';
import { loadAlumnos } from '../utils/loadAlumnos';

function normalizeText(str = '') {
  return str
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function BuscadorCursoCard() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadedOnceRef = useRef(false);

  async function loadExcelOnce() {
    if (loadedOnceRef.current) return;
    loadedOnceRef.current = true;

    setLoading(true);
    setError('');

    try {
      const parsed = await loadAlumnos();

      const filteredParsed = parsed.filter((a) => a.nombreCompleto && a.curso);

      setAlumnos(filteredParsed);
    } catch (e) {
      setError(e?.message || 'Error leyendo el listado de alumnos.');
      loadedOnceRef.current = false;
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const q = normalizeText(query);

    if (!q) return [];

    return alumnos.filter((a) => normalizeText(a.nombreCompleto).includes(q)).slice(0, 8);
  }, [query, alumnos]);

  const cursoDetectado = selected?.cursoKey || '';
  const canOpenModal = !!cursoDetectado;

  return (
    <>
      <section className='BuscadorCursoCard'>
        <div className='BuscadorCursoCard__card'>
          <div className='BuscadorCursoCard__header'>
            <h2>INFORMACIÓN GENERAL 2.026 POR SALÓN</h2>
            <p>Escribe nombre o apellido y selecciona el estudiante.</p>
          </div>

          <div className='BuscadorCursoCard__search'>
            <input
              type='text'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
              }}
              onFocus={loadExcelOnce}
              placeholder='Ej: Emiliano Aguirre'
              aria-label='Buscar estudiante'
              autoComplete='off'
            />

            {loading && <span className='BuscadorCursoCard__hint'>Cargando alumnos…</span>}
            {error && <span className='BuscadorCursoCard__error'>{error}</span>}

            {!!filtered.length && !selected && (
              <div className='BuscadorCursoCard__dropdown' role='listbox'>
                {filtered.map((a) => (
                  <button
                    key={`${a.nombreCompleto}-${a.curso}`}
                    type='button'
                    className='BuscadorCursoCard__option'
                    onClick={() => {
                      setSelected(a);
                      setQuery(a.nombreCompleto);
                    }}
                  >
                    <span className='name'>{a.nombreCompleto}</span>
                    <span className='course'>{a.curso}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className='BuscadorCursoCard__result'>
            {!selected ? (
              <div className='BuscadorCursoCard__empty'>
                <strong>Resultado:</strong> aún no has seleccionado un estudiante.
              </div>
            ) : (
              <div className='BuscadorCursoCard__found'>
                <div className='BuscadorCursoCard__foundInfo'>
                  <strong className='BuscadorCursoCard__studentName'>
                    {selected.nombreCompleto}
                  </strong>

                  <div className='BuscadorCursoCard__meta'>
                    <span>Curso:</span> <span className='badge'>{selected.curso}</span>
                  </div>
                </div>

                <div className='BuscadorCursoCard__foundAction'>
                  <button
                    className='BuscadorCursoCard__cta'
                    type='button'
                    onClick={() => setIsModalOpen(true)}
                    disabled={!canOpenModal}
                    title={!canOpenModal ? 'Selecciona un estudiante para ver los recursos' : ''}
                  >
                    Ver información del curso
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <ModalInfoCurso
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alumno={selected}
        curso={cursoDetectado}
      />
    </>
  );
}
