<script lang="ts">
  import { resolve } from '$app/paths';
  import { formatDistanceToNow } from 'date-fns';
  import type { Attachment } from 'svelte/attachments';

  let { presentation } = $props();

  const meta = (
    presentation: {
      user?: {
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
    if (presentation.user) {
      return `${presentation.user.name} ⋅ ${formatDistanceToNow(presentation.createdAt, { addSuffix: true })}`;
    }
    return `${formatDistanceToNow(presentation.createdAt, { addSuffix: true })}`;
  };

  function renderPreview(html: string): Attachment {
    return (element) => {
      const shadow = element.attachShadow({ mode: 'open' });
      shadow.innerHTML = html;
    };
  }
</script>

<a href={resolve(`/presentations/${presentation.id}`)} class="presentation-card">
  <div class="preview" {@attach renderPreview(presentation.previewHtml)}></div>
  <div class="footer">
    <div class="title">{presentation.title}</div>
    <div class="meta">{meta(presentation)}</div>
  </div>
</a>

<style>
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
