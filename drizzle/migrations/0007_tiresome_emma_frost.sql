ALTER TABLE "topics" ADD COLUMN "group_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "topics" ADD CONSTRAINT "topics_group_id_unique" UNIQUE("group_id");