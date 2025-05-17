CREATE TABLE "attachments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"extension" varchar NOT NULL,
	"topic_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;