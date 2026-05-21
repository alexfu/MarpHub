<script lang="ts">
  import { resolve } from '$app/paths';

  let { form } = $props();
</script>

<h2>Sign in</h2>
{#if form?.error}
  <p class="error">{form.error}</p>
{/if}
<form method="POST">
  <div class="input-container">
    <label for="email">Email</label>
    <input name="email" type="text" required />
  </div>
  <div class="input-container">
    <label for="password">Password</label>
    <input name="password" type="password" required />
  </div>
  <button class="btn primary full">Sign in</button>
</form>
<div class="footer">No account? <a href={resolve('/sign-up')}>Sign up</a></div>

<style>
  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px;
  }

  .error {
    color: var(--danger);
    font-size: 13px;
  }

  .footer {
    text-align: center;
    margin-top: 16px;
    font-size: 13px;
    color: var(--text-muted);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
