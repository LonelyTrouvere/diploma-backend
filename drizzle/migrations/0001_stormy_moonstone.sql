CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"hash" varchar NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
