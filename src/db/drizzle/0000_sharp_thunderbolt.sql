-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" text,
	"avatar_url" text,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "Users can update own profile." ON "users" AS PERMISSIVE FOR UPDATE TO public USING ((( SELECT auth.uid() AS uid) = id));--> statement-breakpoint
CREATE POLICY "Users can insert their own profile." ON "users" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "Public users are viewable by everyone." ON "users" AS PERMISSIVE FOR SELECT TO public;
*/