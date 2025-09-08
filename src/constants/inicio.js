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
    value: 'https://drive.google.com/drive/folders/1UmB-E8ZpxKgxVFUwZH2yJpKxU11SqATk',
  },
  {
    label: '6-2 COM',
    value: 'https://drive.google.com/drive/folders/1QdPTpExmFT3eu_AS-c0rLkh-PkbZxcUY',
  },
  {
    label: '6-1 IND',
    value: 'https://drive.google.com/drive/folders/1OJi8mwUGFAIk_p6Bhrgxni6Hf00jPh6p',
  },
  {
    label: '6-2 IND',
    value: 'https://drive.google.com/drive/folders/1z81uBwWkEgoEWlA6wrjjoHwLOMhong9J',
  },
  {
    label: '7-1 COM',
    value: 'https://drive.google.com/drive/folders/1K7eCewnuwZF85kUVlfvZmBtKHm2uwa0X',
  },
  {
    label: '7-2 COM',
    value: 'https://drive.google.com/drive/folders/12DFqyMdS4tknJUCMgEHdF-jV7z4n5BfH',
  },
  {
    label: '7-3 COM',
    value: 'https://drive.google.com/drive/folders/1Ao6vy_P-m3w9naeUZXeqr4MhQisDRJF9',
  },
  {
    label: '7-1 IND',
    value: 'https://drive.google.com/drive/folders/13TGaH8iUO4aOuqTxwUsD2SQ_4yqTQBWj',
  },
  {
    label: '7-2 IND',
    value: 'https://drive.google.com/drive/folders/1mezhHq2jGFR1mkMw7Dl5T_NaEex_gUKw',
  },
  {
    label: '7-3 IND',
    value: 'https://drive.google.com/drive/folders/1C8eTps7RD_qgeWPuEAt7-WmrCnBhPq4Y',
  },
  {
    label: '8-1 COM',
    value: 'https://drive.google.com/drive/folders/1HVHALobcKwdAMWYmzvuxaebz_sYvjdeu',
  },
  {
    label: '8-2 COM',
    value: 'https://drive.google.com/drive/folders/1bSwW4Phn1q4vF7VvyGssdfH7BjWO2c2n',
  },
  {
    label: '8-1 IND',
    value: 'https://drive.google.com/drive/folders/170gKn2QKhXfFLyk0m1izrYUyhlOfHl8m',
  },
  {
    label: '8-2 IND',
    value: 'https://drive.google.com/drive/folders/1C9TS2aXGqAq_QpSpACbQFu63nK7Sr80Y',
  },
  {
    label: '9-1 COM',
    value: 'https://drive.google.com/drive/folders/1XZ5rjnBZTtgpt9xlwnIowfQ8a4-oyqCx',
  },
  {
    label: '9-2 COM',
    value: 'https://drive.google.com/drive/folders/19S9RxJ3Nj6JYLHsK2aZ07T5qdbdYaFwp',
  },
  {
    label: '9-1 IND',
    value: 'https://drive.google.com/drive/folders/11dKORvYMg2I9xZPk8pon-T6iiTNIHi2B',
  },
  {
    label: '9-2 IND',
    value: 'https://drive.google.com/drive/folders/1itUr0QHJ8XtWzf5hbP49vXNi_ZqhCy4a',
  },
  {
    label: '10-1 COM',
    value: 'https://drive.google.com/drive/folders/1vFYO3ssZgwrMFRxRhyh8fRHiIi3pZ-mZ',
  },
  {
    label: '10-2 COM',
    value: 'https://drive.google.com/drive/folders/1Ljwf0HMFiaRg6IQL1uqAY5waFdjcBWX6',
  },
  {
    label: '10-1 IND',
    value: 'https://drive.google.com/drive/folders/1JL3TZlwssVElgo5pkr0nA0qkz2NCy_3b',
  },
  {
    label: '10-2 IND',
    value: 'https://drive.google.com/drive/folders/1BGkL9TxqSyr2fd1sZ6XMakeyFOReK7pF',
  },
  {
    label: '11-1 COM',
    value: 'https://drive.google.com/drive/folders/1V_N4i-q9ev_ghdjnIAwdOENCQunmYyFt',
  },
  {
    label: '11-2 COM',
    value: 'https://drive.google.com/drive/folders/1vdeIaCBDEbmA1fOj9TRxb4PNUJr3FPIT',
  },
  {
    label: '11-1 IND',
    value: 'https://drive.google.com/drive/folders/1k_gGCtijog12iQSz cxz7hsFiiX2Zki',
  },
  {
    label: '11-2 IND',
    value: 'https://drive.google.com/drive/folders/1wI2TqgYk8vRHPui1WRD3zgKuReGHl5a3',
  },
];

export const RECUPERACION_OPCIONES = [
  {
    label: 'Transición',
    value: 'https://drive.google.com/drive/folders/1Uobyu-micyiGv2OUrBEQCk-Wrbu11SXM?usp=sharing',
  },
  {
    label: 'Primero',
    value: 'https://drive.google.com/drive/folders/1g86t0Co61bCOsRywKGIOS24R0lYnXOOp?usp=sharing',
  },
  {
    label: 'Segundo',
    value: 'https://drive.google.com/drive/folders/1kZtCzWXSNCjYhsPDSaBS1L3vEY_8oLrh?usp=sharing',
  },
  {
    label: 'Tercero',
    value: 'https://drive.google.com/drive/folders/1QmqEUqv_Dq-42KyYXQMF9WzqSHBOdSFK?usp=sharing',
  },
  {
    label: 'Cuarto',
    value: 'https://drive.google.com/drive/folders/130nN9B4hIGav7Cano4fxraivO9xrCnE4?usp=sharing',
  },
  {
    label: 'Quinto',
    value: 'https://drive.google.com/drive/folders/1KkWEzh9tfHSjHDrtccihf1j5b3cPvDOh?usp=sharing',
  },
  {
    label: '6 COM',
    value: 'https://drive.google.com/drive/folders/1__TEGZa-HLe_MHRczk40ql6jC95zSCFM?usp=sharing',
  },
  {
    label: '6 IND',
    value: 'https://drive.google.com/drive/folders/1tw_eg8YfRsEjATHyuQNroGhPPbjb25Qj?usp=sharing',
  },
  {
    label: '7 COM',
    value: 'https://drive.google.com/drive/folders/1wqIH_pEk0cpCItY7MzaBPbpKBPvvFiFE?usp=sharing',
  },
  {
    label: '7 IND',
    value: 'https://drive.google.com/drive/folders/1dl57J3j2MX0ltokyAGF0G4uxAaL-2TXr?usp=sharing',
  },
  {
    label: '8 COM',
    value: 'https://drive.google.com/drive/folders/1q8Gf5FskueEghlDteaEWbnDptasNvHQV?usp=sharing',
  },
  {
    label: '8 IND',
    value: 'https://drive.google.com/drive/folders/1wE1OC7SHUlH3pDES1DtgAlkvt5NczXFj?usp=sharing',
  },
  {
    label: '9 COM',
    value: 'https://drive.google.com/drive/folders/1jV6myZSr3CR-KRT_Q2vAeRGsBC61PoXZ?usp=sharing',
  },
  {
    label: '9 IND',
    value: 'https://drive.google.com/drive/folders/1FRCX_NY3FyFoTFhxnNDzPu7OZ28ixDIM?usp=sharing',
  },
  {
    label: '10 COM',
    value: 'https://drive.google.com/drive/folders/1y4_gqmPOhlIw7V4Snu88KTH6ae9l3LSV?usp=sharing',
  },
  {
    label: '10 IND',
    value: 'https://drive.google.com/drive/folders/14yKv-Uva0SNpRSyyAMF_UDMvCa8LUG09?usp=sharing',
  },
  {
    label: '11 COM',
    value: 'https://drive.google.com/drive/folders/1W_bIiKMnGo4r0Q9-VvIGsmeXowsv1wdh?usp=sharing',
  },
  {
    label: '11 IND',
    value: 'https://drive.google.com/drive/folders/1aWSnHugjjKp1AYasgrOC16fkgYQ1vRRv?usp=sharing',
  },
];
