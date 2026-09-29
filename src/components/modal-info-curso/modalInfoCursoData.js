import { CLOUDINARY_ASSETS } from '../../constants/cloudinaryAssets';

export const GOOGLE_FORM_URL = 'https://forms.gle/c5ZpYPmrNSTnczn49';

export const MODAL_TABS = [
  { id: 'general', label: '1. Ver información general' },
  { id: 'horarios', label: '2. Ver horarios de atención de profesores' },
  { id: 'video', label: '3. Ver video informativo del curso' },
];

export const HORARIOS_ALUMNOS = {
  primaria: {
    label: 'Horario Primaria',
    rawUrl: CLOUDINARY_ASSETS.horarioPrimariaRaw,
    title: 'Horario Primaria',
  },
  bachillerato: {
    label: 'Horario Bachillerato',
    rawUrl: CLOUDINARY_ASSETS.horarioSecundariaRaw,
    title: 'Horario Bachillerato',
  },
};
