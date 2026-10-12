import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const path = '/mercado-livre/callback.html';
const redirect = 'https://silviorodrigues.dev/mercado-livre/callback.html';
// Synthetic fixtures only: never contact OAuth or use real authorization data.
const fakeCode = 'SYNTHETIC_TEST_ONLY';
const fakeState = 'SYNTHETIC_STATE_ONLY';

test('callback is built at the unchanged redirect and has matching strict CSP hashes', async ({ page }) => {
  const response = await page.goto(path);
  expect(response.status()).toBe(200);
  await expect(page).toHaveTitle('Retorno de autorização | Mercado Livre');
  await expect(page.locator('#status')).toContainText('Nenhum código recebido');
  await expect(page.locator('#transfer')).toBeHidden();
  const source = await readFile(new URL('../src/mercado-livre/callback.html', import.meta.url), 'utf8');
  for (const tag of ['script', 'style']) {
    const inline = source.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))[1];
    const hash = createHash('sha256').update(inline).digest('base64');
    expect(source).toContain(`'sha256-${hash}'`);
  }
  const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
  for (const directive of ["default-src 'none'", "connect-src 'none'", "form-action 'none'", "base-uri 'none'"]) expect(csp).toContain(directive);
  await expect(page.locator('meta[name="referrer"]')).toHaveAttribute('content', 'no-referrer');
  await expect(page.locator('script[src],link[rel="stylesheet"],form')).toHaveCount(0);
});

test('synthetic callback strips query, transfers only the expected fields locally and clears by keyboard', async ({ page, context }) => {
  const requests = [];
  context.on('request', request => requests.push(request.url()));
  await page.goto(`${path}?code=${fakeCode}&state=${fakeState}`);
  await expect(page.locator('#status')).toContainText('Código recebido');
  expect(new URL(page.url()).search).toBe('');
  expect(new URL(page.url()).hash).toBe('');
  await expect(page.locator('#data')).toHaveValue(JSON.stringify({ code: fakeCode, state: fakeState, redirect_uri: redirect }, null, 2));
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
  expect(requests).toHaveLength(1);
  await page.locator('#clear').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#data')).toHaveValue('');
  await expect(page.locator('#transfer')).toBeHidden();
  await page.reload();
  await expect(page.locator('#status')).toContainText('Nenhum código recebido');
});

test('invalid, duplicate and fragment inputs fail closed and are removed from the address', async ({ page }) => {
  for (const suffix of [
    `?code=${fakeCode}`, `?code=${fakeCode}&state=${fakeState}&state=duplicate`,
    `?code=${fakeCode}&state=${fakeState}&access_token=NOT_A_TOKEN`,
    `?code=${fakeCode}&state=${fakeState}#fragment`,
  ]) {
    await page.goto(path + suffix);
    await expect(page.locator('#transfer')).toBeHidden();
    await expect(page.locator('#data')).toHaveValue('');
    await expect(page.locator('#status')).toContainText('Resposta inválida');
    expect(new URL(page.url()).search).toBe('');
    expect(new URL(page.url()).hash).toBe('');
  }
});

test('the empty callback stays readable at narrow width without document overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  await expect(page.getByRole('heading', { name: 'Retorno do Mercado Livre', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
