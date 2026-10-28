<script lang="ts">
	type SectionId = 'mvp' | 'o-projekcie' | 'zespol' | 'rozwoj';

	let { sections = ['mvp', 'o-projekcie', 'zespol', 'rozwoj'] as SectionId[] } = $props();

	const has = (id: SectionId) => sections.includes(id);
</script>

{#if has('mvp')}
	<section class="landing-section" id="mvp">
		<h2>Etap 1: coś tutaj (MVP)</h2>
		<ul>
			<li>Tutaj do napisania.</li>			
		</ul>
	</section>
{/if}

{#if has('o-projekcie')}
	<section class="landing-section" id="o-projekcie">
		<h2>O projekcie</h2>
		<p>
			Aplikacja lorem ipsum
		</p>
		<div class="badges">
			<span class="badge">Tutaj stack</span>
		</div>
	</section>
{/if}

{#if has('zespol')}
	<section class="landing-section" id="zespol">
		<h2>Autorzy</h2>
		<ul>
			<li>Może w sumie damy sponsorzy/kontrybucje czy coś takiego, a autorów wrzucimy na spód o projekcie.</li>
		</ul>
	</section>
{/if}

{#if has('rozwoj')}
	<section class="landing-section" id="rozwoj">
		<h2>Rozwoj Etap 2</h2>
		<ul>
			<li>Tutaj planuje taką mapkę zrobić zakrętasów z celami, które będziemy chcieli osiągnać</li>
		</ul>
	</section>
{/if}

<style>
	.landing-section {
		display: grid;
		gap: 10px;
		padding: 16px;
		border: 1px solid var(--kolor-obramowania);
		border-radius: 16px;
		background: color-mix(in srgb, var(--kolor-tla-karty) 94%, white);
	}

	.landing-section h2 {
		margin: 0;
		font-size: 1.05rem;
		line-height: 1.25;
	}

	.landing-section p {
		margin: 0;
		line-height: 1.55;
		color: var(--kolor-opisu-pulpitu);
	}

	.landing-section ul {
		margin: 0;
		padding-left: 18px;
		display: grid;
		gap: 6px;
		line-height: 1.5;
	}

	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.badge {
		padding: 5px 10px;
		border-radius: 10px;
		font-size: 0.82rem;
		font-weight: 600;
		background: var(--kolor-tla-plakietki-pulpitu);
		color: var(--kolor-plakietki-pulpitu);
	}
</style>
