# czyPrzejade Web – SvelteKit, Leaflet

Przewodnik po katalogach i miejscach konfiguracji: [navigation.md](navigation.md).

---

## Wymagania i instalacja

Wymagany Node.js **22.12 lub nowszy** (zgodnie z wymaganiami Vite 8).
Polecenia wykonuj we folderze `frontend`.

Zainstaluj zależności zapisane w lockfile, w tym Leaflet:

```bash
npm ci
```

---

## Uruchomienie strony na localhosta

Uruchom lokalny serwer developerski:

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: **http://localhost:5173** (lub innym: patrz konsola).

---


## Porządek w kodzie

`npm run check` sprawdza typy, komponenty Svelte oraz nieużywane lokalne
zmienne, importy i parametry. `npm run lint` sprawdza formatowanie;
`npm run format` je ujednolica.

Katalog `.svelte-kit/` jest generowany przez SvelteKit i nie należy do kodu
źródłowego. Podobnie jak `node_modules/` i wynik budowania jest pomijany
przez Git i formatter. Nie edytuj plików generowanych ręcznie.
