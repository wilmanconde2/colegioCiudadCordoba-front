import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Matricula2027Modal({ onClose }) {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const root = document.getElementById('root');
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previousInert = root?.inert;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const currentPadding = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }
    if (root) root.inert = true;
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = document.querySelector('.Matricula2027Modal__dialog')
        ?.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
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

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      if (root) root.inert = previousInert;
      if (previousFocusRef.current?.isConnected) previousFocusRef.current.focus();
    };
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className='Matricula2027Modal__backdrop'>
      <section
        className='Matricula2027Modal__dialog'
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <h2 id={titleId} className='visually-hidden'>Matrículas 2027</h2>
        <p id={descriptionId} className='visually-hidden'>
          Información de matrículas 2027: valor ordinario, fechas para primaria y bachillerato
          privados, y matrícula extraordinaria con recargo, según el aviso institucional.
        </p>
        <button
          ref={closeButtonRef}
          className='Matricula2027Modal__close'
          type='button'
          aria-label='Cerrar información de matrículas 2027'
          onClick={onClose}
        >
          <span aria-hidden='true'>×</span>
        </button>
        <img
          className='Matricula2027Modal__poster'
          src='/matricula2027-v2.png'
          alt=''
          width='1448'
          height='1086'
          decoding='async'
          fetchPriority='high'
        />
      </section>
    </div>,
    document.body,
  );
}
