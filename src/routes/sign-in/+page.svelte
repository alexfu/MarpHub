<script lang="ts">
  import { resolve } from '$app/paths';

  let { form } = $props();
</script>

<div class="container">
  <div class="card sign-in">
    <h2>Sign in</h2>
    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}
    <form method="POST">
      <div>
        <label for="email">Email</label>
        <input name="email" type="text" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input name="password" type="password" required />
      </div>
      <button class="btn primary full">Sign in</button>
    </form>
    <div class="footer">No account? <a href={resolve('/sign-up')}>Sign up</a></div>
  </div>
</div>

<style>
  .container {
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .sign-in {
    width: 360px;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
  }

  .card h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px;
  }

  .error {
    color: var(--danger);
    font-size: 13px;
  }

  label {
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-muted);
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
