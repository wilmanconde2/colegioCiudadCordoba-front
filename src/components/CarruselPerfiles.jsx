import PropTypes from 'prop-types';

export const CarruselPerfiles = ({ images, currentImageIndex, backgroundColor }) => {
  return (
    <div className='backgroundContainerPerfiles' style={{ backgroundColor }}>
      {images.map((image, index) => (
        <div
          key={image}
          className={`imageWrapperPerfiles ${index === currentImageIndex ? 'active' : ''}`}
        >
          <img src={image} alt={`background-${index}`} />
        </div>
      ))}
    </div>
  );
};


CarruselPerfiles.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
};
