<script lang="ts" context="module">
	export const load = async ({ fetch }) => {
		try {
			const [start_time, end_time] = await Promise.all([
				fetch('/api/startTime'),
				fetch('/api/endTime')
			]);
			return {
				props: {
					start_time: new Date((await start_time.json()).start_time),
					end_time: new Date((await end_time.json()).end_time)
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
	import ParticleBack from '$lib/StarBackground.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let start_time: Date;
	export let end_time: Date;

	let events: { title: string; time: string }[];
	let all_events: { title: string; time: string }[];

	$: events = all_events
		?.filter((event) => {
			const event_date = new Date(event.time);
			return event_date.getTime() > $curr_time.getTime() - 5000;
		})
		.slice(0, 3);

	onMount(async () => {
		const event_response = await fetch('/api/events/eventList?limit=0&field=title&field=time');
		all_events = await event_response.json();
	});
</script>

<div class="flex flex-col h-screen w-max justify-center m-auto align-middle	z-10">
	<p class="text-4xl font-extrabold tracking-widest text-violet-400 align-middle	z-10">
		ShefJam <span class="text-vertical align-bottom	"><ColourNum number={'8'} /></span>
	</p>
	<div class="z-10">
		{#if start_time > $curr_time}
			<Counter
				class="text-center font-sans font-bold text-9xl text-violet-300 z-10"
				target_time={start_time}
        extra_space={true}
			/>
		{:else}
			<Counter
				class="text-center font-sans font-bold text-9xl text-violet-300 z-10"
				target_time={end_time}
        extra_space={true}
			/>
		{/if}
	</div>

	{#if events !== undefined}
		{#each events as event, i (event.title)}
			<p
       animate:flip in:fade out:fly={{x:100}}
				class="text-3xl tracking-wider text-violet-400 text-center	z-10 {i === 0
					? 'opacity-100'
					: i === 1
					? 'opacity-60'
					: 'opacity-30'}"
				name={event.title}
			>
				{event.title} - 
				<Counter target_time={new Date(event.time)} extra_space={false} />
			</p>
		{/each}
	{/if}
	<ParticleBack />
</div>
