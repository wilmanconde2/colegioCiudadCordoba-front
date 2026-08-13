// src/components/Carrusel.jsx

import PropTypes from 'prop-types';

export const Carrusel = ({ images, currentImageIndex }) => (
  <div className='backgroundContainer'>
    {images.map((img, index) => {
      const src = typeof img === 'string' ? img : img.src;
      const srcSet = typeof img === 'string' ? undefined : img.srcSet;
      const sizes = typeof img === 'string' ? '100vw' : img.sizes || '100vw';
      const alt =
        typeof img === 'string' ? `background-${index}` : img.alt || `background-${index}`;
      const width = typeof img === 'string' ? undefined : img.width;
      const height = typeof img === 'string' ? undefined : img.height;
      return (
        <div key={src} className={`imageWrapper ${index === currentImageIndex ? 'active' : ''}`}>
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={index === currentImageIndex ? 'eager' : 'lazy'}
            decoding='async'
          />
        </div>
      );
    })}
  </div>
);


Carrusel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        srcSet: PropTypes.string,
        sizes: PropTypes.string,
        alt: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    ]),
  ).isRequired,
  currentImageIndex: PropTypes.number.isRequired,
};
