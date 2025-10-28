import { relations } from 'drizzle-orm';
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { instructors } from './instructors';

export const instructorAvailability = sqliteTable('instructor_availability', {
	instructorId: integer().notNull(),
	day: integer(),
	slotNumber: integer()
});

export const availabilityRelations = relations(instructorAvailability, ({ one }) => ({
	instructor: one(instructors, {
		fields: [instructorAvailability.instructorId],
		references: [instructors.id]
	})
}));
