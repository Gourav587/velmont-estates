import { categories } from '../types/project.js';

function text(value: unknown, label: string, max: number, required = false) {
  if (value == null && !required) return '';
  if (typeof value !== 'string' || value.trim().length > max || (required && !value.trim())) throw new Error(`${label} is required and must be under ${max} characters.`);
  return value.trim();
}
function imageUrl(value: unknown) {
  const result = text(value, 'Photo URL', 2000, true);
  try { if (new URL(result).protocol !== 'https:') throw new Error(); } catch { throw new Error('Use a valid HTTPS photo URL.'); }
  return result;
}
function number(value: unknown, label: string, max: number) {
  if (value == null || value === '') return null;
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > max) throw new Error(`${label} must be a whole number between 0 and ${max}.`);
  return value;
}
export function parseProject(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid listing.');
  const data = input as Record<string, unknown>;
  const category = text(data.category, 'Property type', 50, true);
  if (!categories.includes(category)) throw new Error('Choose a valid property type.');
  if (data.gallery != null && (!Array.isArray(data.gallery) || data.gallery.length > 8)) throw new Error('Add up to eight gallery photos.');
  return {
    title: text(data.title, 'Title', 160, true), location: text(data.location, 'Location', 250, true), category,
    image: imageUrl(data.image), description: text(data.description, 'Description', 4000),
    price: number(data.price, 'Price', 2147483647), area: text(data.area, 'Area', 100),
    bedrooms: number(data.bedrooms, 'Bedrooms', 100), status: text(data.status, 'Availability', 100) || 'Enquire for availability',
    rera: text(data.rera, 'RERA details', 250), gallery: ((data.gallery ?? []) as unknown[]).map(imageUrl),
    isIllustrative: data.isIllustrative === true,
  };
}
