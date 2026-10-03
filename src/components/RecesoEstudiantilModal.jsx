import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

const RecesoEstudiantilModal = ({ open, onClose }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusableElements?.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
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

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      className='receso-modal'
      role='dialog'
      aria-modal='true'
      aria-label='Receso estudiantil del 5 al 9 de octubre de 2026'
      tabIndex='-1'
    >
      <div className='receso-modal__panel'>
        <button
          ref={closeButtonRef}
          type='button'
          className='receso-modal__close'
          onClick={onClose}
          aria-label='Cerrar aviso de receso estudiantil'
        >
          <span aria-hidden='true'>×</span>
        </button>

        <img
          className='receso-modal__image'
          src='/receso-estudiantil-octubre-2026.png'
          alt='Comunicado institucional: receso estudiantil del 5 al 9 de octubre de 2026'
          draggable='false'
        />
      </div>
    </div>
  );
};

RecesoEstudiantilModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecesoEstudiantilModal;
