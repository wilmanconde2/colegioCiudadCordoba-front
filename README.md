# Colegio Ciudad Córdoba – Sitio Web Oficial

Frontend del sitio web institucional del **Colegio Ciudad Córdoba**, desarrollado con **React**, **Vite** y **Sass**, y desplegado en **Netlify**.

---

## Descripción

Este proyecto reúne en un solo sitio web la información principal del colegio y facilita el acceso a distintos recursos y secciones institucionales.

### Secciones principales

- Inicio
- Historia
- Misión y visión
- Modalidades
- Perfiles institucionales
- Horarios
- Tesorería
- PQRS
- Contacto
- Manual de convivencia
- Cronograma académico

Además, incluye una funcionalidad de **consulta de código estudiantil** a partir de un archivo JSON cargado en producción.

---

## Tecnologías utilizadas

### Base del proyecto

- React
- Vite
- JavaScript
- Sass

### Librerías y utilidades

- Bootstrap
- React Router DOM
- React Icons
- React Toastify
- React Spinners

### Servicios externos

- Netlify
- Cloudinary

---

## Estructura del proyecto

```bash
public/
src/
├─ components/
│  ├─ BotonWhatsapp.jsx
│  ├─ BuscadorCursoCard.jsx
│  ├─ CardInformation.jsx
│  ├─ CardSelection.jsx
│  ├─ Carrusel.jsx
│  ├─ CarruselPerfiles.jsx
│  ├─ Footer.jsx
│  ├─ Formulario.jsx
│  ├─ Header.jsx
│  ├─ ModalInfoCurso.jsx
│  ├─ Navbar.jsx
│  └─ PageLoader.jsx
├─ constants/
│  ├─ inicio.js
│  └─ recursosCursos.js
├─ context/
├─ helpers/
├─ hooks/
│  ├─ useCarrusel.jsx
│  └─ useTitulo.jsx
├─ pages/
│  ├─ Contacto.jsx
│  ├─ Cronograma2026.jsx
│  ├─ DeporteLudica.jsx
│  ├─ Historia.jsx
│  ├─ HorarioCoordinadores.jsx
│  ├─ HorarioPrimaria.jsx
│  ├─ HorarioPsicologia.jsx
│  ├─ HorarioSecundaria.jsx
│  ├─ Inicio.jsx
│  ├─ ManualConvivencia.jsx
│  ├─ MisionVision.jsx
│  ├─ Modalidades.jsx
│  ├─ NoEncontrado.jsx
│  ├─ PerfilesCCC.jsx
│  ├─ PQRS.jsx
│  └─ Tesoreria.jsx
├─ routes/
│  └─ Rutas.jsx
├─ styles/
│  ├─ base/
│  ├─ components/
│  └─ index.scss
├─ utils/
│  └─ cloudinary.js
├─ App.jsx
└─ main.jsx
```

---

## Instalación

```bash
git clone https://github.com/TU-USUARIO/colegiocc-frontend.git
cd colegiocc-frontend
npm install
```

---

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run generate:alumnos
```

---

## Producción

https://colegiociudadcordoba.edu.co

---

## Autor

Wilman Conde
https://github.com/wilmanconde2

KrakenDigitalSD
https://krakendigitalsd.netlify.app/
## Arquitectura de Keyla

```text
Keyla
├── Base de conocimiento local
│   ├── netlify/functions/_chatbot/colegio-knowledge.js
│   └── netlify/functions/_chatbot/local-answer.js
├── Recuperación de contexto
│   └── netlify/functions/_chatbot/context-retriever.js
├── AI Provider
│   └── netlify/functions/_chatbot/providers/
│       ├── groq.js
│       ├── gemini.js
│       ├── openai.js
│       └── claude.js
└── Frontend
    └── src/components/ChatbotGemini.jsx
```

El endpoint principal es `/.netlify/functions/chatbot`. La respuesta local siempre se intenta primero. Si no existe una respuesta local exacta, `context-retriever.js` selecciona únicamente los bloques institucionales relevantes antes de llamar al proveedor remoto. Esto evita enviar toda la base de conocimiento en cada solicitud y mantiene el consumo de tokens bajo control. El proveedor remoto se selecciona con `AI_PROVIDER`; inicialmente se usa `groq`.

Variables mínimas en Netlify:

```env
AI_PROVIDER=groq
GROQ_API_KEY=...
GROQ_MODEL=openai/gpt-oss-20b
```

## Keyla retrieval quality (v1.6.3)

The semantic retriever now prioritizes institutional value-proposition context for synthesis, comparison, strengths, benefits, and family enrollment-intent questions. It keeps the existing local-first and multi-provider architecture unchanged while improving the quality of Groq responses without increasing the 6,500-character context ceiling.

### Groq model

Groq uses `openai/gpt-oss-20b` as the current default model. The local-first flow and semantic context retrieval remain unchanged; synthesis and relationship questions are routed to the provider when a raw local knowledge entry would not satisfy the requested intent.
