import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { instructorAvailability } from './availabilities';

export const instructors = sqliteTable('instructor', {
	id: integer().primaryKey({ autoIncrement: true }),
	firstName: text(),
	lastName: text(),
	bio: text(),
	startYear: integer()
});

export const instructorRelations = relations(instructors, ({ many }) => ({
	availability: many(instructorAvailability)
}));

export const insertInstructorSchema = createInsertSchema(instructors).omit({ id: true });

export const updateInstructorSchema = createUpdateSchema(instructors).required({ id: true });
