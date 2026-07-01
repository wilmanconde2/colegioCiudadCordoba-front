import useTitulo from '../hooks/useTitulo';
import { CarruselPerfiles } from '../components/CarruselPerfiles';
import { useCarrusel } from '../hooks/useCarrusel';
import {
  BACKGROUND_IMAGES_DIRECTIVO,
  BACKGROUND_IMAGES_DOCENTE,
  BACKGROUND_IMAGES_ESTUDIANTE,
  BACKGROUND_IMAGES_EGRESADO,
} from '../constants/inicio';

const PerfilesCCC = () => {
  useTitulo('Perfiles CCC');

  const { currentImageIndex: indexDirectivo } = useCarrusel(BACKGROUND_IMAGES_DIRECTIVO);
  const { currentImageIndex: indexDocente } = useCarrusel(BACKGROUND_IMAGES_DOCENTE);
  const { currentImageIndex: indexEstudiante } = useCarrusel(BACKGROUND_IMAGES_ESTUDIANTE);
  const { currentImageIndex: indexEgresado } = useCarrusel(BACKGROUND_IMAGES_EGRESADO);

  return (
    <div className='fullContainer containerProfiles'>
      <div className='directivo'>
        <CarruselPerfiles
          images={BACKGROUND_IMAGES_DIRECTIVO}
          currentImageIndex={indexDirectivo}
          backgroundColor='#E0F7FA'
        />
      </div>
      <div className='container containerProfiles'>
        <h2>PERFIL DEL DIRECTIVO DOCENTE COCICOR</h2>
        <ul>
          <li>Ser idóneo en los aspectos pedagógicos, administrativos y de gestión.</li>
          <li>Poseer una sana personalidad, siendo honesto, responsable.</li>
          <li>Ejercer liderazgo positivo en la planificación.</li>
          <li>Conformar los equipos pedagógicos conducentes al análisis.</li>
          <li>Proyectar la filosofía institucional.</li>
        </ul>
      </div>

      <div className='docente'>
        <CarruselPerfiles
          images={BACKGROUND_IMAGES_DOCENTE}
          currentImageIndex={indexDocente}
          backgroundColor='#FFF3E0'
        />
      </div>
      <div className='container containerProfiles'>
        <h2>PERFIL DEL DOCENTE COCICOR</h2>
        <ul>
          <li>Ser poseedor y formador de valores a través de su ejemplo.</li>
          <li>Ser comprometido con la formación integral.</li>
          <li>Ser creativo, innovador, recursivo, colaborador.</li>
          <li>Poseer espíritu investigativo.</li>
          <li>Ser justo en sus acciones y decisiones.</li>
          <li>Mantener una buena presentación personal.</li>
          <li>Poseer un alto sentido de pertenencia.</li>
          <li>Ser respetuoso de las diferencias.</li>
          <li>Estar dispuesto al diálogo y concertaciones.</li>
          <li>Mantener buenas relaciones interpersonales.</li>
          <li>Poseer ética profesional, vocación y fundamentos pedagógicos.</li>
          <li>Ser idóneo y competente en su área.</li>
        </ul>
      </div>

      <div className='estudiante'>
        <CarruselPerfiles
          images={BACKGROUND_IMAGES_ESTUDIANTE}
          currentImageIndex={indexEstudiante}
          backgroundColor='#F1F8E9'
        />
      </div>
      <div className='container containerProfiles'>
        <h2>PERFIL DEL ESTUDIANTE COCICOR</h2>
        <ul>
          <li>El colegio a través de sus diversos programas busca formar personas.</li>
          <li>Que posean y promuevan valores cívicos, sociales religiosos y ecológicos.</li>
          <li>Participativos en forma crítica, reflexiva y analítica.</li>
          <li>Respetuosos(as) de la individualidad e identidad cultural.</li>
          <li>Compromiso permanente con la formación de sus hijos.</li>
          <li>Colaboración con el colegio en forma responsable.</li>
          <li>Participación en las diferentes actividades del colegio.</li>
          <li>Respetuoso de las instancias de comunicación.</li>
          <li>Dispuesto a trabajar en forma colectiva.</li>
          <li>Practicante de normas democráticas.</li>
          <li>Respetuoso de los compromisos adquiridos con el colegio.</li>
          <li>Que promuevan la estabilidad y buena imagen.</li>
          <li>Que participen responsable y democráticamente.</li>
        </ul>
      </div>

      <div className='egresado'>
        <CarruselPerfiles
          images={BACKGROUND_IMAGES_EGRESADO}
          currentImageIndex={indexEgresado}
          backgroundColor='#F5DBD8'
        />
      </div>
      <div className='container containerProfiles'>
        <h2>PERFIL DEL EGRESADO COCICOR</h2>
        <ul>
          <li>Componente en los diferentes campos de desempeño a nivel profesional y laboral.</li>
          <li>Convencido de que su elección profesional será pilar fundamental.</li>
          <li>Ser modelo de valores, morales y profesionales.</li>
          <li>Con permanente búsqueda de la superación y la excelencia.</li>
        </ul>
      </div>
    </div>
  );
};

export default PerfilesCCC;
