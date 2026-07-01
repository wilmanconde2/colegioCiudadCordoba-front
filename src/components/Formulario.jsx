// src/components/Formulario.jsx

import { useMemo, useRef, useState } from 'react';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import { loadAlumnos } from '../utils/loadAlumnos';

function normalizeText(str = '') {
  return str
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const FORM_CONFIG = {
  codigo: {
    legend: 'Solicitud Código Estudiantil',
    label: 'Buscar estudiante:',
    placeholder: 'Ej: Thiago Conde',
    resultTitle: 'Código del Estudiante:',
    copyMessage: 'Código copiado al portapapeles',
    missingMessage: 'No se encontró el código en el JSON para este estudiante.',
  },
  mensualidad: {
    legend: 'Consulta de Mensualidad',
    label: 'Buscar estudiante:',
    placeholder: 'Ej: Thiago Conde',
    resultTitle: 'Código del Estudiante:',
    copyMessage: 'Código copiado al portapapeles',
    missingMessage: 'No se encontró el código en el JSON para este estudiante.',
  },
};

const Formulario = ({ typeSearch = 'codigo' }) => {
  const currentConfig = FORM_CONFIG[typeSearch] || FORM_CONFIG.codigo;

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  const loadedOnceRef = useRef(false);

  async function loadAlumnosOnce() {
    if (loadedOnceRef.current) return;
    loadedOnceRef.current = true;

    setLoading(true);
    setError('');

    try {
      const parsed = await loadAlumnos();
      setAlumnos(parsed);
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

    return alumnos.filter((a) => normalizeText(a.nombreCompleto).includes(q)).slice(0, 10);
  }, [query, alumnos]);

  const codigo = selected?.codigo || '';

  const onClear = () => {
    setQuery('');
    setSelected(null);
    setError('');
  };

  const copyCodigo = async () => {
    if (!codigo) return;

    try {
      await navigator.clipboard.writeText(codigo);
      toast.success(currentConfig.copyMessage);
    } catch {
      toast.info('No se pudo copiar automáticamente. Copia el código manualmente.');
    }
  };

  return (
    <div className='containerForm'>
      <form className='studentCode' onSubmit={(e) => e.preventDefault()}>
        <legend>{currentConfig.legend}</legend>

        <label className='Formulario__label' htmlFor='studentSearch'>
          {currentConfig.label}
        </label>

        <div className='Formulario__searchWrap'>
          <input
            id='studentSearch'
            className='Formulario__input'
            type='text'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            onFocus={loadAlumnosOnce}
            placeholder={currentConfig.placeholder}
            aria-label='Buscar estudiante'
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

          {!!filtered.length && !selected && (
            <div className='Formulario__dropdown' role='listbox'>
              {filtered.map((a) => (
                <button
                  key={`${a.nombreCompleto}-${a.curso}-${a.codigo || 'sin-codigo'}`}
                  type='button'
                  className='Formulario__option'
                  onClick={() => {
                    setSelected(a);
                    setQuery(a.nombreCompleto);

                    if (a.codigo) {
                      toast.success(`Código del estudiante: ${a.codigo}`);
                    } else {
                      toast.error('Estudiante encontrado, pero no hay código en el JSON.');
                    }
                  }}
                >
                  <span className='Formulario__optionName'>{a.nombreCompleto}</span>
                  <span className='Formulario__optionCourse'>{a.curso}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className='btn-form Formulario__btnClear'
          type='button'
          onClick={onClear}
          disabled={loading}
        >
          Limpiar
        </button>

        {selected && (
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
                <strong className='Formulario__codeTitle'>{currentConfig.resultTitle}</strong>
                <p className='Formulario__codeValue'>{codigo}</p>

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

                <button className='btn-form' type='button' onClick={copyCodigo}>
                  Copiar código
                </button>
              </>
            ) : (
              <span className='error'>{currentConfig.missingMessage}</span>
            )}
          </div>
        )}
      </form>

      <div className='payOnline'>
        <div className='pse'>
          <div className='captionPSE'>
            <p>¿Cómo pagar por PSE?</p>
            <video
              className='videoPSE'
              src='/PSE.mp4'
              poster='/PSE-Cover.webp'
              controls
              playsInline
            >
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </div>

        <div className='imagenPse'>
          <a
            href='https://www.avalpaycenter.com/wps/portal/portal-de-pagos/web/pagos-aval/resultado-busqueda/realizar-pago?idConv=00024146&origen=buscar'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='/pse.webp' alt='pse' className='pseCostos' />
          </a>
          <img className='codigoQR' src='/codigoQR.webp' alt='codigoQR' />
        </div>

        <h2>Paga en Línea</h2>
        <p>
          Realiza tu pago de manera rápida y segura dando click{' '}
          <a
            href='https://www.avalpaycenter.com/wps/portal/portal-de-pagos/web/pagos-aval/resultado-busqueda/realizar-pago?idConv=00024146&origen=buscar'
            target='_blank'
            rel='noopener noreferrer'
          >
            AQUÍ
          </a>
          <br />
          <em>¡Recuerda tener el código del estudiante a la mano!</em>
        </p>
      </div>

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Zoom}
      />
    </div>
  );
};

export default Formulario;
