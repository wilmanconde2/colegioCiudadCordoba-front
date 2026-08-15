// src/utils/cloudinary.js

const CLOUD_NAME = 'dx5zamphx';

export function cldRawUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
}

export function cldUrl(
  publicId,
  { w, h, ar = null, c = 'fit', f = 'auto', q = 'auto', dpr = 1 } = {},
) {
  const parts = [
    `f_${f}`,
    `q_${q}`,
    `dpr_${dpr}`,
    ar ? `ar_${ar}` : null,
    c ? `c_${c}` : null,
    w ? `w_${w}` : null,
    h ? `h_${h}` : null,
  ]
    .filter(Boolean)
    .join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${parts}/${publicId}`;
}

export function cldSrcSet(publicId, widths, opts = {}) {
  return widths.map((w) => `${cldUrl(publicId, { ...opts, w })} ${w}w`).join(', ');
}
