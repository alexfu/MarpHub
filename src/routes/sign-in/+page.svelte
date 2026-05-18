<script lang="ts">
  let { form } = $props();
</script>

{#if form?.error}
  <p>{form.error}</p>
{/if}

<form method="POST">
  <input name="email" type="text" placeholder="Email" required />
  <input name="password" type="password" placeholder="Password" required />
  <button>Sign in</button>
</form>
