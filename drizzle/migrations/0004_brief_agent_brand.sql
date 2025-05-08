ALTER TABLE "groups_to_users" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."users_status";--> statement-breakpoint
CREATE TYPE "public"."users_status" AS ENUM('request_to_user', 'request_from_user', 'active', 'blocked');--> statement-breakpoint
ALTER TABLE "groups_to_users" ALTER COLUMN "status" SET DATA TYPE "public"."users_status" USING "status"::"public"."users_status";