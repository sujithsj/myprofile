import { test, expect } from '@playwright/test';

test('desktop content, expertise, motion, and email clipboard', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://localhost:5173');
  await expect(page.locator('h1')).toHaveText('Engineeringwhat’s next.');
  await page.getByRole('button', { name: 'Pause background animation' }).click();
  await expect(page.getByRole('button', { name: 'Play background animation' })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('summary').filter({ hasText: 'Generative & agentic AI' }).click();
  await expect(page.locator('details').nth(1)).toHaveAttribute('open', '');
  await page.locator('#copy-email').click();
  await expect(page.getByRole('status')).toHaveText('Email copied!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('sujith.482@gmail.com');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: '/tmp/sujith-desktop.png', fullPage: true });
  expect(errors).toEqual([]);
  await context.close();
});

test('mobile navigation, layout, and reduced motion', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://localhost:5173');
  await expect(page.getByRole('button', { name: 'Play background animation' })).toBeVisible();
  const menu = page.locator('.menu-toggle');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation').getByRole('link', { name: 'The craft' }).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#expertise$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: '/tmp/sujith-mobile.png', fullPage: true });
  await context.close();
});
