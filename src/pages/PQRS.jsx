import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import useTitulo from '../hooks/useTitulo';

const PQRS = () => {
  useTitulo('PQRS');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar correo con EeJS
    emailjs
      .send(
        'service_kl1ozal', // ID del servicio (de EeJS)
        'template_lsi6s7d', // ID de la plantilla (de EeJS)
        formData, // Datos del formulario
        'n94QxfC16uQHXAfC6', // ID de usuario (de EeJS)
      ) //TODO Cambiar correo electronico dentro de emailjs por el de la cuenta del colegio o rector
      .then((response) => {
        console.log('Correo enviado correctamente', response);
        alert('Formulario enviado correctamente');
        // Limpiar el formulario
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      })
      .catch((error) => {
        console.log('Error al enviar el correo', error);
        alert('Hubo un error al enviar el formulario');
      });
  };

  return (
    <>
      <div className='fullContainer'>
        <div>
          <img className='imagen' src='/pqrs.jpg' alt='imagen' />
        </div>
        <div className='container'>
          <div className='section-contact-us__form'>
            <form onSubmit={handleSubmit} className='contact'>
              <fieldset>
                <legend>Atención al cliente</legend>
                <div className='contact__name'>
                  <div>
                    <label htmlFor='name'>Nombre: *</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      placeholder='Nombre'
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='contact__email'>
                  <div>
                    <label htmlFor='email'>Email: *</label>
                  </div>
                  <div>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Correo Electrónico'
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='contact__subject'>
                  <div>
                    <label htmlFor='phone'>phone: *</label>
                  </div>
                  <div>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      placeholder='phone'
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='contact__message'>
                  <div>
                    <label htmlFor='message'>Mensaje: *</label>
                  </div>
                  <div>
                    <textarea
                      id='message'
                      name='message'
                      placeholder='Necesito ayuda con...'
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className='contact__button'>
                  <button type='submit'>Enviar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PQRS;
