// src/components/PageLoader.jsx

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const RouteLoadingOverlay = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 250);

    return () => clearTimeout(timeout);
  }, []);

  if (!loading) return null;

  return (
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
  );
};

const PageLoader = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <RouteLoadingOverlay key={location.pathname} />
      {children}
    </>
  );
};

PageLoader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLoader;
