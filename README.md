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
├── AI Provider
│   └── netlify/functions/_chatbot/providers/
│       ├── groq.js
│       ├── gemini.js
│       ├── openai.js
│       └── claude.js
└── Frontend
    └── src/components/ChatbotGemini.jsx
```

El endpoint principal es `/.netlify/functions/chatbot`. La respuesta local siempre se intenta primero. El proveedor remoto se selecciona con `AI_PROVIDER`; inicialmente se usa `groq`.

Variables mínimas en Netlify:

```env
AI_PROVIDER=groq
GROQ_API_KEY=...
GROQ_MODEL=llama-3.1-8b-instant
```
