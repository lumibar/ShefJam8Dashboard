<script lang="ts">
	export let digit;

	if (typeof digit === 'number') {
		digit = digit.toString();
	}
</script>

{#if digit === '8'}<span class="text-red-500">&#8734</span>{:else}{digit}{/if}
