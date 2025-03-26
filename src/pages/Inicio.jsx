import React, { useState, useEffect } from 'react';
import useTitulo from '../hooks/useTitulo';
import Formulario from '../components/Formulario';

const Inicio = () => {
  useTitulo('Inicio');

  const images = ['/background1.webp', '/background2.webp', '/background3.webp', '/background4.webp'];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000 ms = 5 segundos

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className='fullContainer'>
      <div className='backgroundContainer'>
        {images.map((image, index) => (
          <div key={index} className={`imageWrapper ${index === currentImageIndex ? 'active' : ''}`}>
            <img src={image} alt={`background-${index}`} />
          </div>
        ))}
      </div>

      <div className='backgroundContainerText'>
        <h1>Paz - Progreso - Futuro</h1>
        <h2>¡Una comunidad acogedora que inspira posibilidades, conecta personas y estimula el aprendizaje!</h2>
      </div>

      <Formulario />

      <div className='circular'>Circular principal</div>
      <div className='reporteAcademico'>Reporte académico</div>
      <div className='recuperacion'>Recuperación</div>
      <div className='actividadesRecuperacion'>Actividades de recuperación</div>
    </div>
  );
};

export default Inicio;
