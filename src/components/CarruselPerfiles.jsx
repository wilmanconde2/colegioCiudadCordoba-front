import PropTypes from 'prop-types';

export const CarruselPerfiles = ({ images, currentImageIndex, backgroundColor }) => {
  return (
    <div className='backgroundContainerPerfiles' style={{ backgroundColor }}>
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`imageWrapperPerfiles ${index === currentImageIndex ? 'active' : ''}`}
        >
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.sizes}
            alt={image.alt || `background-${index}`}
            loading={index === currentImageIndex ? 'eager' : 'lazy'}
            decoding='async'
          />
        </div>
      ))}
    </div>
  );
};

CarruselPerfiles.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string,
      sizes: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
};
