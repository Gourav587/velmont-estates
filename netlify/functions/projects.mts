import type { Config } from '@netlify/functions';
import { getUser } from '@netlify/identity';
import { eq, desc } from 'drizzle-orm';
import { getDb } from '../../db/index.js';
import { projects } from '../../db/schema.js';
import { parseProject } from '../../src/lib/projectValidation.js';

export default async (req: Request) => {
  const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, POST, PUT, DELETE' } });
  try {
    if (req.method === 'GET') return reply(await getDb().select().from(projects).orderBy(desc(projects.createdAt), projects.id));
    // Validate the signed Identity session on every mutation. Browser guards are only a convenience.
    const user = await getUser();
    if (!user) return reply({ error: 'Sign in to manage listings.' }, 401);
    if (!user.roles?.includes('admin')) return reply({ error: 'An administrator role is required.' }, 403);
    const origin = req.headers.get('origin');
    if (origin && origin !== new URL(req.url).origin) return reply({ error: 'Invalid request origin.' }, 403);
    if (!req.headers.get('content-type')?.includes('application/json')) return reply({ error: 'Send JSON data.' }, 415);
    const raw = await req.text();
    if (raw.length > 32000) return reply({ error: 'Listing is too large.' }, 413);
    let body;
    try { body = JSON.parse(raw); } catch { return reply({ error: 'Invalid JSON.' }, 400); }
    const id = new URL(req.url).searchParams.get('id');
    if (req.method !== 'POST' && (!id || id.length > 100)) return reply({ error: 'A listing ID is required.' }, 400);
    const db = getDb();
    if (req.method === 'DELETE') {
      const rows = await db.delete(projects).where(eq(projects.id, id!)).returning({ id: projects.id });
      return rows.length ? reply({ id }) : reply({ error: 'Listing not found.' }, 404);
    }
    let data;
    try { data = parseProject(body); } catch (error) { return reply({ error: error instanceof Error ? error.message : 'Invalid listing.' }, 400); }
    if (req.method === 'POST') {
      const [row] = await db.insert(projects).values({ ...data, id: crypto.randomUUID() }).returning();
      return reply(row, 201);
    }
    const [row] = await db.update(projects).set(data).where(eq(projects.id, id!)).returning();
    return row ? reply(row) : reply({ error: 'Listing not found.' }, 404);
  } catch {
    return reply({ error: 'Listings are temporarily unavailable. Please try again.' }, 503);
  }
};
export const config: Config = { path: '/api/projects' };
