import { useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { loadAlumnos } from '../../utils/loadAlumnos';
import { filterAlumnos } from './formularioUtils';

export function useAlumnoSearch(currentConfig) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [listDismissed, setListDismissed] = useState(false);
  const loadedOnceRef = useRef(false);
  const filtered = useMemo(() => filterAlumnos(alumnos, query), [alumnos, query]);
  const codigo = selected?.codigo || '';
  const isListboxOpen = filtered.length > 0 && !selected && !listDismissed;

  async function loadAlumnosOnce() {
    if (loadedOnceRef.current) return;
    loadedOnceRef.current = true;
    setLoading(true);
    setError('');
    try {
      setAlumnos(await loadAlumnos());
    } catch (loadError) {
      setError(loadError?.message || 'Error leyendo el listado de alumnos.');
      loadedOnceRef.current = false;
    } finally {
      setLoading(false);
    }
  }

  function updateQuery(value) {
    setQuery(value);
    setSelected(null);
    setActiveIndex(-1);
    setListDismissed(false);
  }

  function selectAlumno(alumno) {
    setSelected(alumno);
    setQuery(alumno.nombreCompleto);
    setActiveIndex(-1);
    setListDismissed(true);
    if (alumno.codigo) toast.success(`Código del estudiante: ${alumno.codigo}`);
    else toast.error('Estudiante encontrado, pero no hay código en el JSON.');
  }

  function clearSelection() {
    setQuery('');
    setSelected(null);
    setError('');
    setActiveIndex(-1);
    setListDismissed(false);
  }

  function handleSearchKeyDown(event) {
    if (event.key === 'Escape' && isListboxOpen) {
      event.preventDefault();
      setListDismissed(true);
      setActiveIndex(-1);
      return;
    }
    if (!filtered.length || selected) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setListDismissed(false);
      setActiveIndex((current) => (current + 1) % filtered.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setListDismissed(false);
      setActiveIndex((current) => (current <= 0 ? filtered.length - 1 : current - 1));
    } else if (event.key === 'Enter' && isListboxOpen && activeIndex >= 0) {
      event.preventDefault();
      selectAlumno(filtered[activeIndex]);
    }
  }

  async function copyCodigo() {
    if (!codigo) return;
    try {
      await navigator.clipboard.writeText(codigo);
      toast.success(currentConfig.copyMessage);
    } catch {
      toast.info('No se pudo copiar automáticamente. Copia el código manualmente.');
    }
  }

  return {
    activeIndex,
    clearSelection,
    codigo,
    copyCodigo,
    error,
    filtered,
    handleSearchKeyDown,
    isListboxOpen,
    loadAlumnosOnce,
    loading,
    query,
    selectAlumno,
    selected,
    setActiveIndex,
    updateQuery,
  };
}
