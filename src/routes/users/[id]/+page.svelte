<script lang="ts">
  import PresentationCard from '$lib/components/PresentationCard.svelte';

  let { data } = $props();
</script>

<div class="container">
  <h1 class="page-title">{data.user.name}s presentations</h1>
  {#if data.presentations.length == 0}
    <div class="container-sm">
      <div id="empty-view">
        <div class="text">No presentations yet.</div>
      </div>
    </div>
  {:else}
    <div class="grid">
      {#each data.presentations as presentation (presentation.id)}
        <PresentationCard {presentation}></PresentationCard>
      {/each}
    </div>
  {/if}
</div>

<style>
  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  }

  #empty-view {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  #empty-view .text {
    text-align: center;
    color: var(--text-muted);
  }
</style>
