<script lang="ts">
	import { APP } from '#lib/config/app.ts';
	import { settings } from '#lib/features/settings/state/settings.svelte.ts';
	import LandingShell from '#lib/components/landing/LandingShell.svelte';
	import LandingSections from '#lib/components/landing/LandingSections.svelte';
	import DesktopPhone from '#lib/components/landing/DesktopPhone.svelte';
</script>

<svelte:head>
	<title>{APP.title} | Landing</title>
</svelte:head>

<LandingShell>
	<section
		class="home-grid"
		style:--nazwa-aplikacji={`'${APP.name}'`}
		style:--nazwa-aplikacji-dopisek={`'${APP.tagline}'`}
		style:--logo-aplikacji={`url('${APP.assets.logos[settings.theme]}')`}
	>
		<div class="content-panel" id="start">
			<hgroup class="brand-heading">
				<p class="brand-title" aria-label={APP.title}>
					<span class="appNameLightMode" aria-hidden="true"></span>
					<span class="appNameDarkMode" aria-hidden="true"></span>
				</p>
				<p class="brand-subtitle name-rest"></p>
			</hgroup>
			<p class="description">{APP.description}</p>

			<div class="cta-row">
				<a class="cta" href="https://github.com/GonsiorHack/czyPrzejade">Repozytorium</a>
				<a class="cta ghost" href="#mvp">Coś (link mvp)</a>
			</div>

			<div class="mobile-sections">
				<LandingSections />
			</div>
		</div>

		<div class="desktop-phone">
			<DesktopPhone />
		</div>
	</section>
</LandingShell>

<style>
	.home-grid {
		display: grid;
		gap: 18px;
		padding: 16px;
	}

	.content-panel {
		display: grid;
		gap: 14px;
	}

	.brand-heading {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.brand-title {
		margin: 0;
		font-size: clamp(2.2rem, 7vw, 3.4rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.05;
	}

	.brand-subtitle {
		margin: 0;
		color: var(--kolor-opisu-pulpitu);
		font-size: clamp(1.1rem, 4.5vw, 1.8rem);
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.2;
	}

	.name-rest::before {
		content: var(--nazwa-aplikacji-dopisek);
	}

	.description {
		margin: 0;
		font-size: 1rem;
		line-height: 1.55;
		color: var(--kolor-opisu-pulpitu);
	}

	.cta-row {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 10px 14px;
		border-radius: 12px;
		border: 1px solid var(--kolor-wyroznienia);
		background: var(--kolor-wyroznienia);
		color: #ffffff;
		text-decoration: none;
		font-weight: 700;
	}

	.cta.ghost {
		background: transparent;
		color: var(--kolor-wyroznienia);
	}

	.desktop-phone {
		display: none;
	}

	.mobile-sections {
		display: grid;
		gap: 12px;
	}

	@media (min-width: 900px) {
		.home-grid {
			grid-template-columns: minmax(320px, 470px) minmax(360px, 1fr);
			align-items: center;
			justify-content: center;
			gap: 44px;
			padding: 28px;
			min-height: calc(100dvh - 160px);
		}

		.content-panel {
			max-height: calc(100dvh - 190px);
			overflow-y: auto;
			padding-right: 4px;
		}

		.desktop-phone {
			display: flex;
			justify-content: center;
		}

		.mobile-sections {
			display: none;
		}
	}
</style>
