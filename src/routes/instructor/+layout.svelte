<script lang="ts">
	import Icon from '@iconify/svelte';

	let { data, children } = $props();
	let { instructors } = $derived(data);
</script>

<div class="flex flex-grow overflow-y-auto">
	<div class="flex flex-col items-stretch gap-2 overflow-y-auto bg-secondary-200-800 p-2">
		<h3 class="h3">Instructors</h3>
		<a href="/instructor/add" class="btn preset-tonal-success"
			><Icon icon="fa7-solid:plus" /> Add Instructor</a
		>
		{#each instructors as { id, firstName, lastName }}
			<a
				href={`/instructor/${id}`}
				class="btn flex cursor-pointer items-center justify-start gap-2 preset-filled-secondary-800-200"
			>
				<div class="placeholder-circle size-10"></div>
				<div>{lastName}, {firstName}</div>
			</a>
		{/each}
	</div>
	<div class="flex-grow overflow-y-auto p-8">
		{@render children?.()}
	</div>
</div>
