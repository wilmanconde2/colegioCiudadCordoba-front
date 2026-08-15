// front/src/pages/Inicio.jsx

import useTitulo from '../hooks/useTitulo';
import { useState } from 'react';
import { Carrusel } from '../components/Carrusel';
import { CardSelection } from '../components/CardSelection';
import { CardInformation } from '../components/CardInformation';
import { useCarrusel } from '../hooks/useCarrusel';
import { NavLink } from 'react-router';
// eslint-disable-next-line no-unused-vars
import BuscadorCursoCard from '../components/BuscadorCursoCard';

import {
  CARRUSEL_IMAGES,
  // eslint-disable-next-line no-unused-vars
  INSC_IMG,
  CARD_IMGS,
  INICIO_HERO_IMAGES,
  TALLERES_OPCIONES,
  REPORTE_OPCIONES,
  RECUPERACION_OPCIONES,
} from '../constants/inicio';

const Inicio = () => {
  useTitulo('Inicio');

  const { currentImageIndex } = useCarrusel(CARRUSEL_IMAGES);
  // Tarjetas informativas y de selección
  // eslint-disable-next-line no-unused-vars
  const [mostrarMatricula] = useState(false);
  const [mostrarCircularEspecial] = useState(true);
  const [mostrarCircular] = useState(true);
  const [mostrarTalleres] = useState(false);
  const [mostrarReporte] = useState(false);
  const [mostrarActividades] = useState(true);
  const [mostrarHorarios] = useState(false);

  const handleSelectChange = (e) => {
    const url = e.target.value;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadCircular = () => {
    const pdfUrl = '/CircularMensual.pdf';
    const link = document.createElement('a');

    link.href = pdfUrl;
    link.download = 'CircularMensual.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCircularEspecial = () => {
    const pdfUrl = '/circular.pdf';
    const link = document.createElement('a');

    link.href = pdfUrl;
    link.download = 'circular.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='fullContainer'>
      {/* TEMPORAL: Circular especial por la situación actual en Cali. */}
      {mostrarCircularEspecial && (
        <CardInformation
          className='circular circular-especial'
          titulo='Circular Especial 13, 14 y 15 de agosto de 2026'
          imagen={INICIO_HERO_IMAGES.circularEspecial}
          imgAlt='Comunicado especial del Colegio Ciudad Córdoba para el 13, 14 y 15 de agosto de 2026'
          texto={
            <>
              Información especial sobre actividades académicas, entrega de boletines y retorno a la
              presencialidad, de acuerdo con las directrices de la Secretaría de Educación
              Distrital.
            </>
          }
          linkText='Descargar'
          onClick={handleDownloadCircularEspecial}
        />
      )}
      
      <section className='inicioHero' aria-label='Información destacada'>
        <img
          src={INICIO_HERO_IMAGES.infoInscripciones.src}
          srcSet={INICIO_HERO_IMAGES.infoInscripciones.srcSet}
          sizes={INICIO_HERO_IMAGES.infoInscripciones.sizes}
          alt='Toda la información de Inscripciones 2027 estará disponible desde el 1 de septiembre.'
          className='inicioHero__banner inicioHero__banner--left'
          width={INICIO_HERO_IMAGES.infoInscripciones.width}
          height={INICIO_HERO_IMAGES.infoInscripciones.height}
          loading='eager'
          decoding='async'
        />

        <div className='mainImages'>
          <Carrusel images={CARRUSEL_IMAGES} currentImageIndex={currentImageIndex} />
        </div>

        <img
          src={INICIO_HERO_IMAGES.prize.src}
          srcSet={INICIO_HERO_IMAGES.prize.srcSet}
          sizes={INICIO_HERO_IMAGES.prize.sizes}
          alt='Clasificación A+ en el ICFES 2025.'
          className='inicioHero__banner inicioHero__banner--right'
          width={INICIO_HERO_IMAGES.prize.width}
          height={INICIO_HERO_IMAGES.prize.height}
          loading='eager'
          decoding='async'
        />
      </section>

      <div className='backgroundContainerText'>
        <h1>Paz - Progreso - Futuro</h1>
        <h2>
          ¡Una comunidad acogedora que inspira posibilidades, conecta personas y estimula el
          aprendizaje!
        </h2>
      </div>

      {mostrarCircular && (
        <CardInformation
          className='circular'
          imagen={CARD_IMGS.circular}
          texto={
            <>
              Ya está disponible la Circular Informativa con novedades académicas y administrativas.
            </>
          }
          linkText='Descargar'
          onClick={handleDownloadCircular}
        />
      )}

      {/* TEMPORAL Eliminar cuando se retomen las clases presenciales */}
      {mostrarTalleres && (
        <CardSelection
          className='talleres text-center'
          titulo='Talleres Académicos'
          opciones={TALLERES_OPCIONES}
          onChange={handleSelectChange}
          selectLabel='Selecciona tu grupo'
          nota={
            <>
              Teniendo en cuenta la situación actual y siguiendo las directrices de la Secretaría de
              Educación, durante esta semana se implementarán talleres de refuerzo y repaso para
              nuestros estudiantes. Selecciona tu grupo para acceder a las actividades
              correspondientes. <br />
              <em>
                <b>
                  <i>NOTA: </i>
                </b>
              </em>
              <i>
                Las actividades académicas que se encuentran en los talleres, pueden ser
                desarrolladas en los respectivos cuadernos.
              </i>
            </>
          }
          imagen={CARD_IMGS.talleres}
          imgAlt='Estudiantes desarrollando talleres académicos desde casa'
        />
      )}

      {/* TEMPORAL Eliminar después de inscripciones y matriculas*/}
      {/* <h3 className='vacaciones'>
        Mañana habrá atención <u><i>EXCLUSIVA</i></u> para venta de uniformes en las instalaciones del
        colegio, <br /> en el horario de 8:00 a. m. a 12:00 m.
      </h3> */}

      {/* TODO ARCHIVOS CREADOS: recursosCursos.js - BuscadorCursoCard.jsx - ModalInfoCurso.jsx - _BuscadorCursoCard.scss - _ModalCursos.scss */}

      {/* <div className='fecha'>
        <a
          className='link-subs'
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
      </div> */}

      {/* TEMPORAL Eliminar después de inscripciones y matriculas*/}

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
          titulo='Actividades Recuperación Acumulado Primer y Segundo Periodo'
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

      {/* <div className='Inicio'>
        <BuscadorCursoCard />
      </div> */}

      <div className='infoTesoreria'>
        <h2>Información para pagos</h2>
        <NavLink to='/tesoreria' aria-label='Ir a Tesorería' onClick={() => window.scrollTo(0, 0)}>
          <img
            src={INICIO_HERO_IMAGES.tesoreriaBtn.src}
            srcSet={INICIO_HERO_IMAGES.tesoreriaBtn.srcSet}
            sizes={INICIO_HERO_IMAGES.tesoreriaBtn.sizes}
            alt='Ir a Tesorería - Pagos y Consultas'
            className='btnTesoreria'
            width={INICIO_HERO_IMAGES.tesoreriaBtn.width}
            height={INICIO_HERO_IMAGES.tesoreriaBtn.height}
            loading='lazy'
            decoding='async'
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Inicio;
