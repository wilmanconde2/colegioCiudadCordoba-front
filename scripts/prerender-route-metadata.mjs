import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  getPrerenderedRoutes,
  METADATA_END,
  METADATA_START,
  renderRouteMetadata,
} from './route-metadata.mjs';

const outputDirectory = path.resolve('dist');
const templatePath = path.join(outputDirectory, 'index.html');
const template = await readFile(templatePath, 'utf8');
const metadataPattern = new RegExp(`${METADATA_START}[\\s\\S]*?${METADATA_END}`);

if (!metadataPattern.test(template)) {
  throw new Error('No se encontró el bloque de metadata de ruta en dist/index.html.');
}

for (const route of getPrerenderedRoutes()) {
  const routeDirectory =
    route.pathname === '/' ? outputDirectory : path.join(outputDirectory, route.pathname.slice(1));
  const outputPath = path.join(routeDirectory, 'index.html');
  const html = template.replace(metadataPattern, renderRouteMetadata(route));

  await mkdir(routeDirectory, { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

console.log('Generated initial HTML metadata for /, /inscripciones, /tesoreria and /contacto.');
