import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const instructorAvailability = sqliteTable('instructor_availability', {
	instructorId: integer().notNull(),
	day: integer(),
	slotNumber: integer()
});
