<script lang="ts">
  import { Marp } from '@marp-team/marp-core';
  import { onMount } from 'svelte';

  let { presentation } = $props();
  let rendered = $derived.by(() => {
    return new Marp().render(presentation.content);
  });
  let currentPage = $state(0);
  let movementKeys = { left: ['ArrowLeft', 'h'], right: ['ArrowRight', 'l'] };
  let container: HTMLDivElement;

  onMount(() => {
    const slides = container.getElementsByTagName('svg');
    for (let i = 0; i < slides.length; i++) {
      if (i != currentPage) {
        slides[i].style.contentVisibility = 'hidden';
      }
    }
  });

  function onKeyDown(e: KeyboardEvent) {
    if (movementKeys.right.includes(e.key)) {
      const slides = container.getElementsByTagName('svg');
      if (currentPage < slides.length - 1) {
        slides[currentPage].style.contentVisibility = 'hidden';
        currentPage += 1;
        slides[currentPage].style.contentVisibility = 'visible';
        e.preventDefault();
      }
    }

    if (movementKeys.left.includes(e.key)) {
      const slides = container.getElementsByTagName('svg');
      if (currentPage > 0) {
        slides[currentPage].style.contentVisibility = 'hidden';
        currentPage -= 1;
        slides[currentPage].style.contentVisibility = 'visible';
        e.preventDefault();
      }
    }
  }
</script>

<div class="container" bind:this={container}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html rendered.html}
</div>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<svelte:head>{@html `<style>${rendered.css}</style>`}</svelte:head>

<svelte:window on:keydown={onKeyDown} />

<style>
  .container {
    width: 100%;
    flex: 1;
  }
</style>
