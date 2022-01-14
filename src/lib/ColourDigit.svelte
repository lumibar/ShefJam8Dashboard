<script lang="ts">
	export let digit: string | number;
	export let highlight;

	if (typeof digit === 'number') {
		digit = digit.toString();
	}
</script>

{#if digit === highlight}<span class="text-red-500">{digit}</span>{:else}{digit}{/if}
