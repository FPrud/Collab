ALTER TABLE "profile" ADD COLUMN "address" integer;--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "address_number";--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "address_street_name";--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "address_zip_code";--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "address_country";