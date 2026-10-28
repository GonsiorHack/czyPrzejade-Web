<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import SplashScreen from '#lib/components/shell/SplashScreen.svelte';
	import { DEFAULT_TAB, NAVIGATION_TABS, isTab, tabHref } from '#lib/config/navigation.ts';
	import type { Tab } from '#lib/config/navigation.types.ts';
	import DiscoverTab from '#lib/features/discover/DiscoverTab.svelte';
	import MapTab from '#lib/features/map/MapTab.svelte';
	import SettingsTab from '#lib/features/settings/SettingsTab.svelte';
	import type { Component } from 'svelte';

	const screens: Record<Tab, Component> = {
		map: MapTab,
		facilities: DiscoverTab,
		settings: SettingsTab
	};

	const activeTab: Tab = $derived.by(() => {
		const requestedTab = page.url.searchParams.get('tab');
		return isTab(requestedTab) ? requestedTab : DEFAULT_TAB;
	});

	let showSplash = $state(page.url.pathname === '/');

	async function selectTab(tab: Tab) {
		if (tab === activeTab) return;
		await goto(tabHref(tab), {
			replace: false,
			reset: false
		});
	}
</script>

<div class="mobile-viewport">
	{#if showSplash}
		<SplashScreen onfinish={() => (showSplash = false)} />
	{/if}

	<header class="status-bar" class:status-bar--map={activeTab === 'map'} inert={showSplash}>
		<span class="clock"
			>{new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}</span
		>
		<div class="island"></div>
		<div class="indicators">
			<span class="signal">●●●</span>
			<span class="carrier">T-Mobile</span>
			<span>84%</span>
		</div>
	</header>

	<section class="screen-body" aria-label="Zawartosc karty" inert={showSplash}>
		{#each NAVIGATION_TABS as tab (tab.id)}
			{@const Screen = screens[tab.id]}
			<div class="tab-panel" class:active={activeTab === tab.id} class:full-bleed={tab.fullBleed}>
				<Screen />
			</div>
		{/each}
	</section>

	<nav class="bottom-bar" aria-label="Glowna nawigacja" inert={showSplash}>
		{#each NAVIGATION_TABS as item (item.id)}
			<button
				class="nav-tab"
				class:active={activeTab === item.id}
				aria-current={activeTab === item.id ? 'page' : undefined}
				on:click={() => selectTab(item.id)}
			>
				<svg
					viewBox="0 0 24 24"
					class="tab-icon"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d={item.icon} stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<span>{item.label}</span>
			</button>
		{/each}
	</nav>
</div>

<style>
	.mobile-viewport {
		position: relative;
		display: flex;
		align-self: center;
		flex-shrink: 0;
		width: auto;
		height: min(844px, calc(100dvh - 160px));
		aspect-ratio: 1170 / 2532;
		flex-direction: column;
		overflow: hidden;
		border-radius: 44px;
		background: var(--kolor-tla-strony);
		color: var(--kolor-tekstu-podstawowego);
		box-shadow:
			0 25px 60px -15px var(--kolor-cienia-telefonu),
			0 0 0 7px var(--kolor-ramki-telefonu),
			0 0 0 8px var(--kolor-krawedzi-ramki-telefonu);
	}

	.status-bar {
		display: grid;
		flex-shrink: 0;
		height: 40px;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		column-gap: 8px;
		padding: 8px 30px 0;
		background: var(--kolor-tla-karty);
		font-size: 13px;
		font-weight: 600;
		white-space: nowrap;
	}

	.status-bar--map {
		position: absolute;
		z-index: 2;
		top: 0;
		right: 0;
		left: 0;
		background: transparent;
		color: #000000;
	}

	.mobile-viewport:has(.status-bar--map) {
		--odstep-gorny-mapy: 40px;
	}

	.clock {
		justify-self: start;
	}

	.island {
		width: 72px;
		height: 20px;
		border-radius: var(--zaokraglenie-pelne);
		background: var(--kolor-czarny);
		border: 1px solid var(--kolor-obramowania-telefonu);
		box-shadow: 0 3px 0 var(--kolor-obramowania-telefonu);
		margin-bottom: 6px;
	}

	.indicators {
		display: flex;
		justify-self: end;
		align-items: center;
		gap: 5px;
		font-size: 11px;
	}

	.screen-body {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		scrollbar-width: none;
	}

	.screen-body::-webkit-scrollbar {
		display: none;
	}

	.tab-panel {
		display: none;
		padding: var(--odstep-duzy);
	}

	.tab-panel.active {
		display: block;
	}

	.tab-panel.full-bleed {
		height: 100%;
		padding: 0;
	}

	.bottom-bar {
		display: grid;
		min-height: calc(88px + env(safe-area-inset-bottom, 0px));
		flex-shrink: 0;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		column-gap: 4px;
		padding-top: 12px;
		padding-inline: 12px;
		padding-bottom: calc(14px + env(safe-area-inset-bottom, 0px));
		border-top: 2px solid var(--kolor-obramowania-nawigacji);
		background: var(--kolor-tla-karty);
	}

	.nav-tab {
		min-width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 6px;
		border: none;
		background: none;
		color: var(--kolor-tekstu-pomocniczego);
		font-size: 0.75rem;
		cursor: pointer;
	}

	.nav-tab.active {
		color: var(--kolor-wyroznienia);
		font-weight: 600;
	}

	.tab-icon {
		width: 26px;
		height: 26px;
	}

	@media (max-height: 760px) {
		.carrier {
			display: none;
		}
	}
</style>
