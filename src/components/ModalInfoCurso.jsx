// front/src/components/ModalInfoCurso.jsx
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { VIDEOS_POR_CURSO } from '../constants/recursosCursos';
import CursoInfoContent from './modal-info-curso/CursoInfoContent';
import { MODAL_TABS } from './modal-info-curso/modalInfoCursoData';
import {
  getModalContent,
  normalizeVideoUrl,
} from './modal-info-curso/modalInfoCursoUtils';

export default function ModalInfoCurso({ open, onClose, alumno, curso }) {
  const [tab, setTab] = useState('general');
  const [horarioSel, setHorarioSel] = useState(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const titleId = useId();

  function handleTabChange(nextTab) {
    setTab(nextTab);
    if (nextTab === 'horarios') setHorarioSel(null);
  }

  useEffect(() => {
    if (!open) return undefined;

    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    function onKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const profesorTitular = alumno?.profesor?.trim?.() || '';
  const videoUrl = normalizeVideoUrl(curso ? VIDEOS_POR_CURSO[curso] : '');
  const content = useMemo(
    () => getModalContent({ horarioSel, tab, videoUrl }),
    [horarioSel, tab, videoUrl],
  );

  if (!open) return null;

  return (
    <div className='ModalCursos' role='dialog' aria-modal='true' aria-labelledby={titleId}>
      <div className='ModalCursos__backdrop' aria-hidden='true' onClick={onClose} />

      <div ref={panelRef} className='ModalCursos__panel' onClick={(event) => event.stopPropagation()}>
        <div className='ModalCursos__header'>
          <div className='ModalCursos__headerLeft'>
            <strong id={titleId} className='ModalCursos__studentName'>
              {alumno?.nombreCompleto || 'Información del curso'}
            </strong>
            {curso && <div className='ModalCursos__course'>{curso}</div>}
          </div>

          <div className='ModalCursos__teacherBox' title='Profesor titular'>
            <div className='ModalCursos__teacherLabel'>PROFESOR TITULAR</div>
            <div className='ModalCursos__teacherName'>
              {profesorTitular ? profesorTitular : 'Por asignar'}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type='button'
            className='ModalCursos__close'
            onClick={onClose}
            aria-label='Cerrar información del curso'
          >
            ✕
          </button>
        </div>

        <div className='ModalCursos__tabs'>
          {MODAL_TABS.map((tabOption) => (
            <button
              key={tabOption.id}
              type='button'
              className={`ModalCursos__tab ${tab === tabOption.id ? 'is-active' : ''}`}
              onClick={() => handleTabChange(tabOption.id)}
            >
              {tabOption.label}
            </button>
          ))}
        </div>

        <CursoInfoContent
          content={content}
          horarioSel={horarioSel}
          onHorarioChange={setHorarioSel}
          tab={tab}
        />
      </div>
    </div>
  );
}

ModalInfoCurso.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  alumno: PropTypes.shape({
    nombreCompleto: PropTypes.string,
    profesor: PropTypes.string,
  }),
  curso: PropTypes.string,
};
