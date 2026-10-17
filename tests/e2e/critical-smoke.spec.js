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

test('E2E-01: la página principal y su navegación cargan', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('heading', { name: /paz.*progreso.*futuro/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Admisiones' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Consultar admitidos' })).toBeVisible();
  await expect(page.getByText(/página no encontrada/i)).toHaveCount(0);
});

test('E2E-07: Recuperación muestra un enlace nativo con el destino seleccionado', async ({ page, context }) => {
  await page.addInitScript(() => {
    window.__externalNavigationAudit = {
      syntheticAnchorClicks: 0,
      windowOpenCalls: 0,
    };

    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function click(...args) {
      window.__externalNavigationAudit.syntheticAnchorClicks += 1;
      return originalAnchorClick.apply(this, args);
    };

    window.open = () => {
      window.__externalNavigationAudit.windowOpenCalls += 1;
      return null;
    };
  });
  await context.route('https://drive.google.com/**', async (route) => {
    await route.fulfill({ contentType: 'text/html', body: '<p>Destino de prueba</p>' });
  });
  await page.goto('/');

  const select = page.getByRole('combobox', { name: 'Selecciona una opción' });
  const link = page.getByRole('link', { name: 'Abrir actividad de recuperación' });
  const transicionUrl = 'https://drive.google.com/drive/folders/1Uobyu-micyiGv2OUrBEQCk-Wrbu11SXM';
  const primeroUrl = 'https://drive.google.com/drive/folders/1g86t0Co61bCOsRywKGIOS24R0lYnXOOp';

  await expect(link).toHaveCount(0);

  await select.selectOption(transicionUrl);
  await expect(link).toHaveAttribute('href', transicionUrl);
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');

  await select.selectOption(primeroUrl);
  await expect(link).toHaveAttribute('href', primeroUrl);
  await expect(page.evaluate(() => window.__externalNavigationAudit)).resolves.toEqual({
    syntheticAnchorClicks: 0,
    windowOpenCalls: 0,
  });

  for (const width of [320, 375, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await link.scrollIntoViewIfNeeded();

    const layout = await link.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const elementAtCenter = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      const overlappingControls = ['.agenda-float__trigger', '.chatbot__trigger', '.footer-fixed']
        .filter((selector) => {
          const control = document.querySelector(selector);
          if (!control) return false;

          const controlRect = control.getBoundingClientRect();
          return (
            rect.left < controlRect.right &&
            rect.right > controlRect.left &&
            rect.top < controlRect.bottom &&
            rect.bottom > controlRect.top
          );
        });

      return {
        insideViewport: rect.left >= 0 && rect.right <= window.innerWidth,
        unobstructed: elementAtCenter === element || element.contains(elementAtCenter),
        overlappingControls,
      };
    });

    expect(layout, `en viewport de ${width}px`).toEqual({
      insideViewport: true,
      unobstructed: true,
      overlappingControls: [],
    });
  }

  await select.evaluate((element) => {
    element.value = '';
    element.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await expect(link).toHaveCount(0);

  await select.selectOption(primeroUrl);
  await expect(link).toHaveAttribute('href', primeroUrl);
  await link.focus();
  await expect(link).toBeFocused();
  const popupPromise = page.waitForEvent('popup');
  await page.keyboard.press('Enter');
  const popup = await popupPromise;
  await expect(popup).toHaveURL(primeroUrl);
  await popup.close();
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

test('E2E-06: consulta y selecciona un admitido sintético', async ({ page }) => {
  await page.route('**/data/admitidos.json', async (route) => {
    await route.fulfill({ json: [syntheticAdmitido] });
  });
  await page.goto('/');
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
