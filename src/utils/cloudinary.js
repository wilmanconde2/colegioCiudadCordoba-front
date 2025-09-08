const CLOUD_NAME = 'dx5zamphx';

export function cldUrl(
  publicId,
  { w, h, ar = '16:9', c = 'fill', f = 'auto', q = 'auto', dpr = 'auto' } = {},
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
