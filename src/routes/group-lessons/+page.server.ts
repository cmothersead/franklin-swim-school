import { db } from '$lib/server/db';

export async function load() {
	const schedules = await db.query.schedule.findMany();

	return { schedules };
}
