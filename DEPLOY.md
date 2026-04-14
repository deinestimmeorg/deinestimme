# DeineStimme — Deployment Guide

## Architektur (v0.6)

```
/                → Landingpage (öffentlich, kein Passwort)
/verstehen       → Wie DeineStimme funktioniert
/mitbauen        → Mitmachen & Open Source
/institution     → Für Institutionen & Pilotprojekte
/app             → Plattform (Sprache → Passwort → App)
```

## Setup

```bash
npm install
cp .env.example .env.local   # Supabase-Keys eintragen
npm run dev
```

## Umgebungsvariablen

```
VITE_SUPABASE_URL=https://...supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

## Dateien

```
src/
  main.jsx                    — Router: /, /verstehen, /mitbauen, /institution, /app
  pages/
    LandingPage.jsx           — Landingpage mit Manifest + Audio + 4 Türen
    VerstehenPage.jsx         — Erklärseite (Module, Ablauf, Open Source)
    MitbauenPage.jsx          — Mitmach-Seite (Beitragen, Stack, GitHub)
    InstitutionPage.jsx       — Institutionenseite (Use Cases, Pilotprojekt)
  App.jsx                     — Bestehende Plattform (/app)
  components/                 — PasswordGate, WelcomeScreen, etc.
  tokens.js                   — Design Tokens
  content.js                  — Topics, Leitprinzipien, etc.
  supabaseClient.js           — Supabase Verbindung

public/
  audio/                      — Manifest-Audio (6 Sprachen)
  grundsatzprogramm_deinestimme.pdf
  schreibkompass.html

vercel.json                   — Client-side Routing Rewrites
```

## Fonts

Fonts sind lokal via @fontsource eingebunden (DSGVO-konform):
- DM Mono (300, 400)
- Crimson Pro (300, 400, 600)

Kein Google Fonts CDN.

## Vercel Deployment

Push to GitHub → Vercel baut automatisch.
Rewrites in vercel.json leiten alle Routen an index.html weiter.

## Audio

6 Manifest-Audio-Dateien in public/audio/:
- Deine_Stimme_Intro_DE_DSvoice1.mp3
- Deine_Stimme_Intro_EN_DSVoice1.mp3
- Deine_Stimme_Intro_FR_DSVoice1.mp3
- Deine_Stimme_Intro_ES_DSVoice1.mp3
- Deine_Stimme_Intro_NL_DSVoice1.mp3
- Deine_stimme_Intro_ID_DSVoice1.mp3
