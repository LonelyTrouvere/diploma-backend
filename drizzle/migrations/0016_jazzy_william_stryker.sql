ALTER TABLE "events" DROP CONSTRAINT "events_group_id_topics_id_fk";
--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "topic_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;