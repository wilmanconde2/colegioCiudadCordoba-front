import React from 'react';
import useTitulo from '../hooks/useTitulo';
import Formulario from '../components/Formulario';
import { Carrusel } from '../components/Carrusel';
import { CardSelection } from '../components/CardSelection';
import { CardInformation } from '../components/CardInformation';
import { useCarrusel } from '../hooks/useCarrusel';
import { BACKGROUND_IMAGES, REPORTE_OPCIONES, RECUPERACION_OPCIONES } from '../constants/inicio';

const Inicio = () => {
  useTitulo('Inicio');
  const { currentImageIndex } = useCarrusel(BACKGROUND_IMAGES);

  const handleSelectChange = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className='fullContainer'>
      <Carrusel images={BACKGROUND_IMAGES} currentImageIndex={currentImageIndex} />

      <div className='backgroundContainerText'>
        <h1>Paz - Progreso - Futuro</h1>
        <h2>
          ¡Una comunidad acogedora que inspira posibilidades, conecta personas y estimula el
          aprendizaje!
        </h2>
      </div>

      <Formulario />

      {/* Card Circular */}
      <CardInformation
        titulo='Circular Informativa'
        imagen='/circular.jpg'
        texto='Ya está disponible la última Circular Informativa con novedades académicas y administrativas.'
        link='https://drive.google.com/file/d/11IEZ8US0Jg1iGB580TDxqoJ7fUx5hYMy/view'
      />

      {/* CardSelection para Reporte Académico */}
      <CardSelection
        titulo='Reporte Académico'
        opciones={REPORTE_OPCIONES}
        onChange={handleSelectChange}
        nota='selecciona tu grado y se abrirá el listado con los integrantes de tu salón de clases, busca tu nombre y revisa si debes presentar recuperaciones finales o si ya aprobaste tu año lectivo sin logros pendientes.'
        imagen='/reporte.jpg'
      />

      {/* CardSelection para Actividades Recuperación */}
      <CardSelection
        titulo='Actividades Recuperación'
        opciones={RECUPERACION_OPCIONES}
        onChange={handleSelectChange}
        nota='selecciona tu grado y se abrirán las actividades de recuperación de todas las materias. Recuerda descargar y realizar solo las que te corresponden.'
        imagen='/recuperacion.jpg'
      />

      {/* Card Horarios */}
      <CardInformation
        titulo='Horarios Recuperación'
        imagen='/horarios.jpg'
        texto={
          <>
            <em>Nota:</em> ten presente que el horario publicado de recuperaciones en la página web,
            no incluye algunas materias, si reprobaste una o varias materias que no están incluidas
            en el horario publicado, debes buscar al docente correspondiente de dicha/s materia/s el
            día lunes 25 de noviembre del presente año en la jornada de la mañana, para que cada
            docente te asigne un horario de recuperación.
          </>
        }
        link='https://drive.google.com/drive/folders/1B3h2CbVgE375o5Bg1fuoSoAiViRazur3'
      />
    </div>
  );
};

export default Inicio;
