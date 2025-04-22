export const CarruselPerfiles = ({ images, currentImageIndex, backgroundColor }) => {
  return (
    <div className='backgroundContainerPerfiles' style={{ backgroundColor }}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`imageWrapperPerfiles ${index === currentImageIndex ? 'active' : ''}`}
        >
          <img src={image} alt={`background-${index}`} />
        </div>
      ))}
    </div>
  );
};
