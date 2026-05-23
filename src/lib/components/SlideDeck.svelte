<script lang="ts">
  import { Marp } from '@marp-team/marp-core';
  import { onMount } from 'svelte';

  let { presentation } = $props();
  let rendered = $derived.by(() => {
    return new Marp().render(presentation.content);
  });
  let currentPage = $state(0);
  let keybinds = { previous: ['ArrowLeft', 'h'], next: ['ArrowRight', 'l'], fullscreen: ['f'] };
  let container: HTMLDivElement;

  onMount(() => {
    const slides = container.getElementsByTagName('svg');
    for (let i = 0; i < slides.length; i++) {
      if (i == currentPage) {
        slides[i].classList.toggle('active');
      }

      if (i > currentPage) {
        slides[i].classList.toggle('right');
      }
    }
  });

  function onKeyDown(e: KeyboardEvent) {
    if (keybinds.next.includes(e.key)) {
      const slides = container.getElementsByTagName('svg');
      if (currentPage < slides.length - 1) {
        e.preventDefault();
        forward(slides);
      }
    }

    if (keybinds.previous.includes(e.key)) {
      const slides = container.getElementsByTagName('svg');
      if (currentPage > 0) {
        e.preventDefault();
        backward(slides);
      }
    }

    if (keybinds.fullscreen.includes(e.key)) {
      container.requestFullscreen();
    }
  }

  function forward(slides: HTMLCollectionOf<SVGSVGElement>) {
    moveLeft(slides[currentPage]);
    currentPage += 1;
    moveLeft(slides[currentPage]);
  }

  function backward(slides: HTMLCollectionOf<SVGSVGElement>) {
    moveRight(slides[currentPage]);
    currentPage -= 1;
    moveRight(slides[currentPage]);
  }

  function moveLeft(slide: SVGSVGElement) {
    if (slide.classList.contains('active')) {
      slide.classList.remove('active');
      slide.classList.add('left');
    }

    if (slide.classList.contains('right')) {
      slide.classList.remove('right');
      slide.classList.add('active');
    }
  }

  function moveRight(slide: SVGSVGElement) {
    if (slide.classList.contains('active')) {
      slide.classList.remove('active');
      slide.classList.add('right');
    }

    if (slide.classList.contains('left')) {
      slide.classList.remove('left');
      slide.classList.add('active');
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

  :global(.marpit) {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  :global(.marpit svg) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    width: 80%;
    height: 80%;
    transition:
      width 0.5s,
      height 0.5s,
      opacity 0.5s,
      left 0.5s;
  }

  :global(.marpit svg.active) {
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  :global(.marpit svg.left) {
    left: -40%;
  }

  :global(.marpit svg.right) {
    left: 140%;
  }
</style>
