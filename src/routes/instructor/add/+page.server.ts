import { db } from '$lib/server/db';
import { insertInstructorSchema, instructors } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { wizCreate, wizValidate } from 'form-wiz';
import { zod4 } from 'sveltekit-superforms/adapters';

export async function load() {
	const insertInstructorForm = await wizCreate(zod4(insertInstructorSchema), '', {
		title: 'Hello There!',
		columns: 1
	});
	return { insertInstructorForm, title: 'Instructors' };
}

export const actions = {
	default: async ({ request }) => {
		const form = await wizValidate(request, insertInstructorSchema, zod4);
		if (!form.valid) {
			return fail(400, { form });
		}

		await db.insert(instructors).values(form.data);
		redirect(300, '');
	}
};
