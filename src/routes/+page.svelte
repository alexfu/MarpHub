<script lang="ts">
  import { resolve } from '$app/paths';

  let { data } = $props();
</script>

<ul>
  {#each data.presentations as presentation (presentation.id)}
    <li><a href={resolve(`/presentations/${presentation.id}`)}>{presentation.title}</a></li>
  {/each}
</ul>

<form method="POST" enctype="multipart/form-data">
  <input name="title" type="text" required />
  <input name="presentation" type="file" accept=".md,.markdown,text/markdown" required />
  <button>Submit</button>
</form>
