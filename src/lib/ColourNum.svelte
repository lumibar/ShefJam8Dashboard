<script lang="ts">
	import { currVersion } from '$lib/constants';
	import ColourDigit from '$lib/ColourDigit.svelte';
	export let number;
	export let highlight = currVersion.toString();

	if (typeof number === 'number') {
		number = number.toString();
	}
</script>

{#each number as digit}
	<ColourDigit {digit} {highlight}/>
{/each}

