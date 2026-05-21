<script lang="ts">
  let { children } = $props();
</script>

<div class="container">
  <div class="card auth">
    {@render children()}
  </div>
</div>

<style>
  .container {
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .auth {
    width: 360px;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
  }
</style>
