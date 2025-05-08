CREATE TYPE "public"."users_status" AS ENUM('request', 'active', 'blocked');--> statement-breakpoint
ALTER TABLE "groups_to_users" ADD COLUMN "joined" timestamp;--> statement-breakpoint
ALTER TABLE "groups_to_users" ADD COLUMN "status" "users_status" NOT NULL;