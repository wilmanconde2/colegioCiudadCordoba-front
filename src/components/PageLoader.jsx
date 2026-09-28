// src/components/PageLoader.jsx

import { ClipLoader } from 'react-spinners';

const PageLoader = () => {
  return (
    <div
      role='status'
      aria-live='polite'
      aria-label='Cargando página'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        zIndex: 1000,
      }}
    >
      <ClipLoader color='#36d7b7' size={60} />
      <span className='visually-hidden'>Cargando página…</span>
    </div>
  );
};

export default PageLoader;
