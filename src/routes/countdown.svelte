<script lang="ts" context="module">
	export const load = async ({ fetch }) => {
		try {
			const [r_start_time, r_end_time, r_events] = await Promise.all([
				fetch('/api/startTime'),
				fetch('/api/endTime'),
				fetch('/api/events/eventList?limit=0&field=title&field=time')
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
	import ColourNum from '$lib/ColourNum.svelte';
	import Counter from '$lib/Counter.svelte';
	import { curr_time } from '$lib/stores';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Particles from 'svelte-particles';
	import { confettiCorners } from '$lib/particleConfigs';

	export let start_time: Date;
	export let end_time: Date;
	export let all_events: { title: string; time: Date }[];

	const events = all_events
		?.filter((event) => {
			return event.time.getTime() > $curr_time.getTime() - 5000;
		})
		.slice(0, 3);
</script>

<div class="flex flex-col h-screen w-max justify-center m-auto align-middle">
	<p class="text-4xl font-extrabold tracking-widest text-violet-400 align-middle">
		ShefJam <span class="text-vertical align-bottom	"><ColourNum number={'8'} /></span>
	</p>
	<div class="z-10">
		{#if start_time > $curr_time}
			<Counter
				class="text-center font-sans font-bold text-9xl text-violet-300"
				target_time={start_time}
				extra_space={true}
			/>
		{:else}
			<Counter
				class="text-center font-sans font-bold text-9xl text-violet-300"
				target_time={end_time}
				extra_space={true}
			/>
		{/if}
	</div>

	{#if events !== undefined && start_time <= $curr_time}
		{#each events as event, i (event.title)}
			<a
				animate:flip
				in:fade
				out:fly={{ x: 100 }}
				class="text-3xl tracking-wider text-violet-400 text-center {i === 0
					? 'opacity-100'
					: i === 1
					? 'opacity-60'
					: 'opacity-30'}"
				name={event.title}
				href={'/timetable'}
			>
				<p>
					{event.title} -
					<Counter target_time={event.time} extra_space={false} />
				</p>
			</a>
		{/each}
	{/if}
</div>

{#if $curr_time > end_time}
	<Particles id="confetti" options={confettiCorners} />
{/if}
