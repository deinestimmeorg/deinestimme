// ─── AEUV / TFEU — EU-Kompetenznormen (Art. 2-6 AEUV) ────────────────────
// Quelle: EUR-Lex, konsolidierte Fassung. Ergänzt um Euratom-Vertrag.
// `type`: exclusive | shared | shared_parallel | coordinating | supporting | cfsp

export const TFEU_COMPETENCES = [
  // ── Art. 3 AEUV — Ausschließliche EU-Zuständigkeit ───────────────────
  { key: "zollunion",           art: "Art. 3 Abs. 1 lit. a AEUV", type: "exclusive", label: "Zollunion" },
  { key: "wettbewerbsregeln_binnenmarkt", art: "Art. 3 Abs. 1 lit. b AEUV", type: "exclusive", label: "Wettbewerbsregeln, die für das Funktionieren des Binnenmarkts erforderlich sind" },
  { key: "waehrungspolitik_euro", art: "Art. 3 Abs. 1 lit. c AEUV", type: "exclusive", label: "Währungspolitik für Euro-Mitgliedstaaten" },
  { key: "meeresbiol_ressourcen", art: "Art. 3 Abs. 1 lit. d AEUV", type: "exclusive", label: "Erhaltung biologischer Meeresschätze" },
  { key: "gemeinsame_handelspolitik", art: "Art. 3 Abs. 1 lit. e AEUV", type: "exclusive", label: "Gemeinsame Handelspolitik" },

  // ── Art. 4 AEUV — Geteilte Zuständigkeit ─────────────────────────────
  { key: "binnenmarkt",          art: "Art. 4 Abs. 2 lit. a AEUV", type: "shared", label: "Binnenmarkt" },
  { key: "sozialpolitik_harmonisiert", art: "Art. 4 Abs. 2 lit. b AEUV", type: "shared", label: "Sozialpolitik (harmonisierte Aspekte)" },
  { key: "wirtschaftl_sozialer_zusammenhalt", art: "Art. 4 Abs. 2 lit. c AEUV", type: "shared", label: "Wirtschaftlicher, sozialer, territorialer Zusammenhalt" },
  { key: "landwirtschaft_fischerei", art: "Art. 4 Abs. 2 lit. d AEUV", type: "shared", label: "Landwirtschaft und Fischerei (außer Meeresressourcen)" },
  { key: "umwelt",               art: "Art. 4 Abs. 2 lit. e AEUV", type: "shared", label: "Umwelt" },
  { key: "verbraucherschutz",    art: "Art. 4 Abs. 2 lit. f AEUV", type: "shared", label: "Verbraucherschutz" },
  { key: "verkehr",              art: "Art. 4 Abs. 2 lit. g AEUV", type: "shared", label: "Verkehr" },
  { key: "transeuropaeische_netze", art: "Art. 4 Abs. 2 lit. h AEUV", type: "shared", label: "Transeuropäische Netze" },
  { key: "energie",              art: "Art. 4 Abs. 2 lit. i AEUV", type: "shared", label: "Energie (Binnenmarkt; Energiemix bleibt national, Art. 194(2))" },
  { key: "raum_freiheit_sicherheit_recht", art: "Art. 4 Abs. 2 lit. j AEUV", type: "shared", label: "Raum der Freiheit, der Sicherheit und des Rechts" },
  { key: "gemeinsame_sicherheitsanliegen_gesundheit", art: "Art. 4 Abs. 2 lit. k AEUV", type: "shared", label: "Gemeinsame Sicherheitsanliegen Gesundheit (harmonisiert)" },

  // Forschung, Raumfahrt, Entwicklungszusammenarbeit — parallel
  { key: "forschung_raumfahrt", art: "Art. 4 Abs. 3 AEUV", type: "shared_parallel", label: "Forschung, technologische Entwicklung, Raumfahrt (keine Sperrwirkung)" },
  { key: "entwicklung_humanitaere_hilfe", art: "Art. 4 Abs. 4 AEUV", type: "shared_parallel", label: "Entwicklungszusammenarbeit, humanitäre Hilfe" },

  // ── Art. 5 AEUV — Koordinierung ──────────────────────────────────────
  { key: "wirtschaftspolitik_koordination", art: "Art. 5 Abs. 1 AEUV", type: "coordinating", label: "Koordinierung der Wirtschaftspolitik" },
  { key: "beschaeftigungspolitik_koord",    art: "Art. 5 Abs. 2 AEUV", type: "coordinating", label: "Koordinierung der Beschäftigungspolitik" },
  { key: "sozialpolitik_koord",             art: "Art. 5 Abs. 3 AEUV", type: "coordinating", label: "Koordinierung der Sozialpolitik (soweit nicht harmonisiert)" },

  // ── Art. 6 AEUV — Unterstützen / Koordinieren / Ergänzen ─────────────
  { key: "schutz_gesundheit",   art: "Art. 6 lit. a AEUV", type: "supporting", label: "Schutz und Verbesserung der menschlichen Gesundheit" },
  { key: "industrie",           art: "Art. 6 lit. b AEUV", type: "supporting", label: "Industrie" },
  { key: "kultur",              art: "Art. 6 lit. c AEUV", type: "supporting", label: "Kultur" },
  { key: "tourismus",           art: "Art. 6 lit. d AEUV", type: "supporting", label: "Tourismus" },
  { key: "bildung_jugend_sport",art: "Art. 6 lit. e AEUV", type: "supporting", label: "Allgemeine und berufliche Bildung, Jugend, Sport" },
  { key: "zivilschutz",         art: "Art. 6 lit. f AEUV", type: "supporting", label: "Zivilschutz" },
  { key: "verwaltungszusammenarbeit", art: "Art. 6 lit. g AEUV", type: "supporting", label: "Verwaltungszusammenarbeit" },

  // ── Art. 2(4) AEUV — GASP ────────────────────────────────────────────
  { key: "gasp",                art: "Art. 2 Abs. 4 AEUV", type: "cfsp", label: "Gemeinsame Außen- und Sicherheitspolitik (GASP)" },
];

export const TFEU_BY_KEY = Object.fromEntries(TFEU_COMPETENCES.map(c => [c.key, c]));
