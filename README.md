## macOS Inspired Desktop

![Project preview showing the macOS styled desktop](public/ReadmeImage.png)

Interaktywny klon pulpitu macOS, zrealizowany w Next.js App Router. Okna aplikacji są przeciągalne, z możliwością minimalizacji oraz zapamiętywania pozycji. Dostępne są mini‑aplikacje (kalkulator, notatnik, ustawienia), dock oraz pasek statusu, które współdziałają dzięki globalnemu store.

## Stos technologiczny

- Next.js 15 (App Router) + React Server Components
- Tailwind CSS i animacje z `motion/react`
- Zustand (`stores/*`) do zarządzania stanem okien i ustawień
- Ikony Lucide, komponenty UI custom + shadcn-inspired

## Jak uruchomić

```bash
npm install
npm run dev
```

Następnie otwórz `http://localhost:3000`. Wszelkie zmiany w katalogu `app/` oraz `apps/` odświeżą UI w czasie rzeczywistym.

## Dostępne skrypty

- `npm run dev` – tryb deweloperski
- `npm run build` – build produkcyjny
- `npm run start` – uruchomienie buildu

## Struktura projektu

- `app/` – routing Next.js oraz layout root
- `apps/` – implementacje aplikacji (kalkulator, notatki, finder, ustawienia)
- `components/` – wspólne elementy UI (okna, dock, topbar, ustawienia)
- `stores/` – Zustand stores (`appStore`, `settingsStore`, `noteStore`)
- `public/` – statyczne zasoby, w tym `ReadmeImage.png`

## Rozwój

1. Dodaj nową aplikację w `apps/` i zarejestruj ją w `appsConfig.ts`.
2. Jeśli chcesz, by pojawiła się w Docku, uzupełnij ikonę w `public/appsIcons/`.
3. Styluj za pomocą Tailwind; w razie potrzeby rozszerz `globals.css`.

Pull requesty i nowe pomysły mile widziane.
