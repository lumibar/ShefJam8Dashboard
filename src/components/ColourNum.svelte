<script lang="ts">
	import ColourDigit from './ColourDigit.svelte';
	export let number;

	if (typeof number === 'number') {
		number = number.toString();
	}
</script>

{#each number as digit}
	<ColourDigit {digit} />
{/each}
