import { db } from '$lib/server/db';

export async function load() {
	const instructors = await db.query.instructors.findMany({
		orderBy: (instructors, { asc }) => [asc(instructors.lastName), asc(instructors.firstName)]
	});

	return { instructors, title: 'Instructors' };
}
