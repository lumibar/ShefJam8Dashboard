<script lang="ts">
import ColourNum from '../components/ColourNum.svelte';
import Counter from '../components/Counter.svelte';
</script>
<div class="flex flex-col h-screen w-max justify-center m-auto align-middle	">
    <p class="text-4xl font-extrabold tracking-widest text-gray-900 align-middle	">
        ShefJam <span class="text-vertical align-bottom	"><ColourNum number={"8"} /></span>
    </p>
    <Counter class="text-center font-sans font-bold text-9xl text-gray-20" />
</div>