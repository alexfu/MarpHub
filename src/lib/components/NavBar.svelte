<script lang="ts">
  import ArrowUpTray from '$lib/assets/ArrowUpTray.svelte';

  let { session } = $props();
  let menuOpen = $state(false);
</script>

<nav>
  <div class="bar-inner">
    <a class="brand" href="/">marpyard</a>

    <div class="right">
      {#if session}
        <!-- Logged In -->
        <a class="btn" href="/upload"><span class="icon"><ArrowUpTray /></span> Upload</a>
        <button
          type="button"
          class="user-chip"
          onclick={() => (menuOpen = !menuOpen)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          {session.user.name} ▾
        </button>
        {#if menuOpen}
          <div class="menu" role="menu">
            <form method="POST" action="/sign-out">
              <button type="submit" class="menu-item">Sign out</button>
            </form>
          </div>
        {/if}
      {:else}
        <!-- Logged Out -->
        <a href="/sign-in">Sign in</a>
        <a class="btn primary" href="/sign-up">Sign up</a>
      {/if}
    </div>
  </div>
</nav>

<style>
  nav {
    padding: 10px 0;
    background: var(--bg-muted);
    border-bottom: 1px solid var(--border);
  }

  .brand {
    font-weight: 600;
    text-decoration: none;
    color: var(--text);
  }

  .right {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
  }

  .right a {
    text-decoration: none;
  }

  .user-chip {
    background: transparent;
    color: var(--text);
    border: 1px solid transparent;
    padding: 6px 8px;
    border-radius: var(--radius);
    font: inherit;
    cursor: pointer;
  }

  .user-chip:hover {
    border-color: var(--border);
  }

  .menu {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    min-width: 140px;
    overflow: hidden;
  }

  .menu form {
    margin: 0;
  }

  .menu-item {
    width: 100%;
    text-align: left;
    background: transparent;
    color: var(--text);
    border: 0;
    padding: 8px 12px;
    cursor: pointer;
    font: inherit;
  }

  .menu-item:hover {
    background: var(--bg-muted);
  }

  .icon {
    width: 16px;
    height: 16px;
  }
</style>
