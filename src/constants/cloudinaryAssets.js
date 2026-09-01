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
  pse: imageUrl('v1787787304/pse_cl', 700),
  horarioPrimaria: imageUrl('v1787796427/horarioPrimaria_cl', 1600),
  horarioPrimariaRaw: cldRawUrl('v1786813789/horarioPrimaria_cl'),
  horarioSecundaria: imageUrl('v1787669265/horarioSecundaria_cl', 1600),
  horarioSecundariaRaw: cldRawUrl('v1786813506/horarioSecundaria_cl'),
  clubCCC: imageUrl('v1788279960/clubCCC_cl', 306),
  logo: imageUrl('v1786815674/logo_cl', 256),
  ppf: imageUrl('v1786815658/ppf_cl', 640),
  cronograma2026: imageUrl('v1786813627/cronograma2026_cl', 1200),
  horarioCoordinadores: imageUrl('v1786813616/horarioCoordinadores_cl', 1600),
  horarioPsicologia: imageUrl('v1786813600/horarioPsicologia_cl', 1600),
  manual: imageUrl('manual_cl', 800),
  mision: imageUrl('mision_cl', 1100),
  comercial: imageUrl('comercial_cl', 1200),
  industrial: imageUrl('industrial_cl', 1200),
  pqrs: imageUrl('pqrs_cl', 1000),
  costos2026: imageUrl('v1786813633/costos2026_cl', 1600),
};
