export const Carrusel = ({ images, currentImageIndex }) => (
  <div className='backgroundContainer'>
    {images.map((image, index) => (
      <div key={index} className={`imageWrapper ${index === currentImageIndex ? 'active' : ''}`}>
        <img src={image} alt={`background-${index}`} />
      </div>
    ))}
  </div>
);
