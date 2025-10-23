ALTER TABLE `instructor` RENAME COLUMN "firstName" TO "first_name";--> statement-breakpoint
ALTER TABLE `instructor` RENAME COLUMN "lastName" TO "last_name";--> statement-breakpoint
CREATE TABLE `facility` (
	`name` text,
	`address` text
);
--> statement-breakpoint
CREATE TABLE `instructor_availability` (
	`instructor_id` integer NOT NULL,
	`day` integer,
	`slot_number` integer
);
--> statement-breakpoint
CREATE TABLE `schedule` (
	`facility_id` integer NOT NULL,
	`day` integer,
	`start_time` integer,
	`end_time` integer
);
