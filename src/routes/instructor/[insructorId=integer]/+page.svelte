<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import { typedFormFieldProxy, wizForm, WizForm, WizInput } from 'form-wiz';
	import { startCase } from 'lodash-es';
	import { DatePicker } from '@skeletonlabs/skeleton-svelte';
	import { onMount } from 'svelte';

	const { data } = $props();
	const { instructor } = $derived(data);
	const { firstName, lastName, id, bio, startYear } = $derived(instructor);
	let editName = $state(false);

	const updateInstructorNameForm = wizForm(data.updateInstructorNameForm);
	const { form: nameForm, enhance: nameEnhance } = updateInstructorNameForm;
	let formHTMLObject: HTMLFormElement | undefined = $state();
	let nameDiv: HTMLDivElement | undefined = $state();
	let defaultFirstRow: HTMLElement | undefined | null = $state();
	const daysOfTheWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	let clickedRow: number | undefined = $state(undefined);
	let clickedColumn: number | undefined = $state(undefined);
	let hoveredRow: number | undefined = $state(undefined);
	let hoveredColumn: number | undefined = $state(undefined);

	function between(number: number, a: number, b: number) {
		const min = Math.min(a, b);
		const max = Math.max(a, b);
		return number >= min && number <= max;
	}
	function rowNumbertoTimeString(rowNumber: number) {
		const ampm = rowNumber < 24 ? 'am' : 'pm';
		const hour = Math.floor(rowNumber / 2) % 12;
		const minutes = rowNumber % 2 ? '30' : '00';

		return `${hour == 0 ? 12 : hour}:${minutes}${ampm}`;
	}

	const grid = [...Array(48)].map((row) => (row = [...Array(7)].map((val) => (val = false))));

	function cellStyle(row: number, column: number) {
		if (row === undefined || column == undefined) {
			return '';
		}
		const hovered = row == hoveredRow && column == hoveredColumn;
		const active = grid[row][column] == true;
		const settingActive =
			clickedRow != undefined &&
			clickedColumn != undefined &&
			grid[clickedRow][clickedColumn] == false;
		const selected =
			clickedRow != undefined &&
			clickedColumn != undefined &&
			hoveredRow != undefined &&
			hoveredColumn != undefined &&
			between(row, clickedRow, hoveredRow) &&
			between(column, clickedColumn, hoveredColumn);

		const top =
			(active && grid[row - 1] == undefined) ||
			(active && grid[row - 1]?.[column] == false) ||
			(selected &&
				clickedRow != undefined &&
				hoveredRow != undefined &&
				row == Math.min(clickedRow, hoveredRow) &&
				grid[row - 1]?.[column] == false) ||
			(hovered && !active && !selected)
				? ' rounded-t-lg'
				: '';
		const bottom =
			(active && grid[row + 1] == undefined) ||
			(active && grid[row + 1]?.[column] == false) ||
			(selected &&
				clickedRow != undefined &&
				hoveredRow != undefined &&
				row == Math.max(clickedRow, hoveredRow) &&
				grid[row + 1]?.[column] == false) ||
			(hovered && !active && !selected)
				? ' rounded-b-lg'
				: '';
		if (selected && hovered) {
			console.log({ selected, settingActive, active, hovered, clickedRow, clickedColumn });
		}
		if (selected && settingActive && !hovered) {
			return `bg-success-200-800${top}${bottom}`;
		} else if (selected && active && !settingActive && hovered) {
			return `bg-error-700-300${top}${bottom}`;
		} else if (selected && active && !settingActive && !hovered) {
			return `bg-error-800-200${top}${bottom}`;
		} else if (!selected && active && hovered) {
			return `bg-warning-700-300${top}${bottom}`;
		} else if (hovered && selected && !settingActive) {
			return '';
		} else if (hovered) {
			return `bg-success-50-950${top}${bottom}`;
		} else if (active) {
			return `bg-success-500${top}${bottom}`;
		}
	}

	onMount(() => {
		defaultFirstRow = document.getElementById('row22');
		defaultFirstRow?.scrollIntoView();
	});
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
			clickedRow = clickedColumn = undefined;
			console.log(defaultFirstRow);
			defaultFirstRow?.scrollIntoView({ behavior: 'smooth' });
		}
	}}
	onmouseup={() => {
		if (
			clickedColumn !== undefined &&
			clickedRow !== undefined &&
			hoveredColumn !== undefined &&
			hoveredRow !== undefined
		) {
			const value = !grid[clickedRow][clickedColumn];
			for (let i = Math.min(clickedRow, hoveredRow); i <= Math.max(clickedRow, hoveredRow); i++) {
				for (
					let j = Math.min(clickedColumn, hoveredColumn);
					j <= Math.max(clickedColumn, hoveredColumn);
					j++
				)
					grid[i][j] = value;
			}
		}
		clickedRow = clickedColumn = undefined;
	}}
/>

<div class="flex h-full flex-col">
	<div class="flex h-12 items-center gap-2 pb-4" bind:this={nameDiv}>
		{#if editName}
			<form
				action={updateInstructorNameForm.action}
				use:nameEnhance
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
								bind:value={$nameForm[field]}
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
	<Tabs defaultValue="availability" class="flex-grow overflow-y-hidden">
		<Tabs.List>
			<Tabs.Trigger
				value="availability"
				onclick={() => {
					defaultFirstRow?.scrollIntoView();
				}}>Availability</Tabs.Trigger
			>
			<Tabs.Trigger value="calendar">Calendar</Tabs.Trigger>
			<Tabs.Trigger value="personal-info">Personal Info</Tabs.Trigger>
			<Tabs.Indicator />
		</Tabs.List>
		<Tabs.Content value="availability" class="flex-grow overflow-y-hidden">
			<div class="flex h-full flex-col rounded-2xl bg-surface-50-950 p-4">
				<div class="text-center h3">Typical Availability</div>
				<div class="flex snap-y snap-mandatory scroll-pt-5 overflow-y-auto">
					<table class="flex-grow table-fixed select-none">
						<thead class="sticky top-0 h-5 bg-surface-50-950">
							<tr>
								<td></td>
								{#each daysOfTheWeek as day}
									<th class="text-xs">{day}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each [...Array(48)].map((_, i) => i) as row}
								<tr class="snap-start">
									<td id="row{row}" class="w-min pr-2 text-right text-xs text-surface-600-400"
										>{rowNumbertoTimeString(row)}</td
									>
									{#each daysOfTheWeek as _, column}
										<td
											class="group cursor-pointer border-l border-t-surface-100-900 text-center"
											onmousedown={() => {
												clickedRow = row;
												clickedColumn = column;
											}}
											onmouseenter={() => {
												hoveredRow = row;
												hoveredColumn = column;
											}}
										>
											<div class="invisible h-0 w-20" aria-hidden="true">Wednesday</div>
											<div
												class="h-7 w-full text-success-50-950 {cellStyle(row, column)}"
												class:border-t-0={true}
											></div>
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</Tabs.Content>
		<Tabs.Content value="calendar">
			<DatePicker inline>
				<DatePicker.Label>Label</DatePicker.Label>
				<DatePicker.Content>
					<DatePicker.View view="day">
						<DatePicker.Context>
							{#snippet children(datePicker)}
								<DatePicker.ViewControl>
									<DatePicker.PrevTrigger />
									<DatePicker.ViewTrigger>
										<DatePicker.RangeText />
									</DatePicker.ViewTrigger>
									<DatePicker.NextTrigger />
								</DatePicker.ViewControl>
								<DatePicker.Table>
									<DatePicker.TableHead>
										<DatePicker.TableRow>
											{#each datePicker().weekDays as weekDay, id (id)}
												<DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
											{/each}
										</DatePicker.TableRow>
									</DatePicker.TableHead>
									<DatePicker.TableBody>
										{#each datePicker().weeks as week, id (id)}
											<DatePicker.TableRow>
												{#each week as day, id (id)}
													<DatePicker.TableCell value={day}>
														<DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
													</DatePicker.TableCell>
												{/each}
											</DatePicker.TableRow>
										{/each}
									</DatePicker.TableBody>
								</DatePicker.Table>
							{/snippet}
						</DatePicker.Context>
					</DatePicker.View>
					<DatePicker.View view="month">
						<DatePicker.Context>
							{#snippet children(datePicker)}
								<DatePicker.ViewControl>
									<DatePicker.PrevTrigger />
									<DatePicker.ViewTrigger>
										<DatePicker.RangeText />
									</DatePicker.ViewTrigger>
									<DatePicker.NextTrigger />
								</DatePicker.ViewControl>
								<DatePicker.Table>
									<DatePicker.TableBody>
										{#each datePicker().getMonthsGrid( { columns: 4, format: 'short' } ) as months, id (id)}
											<DatePicker.TableRow>
												{#each months as month, id (id)}
													<DatePicker.TableCell value={month.value}>
														<DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
													</DatePicker.TableCell>
												{/each}
											</DatePicker.TableRow>
										{/each}
									</DatePicker.TableBody>
								</DatePicker.Table>
							{/snippet}
						</DatePicker.Context>
					</DatePicker.View>
					<DatePicker.View view="year">
						<DatePicker.Context>
							{#snippet children(datePicker)}
								<DatePicker.ViewControl>
									<DatePicker.PrevTrigger />
									<DatePicker.ViewTrigger>
										<DatePicker.RangeText />
									</DatePicker.ViewTrigger>
									<DatePicker.NextTrigger />
								</DatePicker.ViewControl>
								<DatePicker.Table>
									<DatePicker.TableBody>
										{#each datePicker().getYearsGrid({ columns: 4 }) as years, id (id)}
											<DatePicker.TableRow>
												{#each years as year, id (id)}
													<DatePicker.TableCell value={year.value}>
														<DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
													</DatePicker.TableCell>
												{/each}
											</DatePicker.TableRow>
										{/each}
									</DatePicker.TableBody>
								</DatePicker.Table>
							{/snippet}
						</DatePicker.Context>
					</DatePicker.View>
				</DatePicker.Content>
			</DatePicker>
		</Tabs.Content>
		<Tabs.Content value="personal-info">
			<div class="h4">Bio:</div>
			<div>{bio}</div>
		</Tabs.Content>
	</Tabs>
</div>
