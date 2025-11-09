# SvelteKit MF2

A localization library for SvelteKit based on [sveltekit-i18n/base](https://github.com/sveltekit-i18n/base) and [MessageFormat2](https://messageformat.unicode.org/).

## Installation
```bash
npm install sveltekit-mf2
```

# Guide

## 1. Install sveltekit-i18n/base and messageformat

```bash
npm install sveltekit-i18n/base messageformat
```

## 2. Setup i18n
Create the `translations.ts` file in you `lib` folder. Inside paste the following code:

```ts
import i18n from "@sveltekit-i18n/base";
const config = {
  // Add your languages in the loaderfunction eaither from JSON files or directly as JSON
  loaders: [
    {
      locale: "en",
      key: "common",
      loader: async () =>
        ( await import("./en/common.json")).default,
    },
   {
      locale: "es",
      key: "common",
      loader: async () =>
        (await import("./es/common.json")).default,
    },
  ],
  parser: {
    parse(value: string, [props]: Record<string, any>[], locale: string) {
      return { value, props, locale}
    }
  } 
};

export const {setLocale, t, locale, locales, loading, loadTranslations } = new i18n(config);
```

### The locale files

`en/common.json`
```json
{
  "test": "Hello {#bold}{$world}!{/bold}",
  "bye": "Bye {#italic}{$name}{/italic}"
}
```

`es/common.json`
```json
{
  "test": "Hola {#bold}{$world}!{/bold}",
  "bye": "adios {#italic}{$name}{/italic}"
}
```


#### Make sure to not change the parser!

## 3. Use the FormatterProvider
Inside of your `+layout.svelte` use the `<FormatterProvider>` by importing `t` and sorounding children in the provider as shown:

```ts
<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import { FormatterProvider } from 'sveltekit-mf2';

	let { children } = $props();
	import { t } from "$lib/translations"
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<FormatterProvider {t}>
	{@render children()}
</FormatterProvider>
```

## 4. Set the default locale and load the translations
Create a `layout.ts` file in your routes folder and paste the following code:

```ts
import { loadTranslations } from '$lib/translations';

export const load = async ({ url }) => {
  const { pathname } = url;

  const initLocale = "en"; 

  await loadTranslations(initLocale, pathname); 

  return {};
}
```


## 5. Use the Formatter component in you application
```ts
<script>
  import { setLocale, locales } from "$lib/translations";
  import { Formatter } from "sveltekit-mf2";


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
```


## References

### Provider

#### `<FormatterProvider>`

Props:
    `t` - The `t` function from the `i18n` object

### Component

##### `<Formatter>`

Props:
- `id: string` - Translation key (e.g., "common.greeting")
- `props: Record<string, any>` - Variables to interpolate