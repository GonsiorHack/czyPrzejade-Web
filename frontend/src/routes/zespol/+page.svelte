<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { APP } from '#lib/config/app.ts';
	import LandingShell from '#lib/components/landing/LandingShell.svelte';
	import LandingSections from '#lib/components/landing/LandingSections.svelte';
	import DesktopPhone from '#lib/components/landing/DesktopPhone.svelte';

	onMount(() => {
		if (browser && window.matchMedia('(max-width: 899px)').matches) {
			void goto('/#zespol', { replaceState: true, keepFocus: true });
		}
	});
</script>

<svelte:head>
	<title>{APP.title} | Zespol</title>
</svelte:head>

<LandingShell>
	<section class="page-grid phone-right">
		<div class="content-panel">
			<LandingSections sections={['zespol']} />
		</div>
		<div class="desktop-phone">
			<DesktopPhone />
		</div>
	</section>
</LandingShell>

<style>
	.page-grid {
		display: grid;
		gap: 18px;
		padding: 16px;
	}

	.desktop-phone {
		display: none;
	}

	.content-panel {
		display: grid;
		gap: 12px;
	}

	@media (min-width: 900px) {
		.page-grid {
			grid-template-columns: minmax(320px, 500px) minmax(360px, 1fr);
			align-items: center;
			justify-content: center;
			gap: 44px;
			padding: 28px;
			min-height: calc(100dvh - 160px);
		}

		.desktop-phone {
			display: flex;
			justify-content: center;
		}
	}
</style>
