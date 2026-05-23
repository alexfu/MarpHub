<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import NavBar from '$lib/components/NavBar.svelte';
  import './app.css';

  let { data, children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div id="main">
  <NavBar session={data.session} />
  <div id="content">
    {@render children()}
  </div>
</div>

<style>
  #main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  #content {
    flex: 1;
    overflow: auto;
  }
</style>
