<script lang="ts">
  let { children } = $props();
</script>

<div class="container-sm">
  <div class="card">
    {@render children()}
  </div>
</div>

<style>
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
  }
</style>
