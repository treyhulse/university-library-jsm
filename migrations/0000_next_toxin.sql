CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullName" varchar NOT NULL,
	"email" text NOT NULL,
	"universityId" integer NOT NULL,
	"universityCard" text NOT NULL,
	"password" text NOT NULL,
	"status" "status" DEFAULT 'PENDING',
	"lastActivityDate" date DEFAULT now(),
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
