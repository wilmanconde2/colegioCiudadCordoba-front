export const CardInformation = ({
  titulo,
  imagen,
  texto,
  nota,
  link,
  textoBoton = 'Descargar',
}) => (
  <div className='card'>
    <div className='card-body'>
      {imagen && <img src={imagen} className='card-img-top' alt={titulo} />}
      <h5 className='card-title'>{titulo}</h5>
      {texto && <p className='card-text'>{texto}</p>}
      {nota && (
        <p className='nota'>
          <em>Nota:</em> {nota}
        </p>
      )}
      {link && (
        <div className='boton'>
          <a href={link} className='btn btn-primary' target='_blank' rel='noopener noreferrer'>
            {textoBoton}
          </a>
        </div>
      )}
    </div>
  </div>
);
