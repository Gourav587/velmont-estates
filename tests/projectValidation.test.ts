import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseProject } from '../src/lib/projectValidation.js';
import handler from '../netlify/functions/projects.mts';
const valid = { title: '  Property  ', location: 'Amritsar', category: 'Residential', image: 'https://example.com/property.jpg' };
test('normalizes listings and keeps unconfirmed facts empty', () => {
  const project = parseProject(valid);
  assert.equal(project.title, 'Property'); assert.equal(project.price, null);
  assert.equal(project.status, 'Enquire for availability'); assert.deepEqual(project.gallery, []);
});
test('rejects invalid prices, categories, descriptions, and unsafe image schemes', () => {
  for (const data of [{ price: -1 }, { price: 1.5 }, { price: '100' }, { price: 2147483648 }, { bedrooms: 101 }, { category: 'Unknown' }, { image: 'javascript:alert(1)' }, { image: 'http://example.com/a.jpg' }, { gallery: ['data:image/png,abc'] }, { gallery: Array(9).fill('https://example.com/a.jpg') }, { description: 'a'.repeat(4001) }, { title: ' ' }]) {
    assert.throws(() => parseProject({ ...valid, ...data }));
  }
});
test('rejects malformed bodies and drops untrusted identity fields', () => {
  for (const data of [null, [], 'property']) assert.throws(() => parseProject(data));
  const normalized = parseProject({ ...valid, id: 'override', roles: ['admin'], createdAt: 'override', isIllustrative: 'true' });
  assert.equal(normalized.isIllustrative, false); assert.ok(!('roles' in normalized)); assert.ok(!('id' in normalized));
});
test('unauthenticated writes cannot reach the database', async () => {
  for (const method of ['POST', 'PUT', 'DELETE']) {
    const response = await handler(new Request('https://example.com/api/projects?id=1', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...valid, roles: ['admin'] }) }));
    assert.equal(response.status, 401);
  }
});
test('unsupported methods are rejected', async () => {
  const response = await handler(new Request('https://example.com/api/projects', { method: 'PATCH' }));
  assert.equal(response.status, 405);
});
