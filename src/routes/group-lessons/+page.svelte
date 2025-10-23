<script lang="ts">
	import { disableScrollHandling } from '$app/navigation';

	let { data } = $props();

	let showModal = $state(false);
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (showModal) dialog?.showModal();
	});
</script>

<h1 class="text-7xl">Group Lessons</h1>
<button
	onclick={() => {
		showModal = true;
	}}
	class="cursor-pointer rounded bg-blue-400 p-2 hover:bg-blue-500">Schedule now!</button
>
<a href="/instructor">Add Instructor</a>
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div>
		<table>
			<thead>
				<tr>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
					<th>Sun</th>
				</tr>
			</thead>
			<tbody>
				<tr></tr>
			</tbody>
		</table>
	</div>
</dialog>
