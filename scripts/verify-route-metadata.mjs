import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  getCanonicalUrl,
  getDocumentTitle,
  getPrerenderedRoutes,
} from './route-metadata.mjs';

const outputDirectory = path.resolve('dist');

for (const route of getPrerenderedRoutes()) {
  const routeDirectory =
    route.pathname === '/' ? outputDirectory : path.join(outputDirectory, route.pathname.slice(1));
  const outputPath = path.join(routeDirectory, 'index.html');
  const html = await readFile(outputPath, 'utf8');
  const expectedTitle = getDocumentTitle(route.title);
  const expectedCanonical = getCanonicalUrl(route.pathname);

  assert.match(html, new RegExp(`<title>${expectedTitle}</title>`));
  assert.match(html, new RegExp(`name="description" content="${route.description}"`));
  assert.match(html, new RegExp(`rel="canonical" href="${expectedCanonical}"`));
  assert.match(html, new RegExp(`property="og:title" content="${expectedTitle}"`));
  assert.match(html, new RegExp(`property="og:url" content="${expectedCanonical}"`));
  assert.match(html, new RegExp(`name="twitter:title" content="${expectedTitle}"`));
}

console.log('Verified initial HTML metadata for /, /inscripciones, /tesoreria and /contacto.');
