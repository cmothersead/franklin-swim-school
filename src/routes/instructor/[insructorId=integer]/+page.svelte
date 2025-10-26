<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { typedFormFieldProxy, wizForm, WizForm, WizInput } from 'form-wiz';
	import { startCase } from 'lodash-es';

	const { data } = $props();
	const { instructor } = $derived(data);
	const { firstName, lastName, id, bio, startYear } = $derived(instructor);
	let editName = $state(false);

	const updateInstructorNameForm = wizForm(data.updateInstructorNameForm);
	const { form, enhance } = updateInstructorNameForm;
	let formHTMLObject: HTMLFormElement | undefined = $state();
	let nameDiv: HTMLDivElement | undefined = $state();
</script>

<svelte:body
	onclick={(e) => {
		if (nameDiv?.contains(e.target as Node)) {
			editName = true;
		} else {
			updateInstructorNameForm.form.set({
				id: instructor.id,
				firstName: instructor.firstName,
				lastName: instructor.lastName
			});
			editName = false;
		}
	}}
	onkeydown={(e) => {
		if (e.key == 'Escape') {
			updateInstructorNameForm.form.set({
				id: instructor.id,
				firstName: instructor.firstName,
				lastName: instructor.lastName
			});
			editName = false;
		}
	}}
/>

<div class="flex w-full justify-between gap-4 pb-4">
	<div class="flex h-12 items-center gap-2" bind:this={nameDiv}>
		{#if editName}
			<form
				action={updateInstructorNameForm.action}
				use:enhance
				method="POST"
				bind:this={formHTMLObject}
			>
				<div class="flex items-center gap-2">
					{#each Object.entries(updateInstructorNameForm.layout.fields).filter(([, field]) => field != false) as [field, { type, label, hidden }]}
						<label for={field} class="relative label p-0" {hidden}>
							<span class="absolute top-2 left-3 text-xs">{label ?? startCase(String(field))}</span>
							<input
								id={field}
								name={field}
								class="input pt-4 h5"
								{type}
								bind:value={$form[field]}
							/>
						</label>
					{/each}
					<button
						class="btn h-min preset-tonal-primary p-2 h5"
						onclick={() => {
							formHTMLObject?.requestSubmit();
							editName = false;
						}}><Icon icon="material-symbols:save" /></button
					>
				</div>
			</form>
		{:else}
			<button class="group flex items-center gap-2">
				<div class="h1">
					{firstName}
					{lastName}
				</div>
				<div class="btn hidden preset-tonal-primary p-2 h5 group-hover:inline">
					<Icon icon="material-symbols:edit" />
				</div>
			</button>
		{/if}
	</div>
</div>
<Tabs defaultValue="availability">
	<Tabs.List>
		<Tabs.Trigger value="availability">Availability</Tabs.Trigger>
		<Tabs.Trigger value="personal-info">Personal Info</Tabs.Trigger>
		<Tabs.Indicator />
	</Tabs.List>
	<Tabs.Content value="availability">Hello There!</Tabs.Content>
	<Tabs.Content value="personal-info">
		<div class="h4">Bio:</div>
		<div>{bio}</div>
	</Tabs.Content>
</Tabs>
