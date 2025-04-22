import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const PageLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mostrar loader al cambiar de ruta
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 250); // duración del loader

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <div
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
        </div>
      )}
      {children}
    </>
  );
};

export default PageLoader;
