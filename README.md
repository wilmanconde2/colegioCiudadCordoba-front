# Colegio Ciudad Córdoba — sitio web institucional

## Project Overview

Aplicación web oficial del Colegio Ciudad Córdoba. Reúne información institucional,
admisiones, horarios, tesorería, PQRS y otros recursos para la comunidad educativa.
También incluye la consulta pública de código estudiantil y **Keyla**, el asistente
virtual institucional.

La aplicación es una SPA de React servida por Netlify. El frontend consume una
única Netlify Function para el chatbot y carga el JSON público de estudiantes desde
la URL configurada para cada entorno.

## Stack

- React 19 y React Router 8.
- Vite 8.
- JavaScript con módulos ES.
- Sass y Bootstrap 5.
- Netlify CDN y Netlify Functions.
- ESLint 10.
- `node:test` para la lógica serverless.
- Vitest, Testing Library y jsdom para la interfaz React.
- Playwright para pruebas E2E en Chromium.

Las versiones y rangos exactos se encuentran en `package.json` y
`package-lock.json`.

## Requirements

- Node.js 22.23.2, versión definida en `.nvmrc`, `package.json`, CI y
  `netlify.toml`.
- npm, incluido con Node.js.

## Installation

```bash
git clone https://github.com/wilmanconde2/colegioCiudadCordoba-front.git
cd colegioCiudadCordoba-front
npm ci
```

Copia `.env.example` como `.env` y configura únicamente las variables necesarias
para el entorno. `.env` está excluido de Git y no debe incluirse en commits.

## Development

```bash
npm run dev
```

Este comando inicia el frontend con Vite. No emula por sí solo las Netlify
Functions; el chatbot requiere que su endpoint esté disponible en el entorno que
se esté probando.

Para revisar localmente el resultado de un build:

```bash
npm run build
npm run preview
```

## Scripts

| Comando | Propósito |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Genera el frontend de producción en `dist/`. |
| `npm run preview` | Sirve localmente el build generado. |
| `npm run lint` | Ejecuta ESLint sobre el repositorio. |
| `npm test` | Ejecuta las pruebas serverless y de interfaz. |
| `npm run test:serverless` | Ejecuta con `node:test` las pruebas del chatbot. |
| `npm run test:ui` | Ejecuta con Vitest las pruebas React. |
| `npm run test:e2e` | Ejecuta los smoke tests E2E con Playwright. |
| `npm run generate:alumnos` | Ejecuta la herramienta local externa `../tools/excel-to-json.mjs`; no forma parte del flujo normal de instalación. |

## Testing

El proyecto tiene tres capas automatizadas:

- **Serverless:** `node:test` cubre validación, respuestas locales, recuperación
  de contexto, contrato de proveedores, fallbacks y estructura de conocimiento.
- **UI:** Vitest, Testing Library y jsdom cubren componentes y rutas de React.
- **E2E:** Playwright ejecuta smoke tests críticos en Chromium usando una fuente
  sintética de estudiantes.

```bash
npm test
npm run test:e2e
```

Antes de abrir un PR con cambios de aplicación se recomienda ejecutar también:

```bash
npm run lint
npm run build
```

## CI

`.github/workflows/ci.yml` se ejecuta en pull requests hacia `main` y en pushes a
`main`, con Node.js 22.23.2. Contiene dos jobs:

- `quality`: instala con `npm ci`, reporta auditorías de severidad alta sin
  bloquear, y ejecuta lint, pruebas y build.
- `e2e`: instala Chromium y ejecuta los smoke tests de Playwright.

El workflow no despliega la aplicación ni necesita credenciales de proveedores de
IA.

## Architecture

```text
React SPA
  ├─ React Router → páginas y componentes
  ├─ JSON público de estudiantes
  └─ POST /.netlify/functions/chatbot
       ↓
     chatbot handler
       ├─ validación, CORS y respuesta local
       ├─ recuperación de contexto institucional
       └─ abstracción de proveedor
            ├─ Groq
            ├─ OpenAI
            ├─ Gemini
            └─ Claude

src/shared/institutional-data.js
  ├─ frontend institucional
  ├─ respuestas locales
  └─ base de conocimiento para IA
```

`src/shared/institutional-data.js` es la fuente compartida para los datos
institucionales estructurados que necesitan tanto el frontend como el chatbot.

## Chatbot

Keyla expone un único endpoint público:

```text
POST /.netlify/functions/chatbot
```

El handler valida método, origen, tipo y tamaño del cuerpo. Primero intenta una
respuesta local; cuando no existe una respuesta suficiente, recupera los bloques
institucionales relevantes, construye el contrato común de mensajes y llama al
proveedor seleccionado mediante `AI_PROVIDER`. Si el proveedor falla, devuelve el
fallback público sin exponer detalles internos.

Los adapters disponibles son Groq, OpenAI, Gemini y Claude. Groq es el proveedor
predeterminado cuando `AI_PROVIDER` no está definido. La Function también aplica
la limitación nativa configurada en `netlify/functions/chatbot.js` y restringe
orígenes de navegador a producción, desarrollo local aprobado y previews
numerados de este sitio Netlify.

La documentación detallada del contrato y la protección del endpoint está en:

- `docs/adr/0001-provider-neutral-chatbot-message-contract.md`
- `docs/adr/0002-provider-finish-reasons.md`
- `netlify/functions/_chatbot/abuse-protection.md`

## Project Structure

```text
.
├─ public/                       # recursos estáticos
├─ src/
│  ├─ components/               # componentes React, incluido Keyla
│  ├─ constants/                # configuración de contenido y UI
│  ├─ hooks/                    # hooks reutilizables
│  ├─ pages/                    # páginas de la SPA
│  ├─ routes/                   # definición de rutas con React Router
│  ├─ shared/                   # datos institucionales compartidos
│  ├─ styles/                   # Sass global y por componente
│  ├─ test/                     # configuración de pruebas UI
│  └─ utils/                    # utilidades del frontend
├─ netlify/functions/
│  ├─ chatbot.js                # endpoint público y rate limit
│  └─ _chatbot/
│     ├─ knowledge/             # datos y builders de conocimiento
│     └─ providers/             # adapters de IA
├─ tests/e2e/                   # smoke tests de Playwright
├─ docs/adr/                    # decisiones de arquitectura aceptadas
└─ .github/workflows/ci.yml     # quality y e2e
```

## Environment Variables

Usa `.env.example` como referencia. Nunca publiques valores reales.

### Frontend

| Variable | Uso |
| --- | --- |
| `VITE_ALUMNOS_JSON_URL` | URL del JSON público usado por la consulta estudiantil. |

Las variables con prefijo `VITE_` se incorporan al frontend; no deben contener
secretos.

### Backend / providers

| Variable | Uso |
| --- | --- |
| `AI_PROVIDER` | Proveedor activo: `groq`, `openai`, `gemini` o `claude`. |
| `GROQ_API_KEY` / `GROQ_MODEL` | Credencial y modelo de Groq. |
| `OPENAI_API_KEY` / `OPENAI_MODEL` | Credencial y modelo de OpenAI. |
| `GEMINI_API_KEY` / `GEMINI_MODEL` | Credencial y modelo de Gemini. |
| `CLAUDE_API_KEY` / `CLAUDE_MODEL` | Credencial y modelo de Claude. |

Las claves de proveedores deben permanecer exclusivamente en el entorno serverless.
Solo es necesaria la credencial del proveedor seleccionado.

## Deployment

Netlify instala dependencias con `npm ci`, ejecuta `npm run build`, publica
`dist/` y carga las funciones desde `netlify/functions/`, según `netlify.toml`.

Los pull requests reciben un Deploy Preview mediante la integración del proyecto.
Después de CI y QA, los cambios integrados en `main` siguen el flujo de despliegue
a producción de Netlify.

Producción: [colegiociudadcordoba.edu.co](https://colegiociudadcordoba.edu.co)

## Contribution / Workflow

```text
rama de trabajo
  → pull request hacia main
  → CI: quality + e2e
  → QA del Deploy Preview
  → squash merge aprobado
```

Consulta `AGENTS.md` para las reglas de alcance, riesgo, validación, seguridad y
gobernanza del repositorio. Un PR o un CI exitoso no autoriza por sí solo el merge.

## Authors

- [Wilman Conde](https://github.com/wilmanconde2)
- [KrakenDigitalSD](https://krakendigitalsd.netlify.app/)
