export const Carrusel = ({ images, currentImageIndex }) => (
  <div className='backgroundContainer'>
    {images.map((img, index) => {
      const src = typeof img === 'string' ? img : img.src;
      const srcSet = typeof img === 'string' ? undefined : img.srcSet;
      const sizes = typeof img === 'string' ? '100vw' : img.sizes || '100vw';
      const alt =
        typeof img === 'string' ? `background-${index}` : img.alt || `background-${index}`;
      return (
        <div key={index} className={`imageWrapper ${index === currentImageIndex ? 'active' : ''}`}>
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            loading={index === currentImageIndex ? 'eager' : 'lazy'}
            decoding='async'
          />
        </div>
      );
    })}
  </div>
);
