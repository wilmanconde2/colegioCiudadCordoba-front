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

export function CardSelection({
  className = '',
  titulo,
  opciones = [],
  onChange,
  nota, 
  imagen, 
  imgAlt,
  imgWidth,
  imgHeight,
  selectLabel = 'Selecciona una opción',
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
        <label className='form-label' htmlFor={`select-${className || 'card'}`}>
          {selectLabel}
        </label>
        <select
          id={`select-${className || 'card'}`}
          className='form-select groupList'
          defaultValue=''
          onChange={onChange}
        >
          <option value='' disabled>
            — Elegir —
          </option>
          {opciones.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {nota && (
          <p className='card-text' style={{ marginTop: '1rem' }}>
            {nota}
          </p>
        )}
      </div>
    </div>
  );
}
