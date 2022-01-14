<script lang="ts">
	let className = '';
	import { curr_time } from '$lib/stores';
	export { className as class };

	import TimeDisplay from './TimeDisplay.svelte';

	export let target_time: Date;
	export let extra_space: boolean;
</script>

<TimeDisplay class={className} target_time={target_time} extra_space={extra_space} />
