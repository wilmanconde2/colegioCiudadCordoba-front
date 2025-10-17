import useTitulo from '../hooks/useTitulo';
import Formulario from '../components/Formulario';
import { useState } from 'react';
import { Carrusel } from '../components/Carrusel';
import { CardSelection } from '../components/CardSelection';
import { CardInformation } from '../components/CardInformation';
import { useCarrusel } from '../hooks/useCarrusel';

import {
  CARRUSEL_IMAGES,
  FECHA_IMG,
  INSC_IMG,
  CARD_IMGS,
  REPORTE_OPCIONES,
  RECUPERACION_OPCIONES,
} from '../constants/inicio';

const Inicio = () => {
  useTitulo('Inicio');

  const { currentImageIndex } = useCarrusel(CARRUSEL_IMAGES);

  const [mostrarCircular] = useState(true);
  const [mostrarReporte] = useState(false);
  const [mostrarActividades] = useState(true);
  const [mostrarHorarios] = useState(false);

  const handleSelectChange = (e) => {
    const url = e.target.value;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='fullContainer'>
      {/* TEMPORAL Eliminar después del dia de la familia */}
      <div className='fecha'>
        <img
          src={FECHA_IMG.src}
          srcSet={FECHA_IMG.srcSet}
          sizes={FECHA_IMG.sizes}
          alt='fechaEvento'
          className='evento'
          width={FECHA_IMG.width}
          loading='lazy'
          decoding='async'
          style={{ height: 'auto', objectFit: 'contain' }}
        />
        <a
          href='https://drive.google.com/drive/folders/1-mDgt3M11XJmcvMJkjGK6EA4g4QRRIB5?usp=drive_link'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src={INSC_IMG.src}
            srcSet={INSC_IMG.srcSet}
            sizes={INSC_IMG.sizes}
            alt='inscripciones'
            className='imgInscripciones'
            width={INSC_IMG.width}
            loading='lazy'
            decoding='async'
            style={{ height: 'auto', objectFit: 'contain' }}
          />
        </a>
      </div>

      <div className='infoInscripciones'>
        <h2>Inscripciones Abiertas</h2>
        <h3>Año Lectivo 2026</h3>
        <p>
          A partir del <em>1</em> de Septiembre en la secretaría de la institución
        </p>
        <ul className='horarioInscripciones'>
          Lunes a Viernes
          <li>7:00 am - 12:00 pm</li>
          <li>1:00 pm - 5:00 pm</li>
        </ul>
        <p>
          Desde Jardín <em>(4 años)</em> hasta grado Décimo
        </p>
        <a
          href='https://drive.google.com/drive/folders/1-mDgt3M11XJmcvMJkjGK6EA4g4QRRIB5?usp=drive_link'
          target='_blank'
          rel='noopener noreferrer'
        >
          Más información aquí
        </a>
      </div>
      {/* TEMPORAL Eliminar después del dia de la familia */}

      <div className='mainImages'>
        <Carrusel images={CARRUSEL_IMAGES} currentImageIndex={currentImageIndex} />
      </div>

      <div className='backgroundContainerText'>
        <h1>Paz - Progreso - Futuro</h1>
        <h2>
          ¡Una comunidad acogedora que inspira posibilidades, conecta personas y estimula el
          aprendizaje!
        </h2>
      </div>

      <Formulario />

      {mostrarCircular && (
        <CardInformation
          className='circular'
          imagen={CARD_IMGS.circular}
          texto={
            <>
              Ya está disponible la Circular Informativa del mes de{' '}
              <strong>{new Date().toLocaleString('es-ES', { month: 'long' }).toUpperCase()}</strong>
              , con novedades académicas y administrativas.
            </>
          }
          link='https://drive.google.com/drive/folders/1469aSpKLwiiBQ53rCErN-EL29sCVizDs?usp=drive_link'
        />
      )}

      {mostrarReporte && (
        <CardSelection
          className='reporte text-center'
          titulo='Reporte Académico'
          opciones={REPORTE_OPCIONES}
          onChange={handleSelectChange}
          nota='Selecciona tu grado y se abrirá el listado con los integrantes de tu salón de clases...'
          imagen={CARD_IMGS.reporte}
        />
      )}

      {mostrarActividades && (
        <CardSelection
          className='actividades text-center'
          titulo='Actividades Recuperación'
          opciones={RECUPERACION_OPCIONES}
          onChange={handleSelectChange}
          nota='Selecciona tu grado y se abrirán las actividades de recuperación...'
          imagen={CARD_IMGS.recuperacion}
        />
      )}

      {mostrarHorarios && (
        <CardInformation
          className='horarios'
          titulo='Horarios Recuperación'
          imagen={CARD_IMGS.horarios}
          texto={
            <>
              <em>Nota:</em> Ten en cuenta que el horario de recuperación publicado no incluye
              algunas asignaturas...
            </>
          }
          link='https://drive.google.com/drive/folders/1B3h2CbVgE375o5Bg1fuoSoAiViRazur3'
        />
      )}
    </div>
  );
};

export default Inicio;
