<script lang="ts">
  import { Marp } from '@marp-team/marp-core';
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';

  let { data }: PageProps = $props();
  let rendered = $derived.by(() => {
    return new Marp().render(data.presentation.content);
  });
  let dialog: HTMLDialogElement;

  const deletePresentation = async () => {
    dialog.close();
    await fetch(`/presentations/${data.presentation.id}`, { method: 'DELETE' });
    goto('/');
  };
</script>

<dialog id="confirm-delete" bind:this={dialog}>
  <p class="title">Confirm delete</p>
  <p class="body">Are you sure you want to delete this presentation?</p>
  <div class="footer">
    <button class="btn" command="close" commandfor="confirm-delete">Cancel</button>
    <button class="btn danger" onclick={deletePresentation}>Delete</button>
  </div>
</dialog>

<div class="meta-bar">
  <span class="title">
    {data.presentation.title}
  </span>

  {#if data.isOwner}
    <button class="btn danger" command="show-modal" commandfor="confirm-delete">Delete</button>
  {/if}
</div>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html rendered.html}

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<svelte:head>{@html `<style>${rendered.css}</style>`}</svelte:head>

<style>
  .meta-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: var(--bg-muted);
    border-bottom: 1px solid var(--border);
    padding: 10px 16px;
    font-size: 14px;
  }

  .meta-bar .title {
    font-weight: 600;
    flex-grow: 1;
  }
</style>
