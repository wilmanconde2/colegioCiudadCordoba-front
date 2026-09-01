import { NavLink } from 'react-router';
import useTitulo from '../hooks/useTitulo';
import {
  CONDICIONES,
  COSTOS_2026,
  ENFASIS_BACHILLERATO,
  JORNADAS,
  PASOS_INSCRIPCION,
  SERVICIOS,
} from '../constants/inscripciones';

const Inscripciones = () => {
  useTitulo('Inscripciones 2027');

  return (
    <main className='inscripciones'>
      <header className='inscripciones__hero'>
        <p className='inscripciones__eyebrow'>Colegio Ciudad Córdoba</p>
        <h1>Inscripciones <span>Año lectivo 2027</span></h1>
        <div className='inscripciones__kids'>
          <h2>COCICOR KIDS 2027</h2>
          <p><strong>Jardín:</strong> 4 años</p>
          <p><strong>Transición:</strong> 5 años</p>
          <p className='inscripciones__note'>Las edades deben cumplirse antes del 30 de marzo de 2027.</p>
        </div>
      </header>

      <section className='inscripciones__section' aria-labelledby='jornadas-title'>
        <div className='inscripciones__heading'>
          <p>Horarios</p>
          <h2 id='jornadas-title'>Jornadas académicas</h2>
        </div>
        <div className='inscripciones__grid inscripciones__grid--three'>
          {JORNADAS.map(({ nivel, horarios }) => (
            <article className='inscripciones__card' key={nivel}>
              <h3>{nivel}</h3>
              {horarios.map((horario) => <p key={horario}>{horario}</p>)}
            </article>
          ))}
        </div>
      </section>

      <section className='inscripciones__section' aria-labelledby='oferta-title'>
        <div className='inscripciones__heading'>
          <p>Nuestra propuesta</p>
          <h2 id='oferta-title'>Formación y espacios</h2>
        </div>
        <div className='inscripciones__grid inscripciones__grid--two'>
          <article className='inscripciones__card'>
            <h3>Primaria</h3>
            <ul>
              <li>Salón de Juegos Infantiles.</li>
              <li>Espacios adecuados para Educación física, Deportes, Tecnología, Informática e Inglés.</li>
              <li>Docentes Normalistas y Licenciados.</li>
            </ul>
          </article>
          <article className='inscripciones__card'>
            <h3>Bachillerato</h3>
            <h4>Con énfasis en</h4>
            <ul>{ENFASIS_BACHILLERATO.map((item) => <li key={item}>{item}</li>)}</ul>
            <h4>Espacios</h4>
            <ul>
              <li>Sala de Robótica.</li>
              <li>Sala de Dibujo Técnico y Artes Plásticas.</li>
              <li>Sala de Sistemas para Programación, Programas Contables y Programa de Dibujo Arquitectónico.</li>
            </ul>
            <p className='inscripciones__degree'>Titulación: <strong>Bachiller Técnico Comercial o Industrial</strong></p>
            <NavLink className='inscripciones__cta' to='/modalidades'>Conoce nuestras modalidades</NavLink>
          </article>
        </div>
      </section>

      <section className='inscripciones__section inscripciones__section--tint' aria-labelledby='servicios-title'>
        <div className='inscripciones__heading'>
          <p>Bienestar y aprendizaje</p>
          <h2 id='servicios-title'>Servicios adicionales</h2>
        </div>
        <div className='inscripciones__grid inscripciones__grid--services'>
          {SERVICIOS.map(({ titulo, texto }) => (
            <article className='inscripciones__service' key={titulo}>
              <h3>{titulo}</h3>
              {texto && <p>{texto}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className='inscripciones__section' aria-labelledby='extra-title'>
        <div className='inscripciones__heading'>
          <p>Más oportunidades</p>
          <h2 id='extra-title'>Extracurriculares</h2>
        </div>
        <div className='inscripciones__grid inscripciones__grid--three'>
          <article className='inscripciones__card'>
            <h3>Formación deportiva</h3>
            <ul><li>Escuela de Fútbol Masculino</li><li>Escuela de Fútbol Femenino</li><li>Voleibol Mixto</li></ul>
          </article>
          <article className='inscripciones__card'>
            <h3>Actividades lúdicas y artísticas</h3>
            <ul><li>Danzas folclóricas</li><li>Danzas modernas</li><li>Salsa y bailes modernos</li><li>Música: Flauta, Guitarra y Piano</li></ul>
          </article>
          <article className='inscripciones__card'>
            <h3>Preicfes COCICOR</h3>
            <p>Preparación para la Prueba Saber 11 dirigida a estudiantes de grado 11.</p>
            <dl><div><dt>Periodo</dt><dd>Marzo – agosto</dd></div><div><dt>Horario</dt><dd>Sábados, 8:00 a. m. – 12:30 p. m.</dd></div></dl>
          </article>
        </div>
      </section>

      <section className='inscripciones__section' aria-labelledby='proceso-title'>
        <div className='inscripciones__heading'>
          <p>Admisiones</p>
          <h2 id='proceso-title'>Proceso de inscripción</h2>
        </div>
        <ol className='inscripciones__steps'>
          {PASOS_INSCRIPCION.map(({ titulo, contenido }, index) => (
            <li key={titulo}>
              <span className='inscripciones__stepNumber' aria-hidden='true'>{index + 1}</span>
              <div><h3>{titulo}</h3><ul>{contenido.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </li>
          ))}
        </ol>
      </section>

      <aside className='inscripciones__conditions' aria-labelledby='condiciones-title'>
        <h2 id='condiciones-title'>Condiciones importantes</h2>
        <ul>{CONDICIONES.map((item) => <li key={item}>{item}</li>)}</ul>
      </aside>

      <section className='inscripciones__section' aria-labelledby='costos-title'>
        <div className='inscripciones__heading'>
          <p>Referencia 2026</p>
          <h2 id='costos-title'>Costos educativos</h2>
        </div>
        <div className='inscripciones__costs' role='region' aria-label='Costos educativos de referencia 2026' tabIndex='0'>
          <table>
            <thead><tr><th scope='col'>Nivel</th><th scope='col'>Matrícula</th><th scope='col'>Pensión</th></tr></thead>
            <tbody>{COSTOS_2026.map((costo) => <tr key={costo.nivel}><th scope='row'>{costo.nivel}</th><td>{costo.matricula}</td><td>{costo.pension}</td></tr>)}</tbody>
          </table>
        </div>
        <p className='inscripciones__warning'>Estos valores corresponden al año lectivo 2026 y se presentan únicamente como referencia. Los costos educativos para 2027 serán actualizados de acuerdo con los incrementos autorizados para el nuevo año escolar y serán publicados oficialmente una vez sean definidos.</p>
        <NavLink className='inscripciones__cta' to='/tesoreria'>Consultar costos educativos 2026</NavLink>
      </section>
    </main>
  );
};

export default Inscripciones;
