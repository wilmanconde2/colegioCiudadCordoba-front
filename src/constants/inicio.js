import { cldUrl, cldSrcSet } from '../utils/cloudinary';

export const CARRUSEL_PUBLIC_IDS = [
  'background1_cl',
  'background2_cl',
  'background3_cl',
  'background4_cl',
  'background5_cl',
  'background6_cl',
  'background7_cl',
  'background8_cl',
  'background9_cl',
];

const CARRUSEL_WIDTHS = [640, 960, 1280, 1600, 1920];

export const CARRUSEL_IMAGES = CARRUSEL_PUBLIC_IDS.map((id) => ({
  src: cldUrl(id, { w: 1280, c: 'fit' }),
  srcSet: cldSrcSet(id, CARRUSEL_WIDTHS, { c: 'fit' }),
  sizes: '100vw',
  alt: 'fondo',
}));

// —— Portada / Inscripciones ——
const FECHA_WIDTHS = [480, 640, 768, 1024, 1280, 1600];
export const FECHA_IMG = {
  src: cldUrl('fecha_cl', { w: 1280, c: 'fit' }),
  srcSet: cldSrcSet('fecha_cl', FECHA_WIDTHS, { c: 'fit' }),
  sizes: '(min-width:576px) 70vw, 80vw',
  width: 1280,
};

const INSC_WIDTHS = [300, 600];
export const INSC_IMG = {
  src: cldUrl('inscripciones_cl', { w: 600, c: 'fit' }),
  srcSet: cldSrcSet('inscripciones_cl', INSC_WIDTHS, { c: 'fit' }),
  sizes: '300px',
  width: 600,
};

// —— Cards ——
const CARD_WIDTHS = [600, 800, 1200, 1600];
const CARD_SIZES = '(min-width:1200px) 600px, (min-width:768px) 400px, 90vw';

export const CARD_IMGS = {
  circular: {
    src: cldUrl('circular_cl', { w: 1200, c: 'fit', q: 'auto', f: 'auto', dpr: 'auto' }),
    srcSet: cldSrcSet('circular_cl', CARD_WIDTHS, { c: 'fit', q: 'auto', f: 'auto' }),
    sizes: CARD_SIZES,
  },
  reporte: {
    src: cldUrl('reporte_cl', { w: 1200, c: 'fit', q: 'auto', f: 'auto', dpr: 'auto' }),
    srcSet: cldSrcSet('reporte_cl', CARD_WIDTHS, { c: 'fit', q: 'auto', f: 'auto' }),
    sizes: CARD_SIZES,
  },
  recuperacion: {
    src: cldUrl('recuperacion_cl', { w: 1200, c: 'fit', q: 'auto', f: 'auto', dpr: 'auto' }),
    srcSet: cldSrcSet('recuperacion_cl', CARD_WIDTHS, { c: 'fit', q: 'auto', f: 'auto' }),
    sizes: CARD_SIZES,
  },
  horarios: {
    src: cldUrl('horarios_cl', { w: 1200, c: 'fit', q: 'auto', f: 'auto', dpr: 'auto' }),
    srcSet: cldSrcSet('horarios_cl', CARD_WIDTHS, { c: 'fit', q: 'auto', f: 'auto' }),
    sizes: CARD_SIZES,
  },
  matricula: {
    src: cldUrl('matricula_cl', { w: 1200, c: 'fit', q: 'auto', f: 'auto', ar: null }),
    srcSet: cldSrcSet('matricula_cl', CARD_WIDTHS, { c: 'fit', q: 'auto', f: 'auto', ar: null }),
    sizes: CARD_SIZES,
  },

};

export const BACKGROUND_IMAGES_DIRECTIVO = [
  '/directivo1.webp',
  '/directivo2.webp',
  '/directivo3.webp',
  '/directivo4.webp',
];
export const BACKGROUND_IMAGES_DOCENTE = [
  '/docente1.webp',
  '/docente2.webp',
  '/docente3.webp',
  '/docente4.webp',
  '/docente5.webp',
  '/docente6.webp',
];
export const BACKGROUND_IMAGES_ESTUDIANTE = [
  '/estudiante1.webp',
  '/estudiante2.webp',
  '/estudiante3.webp',
  '/estudiante4.webp',
];
export const BACKGROUND_IMAGES_EGRESADO = [
  '/egresado1.webp',
  '/egresado2.webp',
  '/egresado3.webp',
  '/egresado4.webp',
  '/egresado5.webp',
  '/egresado6.webp',
  '/egresado7.webp',
  '/egresado8.webp',
  '/egresado9.webp',
  '/egresado10.webp',
];
export const BACKGROUND_IMAGES_HISTORIA = [
  '/historia1.webp',
  '/historia2.webp',
  '/historia3.webp',
  '/historia4.webp',
  '/historia5.webp',
];

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
    label: '6 COM',
    value: 'https://drive.google.com/drive/folders/1__TEGZa-HLe_MHRczk40ql6jC95zSCFM',
  },
  {
    label: '6 IND',
    value: 'https://drive.google.com/drive/folders/1tw_eg8YfRsEjATHyuQNroGhPPbjb25Qj',
  },
  {
    label: '7 COM',
    value: 'https://drive.google.com/drive/folders/1wqIH_pEk0cpCItY7MzaBPbpKBPvvFiFE',
  },
  {
    label: '7 IND',
    value: 'https://drive.google.com/drive/folders/1dl57J3j2MX0ltokyAGF0G4uxAaL-2TXr',
  },
  {
    label: '8 COM',
    value: 'https://drive.google.com/drive/folders/1q8Gf5FskueEghlDteaEWbnDptasNvHQV',
  },
  {
    label: '8 IND',
    value: 'https://drive.google.com/drive/folders/1wE1OC7SHUlH3pDES1DtgAlkvt5NczXFj',
  },
  {
    label: '9 COM',
    value: 'https://drive.google.com/drive/folders/1jV6myZSr3CR-KRT_Q2vAeRGsBC61PoXZ',
  },
  {
    label: '9 IND',
    value: 'https://drive.google.com/drive/folders/1FRCX_NY3FyFoTFhxnNDzPu7OZ28ixDIM',
  },
  {
    label: '10 COM',
    value: 'https://drive.google.com/drive/folders/1y4_gqmPOhlIw7V4Snu88KTH6ae9l3LSV',
  },
  {
    label: '10 IND',
    value: 'https://drive.google.com/drive/folders/14yKv-Uva0SNpRSyyAMF_UDMvCa8LUG09',
  },
  {
    label: '11 COM',
    value: 'https://drive.google.com/drive/folders/1W_bIiKMnGo4r0Q9-VvIGsmeXowsv1wdh',
  },
  {
    label: '11 IND',
    value: 'https://drive.google.com/drive/folders/1aWSnHugjjKp1AYasgrOC16fkgYQ1vRRv',
  },
];
