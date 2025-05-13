CREATE TABLE "chat_message" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" varchar NOT NULL,
	"timestamp" timestamp NOT NULL,
	"user_id" uuid NOT NULL,
	"group_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL,
	"seen" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;