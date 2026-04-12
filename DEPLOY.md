# DeineStimme.org — Deploy Guide

> Von 0 auf Live in 15 Minuten. Keine Kreditkarte nötig.

---

## Schritt 1: Supabase (Datenbank + Backend)

1. Gehe zu **supabase.com** → Sign Up (GitHub Login reicht)
2. "New Project" → Name: `deinestimme`, Region: `Frankfurt (eu-central-1)`
3. Warte bis das Projekt bereit ist (~2 Min)
4. Gehe zu **SQL Editor** (linkes Menü)
5. Kopiere den gesamten Inhalt von `supabase/schema.sql` und führe ihn aus
6. Gehe zu **Settings → API** und kopiere:
   - `Project URL` (z.B. `https://xxxxx.supabase.co`)
   - `anon public` Key (der lange String)

**Dein Supabase-Projekt existiert bereits:** `rronrhzwjullupaesgzc`
Die URL ist: `https://rronrhzwjullupaesgzc.supabase.co`
Führe nur noch das SQL-Schema aus falls noch nicht geschehen.

---

## Schritt 2: Lokal testen

```bash
# In den Projektordner navigieren
cd deinestimme

# .env Datei anlegen (Werte aus Supabase kopieren)
cp .env.example .env
# → Falls andere Werte: VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY anpassen

# Dependencies installieren
npm install

# Starten
npm run dev
```

Öffne `http://localhost:3000` → Du siehst den WelcomeScreen.

---

## Schritt 3: Vercel Deploy (Kostenlos, keine Kreditkarte)

### Option A: Über GitHub (empfohlen)

1. **GitHub Repo erstellen:**
   - Gehe zu github.com → "New Repository" → Name: `deinestimme`
   - Push den Code:
   ```bash
   git init
   git add .
   git commit -m "v0.4 — Schreibassistent + Schwarm"
   git branch -M main
   git remote add origin https://github.com/DEIN-USER/deinestimme.git
   git push -u origin main
   ```

2. **Vercel verbinden:**
   - Gehe zu **vercel.com** → Sign Up mit GitHub
   - "Add New Project" → Repository `deinestimme` auswählen
   - Framework: `Vite` (wird automatisch erkannt)
   - Environment Variables hinzufügen:
     - `VITE_SUPABASE_URL` = deine Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = dein Supabase anon key
   - "Deploy" klicken

3. **Custom Domain:**
   - In Vercel: Settings → Domains → `deinestimme.org` hinzufügen
   - In Cloudflare DNS: CNAME Record `@` → `cname.vercel-dns.com`
   - Cloudflare Proxy (orange cloud) → AUS (grey cloud) für Vercel SSL

### Option B: Vercel CLI (schneller)

```bash
# Vercel CLI installieren
npm i -g vercel

# Deployen
vercel

# Folge den Prompts, wähle "Vite" als Framework
# Environment Variables werden im Vercel Dashboard gesetzt
```

---

## Schritt 4: Domain verbinden (deinestimme.org)

Du hast die Domain bereits auf Cloudflare. Zwei DNS Records ändern:

| Type  | Name | Value                    | Proxy |
|-------|------|--------------------------|-------|
| CNAME | @    | cname.vercel-dns.com     | OFF   |
| CNAME | www  | cname.vercel-dns.com     | OFF   |

**Wichtig:** Cloudflare Proxy (orange cloud) muss AUS sein, damit Vercel's SSL funktioniert.

---

## Projektstruktur

```
deinestimme/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── supabase/
│   └── schema.sql          ← Im Supabase SQL Editor ausführen
└── src/
    ├── main.jsx
    ├── App.jsx              ← Hauptapp (v0.4)
    ├── supabaseClient.js    ← Supabase Verbindung
    ├── tokens.js            ← Design-System Tokens
    └── components/
        ├── WelcomeScreen.jsx    ← Mond/Sternschnuppe Auswahl
        ├── ProposalComposer.jsx ← NEU: Schreibassistent mit IST↔LÖSUNG
        └── LivePulse.jsx        ← NEU: Schwarm-Aktivität
```

---

## Was ist neu in v0.4

### 1. Schreibassistent (ProposalComposer)
- Echtzeit-Erkennung: Beschreibt der Text einen IST-Zustand oder einen Lösungsvorschlag?
- Farbverlauf von Coral (IST) über Gold (Übergang) zu Turquoise (LÖSUNG)
- Nicht restriktiv — beides kann eingereicht werden
- Hilfestellungen und Starter-Sätze für Einsteiger
- Sanfter Nudge wenn lange im IST-Modus geschrieben wird

### 2. LivePulse (Schwarm-Gefühl)
- Simulierte Live-Aktivität (später durch Supabase Realtime ersetzt)
- Zeigt Vorschläge, Stimmen, Matches in Echtzeit
- Pulsierender Indikator: "Der Schwarm lebt"
- Zähler für Gesamtvorschläge und aktive Stimmen

### 3. Verbessertes Schema
- `phase` und `ratio` Felder in der proposals-Tabelle
- Row Level Security aktiviert
- Realtime für proposals und votes

---

## Nächste Schritte (v0.5)

- [ ] i18n JSON-Dateien (DE/EN/ID)
- [ ] Supabase Insert für ProposalComposer anbinden
- [ ] Match-Mechanik: Ähnliche Vorschläge → Co-Autoren
- [ ] Video-Storyboard + KI-Prompts
- [ ] Prototype Fund Antrag vorbereiten (Okt 2026)
