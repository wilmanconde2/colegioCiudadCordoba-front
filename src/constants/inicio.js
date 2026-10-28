// src/constants/inicio.js

import { cldUrl, cldSrcSet } from '../utils/cloudinary';

export const CARRUSEL_PUBLIC_IDS = [
  'background1_cl',
  'background2_cl',
  'background3_cl',
  'v1791843450/background4_cl',
  'background5_cl',
  'v1791843462/background6_cl',
  'background7_cl',
  'v1791843489/background8_cl',
  'v1791843429/background9_cl',
  'background10_cl',
];

const CARRUSEL_WIDTHS = [320, 480, 640, 960, 1280, 1600, 1920];
const RESPONSIVE_IMAGE_OPTIONS = { c: 'fit', q: 'auto', f: 'auto', dpr: 1, ar: null };

const capWidths = (widths, maxWidth) => [
  ...widths.filter((width) => width < maxWidth),
  maxWidth,
];
const CARRUSEL_SIZES =
  '(min-width: 1445px) 520px, (min-width: 992px) 36vw, (min-width: 768px) 50vw, 80vw';

export const CARRUSEL_IMAGES = CARRUSEL_PUBLIC_IDS.map((id) => ({
  src: cldUrl(id, { ...RESPONSIVE_IMAGE_OPTIONS, w: 1280 }),
  // Width-descriptor srcset already lets the browser account for DPR.
  // Keep Cloudinary DPR at 1 here to avoid requesting an oversized variant twice.
  srcSet: cldSrcSet(id, CARRUSEL_WIDTHS, RESPONSIVE_IMAGE_OPTIONS),
  sizes: CARRUSEL_SIZES,
  alt: 'fondo',
}));

// —— Cards ——
const CARD_WIDTHS = [240, 320, 480, 640, 800, 1200, 1600];
const CARD_SIZES =
  '(min-width: 1200px) 30vw, (min-width: 992px) 35vw, (min-width: 768px) 45vw, (min-width: 576px) 55vw, 65vw';

// Tesorería is a wide banner, not a card. The current CSS renders it at
// 80% of an 80%-wide container, so its effective rendered width is ~64vw.
const TESORERIA_PUBLIC_ID = 'v1788379473/tesoreria-btn_cl';
const TESORERIA_WIDTHS = [320, 480, 640, 800, 960, 1280, 1600, 1700];
const TESORERIA_SIZES = '64vw';

export const CARD_IMGS = {
  circular: {
    src: cldUrl('v1793216124/circular_cl', { ...RESPONSIVE_IMAGE_OPTIONS, w: 1200 }),
    srcSet: cldSrcSet('v1793216124/circular_cl', CARD_WIDTHS, RESPONSIVE_IMAGE_OPTIONS),
    sizes: CARD_SIZES,
  },
  reporte: {
    src: cldUrl('reporte_cl', { ...RESPONSIVE_IMAGE_OPTIONS, w: 1200 }),
    srcSet: cldSrcSet('reporte_cl', CARD_WIDTHS, RESPONSIVE_IMAGE_OPTIONS),
    sizes: CARD_SIZES,
  },
  recuperacion: {
    src: cldUrl('v1792203729/recuperacion_cl', { ...RESPONSIVE_IMAGE_OPTIONS, w: 1122 }),
    srcSet: cldSrcSet('v1792203729/recuperacion_cl', capWidths(CARD_WIDTHS, 1122), RESPONSIVE_IMAGE_OPTIONS),
    sizes: CARD_SIZES,
    width: 1122,
    height: 1402,
  },
  horarios: {
    src: cldUrl('horarios_cl', { ...RESPONSIVE_IMAGE_OPTIONS, w: 1200 }),
    srcSet: cldSrcSet('horarios_cl', CARD_WIDTHS, RESPONSIVE_IMAGE_OPTIONS),
    sizes: CARD_SIZES,
  },
};

export const INICIO_HERO_IMAGES = {
  infoInscripciones: {
    src: cldUrl('v1791502726/infoInscripciones_cl', { ...RESPONSIVE_IMAGE_OPTIONS, w: 800 }),
    srcSet: cldSrcSet('v1791502726/infoInscripciones_cl', [160, 240, 320, 480, 640, 800], RESPONSIVE_IMAGE_OPTIONS),
    sizes: '(min-width: 1500px) 360px, (min-width: 1400px) 24vw, (min-width: 992px) 21vw, (min-width: 849px) 280px, (min-width: 440px) 33vw, 145px',
    width: 800,
    height: 533,
  },
  prize: {
    src: cldUrl('v1786815728/prize_cl', { ...RESPONSIVE_IMAGE_OPTIONS, w: 800 }),
    srcSet: cldSrcSet('v1786815728/prize_cl', [160, 240, 320, 480, 640, 800], RESPONSIVE_IMAGE_OPTIONS),
    sizes: '(min-width: 1500px) 360px, (min-width: 1400px) 24vw, (min-width: 992px) 21vw, (min-width: 849px) 280px, (min-width: 440px) 33vw, 145px',
    width: 800,
    height: 800,
  },
  circularEspecial: {
    src: cldUrl('v1786860811/circular-especial_cl', { ...RESPONSIVE_IMAGE_OPTIONS, w: 800 }),
    srcSet: cldSrcSet('v1786860811/circular-especial_cl', capWidths(CARD_WIDTHS, 1000), RESPONSIVE_IMAGE_OPTIONS),
    sizes: CARD_SIZES,
    width: 1000,
    height: 533,
  },
  tesoreriaBtn: {
    src: cldUrl(TESORERIA_PUBLIC_ID, { ...RESPONSIVE_IMAGE_OPTIONS, w: 1280 }),
    srcSet: cldSrcSet(TESORERIA_PUBLIC_ID, TESORERIA_WIDTHS, RESPONSIVE_IMAGE_OPTIONS),
    sizes: TESORERIA_SIZES,
    width: 1700,
    height: 925,
  },
};

const PROFILE_IMAGE_DIMENSIONS = {
  directivo1_cl: { width: 435, height: 550 },
  directivo2_cl: { width: 960, height: 1280 },
  directivo3_cl: { width: 506, height: 550 },
  directivo4_cl: { width: 960, height: 1280 },
  docente1_cl: { width: 473, height: 550 },
  docente2_cl: { width: 475, height: 550 },
  docente3_cl: { width: 413, height: 550 },
  docente4_cl: { width: 453, height: 550 },
  docente5_cl: { width: 444, height: 550 },
  docente6_cl: { width: 470, height: 550 },
  estudiante1_cl: { width: 381, height: 550 },
  estudiante2_cl: { width: 379, height: 550 },
  estudiante3_cl: { width: 401, height: 550 },
  estudiante4_cl: { width: 382, height: 550 },
  egresado1_cl: { width: 469, height: 550 },
  egresado2_cl: { width: 434, height: 550 },
  egresado3_cl: { width: 520, height: 550 },
  egresado4_cl: { width: 396, height: 550 },
  egresado5_cl: { width: 446, height: 550 },
  egresado6_cl: { width: 472, height: 550 },
  historia1_cl: { width: 900, height: 630 },
  historia2_cl: { width: 900, height: 621 },
  historia3_cl: { width: 900, height: 400 },
  historia4_cl: { width: 900, height: 529 },
  historia5_cl: { width: 900, height: 526 },
};

export const BACKGROUND_IMAGES_DIRECTIVO = [
  'directivo1_cl',
  'directivo2_cl',
  'directivo3_cl',
  'directivo4_cl',
].map((id) => ({
  src: cldUrl(id, { ...RESPONSIVE_IMAGE_OPTIONS, w: PROFILE_IMAGE_DIMENSIONS[id].width }),
  srcSet: cldSrcSet(
    id,
    capWidths([320, 480, 640, 960], PROFILE_IMAGE_DIMENSIONS[id].width),
    RESPONSIVE_IMAGE_OPTIONS,
  ),
  sizes: '(min-width: 992px) 45vw, 90vw',
  alt: 'fondo',
  ...PROFILE_IMAGE_DIMENSIONS[id],
}));

export const BACKGROUND_IMAGES_DOCENTE = [
  'docente1_cl',
  'docente2_cl',
  'docente3_cl',
  'docente4_cl',
  'docente5_cl',
  'docente6_cl',
].map((id) => ({
  src: cldUrl(id, { ...RESPONSIVE_IMAGE_OPTIONS, w: PROFILE_IMAGE_DIMENSIONS[id].width }),
  srcSet: cldSrcSet(
    id,
    capWidths([320, 480, 640, 960], PROFILE_IMAGE_DIMENSIONS[id].width),
    RESPONSIVE_IMAGE_OPTIONS,
  ),
  sizes: '(min-width: 992px) 45vw, 90vw',
  alt: 'fondo',
  ...PROFILE_IMAGE_DIMENSIONS[id],
}));

export const BACKGROUND_IMAGES_ESTUDIANTE = [
  'estudiante1_cl',
  'estudiante2_cl',
  'estudiante3_cl',
  'estudiante4_cl',
].map((id) => ({
  src: cldUrl(id, { ...RESPONSIVE_IMAGE_OPTIONS, w: PROFILE_IMAGE_DIMENSIONS[id].width }),
  srcSet: cldSrcSet(
    id,
    capWidths([320, 480, 640, 960], PROFILE_IMAGE_DIMENSIONS[id].width),
    RESPONSIVE_IMAGE_OPTIONS,
  ),
  sizes: '(min-width: 992px) 45vw, 90vw',
  alt: 'fondo',
  ...PROFILE_IMAGE_DIMENSIONS[id],
}));

export const BACKGROUND_IMAGES_EGRESADO = [
  'egresado1_cl',
  'egresado2_cl',
  'egresado3_cl',
  'egresado4_cl',
  'egresado5_cl',
  'egresado6_cl',
].map((id) => ({
  src: cldUrl(id, { ...RESPONSIVE_IMAGE_OPTIONS, w: PROFILE_IMAGE_DIMENSIONS[id].width }),
  srcSet: cldSrcSet(
    id,
    capWidths([320, 480, 640, 960], PROFILE_IMAGE_DIMENSIONS[id].width),
    RESPONSIVE_IMAGE_OPTIONS,
  ),
  sizes: '(min-width: 992px) 45vw, 90vw',
  alt: 'fondo',
  ...PROFILE_IMAGE_DIMENSIONS[id],
}));

export const BACKGROUND_IMAGES_HISTORIA = [
  'historia1_cl',
  'historia2_cl',
  'historia3_cl',
  'historia4_cl',
  'historia5_cl',
].map((id) => ({
  src: cldUrl(id, { ...RESPONSIVE_IMAGE_OPTIONS, w: PROFILE_IMAGE_DIMENSIONS[id].width }),
  srcSet: cldSrcSet(
    id,
    capWidths([320, 480, 640, 960], PROFILE_IMAGE_DIMENSIONS[id].width),
    RESPONSIVE_IMAGE_OPTIONS,
  ),
  sizes: '(min-width: 992px) 45vw, 90vw',
  alt: 'fondo',
  ...PROFILE_IMAGE_DIMENSIONS[id],
}));

export const REPORTE_OPCIONES = [
  {
    label: '6-1 COM',
    value: 'https://drive.google.com/drive/folders/17OK7HREI7cHBXGQGKamQ0WB300nSb5BE',
  },
  {
    label: '6-2 COM',
    value: 'https://drive.google.com/drive/folders/1cnEHQC89lErsLqzkGfYbDV9MK_xCIGTK',
  },
  {
    label: '6-3 COM',
    value: 'https://drive.google.com/drive/folders/14P5h5VW_C47HA2qyV3flGpUhMEHsRZx_',
  },
  {
    label: '6-1 IND',
    value: 'https://drive.google.com/drive/folders/1s2Jzy1JKgaU8GaubwpzuGMFuCq2hp3ql',
  },
  {
    label: '6-2 IND',
    value: 'https://drive.google.com/drive/folders/1QyoKaQy5UZhbNw5jvKlYkgGDNfGh03Mx',
  },
  {
    label: '7-1 COM',
    value: 'https://drive.google.com/drive/folders/1Vqc8fzuuuvwI8L_MBxeX4zr3dx8Y3yoN',
  },
  {
    label: '7-2 COM',
    value: 'https://drive.google.com/drive/folders/1pg9GN9E-HjgTWGkZauIYTHGin9F2faX-',
  },
  {
    label: '7-1 IND',
    value: 'https://drive.google.com/drive/folders/1ZkpAoRPkhQwtIIZ_phb2JziNLEDazjRO',
  },
  {
    label: '7-2 IND',
    value: 'https://drive.google.com/drive/folders/1eCDBHi7pjfs3lMSFH55RrwdNOvXWwSZ6',
  },
  {
    label: '8-1 COM',
    value: 'https://drive.google.com/drive/folders/1Od-X7idicx4IdfG8YJWLrrTZE2xqQMPD',
  },
  {
    label: '8-2 COM',
    value: 'https://drive.google.com/drive/folders/1Hy6n7cSdzcDXhexQQPbPCi0CvaG8fgwo',
  },
  {
    label: '8-3 COM',
    value: 'https://drive.google.com/drive/folders/15vvx74ZkpiePIuUkX5bU-wyFqbpfnFI_',
  },
  {
    label: '8-1 IND',
    value: 'https://drive.google.com/drive/folders/1_tNoRFHMl8uEDQbsyuTzNX6RHzC0W5Qm',
  },
  {
    label: '8-2 IND',
    value: 'https://drive.google.com/drive/folders/135R664bD-p-0JQsW2uHrvqog7K30w40Q',
  },
  {
    label: '8-3 IND',
    value: 'https://drive.google.com/drive/folders/1nr4iWTkNedI38A9ey8gXfG71FlFJMrSr',
  },
  {
    label: '9-1 COM',
    value: 'https://drive.google.com/drive/folders/1rFr7T64_ulBtBEl1OGEAxnEEesV6Wzxg',
  },
  {
    label: '9-2 COM',
    value: 'https://drive.google.com/drive/folders/1E5hscfo7b9Gmlo1FiZHdkxCXZ92DN23A',
  },
  {
    label: '9-1 IND',
    value: 'https://drive.google.com/drive/folders/1F_3-1TonsQ3rBBJDuRZ3pwE3HlD4K1pK',
  },
  {
    label: '9-2 IND',
    value: 'https://drive.google.com/drive/folders/1fY7dmeCniC0LiCvWGem6NxkMP__p-zmx',
  },
  {
    label: '10-1 COM',
    value: 'https://drive.google.com/drive/folders/1u152ki2hO-3uL-S9tTyBP_BoI1_gr1vM',
  },
  {
    label: '10-1 IND',
    value: 'https://drive.google.com/drive/folders/1sx9cM8iQlmBsU6a8prSsr-piXf9lMxyY',
  },
  {
    label: '10-2 INT',
    value: 'https://drive.google.com/drive/folders/1XrG9eu36buUT49v_36n6aRee2wjIgWyk',
  },
  {
    label: '11-1 COM',
    value: 'https://drive.google.com/drive/folders/10T6e_5DI8IY0bTQomqx9K6i8jTmthY4D',
  },
  {
    label: '11-2 COM',
    value: 'https://drive.google.com/drive/folders/15IjQ95nBQRH3ReCm3pbWS-dr6LHdpgs9',
  },
  {
    label: '11-1 IND',
    value: 'https://drive.google.com/drive/folders/1vzwg96ELos0HTn_-tnMV6qvdRlsbS53x',
  },
  {
    label: '11-2 IND',
    value: 'https://drive.google.com/drive/folders/15f8NWTAKHbnStsQ_lsKFSIICFyNZNyJt',
  },
];

export const RECUPERACION_OPCIONES = [
  {
    label: 'Transición',
    value: 'https://drive.google.com/drive/folders/1Uobyu-micyiGv2OUrBEQCk-Wrbu11SXM',
  },
  {
    label: 'Primero',
    value: 'https://drive.google.com/drive/folders/1g86t0Co61bCOsRywKGIOS24R0lYnXOOp',
  },
  {
    label: 'Segundo',
    value: 'https://drive.google.com/drive/folders/1kZtCzWXSNCjYhsPDSaBS1L3vEY_8oLrh',
  },
  {
    label: 'Tercero',
    value: 'https://drive.google.com/drive/folders/1QmqEUqv_Dq-42KyYXQMF9WzqSHBOdSFK',
  },
  {
    label: 'Cuarto',
    value: 'https://drive.google.com/drive/folders/130nN9B4hIGav7Cano4fxraivO9xrCnE4',
  },
  {
    label: 'Quinto',
    value: 'https://drive.google.com/drive/folders/1KkWEzh9tfHSjHDrtccihf1j5b3cPvDOh',
  },
  {
    label: '6',
    value: 'https://drive.google.com/drive/folders/16s5JE3ixvVrgQXhSgLVF6IJsDx3WRWU3?usp=sharing',
  },
  // {
  //   label: '6 IND',
  //   value: 'https://drive.google.com/drive/folders/1tw_eg8YfRsEjATHyuQNroGhPPbjb25Qj',
  // },
  {
    label: '7 COM',
    value: 'https://drive.google.com/drive/folders/18dT8BcO2wFrXGlWSl6ozrmdY2GzvLoP_?usp=drive_link',
  },
  {
    label: '7 IND',
    value: 'https://drive.google.com/drive/folders/14bECStVIOL8ReTOLW8PxNe7YK60eRVVr?usp=drive_link',
  },
  {
    label: '8 COM',
    value: 'https://drive.google.com/drive/folders/1LggSJVMZiGmj6oSduZdAgs4Uw7xEEHri?usp=drive_link',
  },
  {
    label: '8 IND',
    value: 'https://drive.google.com/drive/folders/1iahcyi26WddzyVGCYyv-pBui8kW7Kq2_?usp=sharing',
  },
  {
    label: '9 COM',
    value: 'https://drive.google.com/drive/folders/1WGuY5bWuGY8SEyI8tni7L0GOxQEtaLpy?usp=drive_link',
  },
  {
    label: '9 IND',
    value: 'https://drive.google.com/drive/folders/1J7iT67Zqhon1RUFw2SwC2oIppE-FJZjS?usp=drive_link',
  },
  {
    label: '10 COM',
    value: 'https://drive.google.com/drive/folders/15XrnuWK3MOxxfiGpM8fzi1LkH2Ww_aMq?usp=drive_link',
  },
  {
    label: '10 IND',
    value: 'https://drive.google.com/drive/folders/1sSZAbk9B6MUyLvExl-GNlrpeWitIJz6F?usp=drive_link',
  },
  {
    label: '11 COM',
    value: 'https://drive.google.com/drive/folders/1tM4MdxHO2rXMKXzsPtjL6F0vBii2LCE6?usp=drive_link',
  },
  {
    label: '11 IND',
    value: 'https://drive.google.com/drive/folders/1sKURnT-8wzvttG5tdULdrvBaGxGsT3YM?usp=drive_link',
  },
];
