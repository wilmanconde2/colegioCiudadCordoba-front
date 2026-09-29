import {
  CLOUDINARY_IMG_TRANSFORM,
  IMG_INFO_GENERAL,
} from '../../constants/recursosCursos';
import { HORARIOS_ALUMNOS } from './modalInfoCursoData';

export function buildCloudinaryBestUrl(rawUrl) {
  if (!rawUrl) return '';
  if (!rawUrl.includes('/upload/')) return rawUrl;
  return rawUrl.replace('/upload/', `/upload/${CLOUDINARY_IMG_TRANSFORM}/`);
}

export function normalizeVideoUrl(url) {
  if (!url || url === '#') return '';
  const normalizedUrl = String(url).trim();

  if (normalizedUrl.includes('drive.google.com') && normalizedUrl.includes('/preview')) {
    return normalizedUrl;
  }

  const fileMatch = normalizedUrl.match(/drive\.google\.com\/file\/d\/([^/]+)\//i);
  if (fileMatch?.[1]) return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;

  const downloadMatch = normalizedUrl.match(/drive\.google\.com\/uc\?id=([^&]+)/i);
  if (downloadMatch?.[1]) return `https://drive.google.com/file/d/${downloadMatch[1]}/preview`;

  const openMatch = normalizedUrl.match(/drive\.google\.com\/open\?id=([^&]+)/i);
  if (openMatch?.[1]) return `https://drive.google.com/file/d/${openMatch[1]}/preview`;

  return normalizedUrl;
}

export function getModalContent({ horarioSel, tab, videoUrl }) {
  if (tab === 'general') {
    return {
      type: 'image',
      rawUrl: IMG_INFO_GENERAL,
      url: buildCloudinaryBestUrl(IMG_INFO_GENERAL),
      title: 'Información general',
    };
  }

  if (tab === 'horarios') {
    if (!horarioSel) return { type: 'pick-horario', title: 'Horarios' };
    const option = HORARIOS_ALUMNOS[horarioSel];
    return {
      type: 'image',
      rawUrl: option.rawUrl,
      url: option.rawUrl,
      title: option.title,
    };
  }

  if (tab === 'video') {
    if (!videoUrl) return { type: 'empty', msg: 'No hay video configurado para este curso.' };
    return { type: 'iframe', url: videoUrl, title: 'Video informativo del curso' };
  }

  return { type: 'empty', msg: 'Contenido no disponible.' };
}
