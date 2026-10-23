CREATE TABLE "projects" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"category" text NOT NULL,
	"image" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"price" integer,
	"area" text DEFAULT '' NOT NULL,
	"bedrooms" integer,
	"status" text DEFAULT 'Enquire for availability' NOT NULL,
	"rera" text DEFAULT '' NOT NULL,
	"gallery" text[] DEFAULT '{}'::text[] NOT NULL,
	"is_illustrative" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
