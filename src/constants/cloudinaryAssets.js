// src/constants/cloudinaryAssets.js

import { cldRawUrl, cldUrl } from '../utils/cloudinary';

const imageUrl = (publicId, width) =>
  cldUrl(publicId, {
    w: width,
    c: 'fit',
    ar: null,
    q: 'auto',
    f: 'auto',
    dpr: 1,
  });

export const CLOUDINARY_ASSETS = {
  codigoQR: imageUrl('codigoQR_cl', 460),
  pse: imageUrl('pse_cl', 700),
  horarioPrimaria: imageUrl('horarioPrimaria_cl', 1600),
  horarioPrimariaRaw: cldRawUrl('horarioPrimaria_cl'),
  horarioSecundaria: imageUrl('horarioSecundaria_cl', 1600),
  horarioSecundariaRaw: cldRawUrl('horarioSecundaria_cl'),
  clubCCC: imageUrl('clubCCC_cl', 306),
  logo: imageUrl('logo_cl', 256),
  ppf: imageUrl('ppf_cl', 640),
  cronograma2026: imageUrl('cronograma2026_cl', 1200),
  horarioCoordinadores: imageUrl('horarioCoordinadores_cl', 1600),
  horarioPsicologia: imageUrl('horarioPsicologia_cl', 1600),
  manual: imageUrl('manual_cl', 800),
  mision: imageUrl('mision_cl', 1100),
  comercial: imageUrl('comercial_cl', 1200),
  industrial: imageUrl('industrial_cl', 1200),
  pqrs: imageUrl('pqrs_cl', 1000),
  costos2026: imageUrl('costos2026_cl', 1600),
};
