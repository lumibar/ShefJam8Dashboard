<script lang="ts" context="module">
	export const prerender = true;
	import {ISOtoDate} from "$lib/utils"
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
					start_time: ISOtoDate(start_time.start_time),
					end_time: ISOtoDate(end_time.end_time),
					all_events: events.map((event) => {
						event.time = ISOtoDate(event.time);
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
	import logo from "$lib/logo.png?w=100;200;400&format=webp&srcset";

	export let start_time: Date;
	export let end_time: Date;
	export let all_events: { title: string; time: Date }[];
	


	const events = all_events
		?.filter((event) => {
			return event.time.getTime() > $curr_time.getTime() - 5000;
		})
		.slice(0, 3);
</script>

<svelte:head>
	<title>ShefJam 8 - Countdown</title>
</svelte:head>


<a href="/timetable">
	<img srcset={logo} type="image/webp" alt="ShefJam 8 Logo" class="absolute left-4 top-4 w-20 sm:w-30 md:w-40" />
</a>
<div class="flex flex-col h-screen w-max justify-center m-auto align-middle">
	<p class="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-violet-400 align-middle">
		ShefJam <span class="text-vertical align-bottom	"><ColourNum number={'8'} /></span>
	</p>
	<div class="z-10">
		<Counter
			class="text-center font-sans font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-violet-300"
			target_time={start_time > $curr_time ? start_time : end_time}
			extra_space={true}
		/>
	</div>

	{#if events !== undefined && start_time <= $curr_time}
		{#each events as event, i (event.title)}
			<a
				animate:flip
				in:fade
				out:fly={{ x: 100 }}
				class="text-3xl tracking-wider text-violet-400 m-1 text-center {i === 0
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
