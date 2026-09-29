// src/components/Formulario.jsx

import { useId } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';
import AlumnoSearchInput from './formulario/AlumnoSearchInput';
import AlumnoSelectedCard from './formulario/AlumnoSelectedCard';
import { FORM_CONFIG } from './formulario/formularioUtils';
import { useAlumnoSearch } from './formulario/useAlumnoSearch';
import PsePaymentCta from './PsePaymentCta';

const PSE_PAYMENT_URL =
  'https://www.avalpaycenter.com/wps/portal/portal-de-pagos/web/pagos-aval/resultado-busqueda/realizar-pago?idConv=00024146&origen=buscar';

const Formulario = ({ typeSearch = 'codigo' }) => {
  const currentConfig = FORM_CONFIG[typeSearch] || FORM_CONFIG.codigo;
  const listboxId = useId();
  const search = useAlumnoSearch(currentConfig);

  return (
    <div className='containerForm'>
      <form className='studentCode' onSubmit={(event) => event.preventDefault()}>
        <legend>{currentConfig.legend}</legend>

        <AlumnoSearchInput
          activeIndex={search.activeIndex}
          config={currentConfig}
          error={search.error}
          filtered={search.filtered}
          isListboxOpen={search.isListboxOpen}
          listboxId={listboxId}
          loading={search.loading}
          onActiveIndexChange={search.setActiveIndex}
          onFocus={search.loadAlumnosOnce}
          onKeyDown={search.handleSearchKeyDown}
          onQueryChange={search.updateQuery}
          onSelect={search.selectAlumno}
          query={search.query}
        />

        <button
          className='btn-form Formulario__btnClear'
          type='button'
          onClick={search.clearSelection}
          disabled={search.loading}
        >
          Limpiar
        </button>

        {search.selected && (
          <AlumnoSelectedCard
            codigo={search.codigo}
            config={currentConfig}
            onCopy={search.copyCodigo}
            selected={search.selected}
          />
        )}
      </form>

      <div className='payOnline'>
        <div className='pse'>
          <div className='captionPSE'>
            <p>¿Cómo pagar por PSE?</p>
            <video
              className='videoPSE'
              src='/PSE.mp4'
              poster='/PSE-Cover.webp'
              controls
              playsInline
            >
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </div>

        <div className='imagenPse'>
          <PsePaymentCta href={PSE_PAYMENT_URL} />
          <img className='codigoQR' src={CLOUDINARY_ASSETS.codigoQR} alt='codigoQR' width='230' height='230' />
        </div>

        <h2>Paga en Línea</h2>
        <p>
          Realiza tu pago de manera rápida y segura dando click{' '}
          <a href={PSE_PAYMENT_URL} target='_blank' rel='noopener noreferrer'>
            AQUÍ
          </a>
          <br />
          <em>¡Recuerda tener el código del estudiante a la mano!</em>
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

Formulario.propTypes = {
  typeSearch: PropTypes.oneOf(['codigo', 'mensualidad']),
};

export default Formulario;
