<script>
  import Formatter from "$lib/Formatter.svelte";
  import { setLocale } from "$lib/translations";

  function switchToEnglish() {
    setLocale("en");
  }

  function switchToSpanish() {
    setLocale("es");
  }
</script>

<div>
  <Formatter id="common.test" props={{ world: "SvelteKit" }} />
  <Formatter id="common.bye" props={{ name: "zeno" }} />

  <button onclick={switchToEnglish}>english</button>
  <button onclick={switchToSpanish}>spanish</button>
</div>
