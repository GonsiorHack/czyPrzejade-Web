<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let isDesktop = $state(false);

	onMount(() => {
		if (!browser) return;
		const media = window.matchMedia('(min-width: 900px)');
		const update = () => {
			isDesktop = media.matches;
		};
		update();
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	});
</script>

{#if isDesktop}
	{#await import('#lib/components/landing/PrototypePhone.svelte') then module}
		<svelte:component this={module.default} />
	{/await}
{/if}
