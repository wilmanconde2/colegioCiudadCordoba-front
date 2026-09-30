export const SITE_URL = 'https://colegiociudadcordoba.edu.co';

export const DEFAULT_DESCRIPTION =
  'Sitio oficial del Colegio Ciudad Córdoba en Cali: información institucional, inscripciones, servicios, tesorería y contacto.';

export const SOCIAL_IMAGE_URL =
  'https://res.cloudinary.com/dx5zamphx/image/upload/f_auto,q_auto,w_1200,c_fit/v1786815658/ppf_cl';

export const ROUTE_METADATA = Object.freeze({
  '/': {
    title: 'Inicio',
    description: DEFAULT_DESCRIPTION,
  },
  '/inscripciones': {
    title: 'Inscripciones 2027',
    description:
      'Información oficial sobre inscripciones 2027, jornadas, servicios, proceso de inscripción y costos educativos del Colegio Ciudad Córdoba.',
  },
  '/tesoreria': {
    title: 'Tesorería',
    description: 'Información de costos educativos y medios de pago del Colegio Ciudad Córdoba.',
  },
  '/contacto': {
    title: 'Contáctanos',
    description:
      'Dirección, teléfonos, correo y horarios de atención del Colegio Ciudad Córdoba en Cali.',
  },
});
