import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, SITE_URL } from '../constants/seo';

const setMetaContent = (selector, attributes, content) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setCanonical = (url) => {
  let canonical = document.head.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }

  canonical.setAttribute('href', url);
};

const useTitulo = (textoTitulo = 'Sin título', description = DEFAULT_DESCRIPTION) => {
  useEffect(() => {
    const title = `CCC - ${textoTitulo}`;
    const pathname = window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/$/, '');
    const canonicalUrl = `${SITE_URL}${pathname}`;

    document.title = title;
    setMetaContent('meta[name="description"]', { name: 'description' }, description);
    setMetaContent('meta[property="og:title"]', { property: 'og:title' }, title);
    setMetaContent('meta[property="og:description"]', { property: 'og:description' }, description);
    setMetaContent('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
    setMetaContent(
      'meta[name="twitter:description"]',
      { name: 'twitter:description' },
      description,
    );
    setCanonical(canonicalUrl);
  }, [description, textoTitulo]);
};

export default useTitulo;
