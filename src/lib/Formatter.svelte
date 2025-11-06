<script lang="ts">
  import { getContext } from 'svelte';
 import type { Readable } from 'svelte/store';
  import { MessageFormat } from "messageformat";
  import { partsToTree, type TreeNode } from "./partsToTree.js";

  const { id, props } = $props();

  const t = getContext<Readable<any>>('sveltekit-i18n-mf2');

  const trans = $derived($t(id, props));
  
  const mf = $derived(new MessageFormat(trans.locale, trans.value));
  const translation = $derived(mf.formatToParts(props));
  const tree = $derived(partsToTree(translation));

</script>

{#snippet renderNode(node: TreeNode)}
  {#if node.type === "text"}
    {node.value}
  {:else if node.type === "number"}
    {node.value}
  {:else if node.type === "bidi"}
    <span dir="auto">{node.value}</span>
  {:else if node.type === "markup"}
    {#if node.tag === "bold"}
      <b
        >{#each node.children as child}{@render renderNode(child)}{/each}</b
      >
    {:else if node.tag === "italic"}
      <i
        >{#each node.children as child}{@render renderNode(child)}{/each}</i
      >
    {:else if node.tag === "link"}
      {#if node.attributes.to}
        <a href={node.attributes.to}
          >{#each node.children as child}{@render renderNode(child)}{/each}</a
        >
      {:else}
        <!-- svelte-ignore a11y_missing_attribute -->
        <a style="text-decoration: underline"
          >{#each node.children as child}{@render renderNode(child)}{/each}</a
        >
      {/if}
    {:else if node.tag === "error"}
      <span style="color: red"
        >{#each node.children as child}{@render renderNode(child)}{/each}</span
      >
    {:else if node.tag === "star-icon"}
      ⭐
    {:else}
      <span
        >{#each node.children as child}{@render renderNode(child)}{/each}</span
      >
    {/if}
  {/if}
{/snippet}

{#each tree as node}
  {@render renderNode(node)}
{/each}