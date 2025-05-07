CREATE TYPE "public"."role" AS ENUM('owner', 'admin', 'participant');--> statement-breakpoint
CREATE TABLE "groups_to_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"group_id" uuid NOT NULL,
	"role" "role" NOT NULL
);
