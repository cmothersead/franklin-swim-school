import { insertInstructorSchema } from '$lib/server/db/schema';
import { wizCreate } from 'form-wiz';
import { zod4 as zod } from 'sveltekit-superforms/adapters';

export async function load() {
	const insertInstructorForm = await wizCreate(zod(insertInstructorSchema), '', {
		title: 'Hello There!',
		columns: 1
	});
	return { insertInstructorForm };
}
