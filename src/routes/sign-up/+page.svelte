<script>
  import { resolve } from '$app/paths';
</script>

<form method="POST">
  <input name="name" type="text" placeholder="Name" required />
  <input name="email" type="text" placeholder="Email" required />
  <input name="password" type="password" placeholder="Password" required />
  <button>Sign Up</button>
</form>

<div>Have an account? <a href={resolve('/sign-in')}>Sign in</a></div>
