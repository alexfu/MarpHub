<script lang="ts">
	import { Marp } from '@marp-team/marp-core';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let rendered = $derived.by(() => {
		return new Marp().render(data.presentation.content);
	});
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html rendered.html}

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<svelte:head>{@html `<style>${rendered.css}</style>`}</svelte:head>
