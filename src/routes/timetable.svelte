<script lang="ts" context="module">
	import {ISOtoDate} from "$lib/utils"

	export const prerender = true;
	export const router = false;
	
	export const load = async ({ fetch }) => {
		try {
			const [/*r_start_time, r_end_time,*/ r_events] = await Promise.all([
				//fetch('/api/startTime'),
				//fetch('/api/endTime'),
				fetch('/api/events/eventList?limit=0&field=title&field=time&field=description')
			]);
			const [/*start_time, end_time,*/ events] = await Promise.all([
				//r_start_time.json(),
				//r_end_time.json(),
				r_events.json()
			]);
			return {
				props: {
					//start_time: new Date(start_time.start_time),
					//end_time: new Date(end_time.end_time),
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
	import { curr_time } from "$lib/stores";
	//export let start_time: Date;
	//export let end_time: Date;
	export let all_events: {
		id?: string;
		title: string;
		time: Date;
		description?: string;
	}[];

	all_events = all_events.map((event) => {
		const id = event.title.toLowerCase().replaceAll(' ', '-') + '-' + event.time.getDate() + '-' + event.time.getMonth()
		return {
			...event,
			id
		}
	})

	let displayDescription = {}

	

	let nextEvent = all_events.filter((event) => {
		return event.time > $curr_time;
	}).sort((a,b) => {
		return a.time.getTime() - b.time.getTime();
	})[0].id;

	all_events.forEach((event) => {
		displayDescription[event.id] = event.id === nextEvent ? true : false;
	})

	import ColourNum from '$lib/ColourNum.svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import logo from "$lib/logo.png?w=100;200;400&format=webp&srcset";
	import SquareBracket from "$lib/SquareBracket.svelte";

	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
</script>



<svelte:head>
	<title>ShefJam 8 - Timetable</title>
</svelte:head>

<a sveltekit:prefetch href="/">
	<img srcset={logo} type="image/webp" alt="ShefJam 8 Logo" class="absolute left-4 top-4 w-20 sm:w-30 md:w-40 transi" />
</a>
<div class="flex w-full h-screen justify-center content-center font text-base">
	<div class="flex flex-col w-4/5 sm:w-3/5 md:w-2/5 h-min rounded self-center">
		{#each ["Fri", "Sat", "Sun"] as boxDay (boxDay)}
			<h3 class="ml-5 font-bold text-xl text-violet-500">{boxDay}</h3>
			<SquareBracket class="p-2" --colour="rgb(139 92 246 / 1)" --border="3px">
			{#each all_events.filter((event)=>{return days[event.time.getDay()]==boxDay}) as event (event.id)}
				<div
					class="transition-all ease-in-out m-1 bg-violet-400 p-2 rounded"
					id={event.id}
					on:click="{
						(event) => {
							displayDescription[event.currentTarget.id] = !displayDescription[event.currentTarget.id]
						}
					}"
					animate:flip
				>
					<div class="flex justify-between text-lg font-bold ">
						<span>{event.title}</span>
						<span
							><span>
								<ColourNum
								number={event.time.getHours().toLocaleString('en-GB', {
									minimumIntegerDigits: 2,
									useGrouping: false
								})}
							/>:<ColourNum
								number={event.time.getMinutes().toLocaleString('en-GB', {
									minimumIntegerDigits: 2,
									useGrouping: false
								})}
							/></span>  {#if event.description}<span>{displayDescription[event.id] ? ' ▲' : ' ▼'}</span>{/if}</span
						>
					</div>
					{#if displayDescription[event.id] && event.description}
						<p in:fly="{{ y: -20, duration: 400 }}" class="px-4">{event.description}</p>
					{/if}
				</div>
			{/each}
			</SquareBracket>
		{/each}
	</div>
</div>
