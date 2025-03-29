export const CardSelection = ({ titulo, opciones, onChange, nota, imagen }) => (
  <div className='card'>
    <div className='card-body'>
      {imagen && <img src={imagen} className='card-img-top' alt={titulo} />}
      <h5 className='card-title'>{titulo}</h5>
      <select className='form-select groupList' onChange={onChange} defaultValue=''>
        <option value='' disabled>
          Selecciona tu grupo
        </option>
        {opciones.map((opcion, index) => (
          <option key={index} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
      <p className='nota'>
        <em>Nota:</em> {nota}
      </p>
    </div>
  </div>
);
