import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const schedule = sqliteTable('schedule', {
	facilityId: integer().notNull(),
	day: integer(),
	startTime: integer(),
	endTime: integer()
});
