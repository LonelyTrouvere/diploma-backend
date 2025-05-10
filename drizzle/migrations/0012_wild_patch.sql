ALTER TABLE "comments" RENAME COLUMN "group_id" TO "topic_id";--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_group_id_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;