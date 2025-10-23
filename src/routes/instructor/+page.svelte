<script lang="ts">
	import { WizForm, wizForm } from 'form-wiz';

	let { data } = $props();
	const wizform = wizForm(data.insertInstructorForm);
</script>

<WizForm form={wizform} />
