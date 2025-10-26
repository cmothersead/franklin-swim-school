PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_instructor` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text,
	`last_name` text
);
--> statement-breakpoint
INSERT INTO `__new_instructor`("id", "first_name", "last_name") SELECT "id", "first_name", "last_name" FROM `instructor`;--> statement-breakpoint
DROP TABLE `instructor`;--> statement-breakpoint
ALTER TABLE `__new_instructor` RENAME TO `instructor`;--> statement-breakpoint
PRAGMA foreign_keys=ON;