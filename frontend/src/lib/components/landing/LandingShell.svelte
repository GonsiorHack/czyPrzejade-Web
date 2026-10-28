<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const pathname = $derived(page.url.pathname);
	const isActive = (path: string) => pathname === path;
</script>

<div class="landing-shell">
    <header class="site-top-nav" aria-label="Nawigacja strony">
        <!-- Lewa sekcja -->
        <nav class="nav-section nav-left desktop-links" aria-label="Nawigacja lewa">
            <a class:active={isActive('/mvp')} href="/mvp">MVP</a>
            <a class:active={isActive('/rozwoj')} href="/rozwoj">Rozwój</a>
        </nav>

        <!-- Środek: Wyróżniona nazwa -->
        <a class="site-brand" class:active={isActive('/')} href="/">czyPrzejade</a>

        <!-- Prawa sekcja -->
        <nav class="nav-section nav-right desktop-links" aria-label="Nawigacja prawa">
            <a class:active={isActive('/o-projekcie')} href="/o-projekcie">O projekcie</a>
            <a class:active={isActive('/zespol')} href="/zespol">Zespół</a>
        </nav>

        <!-- Nawigacja mobile (opcjonalnie rozwijana lub pod spodem) -->
        <nav class="site-links mobile-links" aria-label="Nawigacja mobile">
            <a href="/#mvp">MVP</a>
            <a href="/#rozwoj">Rozwój</a>
            <a href="/#o-projekcie">O projekcie</a>
            <a href="/#zespol">Zespół</a>
        </nav>
    </header>

	<main class="content">
		{@render children()}
	</main>

	<footer class="site-footer">
		<p>czyPrzejade | Strona startupu | Kontakt: github.com/sh3kda | Team: Gonsior | </p>
	</footer>
</div>

<style>
	.landing-shell {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		background: var(--kolor-tla-pulpitu);
		color: var(--kolor-tekstu-podstawowego);
	}

.site-top-nav {
    position: sticky;
    top: 0;
    z-index: 20;
    
    /* Zmiana na Grid */
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 32px; /* Odstęp między blokami: lewym, logo i prawym */
    
    /* Ograniczenie szerokości i centrowanie całego paska */
    width: 100%;
    max-width: 900px; /* Blokuje rozjeżdżanie się na boki */
    margin: 0 auto;    /* Centruje kontener poziomo w oknie */
    
    padding: 14px 18px;
    border-bottom: 1px solid var(--kolor-obramowania);
    background: linear-gradient(
        120deg,
        color-mix(in srgb, var(--kolor-tla-karty) 94%, white) 0%,
        var(--kolor-tla-karty) 100%
    );
    backdrop-filter: blur(8px);
}

    /* Wewnętrzne grupy linków */
    .desktop-links:first-of-type,
    .nav-left {
        display: flex;
        justify-content: flex-end; /* Dociąga linki w stronę logo */
        gap: 16px;
    }

    .desktop-links:last-of-type,
    .nav-right {
        display: flex;
        justify-content: flex-start; /* Dociąga linki w stronę logo */
        gap: 16px;
    }

    .site-brand {
        text-align: center;
        white-space: nowrap;
        color: var(--kolor-tekstu-podstawowego);
		font-weight: 800;
		font-size: 1rem;
		text-decoration: none;
		letter-spacing: 0.02em;
    }

	.site-brand.active {
		color: var(--kolor-wyroznienia);
	}

	.site-links {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.site-links a {
		color: var(--kolor-tekstu-podstawowego);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 600;
		opacity: 0.85;
	}

	.site-links a.active,
	.site-links a:hover {
		opacity: 1;
		color: var(--kolor-wyroznienia);
	}

	.mobile-links {
		display: none;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.site-footer {
		display: grid;
        place-items: center;
        text-align: center;
		gap: 4px;
		padding: 16px 18px calc(16px + env(safe-area-inset-bottom, 0px));
		border-top: 1px solid var(--kolor-obramowania);
		background: color-mix(in srgb, var(--kolor-tla-karty) 95%, black 5%);
		font-size: 0.8rem;
		color: var(--kolor-opisu-pulpitu);
	}

	.site-footer p {
		margin: 0;
	}

	@media (max-width: 899px) {
		.desktop-links {
			display: none;
		}

		.mobile-links {
			display: flex;
		}
	}

	@media (min-width: 900px) {
		.site-top-nav {
			padding-inline: 28px;
		}

		.site-links {
			gap: 14px;
		}

		.site-footer {
			padding-inline: 28px;
		}
	}
</style>
