import { DEFAULT_DESCRIPTION, ROUTE_METADATA, SITE_URL, SOCIAL_IMAGE_URL } from '../src/constants/seo.js';

export const METADATA_START = '<!-- route-metadata:start -->';
export const METADATA_END = '<!-- route-metadata:end -->';

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

export const getCanonicalUrl = (pathname) => `${SITE_URL}${pathname}`;

export const getDocumentTitle = (title) => `CCC - ${title}`;

export const renderRouteMetadata = ({ pathname, title, description = DEFAULT_DESCRIPTION }) => {
  const documentTitle = escapeHtml(getDocumentTitle(title));
  const safeDescription = escapeHtml(description);
  const canonicalUrl = escapeHtml(getCanonicalUrl(pathname));
  const socialImageUrl = escapeHtml(SOCIAL_IMAGE_URL);

  return `${METADATA_START}
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="description" content="${safeDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_CO" />
    <meta property="og:site_name" content="Colegio Ciudad Córdoba" />
    <meta property="og:title" content="${documentTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${socialImageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${documentTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${socialImageUrl}" />
    <title>${documentTitle}</title>
    ${METADATA_END}`;
};

export const getPrerenderedRoutes = () =>
  Object.entries(ROUTE_METADATA).map(([pathname, metadata]) => ({ pathname, ...metadata }));
