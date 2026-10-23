import { pgTable, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  location: text('location').notNull(),
  category: text('category').notNull(),
  image: text('image').notNull(),
  description: text('description').notNull().default(''),
  price: integer('price'),
  area: text('area').notNull().default(''),
  bedrooms: integer('bedrooms'),
  status: text('status').notNull().default('Enquire for availability'),
  rera: text('rera').notNull().default(''),
  gallery: text('gallery').array().notNull().default([]),
  isIllustrative: boolean('is_illustrative').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
