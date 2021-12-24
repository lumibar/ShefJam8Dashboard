<script lang="ts" context="module">
	const startTime = new Date('Dec 23, 2021 00:00:00');
	const endTime = new Date('Dec 25, 2021 00:00:00');

	if (startTime > endTime) {
		throw Error('endTime cannot be before startTime');
	} else if (startTime == endTime) {
		throw Error('endTime cannot be equal to startTime');
	}
</script>

<script lang="ts">
	let className = '';
	export { className as class };

	import { onMount } from 'svelte';
	import ColourNum from './ColourNum.svelte';

	let curr_time = new Date();
	let days: number, hours: number, minutes: number, seconds: number;

	$: {
		let target_time: Date;

		if (curr_time < startTime) {
			target_time = startTime;
		} else if (curr_time < endTime) {
			target_time = endTime;
		} else {
			target_time = undefined;
		}

		let distance = target_time ? target_time.getTime() - curr_time.getTime() : 0;

		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours =
			Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) +
			(days < 3 ? days * 24 : 0);
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);
	}
	let display_hours, display_minutes, display_seconds, display_days;

	$: display_hours = hours.toLocaleString('en-GB', {
		minimumIntegerDigits: 2,
		useGrouping: false
	});
	$: display_minutes = minutes.toLocaleString('en-GB', {
		minimumIntegerDigits: 2,
		useGrouping: false
	});
	$: display_seconds = seconds.toLocaleString('en-GB', {
		minimumIntegerDigits: 2,
		useGrouping: false
	});
	onMount(() => {
		const interval = setInterval(() => {
			curr_time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class={className}>
	{#if days >= 3}{days} : {/if}
	<ColourNum number={display_hours} /> :
	<ColourNum number={display_minutes} /> :
	<ColourNum number={display_seconds} />
</div>
