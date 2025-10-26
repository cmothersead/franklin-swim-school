<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<title
		>{page.data.title ? `${page.data.title} - Franklin Swim School` : 'Franklin Swim School'}</title
	>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen flex-col overflow-y-hidden">
	<div>Franklin Swim School</div>
	{@render children?.()}
</div>
