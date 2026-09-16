import { test, expect } from '@playwright/test';

test('desktop content, expertise, motion, and email clipboard', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:4173');
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
  await page.goto('http://127.0.0.1:4173');
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


test('workflow supports keyboard navigation and all six recommendations are available', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173');
  const discover = page.getByRole('tab', { name: /01 Discover/ });
  await discover.click();
  await discover.press('ArrowRight');
  await expect(page.getByRole('tab', { name: /02 Prototype/ })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toHaveCount(1);
  await expect(page.getByRole('tabpanel')).toContainText('Make the idea tangible.');
  await page.getByRole('tab', { name: /02 Prototype/ }).press('End');
  await expect(page.getByRole('tabpanel')).toContainText('Learn from real use.');
  await expect(page.locator('.quote-grid figure')).toHaveCount(6);
  for (const name of ['Lucky Singh', 'Tanmay Garg', 'Manish Gupta', 'Nagendra Nekkanti', 'Sangeetha Mani', 'Harpal Singh']) {
    await expect(page.locator('.quote-grid figcaption').filter({ hasText: name })).toBeVisible();
  }
  const lucky = page.locator('.quote-grid figure').filter({ hasText: 'Lucky Singh' });
  await lucky.getByText('Read full recommendation').click();
  await expect(lucky.getByText(/In addition to his technical skills/)).toBeVisible();
  await lucky.getByText('Show less').click();
  await expect(lucky.getByText(/In addition to his technical skills/)).not.toBeVisible();
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('.header')).toHaveClass(/scrolled/);
  expect(await page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
});

test('workflow and reviews remain readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  await expect(page.locator('.workflow-panel:visible')).toHaveCount(4);
  await expect(page.locator('.quote-grid figure')).toHaveCount(6);
  const lucky = page.locator('.quote-grid figure').filter({ hasText: 'Lucky Singh' });
  await lucky.getByText('Read full recommendation').click();
  await expect(lucky.getByText(/In addition to his technical skills/)).toBeVisible();
  await context.close();
});
