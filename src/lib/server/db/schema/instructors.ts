import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';

export const instructors = sqliteTable('instructors', {
	id: integer(),
	firstName: text(),
	lastName: text()
});

export const insertInstructorSchema = createInsertSchema(instructors).omit({ id: true });

export const updateIstructorSchema = createUpdateSchema(instructors).required({ id: true });
