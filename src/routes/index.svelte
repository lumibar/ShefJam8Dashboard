<script lang="ts" context="module">
    export const prerender = true;
</script>
<script lang="ts">
    import ColourNum from "$lib/ColourNum.svelte";
</script>
<div class="flex flex-col h-screen w-max justify-center m-auto align-middle">
	<p class="text-8xl font-bold tracking-widest text-violet-300 align-middle">
		ShefJam <span class="text-vertical align-bottom	"><ColourNum number={'8'} /></span>
	</p>
    <div>
        <ul class="flex flex-row justify-around pt-5 text-violet-400">
            {#each [{name:"Countdown", href:"/countdown"},{name:"Timetable", href:"/timetable"}] as pagelink}
                <li class="bg-opacity-20 bg-black p-2 rounded-md hover:bg-opacity-40"><a href={pagelink.href}>{pagelink.name}</a></li>
            {/each}
        </ul>
    </div>
</div>