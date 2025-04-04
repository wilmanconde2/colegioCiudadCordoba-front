import React, { useState } from 'react';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulario = () => {
  const [formData, setFormData] = useState({
    apellido1: '',
    apellido2: '',
    nombre1: '',
  });

  const [codigo, setCodigo] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.apellido1) newErrors.apellido1 = 'El primer apellido es obligatorio';
    if (!formData.apellido2) newErrors.apellido2 = 'El segundo apellido es obligatorio';
    if (!formData.nombre1) newErrors.nombre1 = 'El primer nombre es obligatorio';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('https://colegiociudadcordoba-back.onrender.com/buscar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setCodigo(data.codigo);
        toast.success(`Código del estudiante: ${data.codigo}`);
        // Limpiar el formulario solo si se encontró el código
        setFormData({
          apellido1: '',
          apellido2: '',
          nombre1: '',
        });
      } else {
        setCodigo(null);
        setErrors({ global: data.error });
        toast.error('Estudiante no encontrado');
      }
    } catch (error) {
      setCodigo(null);
      setErrors({ global: 'Error de conexión con el servidor' });
      toast.error('Error de conexión con el servidor');
    }
  };

  return (
    <div className='containerForm'>
      <form className='studentCode' onSubmit={handleSubmit}>
        <legend>Solicitud Código Estudiantil</legend>
        <label htmlFor='apellido1'>Primer Apellido:</label>
        <input
          type='text'
          id='apellido1'
          name='apellido1'
          value={formData.apellido1}
          onChange={handleChange}
          placeholder='Campo obligatorio'
          required
        />
        {errors.apellido1 && <span className='error'>{errors.apellido1}</span>}

        <label htmlFor='apellido2'>Segundo Apellido:</label>
        <input
          type='text'
          id='apellido2'
          name='apellido2'
          value={formData.apellido2}
          onChange={handleChange}
          placeholder='Campo obligatorio'
          required
        />
        {errors.apellido2 && <span className='error'>{errors.apellido2}</span>}

        <label htmlFor='nombre1'>Primer Nombre:</label>
        <input
          type='text'
          id='nombre1'
          name='nombre1'
          value={formData.nombre1}
          onChange={handleChange}
          placeholder='Campo obligatorio'
          required
        />
        {errors.nombre1 && <span className='error'>{errors.nombre1}</span>}

        <button type='submit'>Buscar Código</button>

        <span>
          <em>¡Puede tardar un momento dependiendo de la velocidad de su internet!</em>
        </span>
      </form>
      <div className='payOnline'>
        <h2>Paga en Línea</h2>
        <p>
          Realiza tu pago de manera rápida y segura{' '}
          <a
            href='https://www.avalpaycenter.com/wps/portal/portal-de-pagos/web/pagos-aval/resultado-busqueda/realizar-pago?idConv=00024146&origen=buscar'
            target='_blank'
            rel='noopener noreferrer'
          >
            AQUÍ
          </a>
          <br />
          <em>Recuerda tener el codigo del estudiante a la mano!</em>
        </p>
      </div>

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Zoom}
      />
    </div>
  );
};

export default Formulario;
