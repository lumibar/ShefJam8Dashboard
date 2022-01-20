<script>
	import '../app.scss';
	import Particles from "svelte-particles";
	import { starBackground } from "$lib/particleConfigs"
</script>

<a href="/">
	<img src="favicon.png" alt="ShefJam 8 Logo" class="absolute left-4 top-4 w-40" />
</a>
<slot />
<Particles id="starBackground" options="{starBackground}"  />