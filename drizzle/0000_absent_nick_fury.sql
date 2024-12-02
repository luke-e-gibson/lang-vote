CREATE TABLE IF NOT EXISTS "langs" (
	"lang_id" serial PRIMARY KEY NOT NULL,
	"lang_name" text NOT NULL,
	"lang_description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "voters" (
	"voter_id" serial PRIMARY KEY NOT NULL,
	"browser_id" varchar NOT NULL,
	"has-voted" boolean DEFAULT false NOT NULL,
	"created-lang" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"voter_id" integer NOT NULL,
	"lang_id" integer NOT NULL
);
