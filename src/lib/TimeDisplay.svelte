<script lang="ts">
	let className = '';
	export { className as class };
    export let target_time: Date;
    export let date_limit:number = 3;
	export let extra_space: boolean;
	import { curr_time } from '$lib/stores';
	import { TimeUnits } from '$lib/constants';
	import ColourNum from '$lib/ColourNum.svelte';
	let days: number, hours: number, minutes: number, seconds: number;

	$: {
		let distance = target_time ? target_time.getTime() - $curr_time.getTime() : 0;

		if (distance >= 0) {
		days = Math.floor(distance / TimeUnits.DAY);
		hours =
			Math.floor((distance % TimeUnits.DAY) / TimeUnits.HOUR) +
			(days < 3 ? days * 24 : 0);
		minutes = Math.floor((distance % TimeUnits.HOUR) / TimeUnits.MINUTE);
		seconds = Math.floor((distance % TimeUnits.MINUTE) / TimeUnits.SECOND);
		} else {
			days = hours = minutes = seconds = 0;
		}
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
</script>

<span class={className}>
	{#if days >= date_limit}<ColourNum number={days} />{extra_space ? " : " : ":"}{/if}<ColourNum number={display_hours} />{extra_space ? " : " : ":"}<ColourNum number={display_minutes} />{extra_space ? " : " : ":"}<ColourNum number={display_seconds} />
</span>
