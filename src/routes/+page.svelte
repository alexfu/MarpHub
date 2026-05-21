<script lang="ts">
  import { resolve } from '$app/paths';
  import { formatDistanceToNow } from 'date-fns';
  import type { Attachment } from 'svelte/attachments';

  let { data } = $props();

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const meta = (
    presentation: {
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        name: string;
        image: string | null;
        emailVerified: boolean;
      };
    } & {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      title: string;
      content: string;
      previewHtml: string;
    }
  ) => {
    return `${presentation.user.name} ⋅ ${formatDate(presentation.createdAt)}`;
  };

  function renderPreview(html: string): Attachment {
    return (element) => {
      const shadow = element.attachShadow({ mode: 'open' });
      shadow.innerHTML = html;
    };
  }
</script>

<div class="container">
  <h1 class="page-title">Presentations</h1>
  <div class="grid">
    {#each data.presentations as presentation (presentation.id)}
      <a href={resolve(`/presentations/${presentation.id}`)} class="presentation-card">
        <div class="preview" {@attach renderPreview(presentation.previewHtml)}></div>
        <div class="footer">
          <div class="title">{presentation.title}</div>
          <div class="meta">{meta(presentation)}</div>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .presentation-card {
    text-decoration: none;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    transition: border-color 0.1s;
  }

  .presentation-card:hover {
    border-color: var(--border-hi);
  }

  .presentation-card .footer {
    padding: 12px;
  }

  .presentation-card .preview {
    aspect-ratio: 16/9;
    background: var(--bg-muted);
  }

  .presentation-card .title {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .presentation-card .meta {
    font-size: 13px;
    color: var(--text-muted);
  }
</style>
