import type { Config } from '@netlify/functions';
import { getDb } from '../../db/index.js';
import { projects } from '../../db/schema.js';
function escapeXml(value: string) { return value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!); }
export default async () => {
  try {
    const rows = await getDb().select({ id: projects.id, isIllustrative: projects.isIllustrative }).from(projects);
    const paths = ['/', '/about', '/services', '/projects', '/contact', '/privacy', ...rows.filter(row => !row.isIllustrative).map(row => `/projects/${encodeURIComponent(row.id)}`)];
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${escapeXml(`https://velomtestates.netlify.app${path}`)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=300' } });
  } catch { return new Response('Sitemap temporarily unavailable', { status: 503, headers: { 'Retry-After': '300' } }); }
};
export const config: Config = { path: '/sitemap.xml' };
