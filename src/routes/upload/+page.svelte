<div class="container-sm">
  <h1 class="page-title">Upload presentation</h1>
  <form method="POST" enctype="multipart/form-data">
    <div class="input-container">
      <label for="title">Title</label>
      <input name="title" type="text" required />
    </div>
    <div class="input-container">
      <label for="file">Markdown File</label>
      <input name="file" type="file" accept=".md,.markdown,text/markdown" required />
    </div>
    <button class="btn primary full">Submit</button>
  </form>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
