<script>
  import { resolve } from '$app/paths';
</script>

<h2>Sign up</h2>
<form method="POST">
  <div class="input-container">
    <label for="name">Name</label>
    <input name="name" type="text" required />
  </div>
  <div class="input-container">
    <label for="email">Email</label>
    <input name="email" type="email" required />
  </div>
  <div class="input-container">
    <label for="password">Password</label>
    <input name="password" type="password" required />
  </div>
  <button class="btn primary full">Sign Up</button>
</form>
<div class="footer">Have an account? <a href={resolve('/sign-in')}>Sign in</a></div>

<style>
  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px;
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
