import { useEffect, useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export function NativeLinkDisclosure({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePointer = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [isOpen]);

  const closeAndRestoreFocus = () => {
    setIsOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      className='native-link-disclosure'
      ref={containerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (isOpen && event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          closeAndRestoreFocus();
        }
      }}
    >
      <button
        ref={buttonRef}
        id={`${id}-button`}
        type='button'
        className='native-link-disclosure__button'
        aria-expanded={isOpen}
        aria-controls={`${id}-links`}
        aria-describedby={`${id}-hint`}
        onClick={() => setIsOpen((open) => !open)}
      >
        {label} <span aria-hidden='true'>{isOpen ? '▴' : '▾'}</span>
      </button>
      <span id={`${id}-hint`} className='visually-hidden'>
        Cada grado abre su recurso en una pestaña nueva.
      </span>
      <ul
        id={`${id}-links`}
        className='native-link-disclosure__links'
        aria-labelledby={`${id}-button`}
        hidden={!isOpen}
      >
        {options.map(({ label: optionLabel, value }) => (
          <li key={value}>
            {/* Explicit zero keeps links in WebKit's restricted Tab traversal, in DOM order. */}
            <a href={value} target='_blank' rel='noopener noreferrer' tabIndex={0} onClick={closeAndRestoreFocus}>
              {optionLabel}<span className='visually-hidden'> (abre en una pestaña nueva)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

NativeLinkDisclosure.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};
