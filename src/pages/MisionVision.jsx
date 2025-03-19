import useTitulo from '../hooks/useTitulo';

const MisionVision = () => {
  useTitulo('Misión y Visión');

  return (
    <>
      <div className='fullContainer'>
        <div>
          <img className='imagen' src='/mision.webp' alt='imagen' />
        </div>
        <div className='container'>
          <h1>Misión</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, est eu vehicula fermentum, nunc
            libero vehicula tortor, in efficitur arcu odio id erat. Nullam vehicula, est eu vehicula fermentum, nunc
            libero vehicula tortor, in efficitur arcu odio id erat. Nullam vehicula, est eu vehicula fermentum, nunc
            libero vehicula tortor, in efficitur arcu odio id erat.
          </p>

          <h1>Visión</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, est eu vehicula fermentum, nunc
            libero vehicula tortor, in efficitur arcu odio id erat. Nullam vehicula, est eu vehicula fermentum, nunc
            libero vehicula tortor, in efficitur arcu odio id erat. Nullam vehicula, est eu vehicula fermentum, nunc
            libero vehicula tortor, in efficitur arcu odio id erat.
          </p>
        </div>
      </div>
    </>
  );
};

export default MisionVision;
