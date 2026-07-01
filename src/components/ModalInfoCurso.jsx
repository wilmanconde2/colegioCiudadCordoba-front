// front/src/components/ModalInfoCurso.jsx
import { useEffect, useMemo, useState } from 'react';
import {
  IMG_INFO_GENERAL,
  VIDEOS_POR_CURSO,
  CLOUDINARY_IMG_TRANSFORM,
} from '../constants/recursosCursos';

function buildCloudinaryBestUrl(rawUrl) {
  if (!rawUrl) return '';
  if (!rawUrl.includes('/upload/')) return rawUrl;
  return rawUrl.replace('/upload/', `/upload/${CLOUDINARY_IMG_TRANSFORM}/`);
}

// Convierte links típicos de Drive a formato embebible /preview
function normalizeVideoUrl(url) {
  if (!url || url === '#') return '';
  const u = String(url).trim();

  if (u.includes('drive.google.com') && u.includes('/preview')) return u;

  const m1 = u.match(/drive\.google\.com\/file\/d\/([^/]+)\//i);
  if (m1?.[1]) return `https://drive.google.com/file/d/${m1[1]}/preview`;

  const m2 = u.match(/drive\.google\.com\/uc\?id=([^&]+)/i);
  if (m2?.[1]) return `https://drive.google.com/file/d/${m2[1]}/preview`;

  const m3 = u.match(/drive\.google\.com\/open\?id=([^&]+)/i);
  if (m3?.[1]) return `https://drive.google.com/file/d/${m3[1]}/preview`;

  return u;
}

const HORARIOS_ALUMNOS = {
  primaria: {
    label: 'Horario Primaria',
    rawUrl: '/horarioPrimaria.webp',
    title: 'Horario Primaria',
  },
  bachillerato: {
    label: 'Horario Bachillerato',
    rawUrl: '/horarioSecundaria.webp',
    title: 'Horario Bachillerato',
  },
};

const GOOGLE_FORM_URL = 'https://forms.gle/c5ZpYPmrNSTnczn49';

export default function ModalInfoCurso({ open, onClose, alumno, curso }) {
  const [tab, setTab] = useState('general');
  const [horarioSel, setHorarioSel] = useState(null);

  useEffect(() => {
    if (!open) return;
    setTab('general');
    setHorarioSel(null);
  }, [open]);

  useEffect(() => {
    if (tab === 'horarios') setHorarioSel(null);
  }, [tab]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const profesorTitular = alumno?.profesor?.trim?.() || '';
  const videoRaw = curso ? VIDEOS_POR_CURSO[curso] : '';
  const videoUrl = normalizeVideoUrl(videoRaw);

  const content = useMemo(() => {
    if (tab === 'general') {
      return {
        type: 'image',
        rawUrl: IMG_INFO_GENERAL,
        url: buildCloudinaryBestUrl(IMG_INFO_GENERAL),
        title: 'Información general',
      };
    }

    if (tab === 'horarios') {
      if (!horarioSel) return { type: 'pick-horario', title: 'Horarios' };
      const opt = HORARIOS_ALUMNOS[horarioSel];
      return { type: 'image', rawUrl: opt.rawUrl, url: opt.rawUrl, title: opt.title };
    }

    if (tab === 'video') {
      if (!videoUrl) return { type: 'empty', msg: 'No hay video configurado para este curso.' };
      return { type: 'iframe', url: videoUrl, title: 'Video informativo del curso' };
    }

    return { type: 'empty', msg: 'Contenido no disponible.' };
  }, [tab, videoUrl, horarioSel]);

  if (!open) return null;

  return (
    <div className='ModalCursos' role='dialog' aria-modal='true'>
      <div className='ModalCursos__backdrop' onClick={onClose} />

      <div className='ModalCursos__panel' onClick={(e) => e.stopPropagation()}>
        <div className='ModalCursos__header'>
          <div className='ModalCursos__headerLeft'>
            {alumno?.nombreCompleto && (
              <strong className='ModalCursos__studentName'>{alumno.nombreCompleto}</strong>
            )}
            {curso && <div className='ModalCursos__course'>{curso}</div>}
          </div>

          <div className='ModalCursos__teacherBox' title='Profesor titular'>
            <div className='ModalCursos__teacherLabel'>PROFESOR TITULAR</div>
            <div className='ModalCursos__teacherName'>
              {profesorTitular ? profesorTitular : 'Por asignar'}
            </div>
          </div>

          <button className='ModalCursos__close' onClick={onClose} aria-label='Cerrar'>
            ✕
          </button>
        </div>

        <div className='ModalCursos__tabs'>
          <button
            type='button'
            className={`ModalCursos__tab ${tab === 'general' ? 'is-active' : ''}`}
            onClick={() => setTab('general')}
          >
            1. Ver información general
          </button>

          <button
            type='button'
            className={`ModalCursos__tab ${tab === 'horarios' ? 'is-active' : ''}`}
            onClick={() => setTab('horarios')}
          >
            2. Ver horarios de atención de profesores
          </button>

          <button
            type='button'
            className={`ModalCursos__tab ${tab === 'video' ? 'is-active' : ''}`}
            onClick={() => setTab('video')}
          >
            3. Ver video informativo del curso
          </button>
        </div>

        <div className='ModalCursos__bodySingle'>
          {tab === 'horarios' && (
            <div className='ModalCursos__horariosPicker'>
              <button
                type='button'
                className={`ModalCursos__horarioBtn ${horarioSel === 'primaria' ? 'is-active' : ''}`}
                onClick={() => setHorarioSel('primaria')}
              >
                {HORARIOS_ALUMNOS.primaria.label}
              </button>

              <button
                type='button'
                className={`ModalCursos__horarioBtn ${
                  horarioSel === 'bachillerato' ? 'is-active' : ''
                }`}
                onClick={() => setHorarioSel('bachillerato')}
              >
                {HORARIOS_ALUMNOS.bachillerato.label}
              </button>
            </div>
          )}

          {content.type === 'empty' ? (
            <div className='ModalCursos__empty'>{content.msg}</div>
          ) : content.type === 'iframe' ? (
            <div>
              <div
                style={{
                  width: '82%',
                  maxWidth: '720px',
                  margin: '0 auto',
                  aspectRatio: '16 / 9',
                  maxHeight: '45vh',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#000',
                }}
              >
                <iframe
                  title={content.title}
                  src={content.url}
                  allow='autoplay; encrypted-media; fullscreen; picture-in-picture'
                  allowFullScreen
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          ) : content.type === 'pick-horario' ? (
            <div className='ModalCursos__empty'>
              Selecciona una opción: Primaria o Bachillerato.
            </div>
          ) : (
            <div style={{ maxHeight: '70vh', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
              {/* CTA movido: solo se muestra en "Información general" */}
              {tab === 'general' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 12,
                    marginBottom: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <div className='confirmar' style={{ fontWeight: 600 }}>Recuerda confirmar asistencia:</div>

                  <a
                    href={GOOGLE_FORM_URL}
                    target='_blank'
                    rel='noreferrer'
                    className='BuscadorCursoCard__cta'
                    style={{
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Confirmar Asistencia Aquí
                  </a>
                </div>
              )}

              <a
                className='abrirFull'
                href={content.rawUrl}
                target='_blank'
                rel='noreferrer'
                style={{ display: 'inline-block', marginBottom: 10 }}
                aria-label='Abrir en tamaño completo'
                title='Abrir en tamaño completo'
              >
                Abrir en tamaño completo
              </a>

              <img
                src={content.url}
                alt={content.title}
                loading='lazy'
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
