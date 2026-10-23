import { test, expect } from '@playwright/test';
const properties = [
  { id: 'amritsar', title: 'Amritsar illustration', location: 'Amritsar', category: 'Residential', image: 'https://example.com/a.jpg', price: 4500000, description: 'An illustrative property for checking the enquiry flow.', isIllustrative: true },
  { id: 'pathankot', title: 'Pathankot illustration', location: 'Pathankot', category: 'Commercial', image: 'https://example.com/b.jpg', price: null, isIllustrative: true },
];
test.beforeEach(async ({ page }) => {
  await page.route('**/api/projects', route => route.fulfill({ json: properties }));
  await page.route('**/example.com/*.jpg', route => route.abort());
});
test('filters properties and carries a listing through a successful enquiry', async ({ page }) => {
  await page.goto('/projects');
  await page.getByRole('combobox', { name: 'City', exact: true }).selectOption('Amritsar');
  await page.getByLabel('Maximum budget').selectOption('5000000');
  await expect(page.getByRole('link', { name: 'View Amritsar illustration' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View Pathankot illustration' })).toHaveCount(0);
  await page.getByRole('link', { name: 'View Amritsar illustration' }).click();
  await expect(page.getByRole('heading', { name: 'Amritsar illustration', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Schedule a visit' }).click();
  await expect(page.getByText('Enquiry about:')).toContainText('Amritsar illustration');
  await page.getByLabel('Name', { exact: true }).fill('Property Enquiry');
  await page.getByLabel('Phone', { exact: true }).fill('9876543210');
  await page.getByLabel('Email', { exact: true }).fill('enquiry@example.com');
  await page.route('**/__forms.html', async route => {
    const body = new URLSearchParams(route.request().postData() || '');
    expect(body.get('project_id')).toBe('amritsar'); expect(body.get('project_title')).toBe('Amritsar illustration');
    expect(body.get('form-name')).toBe('contact'); expect(body.get('bot-field')).toBe('');
    await route.fulfill({ status: 200, body: 'Submitted' });
  });
  await page.getByRole('button', { name: 'Send Quick Message' }).click();
  await expect(page.getByRole('heading', { name: 'Thank You!' })).toBeVisible();
});
test('failed enquiries preserve the message for retry', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Name', { exact: true }).fill('Property Enquiry');
  await page.getByLabel('Phone', { exact: true }).fill('9876543210');
  await page.getByLabel('Email', { exact: true }).fill('enquiry@example.com');
  await page.getByLabel('Message', { exact: true }).fill('Please share current properties in Amritsar.');
  await page.route('**/__forms.html', route => route.fulfill({ status: 503 }));
  await page.getByRole('button', { name: 'Send Quick Message' }).click();
  await expect(page.getByRole('alert')).toContainText('Unable to submit');
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('Please share current properties in Amritsar.');
});
test('shows empty, failure, and missing property states', async ({ page }) => {
  await page.goto('/projects?q=doesnotexist');
  await expect(page.getByRole('heading', { name: 'No properties match yet' })).toBeVisible();
  await page.goto('/projects/missing');
  await expect(page.getByRole('heading', { name: 'Property not found' })).toBeVisible();
  await page.route('**/api/projects', route => route.fulfill({ status: 503, json: { error: 'Please try again.' } }));
  await page.goto('/projects');
  await expect(page.getByRole('heading', { name: 'Unable to load properties' })).toBeVisible();
});
test('administrator route requires sign-in', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByRole('heading', { name: 'Administrator sign-in' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'New property' })).toHaveCount(0);
});
test('mobile pages fit the viewport and navigation is keyboard accessible', async ({ page }) => {
  for (const width of [320, 360]) {
  await page.setViewportSize({ width, height: 800 });
  for (const path of ['/', '/about', '/projects', '/projects/amritsar', '/contact', '/services', '/privacy', '/admin']) {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  }
  const menu = page.getByRole('button', { name: 'Open navigation' });
  await menu.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-navigation')).toBeVisible();
});
test('light theme keeps the portfolio action readable and route metadata changes', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.goto('/');
  const link = page.getByRole('link', { name: 'View All Projects' });
  const colors = await link.evaluate(element => ({ color: getComputedStyle(element).color, background: getComputedStyle(document.body).backgroundColor }));
  expect(colors.color).not.toBe(colors.background);
  await page.goto('/projects/amritsar');
  await expect(page).toHaveTitle('Amritsar illustration | Velmont Estates');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://velomtestates.netlify.app/projects/amritsar');
});
