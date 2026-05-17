<script lang="ts">
	import { Marp } from '@marp-team/marp-core';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let rendered = $derived.by(() => {
		return new Marp().render(data.presentation.content);
	});
</script>

{@html rendered.html}
<svelte:head>{@html `<style>${rendered.css}</style>`}</svelte:head>
