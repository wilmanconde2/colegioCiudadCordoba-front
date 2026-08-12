// src/constants/inicio.js

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
  'background10_cl',
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
  talleres: '/talleres-emergencia.webp',
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


export const TALLERES_OPCIONES = [
  { label: 'Jardín', value: 'https://drive.google.com/drive/folders/1IP_cwUnn1U9CFW8MKtfMjchl7bU2-3is?usp=sharing' },
  { label: 'Transición A', value: 'https://drive.google.com/drive/folders/1G7_ek8SPunLdtnQqVsf1HU7NgfQlAMN9?usp=drive_link' },
  { label: 'Transición B', value: 'https://drive.google.com/drive/folders/1SECWL_2YhN66_a7oofieaQap6NxMSvqO?usp=drive_link' },
  { label: 'Transición C', value: 'https://drive.google.com/drive/folders/10euyP0WCUNSX5OHdQc0E0ag8jg1ZUqLM?usp=drive_link' },
  { label: '1-1', value: 'https://drive.google.com/drive/folders/1PjGYwJ_S3CBw9lrUO5GVUmQDzjd9kXqQ?usp=drive_link' },
  { label: '1-2', value: 'https://drive.google.com/drive/folders/158J4_NWgBrgHfzyifpm2Ag47QcERk28S?usp=drive_link' },
  { label: '1-3', value: 'https://drive.google.com/drive/folders/16nQSUtf2eC9MyXu4WVqMzm8bseJdvD8H?usp=drive_link' },
  { label: '1-4', value: 'https://drive.google.com/drive/folders/1Cd-wfH__BloIVoajCA1LfaAizPJzw1By?usp=drive_link' },
  { label: '2-1', value: 'https://drive.google.com/drive/folders/1l1-KBTcoCtqPbYo7GM3bvKgnkGNt1UVI?usp=drive_link' },
  { label: '2-2', value: 'https://drive.google.com/drive/folders/1p90awqcSyrEqzngPFLJ8GiE-qOjC3rlu?usp=drive_link' },
  { label: '2-3', value: 'https://drive.google.com/drive/folders/1wiavLeHvJ1epHFYkagZLW_N4kraxAcQH?usp=drive_link' },
  { label: '2-4', value: 'https://drive.google.com/drive/folders/1efeXhmSr40cXXWsD-vfthDU74mt7Vla5?usp=drive_link' },
  { label: '3-1', value: 'https://drive.google.com/drive/folders/1vnXw0iEQINWKnBLBPURbvhY-j3e-IyBN?usp=drive_link' },
  { label: '3-2', value: 'https://drive.google.com/drive/folders/1narnnhiUf5tJMcKOOyCwI-mXxLTZpTSS?usp=drive_link' },
  { label: '3-3', value: 'https://drive.google.com/drive/folders/1VAwchp_cw3GTrNdFHv5d-eWs8L8mq-OQ?usp=drive_link' },
  { label: '3-4', value: 'https://drive.google.com/drive/folders/1puIBUEPY8BxisKaQGEBdApy_UYoZcl64?usp=drive_link' },
  { label: '4-1', value: 'https://drive.google.com/drive/folders/1R-ijjd3KjGZxZMKTztx_BDO04Y3s7peX?usp=drive_link' },
  { label: '4-2', value: 'https://drive.google.com/drive/folders/14GKQeU2qMor0BhTRz0AzgnHpVTOnEBlv?usp=drive_link' },
  { label: '4-3', value: 'https://drive.google.com/drive/folders/1fTdoTKpT56hJu5D4xnsielEu1u4eTBtk?usp=drive_link' },
  { label: '4-4', value: 'https://drive.google.com/drive/folders/12vIKti8AFU12sFpKLq53bgYBKHqo8Am5?usp=drive_link' },
  { label: '5-1', value: 'https://drive.google.com/drive/folders/19bkxf8YhQIJusvC2Q-cxJy2I8xdp5ikk?usp=drive_link' },
  { label: '5-2', value: 'https://drive.google.com/drive/folders/19r15Uzl5QFO6heQihAMbGcxy6ZZdCaWK?usp=drive_link' },
  { label: '5-3', value: 'https://drive.google.com/drive/folders/1mLLvbFeX1kO-A4hU1m7CT05xrTVFs6EE?usp=drive_link' },
  { label: '6-1', value: 'https://drive.google.com/drive/folders/1UmB-E8ZpxKgxVFUwZH2yJpKxU11SqATk?usp=drive_link' },
  { label: '6-2', value: 'https://drive.google.com/drive/folders/1OJi8mwUGFAIk_p6Bhrgxni6Hf00jPh6p?usp=drive_link' },
  { label: '6-3', value: 'https://drive.google.com/drive/folders/1QdPTpExmFT3eu_AS-c0rLkh-PkbZxcUY?usp=drive_link' },
  { label: '6-4', value: 'https://drive.google.com/drive/folders/1z81uBwWkEgoEWlA6wrjjoHwLOMhong9J?usp=drive_link' },
  { label: '6-5', value: 'https://drive.google.com/drive/folders/1LUgOuRmRLefqDCLDR-mph-fXLvW2_172?usp=drive_link' },
  { label: '7-1 COM', value: 'https://drive.google.com/drive/folders/1K7eCewnuwZF85kUVlfvZmBtKHm2uwa0X?usp=drive_link' },
  { label: '7-2 COM', value: 'https://drive.google.com/drive/folders/12DFqyMdS4tknJUCMgEHdF-jV7z4n5BfH?usp=drive_link' },
  { label: '7-3 COM', value: 'https://drive.google.com/drive/folders/1Ao6vy_P-m3w9naeUZXeqr4MhQisDRJF9?usp=drive_link' },
  { label: '7-1 IND', value: 'https://drive.google.com/drive/folders/13TGaH8iUO4aOuqTxwUsD2SQ_4yqTQBWj?usp=drive_link' },
  { label: '7-2 IND', value: 'https://drive.google.com/drive/folders/1mezhHq2jGFR1mkMw7Dl5T_NaEex_gUKw?usp=drive_link' },
  { label: '8-1 COM', value: 'https://drive.google.com/drive/folders/1HVHALobcKwdAMWYmzvuxaebz_sYvjdeu?usp=drive_link' },
  { label: '8-2 COM', value: 'https://drive.google.com/drive/folders/1bSwW4Phn1q4vF7VvyGssdfH7BjWO2c2n?usp=drive_link' },
  { label: '8-1 IND', value: 'https://drive.google.com/drive/folders/170gKn2QKhXfFLyk0m1izrYUyhlOfHl8m?usp=drive_link' },
  { label: '8-2 IND', value: 'https://drive.google.com/drive/folders/1C9TS2aXGqAq_QpSpACbQFu63nK7Sr80Y?usp=drive_link' },
  { label: '9-1 COM', value: 'https://drive.google.com/drive/folders/1XZ5rjnBZTtgpt9xlwnIowfQ8a4-oyqCx?usp=drive_link' },
  { label: '9-2 COM', value: 'https://drive.google.com/drive/folders/19S9RxJ3Nj6JYLHsK2aZ07T5qdbdYaFwp?usp=drive_link' },
  { label: '9-3 COM', value: 'https://drive.google.com/drive/folders/1C5QYLwysRKTIaTinSm9O2eEg9UEXPkHI?usp=drive_link' },
  { label: '9-1 IND', value: 'https://drive.google.com/drive/folders/11dKORvYMg2I9xZPk8pon-T6iiTNIHi2B?usp=drive_link' },
  { label: '9-2 IND', value: 'https://drive.google.com/drive/folders/1itUr0QHJ8XtWzf5hbP49vXNi_ZqhCy4a?usp=drive_link' },
  { label: '9-3 IND', value: 'https://drive.google.com/drive/folders/1YtRh7s1EEUT4wA5tHlMBcN2SQ-NbjQf_?usp=drive_link' },
  { label: '10-1 COM', value: 'https://drive.google.com/drive/folders/1vFYO3ssZgwrMFRxRhyh8fRHiIi3pZ-mZ?usp=drive_link' },
  { label: '10-2 COM', value: 'https://drive.google.com/drive/folders/1Ljwf0HMFiaRg6IQL1uqAY5waFdjcBWX6?usp=drive_link' },
  { label: '10-1 IND', value: 'https://drive.google.com/drive/folders/1JL3TZlwssVElgo5pkr0nA0qkz2NCy_3b?usp=drive_link' },
  { label: '10-2 IND', value: 'https://drive.google.com/drive/folders/1BGkL9TxqSyr2fd1sZ6XMakeyFOReK7pF?usp=drive_link' },
  { label: '11-1 COM', value: 'https://drive.google.com/drive/folders/1V_N4i-q9ev_ghdjnIAwdOENCQunmYyFt?usp=drive_link' },
  { label: '11-1 IND', value: 'https://drive.google.com/drive/folders/1k_gGCtijog12iQSzWecxz7hsFiiX2Zki?usp=drive_link' },
  { label: '11-2 int', value: 'https://drive.google.com/drive/folders/1wI2TqgYk8vRHPui1WRD3zgKuReGHl5a3?usp=drive_link' },
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
