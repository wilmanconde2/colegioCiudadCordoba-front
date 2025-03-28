import useTitulo from '../hooks/useTitulo';

const PQRS = () => {
  useTitulo('PQRS');

  // TODO implementar a donde va la información del formulario

  return (
    <>
      <div className='fullContainer'>
        <div>
          <img className='imagen' src='/pqrs.jpg' alt='imagen' />
        </div>
        <div className='container'>
          {/* <!-- FORMULARIO --> */}
          <div className='section-contact-us__form'>
            <form action='' method='' className='contact'>
              {/* TODO action y method */}
              <fieldset>
                <legend>Atención al cliente</legend>
                <div className='contact__name'>
                  <div>
                    <label htmlFor='name'>Nombre: *</label>
                  </div>
                  <div>
                    <input type='text' id='name' name='name' placeholder='Nombre' required />
                  </div>
                </div>
                <div className='contact__email'>
                  <div>
                    <label htmlFor='mail'>Email: *</label>
                  </div>
                  <div>
                    <input type='email' id='mail' name='mail' placeholder='Correo Electrónico' required />
                  </div>
                </div>
                <div className='contact__subject'>
                  <div>
                    <label htmlFor='subject'>Telefono: *</label>
                  </div>
                  <div>
                    <input type='tel' id='telefono' name='telefono' placeholder='Telefono' required />
                  </div>
                </div>
                <div className='contact__message'>
                  <div>
                    <label htmlFor='message'>Mensaje: *</label>
                  </div>
                  <div>
                    <textarea id='message' name='message' placeholder='Necesito ayuda con...' required></textarea>
                  </div>
                </div>
                <div className='contact__button'>
                  <button>Enviar</button>
                </div>
              </fieldset>
            </form>
          </div>
          {/* <!-- FIN FORMULARIO --> */}
        </div>
      </div>
    </>
  );
};

export default PQRS;
