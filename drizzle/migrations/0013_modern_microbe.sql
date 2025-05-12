ALTER TABLE "topics" ADD COLUMN "meeting_id" uuid;--> statement-breakpoint
ALTER TABLE "topics" ADD COLUMN "recurring" boolean;--> statement-breakpoint
ALTER TABLE "topics" ADD COLUMN "meeting_first_date" timestamp;