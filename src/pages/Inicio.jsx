import React, { useState, useEffect } from 'react';
import useTitulo from '../hooks/useTitulo';
import Formulario from '../components/Formulario';

const Inicio = () => {
  useTitulo('Inicio');

  const images = [
    '/background1.webp',
    '/background2.webp',
    '/background3.webp',
    '/background4.webp',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className='fullContainer'>
      {/* Fondo con carrusel de imágenes */}
      <div className='backgroundContainer'>
        {images.map((image, index) => (
          <div
            key={index}
            className={`imageWrapper ${index === currentImageIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`background-${index}`} />
          </div>
        ))}
      </div>

      {/* Texto principal */}
      <div className='backgroundContainerText'>
        <h1>Paz - Progreso - Futuro</h1>
        <h2>
          ¡Una comunidad acogedora que inspira posibilidades, conecta personas y estimula el
          aprendizaje!
        </h2>
      </div>

      <Formulario />

      {/* Circular principal con PDF embebido */}
      <div className='card circular'>
        <div className='card-body'>
          <img src='/circular.webp' className='card-img-top' alt='...' />
          <h5 className='card-title'>Circular Informativa</h5>
          <p className='card-text'>
            Ya está disponible la última Circular Informativa con novedades académicas y
            administrativas. Puedes visualizar o descargar el documento a continuación.
          </p>
          <div className='boton'>
            <a
              href='#' //TODO enlace carpeta circular
              className='btn btn-primary'
              target='_blank'
              rel='noopener noreferrer'
            >
              Descargar
            </a>
          </div>
        </div>
      </div>

      <div className='reporteAcademico'>Reporte académico</div>
      <div className='recuperacion'>Recuperación</div>
      <div className='actividadesRecuperacion'>Actividades de recuperación</div>
    </div>
  );
};

export default Inicio;
