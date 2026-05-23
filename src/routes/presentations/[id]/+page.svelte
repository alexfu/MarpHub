<script lang="ts">
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import { formatDistanceToNow } from 'date-fns';
  import { resolve } from '$app/paths';
  import SlideDeck from '$lib/components/SlideDeck.svelte';

  let { data }: PageProps = $props();

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

<div id="presentation-content">
  <div class="meta-bar">
    <div class="bar-inner">
      <div class="info">
        <span class="title">{data.presentation.title}</span>
        <span
          ><a href={resolve(`/users/${data.presentation.user.id}`)}>{data.presentation.user.name}</a
          ></span
        >
        <span>{formatDistanceToNow(data.presentation.createdAt, { addSuffix: true })}</span>
      </div>

      {#if data.isOwner}
        <button class="btn danger" command="show-modal" commandfor="confirm-delete">Delete</button>
      {/if}
    </div>
  </div>
  <SlideDeck presentation={data.presentation} />
</div>

<style>
  #presentation-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .meta-bar {
    background: var(--bg-muted);
    border-bottom: 1px solid var(--border);
    padding: 10px 0;
    font-size: 14px;
  }

  .meta-bar .info {
    display: flex;
    color: var(--text-muted);
    flex-grow: 1;
    flex-wrap: wrap;
  }

  .meta-bar .title {
    color: var(--text);
    font-weight: 600;
  }

  .meta-bar .info > *:not(:last-child)::after {
    font-weight: 400;
    color: var(--text-muted);
    content: '⋅';
    padding: 0 5px;
  }

  @media (max-width: 479px) {
    .meta-bar :global(.bar-inner) {
      flex-wrap: wrap;
    }
  }
</style>
