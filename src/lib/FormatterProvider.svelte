<script lang="ts">
	import { setContext } from "svelte";
	const { t, children } = $props();
	setContext("sveltekit-i18n-mf2", t);
</script>

{@render children()}
