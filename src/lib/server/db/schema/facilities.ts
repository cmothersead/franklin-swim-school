import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const facility = sqliteTable('facility', {
	name: text(),
	address: text()
});
