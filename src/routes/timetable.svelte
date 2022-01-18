<script lang="ts" context="module">
	export const prerender = true;
	export const load = async ({ fetch }) => {
		try {
			const [r_start_time, r_end_time, r_events] = await Promise.all([
				fetch('/api/startTime'),
				fetch('/api/endTime'),
				fetch('/api/events/eventList?limit=0&field=title&field=time&field=description')
			]);
			const [start_time, end_time, events] = await Promise.all([
				r_start_time.json(),
				r_end_time.json(),
				r_events.json()
			]);
			return {
				props: {
					start_time: new Date(start_time.start_time),
					end_time: new Date(end_time.end_time),
					all_events: events.map((event) => {
						event.time = new Date(event.time);
						return event;
					})
				}
			};
		} catch {
			throw Error('error in load');
		}
	};
</script>

<script lang="ts">
	export let start_time: Date;
	export let end_time: Date;
	export let all_events: {
		title: string;
		time: Date;
		description?: string;
	}[];

	import ColourNum from '$lib/ColourNum.svelte';

	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
</script>

<div class="flex w-full h-screen justify-center content-center font text-base">
	<div class="flex flex-col w-2/5 h-min bg-gray-400 rounded self-center">
		{#each all_events as event (event.title
			.toLowerCase()
			.replaceAll(' ', '-') + '-' + event.time.getDate() + '-' + event.time.getMonth())}
			<div
				class="m-1 bg-white p-2 rounded"
				id={event.title.toLowerCase().replaceAll(' ', '-') +
					'-' +
					event.time.getDate() +
					'-' +
					event.time.getMonth()}
			>
				<div class="flex justify-between text-lg font-bold ">
					<span>{event.title}</span>
					<span
						>{days[event.time.getDay()]} - <ColourNum
							number={event.time.getHours().toLocaleString('en-GB', {
								minimumIntegerDigits: 2,
								useGrouping: false
							})}
						/>:<ColourNum
							number={event.time.getMinutes().toLocaleString('en-GB', {
								minimumIntegerDigits: 2,
								useGrouping: false
							})}
						/></span
					>
				</div>
				{#if event.description}
					<p class="px-4">{event.description}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
