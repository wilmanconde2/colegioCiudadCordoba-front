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

test('E2E-01: la página principal y su navegación cargan', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('heading', { name: /paz.*progreso.*futuro/i })).toBeVisible();
  await expect(page.getByText(/página no encontrada/i)).toHaveCount(0);
});

test('E2E-02: Tesorería muestra el formulario y PSE, sin mensualidad incompleta', async ({ page }) => {
  await page.goto('/tesoreria');

  await expect(page.getByRole('heading', { name: 'Costos Educativos y Medios de Pago' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Buscar estudiante' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pagar con PSE' }).first()).toBeVisible();
  await expect(page.getByText(/información pendiente por configurar/i)).toHaveCount(0);
  await expect(page.getByText(/meses pendientes de pago/i)).toHaveCount(0);
});

test('E2E-03: la búsqueda selecciona y limpia un alumno sintético', async ({ page }) => {
  await page.route('**/e2e/alumnos.json', async (route) => {
    await route.fulfill({ json: [syntheticStudent] });
  });
  await page.goto('/tesoreria');

  const search = page.getByRole('textbox', { name: 'Buscar estudiante' });
  await search.focus();
  await search.fill('Valentina Prueba');
  await page.getByRole('button', { name: /Valentina Prueba E2E Colegio/i }).click();

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

  await page.getByRole('button', { name: 'Abrir asistente virtual del colegio' }).click();
  await page.getByRole('textbox', { name: 'Pregunta para el asistente virtual' }).fill('¿Cómo pago?');
  await page.getByRole('button', { name: 'Enviar pregunta' }).click();

  await expect(page.getByLabel('Keyla está consultando información')).toBeVisible();
  await expect(page.getByText('Respuesta controlada del asistente.')).toBeVisible();
  expect(requestCount).toBe(1);
});

test('E2E-05: navega de Inicio a Tesorería y luego a Contacto', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /paz.*progreso.*futuro/i })).toBeVisible();

  await page.getByRole('link', { name: 'Ir a Tesorería' }).click();
  await expect(page).toHaveURL(/\/tesoreria$/);
  await expect(page.getByRole('heading', { name: 'Costos Educativos y Medios de Pago' })).toBeVisible();

  await page.getByRole('link', { name: 'Contáctanos' }).click();
  await expect(page).toHaveURL(/\/contacto$/);
  await expect(page.getByRole('heading', { name: 'Contáctanos' })).toBeVisible();
});
