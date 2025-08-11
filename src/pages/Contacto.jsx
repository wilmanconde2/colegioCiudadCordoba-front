import useTitulo from '../hooks/useTitulo';

const Contacto = () => {
  useTitulo('Contactanos');
  return (
    <>
      <div className='fullContainer'>
        <h1>Contáctanos</h1>
        <div className='containerContacto iframe'>
          {/* Mapa embebido */}
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.7834655061647!2d-76.50797242552936!3d3.4029257515412863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a12ae03b4cad%3A0xbda286c9b0e4a4f!2sC%C3%B3rdoba%20City%20College!5e0!3m2!1sen!2sco!4v1742520384314!5m2!1sen!2sco'
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
        <div className='containerText'>
          <div className='direccion'>
            Dirección: Cra. 42 B # 51-35 <br /> B/ Ciudad Córdoba
          </div>
          <section className='horariosOficina'>
            <h4>Horarios de Oficina</h4>
            <p>Tesorería y Secretaría</p>
            <ul>
              <li>-- Lunes a Viernes --</li>
              <li>7:00 am - 12:00 pm</li>
              <li>1:00 pm - 5:00 pm</li>
            </ul>
          </section>
          <div className='telefonos'>
            Tel: (602) 3450411 - (602) 3731398 <br /> Cel: 3104280125
          </div>
          <div className='email'>Correo: colegiociudadcordoba@hotmail.com</div>
        </div>
      </div>
    </>
  );
};

export default Contacto;
