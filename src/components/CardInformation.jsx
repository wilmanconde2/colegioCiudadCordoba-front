function getImgProps(imagen, { alt, width, height } = {}) {
  if (!imagen) return null;
  if (typeof imagen === 'string') {
    return { src: imagen, alt: alt || 'imagen', width, height };
  }
  const { src, srcSet, sizes, width: w, height: h, alt: a } = imagen;
  return {
    src,
    srcSet,
    sizes,
    alt: a || alt || 'imagen',
    width: w || width,
    height: h || height,
  };
}

export function CardInformation({
  className = '',
  titulo,
  imagen,
  imgAlt,
  imgWidth,
  imgHeight,
  texto, 
  link, 
  linkText = 'Ver más',
}) {
  const imgProps = getImgProps(imagen, { alt: imgAlt, width: imgWidth, height: imgHeight });

  return (
    <div className={`card ${className}`}>
      {titulo && <h5 className='card-title'>{titulo}</h5>}

      {imgProps && (
        <img
          {...imgProps}
          className='card-img-top'
          loading='lazy'
          decoding='async'
          style={{ height: 'auto', objectFit: 'contain' }}
        />
      )}

      <div className='card-body'>
        {texto && <div className='card-text'>{texto}</div>}

        {link && (
          <a
            className='btn btn-primary boton'
            href={link}
            target='_blank'
            rel='noopener noreferrer'
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}
