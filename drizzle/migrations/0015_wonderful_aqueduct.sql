CREATE TYPE "public"."type" AS ENUM('meeting', 'deadline');--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" varchar,
	"group_id" uuid NOT NULL,
	"recurring" boolean,
	"recurring_rule" integer,
	"date" timestamp NOT NULL,
	"type" "type" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_group_id_topics_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topics" DROP COLUMN "recurring";--> statement-breakpoint
ALTER TABLE "topics" DROP COLUMN "meeting_first_date";