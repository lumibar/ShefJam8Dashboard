<script>
	import '../app.scss';
	import Particles from "svelte-particles";
	import { starBackground } from "$lib/particleConfigs"
</script>

<slot />
<Particles id="starBackground" options="{starBackground}"  />