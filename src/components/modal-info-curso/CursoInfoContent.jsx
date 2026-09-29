import PropTypes from 'prop-types';
import { GOOGLE_FORM_URL, HORARIOS_ALUMNOS } from './modalInfoCursoData';

const CursoInfoContent = ({ content, horarioSel, onHorarioChange, tab }) => (
  <div className='ModalCursos__bodySingle'>
    {tab === 'horarios' && (
      <div className='ModalCursos__horariosPicker'>
        {Object.entries(HORARIOS_ALUMNOS).map(([id, option]) => (
          <button
            key={id}
            type='button'
            className={`ModalCursos__horarioBtn ${horarioSel === id ? 'is-active' : ''}`}
            onClick={() => onHorarioChange(id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    )}

    {content.type === 'empty' ? (
      <div className='ModalCursos__empty'>{content.msg}</div>
    ) : content.type === 'iframe' ? (
      <div>
        <div
          style={{
            width: '82%',
            maxWidth: '720px',
            margin: '0 auto',
            aspectRatio: '16 / 9',
            maxHeight: '45vh',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#000',
          }}
        >
          <iframe
            title={content.title}
            src={content.url}
            allow='autoplay; encrypted-media; fullscreen; picture-in-picture'
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
          />
        </div>
      </div>
    ) : content.type === 'pick-horario' ? (
      <div className='ModalCursos__empty'>
        Selecciona una opción: Primaria o Bachillerato.
      </div>
    ) : (
      <div style={{ maxHeight: '70vh', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {tab === 'general' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 12,
              marginBottom: 12,
              flexWrap: 'wrap',
            }}
          >
            <div className='confirmar' style={{ fontWeight: 600 }}>
              Recuerda confirmar asistencia:
            </div>

            <a
              href={GOOGLE_FORM_URL}
              target='_blank'
              rel='noreferrer'
              className='BuscadorCursoCard__cta'
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Confirmar Asistencia Aquí
            </a>
          </div>
        )}

        <a
          className='abrirFull'
          href={content.rawUrl}
          target='_blank'
          rel='noreferrer'
          style={{ display: 'inline-block', marginBottom: 10 }}
          aria-label='Abrir en tamaño completo'
          title='Abrir en tamaño completo'
        >
          Abrir en tamaño completo
        </a>

        <img
          src={content.url}
          alt={content.title}
          loading='lazy'
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    )}
  </div>
);

CursoInfoContent.propTypes = {
  content: PropTypes.shape({
    msg: PropTypes.string,
    rawUrl: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['empty', 'iframe', 'image', 'pick-horario']).isRequired,
    url: PropTypes.string,
  }).isRequired,
  horarioSel: PropTypes.oneOf(['primaria', 'bachillerato']),
  onHorarioChange: PropTypes.func.isRequired,
  tab: PropTypes.oneOf(['general', 'horarios', 'video']).isRequired,
};

export default CursoInfoContent;
