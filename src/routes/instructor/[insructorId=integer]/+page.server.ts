import { db } from '$lib/server/db';
import { instructors, updateInstructorSchema } from '$lib/server/db/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { wizCreate, wizValidate } from 'form-wiz';
import { zod4 } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
	const instructorId = parseInt(params.insructorId);
	const instructor = await db.query.instructors.findFirst({
		where: eq(instructors.id, instructorId),
		with: {
			availability: true
		}
	});
	if (!instructor) error(404, 'This instructor does not exist!');

	const updateInstructorNameForm = await wizCreate(
		zod4(updateInstructorSchema.pick({ id: true, firstName: true, lastName: true })),
		'?/updateName',
		{ columns: 2, fields: { id: { hidden: true } } }
	);
	updateInstructorNameForm.data = {
		id: instructor.id,
		firstName: instructor.firstName,
		lastName: instructor.lastName
	};

	return { instructor, updateInstructorNameForm };
}

export const actions = {
	updateName: async ({ request }) => {
		const form = await wizValidate(
			request,
			updateInstructorSchema.pick({ id: true, firstName: true, lastName: true }),
			zod4
		);
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log(form.data);

		await db
			.update(instructors)
			.set(form.data)
			.where(eq(instructors.id, form.data.id as number));
		redirect(300, '');
	}
};
