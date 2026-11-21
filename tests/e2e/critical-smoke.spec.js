import { expect, test } from '@playwright/test';

const syntheticStudent = {
  nombre1: 'Valentina',
  nombre2: 'Prueba',
  apellido1: 'E2E',
  apellido2: 'Colegio',
  grado: '6',
  seccion: '1',
  jornada: 'Mañana',
  codigo: '54321',
  profesor: 'Docente de prueba',
};

const syntheticAdmitido = {
  nombreCompleto: 'Valentina Prueba E2E Colegio',
  grado: '6',
  observacion: 'Admitida para el año lectivo.',
};

async function dismissEnrollmentPopup(page) {
  const close = page.getByRole('button', { name: 'Cerrar información de matrículas 2027' });
  if (await close.count()) await close.click();
}

test('E2E-01: la página principal y su navegación cargan', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('dialog', { name: 'Matrículas 2027' })).toBeVisible();
  const poster = page.locator('img[src="/matricula2027.png"]');
  await expect(poster).toBeVisible();
  await expect.poll(() => poster.evaluate((image) => image.naturalWidth)).toBe(1448);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Matrículas 2027' })).toHaveCount(0);
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('heading', { name: /paz.*progreso.*futuro/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Admisiones' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Consultar admitidos' })).toBeVisible();
  await expect(page.getByText(/página no encontrada/i)).toHaveCount(0);
});

test('E2E-01a: el popup aparece en Inicio, no en rutas internas, y permite seguir navegando', async ({ page }) => {
  await page.goto('/admisiones');
  await expect(page.getByRole('dialog', { name: 'Matrículas 2027' })).toHaveCount(0);
  await page.goto('/');
  await expect(page.getByRole('dialog', { name: 'Matrículas 2027' })).toBeVisible();
  await page.getByRole('button', { name: 'Cerrar información de matrículas 2027' }).click();
  await page.getByRole('link', { name: 'Consultar admitidos' }).click();
  await expect(page).toHaveURL(/\/admisiones$/);
  await expect(page.getByRole('heading', { name: 'Consulta de admitidos' })).toBeVisible();
});

test('E2E-07: Recuperación permanece deshabilitada en escritorio y móvil', async ({ page }) => {
  await page.goto('/');
  await dismissEnrollmentPopup(page);

  const card = page.locator('.actividades');
  for (const width of [320, 375, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(card).toHaveCount(0);
  }
  await expect(page.locator('.circular').getByRole('button', { name: 'Descargar' })).toBeVisible();
});

test('E2E-08: Recuperación permanece deshabilitada en móvil táctil', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await dismissEnrollmentPopup(page);
    await expect(page.locator('.actividades')).toHaveCount(0);
  } finally {
    await context.close();
  }
});

test('E2E-02: Tesorería muestra el formulario y PSE, sin mensualidad incompleta', async ({ page }) => {
  await page.goto('/tesoreria');

  await expect(page.getByRole('heading', { name: 'Costos Educativos y Medios de Pago' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Buscar estudiante' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pagar con PSE' }).first()).toBeVisible();
  await expect(page.getByText(/información pendiente por configurar/i)).toHaveCount(0);
  await expect(page.getByText(/meses pendientes de pago/i)).toHaveCount(0);
});

test('E2E-03: la búsqueda selecciona y limpia un alumno sintético', async ({ page }) => {
  await page.route('**/e2e/alumnos.json', async (route) => {
    await route.fulfill({ json: [syntheticStudent] });
  });
  await page.goto('/tesoreria');

  const search = page.getByRole('combobox', { name: 'Buscar estudiante' });
  await search.focus();
  await search.fill('Valentina Prueba');
  await page.getByRole('option', { name: /Valentina Prueba E2E Colegio/i }).click();

  const result = page.getByRole('heading', { name: 'Resultado' }).locator('..');
  await expect(result).toContainText('Valentina Prueba E2E Colegio');
  await expect(result).toContainText('6 1 Mañana');
  await expect(result).toContainText('54321');

  await page.getByRole('button', { name: 'Limpiar' }).click();
  await expect(page.getByRole('heading', { name: 'Resultado' })).toHaveCount(0);
  await expect(search).toHaveValue('');
});

test('E2E-04: el chatbot envía una sola consulta al endpoint canónico', async ({ page }) => {
  let requestCount = 0;
  await page.route('**/.netlify/functions/chatbot', async (route) => {
    requestCount += 1;
    await new Promise((resolve) => setTimeout(resolve, 150));
    await route.fulfill({ json: { answer: 'Respuesta controlada del asistente.' } });
  });
  await page.goto('/');
  await dismissEnrollmentPopup(page);

  await page.getByRole('button', { name: 'Abrir asistente virtual del colegio' }).click();
  await page.getByRole('textbox', { name: 'Pregunta para el asistente virtual' }).fill('¿Cómo pago?');
  await page.getByRole('button', { name: 'Enviar pregunta' }).click();

  await expect(page.getByLabel('Keyla está consultando información')).toBeVisible();
  await expect(page.getByText('Respuesta controlada del asistente.')).toBeVisible();
  expect(requestCount).toBe(1);
});

test('E2E-05: navega de Inicio a Tesorería y luego a Contacto', async ({ page }) => {
  await page.goto('/');
  await dismissEnrollmentPopup(page);
  await expect(page.getByRole('heading', { name: /paz.*progreso.*futuro/i })).toBeVisible();

  await page.getByRole('link', { name: 'Ir a Tesorería' }).click();
  await expect(page).toHaveURL(/\/tesoreria$/);
  await expect(page.getByRole('heading', { name: 'Costos Educativos y Medios de Pago' })).toBeVisible();

  await page.getByRole('link', { name: 'Contáctanos' }).click();
  await expect(page).toHaveURL(/\/contacto$/);
  await expect(page.getByRole('heading', { name: 'Contáctanos' })).toBeVisible();
});

test('E2E-06: consulta y selecciona un admitido sintético', async ({ page }) => {
  await page.route('**/data/admitidos.json', async (route) => {
    await route.fulfill({ json: [syntheticAdmitido] });
  });
  await page.goto('/');
  await dismissEnrollmentPopup(page);
  await page.getByRole('link', { name: 'Consultar admitidos' }).click();

  await expect(page.getByRole('heading', { name: 'Consulta de admitidos' })).toBeVisible();
  await expect(page.getByRole('option')).toHaveCount(0);

  const search = page.getByRole('combobox', { name: 'Buscar estudiante' });
  await search.fill('e2e val');
  await page.getByRole('option', { name: /valentina prueba e2e colegio.*grado 6/i }).click();

  const result = page.getByRole('heading', { name: 'Resultado de la consulta' }).locator('..');
  await expect(result).toContainText('Valentina Prueba E2E Colegio');
  await expect(result).toContainText('6');
  await expect(result).toContainText('Admitida para el año lectivo.');

  await page.getByRole('button', { name: 'Limpiar búsqueda' }).click();
  await expect(result).toHaveCount(0);
  await expect(search).toHaveValue('');
});
