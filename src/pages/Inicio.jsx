import useTitulo from '../hooks/useTitulo';
import Formulario from '../components/Formulario';
import { useState } from 'react';
import { Carrusel } from '../components/Carrusel';
import { CardSelection } from '../components/CardSelection';
import { CardInformation } from '../components/CardInformation';
import { useCarrusel } from '../hooks/useCarrusel';

import {
  CARRUSEL_IMAGES,
  INSC_IMG,
  CARD_IMGS,
  REPORTE_OPCIONES,
  RECUPERACION_OPCIONES,
} from '../constants/inicio';

const Inicio = () => {
  useTitulo('Inicio');

  const { currentImageIndex } = useCarrusel(CARRUSEL_IMAGES);
  const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  // Tarjetas informativas y de selección
  const [mostrarMatricula] = useState(true);
  const [mostrarCircular] = useState(false);
  const [mostrarReporte] = useState(false);
  const [mostrarActividades] = useState(false);
  const [mostrarHorarios] = useState(false);

  const handleSelectChange = (e) => {
    const url = e.target.value;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='fullContainer'>
      {/* TEMPORAL Eliminar después de inscripciones y matriculas*/}
      <h3 className='vacaciones'>
        Nuestras oficinas estarán cerradas del 20 de diciembre de 2025 al 12 de enero de 2026, abriendo nuevamente el día 13 de enero</h3>

      <div className='fecha'>
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
        {mostrarMatricula && (
          <CardInformation
            className='matricula'
            imagen={CARD_IMGS.matricula}
            texto={<>Aquí encontraras toda la información!!</>}
            link='https://drive.google.com/drive/folders/1ytcHPPBebATkgdB3S3eITQkLIUwqwA04'
          />
        )}
      </div>

      <div className='infoInscripciones'>
        <h2>Inscripciones Abiertas</h2>
        <h3>Año Lectivo 2026</h3>
        <p>En la secretaría de la institución</p>
        <ul className='horarioInscripciones'>
          Lunes a Viernes
          <li>7:00 am - 12:00 pm</li>
          <li>1:00 pm - 4:00 pm</li>
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
      {/* TEMPORAL Eliminar después de inscripciones y matriculas*/}

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
              <em>{capitalizeFirst(new Date().toLocaleString('es-ES', { month: 'long' }))}</em>, con
              novedades académicas y administrativas.
            </>
          }
          link='https://drive.google.com/drive/folders/1469aSpKLwiiBQ53rCErN-EL29sCVizDs?usp=drive_link'
        />
      )}

      {mostrarReporte && (
        <CardSelection
          className='reporte text-center'
          titulo={
            <>
              Reporte Académico <br />
              Periodo 4 y Años Anteriores
            </>
          }
          opciones={REPORTE_OPCIONES}
          onChange={handleSelectChange}
          nota=''
          imagen={CARD_IMGS.reporte}
        />
      )}

      {mostrarActividades && (
        <CardSelection
          className='actividades text-center'
          titulo='Actividades Recuperación'
          opciones={RECUPERACION_OPCIONES}
          onChange={handleSelectChange}
          nota={
            <>
              Para descargar la recuperación, se sugiere hacerlo desde un computador (PC), sin
              embargo, recuerda que también se puede realizar desde cualquier dispositivo y
              navegador.
              <br />
              El navegador recomendado es <em>Microsoft Edge</em>. <br />
              Si presenta inconvenientes, intente abrir el enlace usando <em>
                Mozilla Firefox
              </em>{' '}
              como segunda opción. <br />
            </>
          }
          imagen={CARD_IMGS.recuperacion}
        />
      )}

      {mostrarHorarios && (
        <CardInformation
          className='horarios'
          titulo='Horarios Recuperacion'
          imagen={CARD_IMGS.horarios}
          texto={
            <>
              <em>Nota:</em> Ten presente que el horario publicado, no incluye todas las materias,
              si perdiste una o varias materias que no están incluidas en el horario publicado,
              debes buscar al docente correspondiente de dicha/s materia/s el día lunes 24 de
              noviembre en cualquier hora libre que tengas, para que cada docente te asigne la
              actividad de recuperación.
            </>
          }
          link='https://drive.google.com/drive/folders/10tZQth5aMksTOEhyYCmv8fQbLBB8nKAp'
        />
      )}
    </div>
  );
};

export default Inicio;
