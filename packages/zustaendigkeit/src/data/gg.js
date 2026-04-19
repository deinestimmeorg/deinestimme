// ─── Grundgesetz — Kompetenznormen (GG Art. 28/30/70-74) ─────────────────
// Kuratierter Auszug für Spec v0.3 Schicht B. Quelle: gesetze-im-internet.de/gg
// `ebene` = primäre Zuständigkeitsebene aus GG-Sicht
// `vollzug` = abweichende Vollzugsebene (z.B. Bundesgesetz, Landesvollzug)
// `type` aus Spec §5:
//   ausschliesslich_bund | konkurrierend | abweichungsrecht |
//   rahmen | laender_ausschliesslich | residual | kommunal

export const GG_COMPETENCES = [
  // ── Art. 73 GG — Ausschließliche Gesetzgebung des Bundes ────────────
  { key: "auswaertige_angelegenheiten", art: "Art. 73 Abs. 1 Nr. 1 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Auswärtige Angelegenheiten, Verteidigung" },
  { key: "staatsangehoerigkeit",        art: "Art. 73 Abs. 1 Nr. 2 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Staatsangehörigkeit im Bund" },
  { key: "freizuegigkeit",              art: "Art. 73 Abs. 1 Nr. 3 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Freizügigkeit, Pass-/Melderecht, Ein- und Auswanderung" },
  { key: "waehrung_geld",               art: "Art. 73 Abs. 1 Nr. 4 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Währung, Geld, Münzwesen, Maß und Gewicht" },
  { key: "zoll_aussenhandel",           art: "Art. 73 Abs. 1 Nr. 5 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Zoll- und Handelsgebiet, grenzüberschreitender Warenverkehr" },
  { key: "luftverkehr",                 art: "Art. 73 Abs. 1 Nr. 6 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Luftverkehr" },
  { key: "bundeseisenbahnen",           art: "Art. 73 Abs. 1 Nr. 6a GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Verkehr der Eisenbahnen des Bundes" },
  { key: "post_telekommunikation",      art: "Art. 73 Abs. 1 Nr. 7 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Post- und Telekommunikationswesen" },
  { key: "bundesbedienstete",           art: "Art. 73 Abs. 1 Nr. 8 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Rechtsverhältnisse der Bundesbediensteten" },
  { key: "gewerblicher_rechtsschutz",   art: "Art. 73 Abs. 1 Nr. 9 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Gewerblicher Rechtsschutz, Urheberrecht, Verlagsrecht" },
  { key: "verfassungsschutz",           art: "Art. 73 Abs. 1 Nr. 10 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Zusammenarbeit Bund-Länder: Verfassungsschutz, Kriminalpolizei" },
  { key: "statistik_bund",              art: "Art. 73 Abs. 1 Nr. 11 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Statistik für Bundeszwecke" },
  { key: "waffen_sprengstoff",          art: "Art. 73 Abs. 1 Nr. 12 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Waffen- und Sprengstoffrecht" },
  { key: "kernenergie",                 art: "Art. 73 Abs. 1 Nr. 14 GG", type: "ausschliesslich_bund", ebene: "Bund", label: "Erzeugung und Nutzung der Kernenergie zu friedlichen Zwecken" },

  // ── Art. 74 GG — Konkurrierende Gesetzgebung ─────────────────────────
  { key: "buergerliches_recht", art: "Art. 74 Abs. 1 Nr. 1 GG", type: "konkurrierend", ebene: "Bund", vollzug: "Land", label: "Bürgerliches Recht, Strafrecht, Gerichtsverfassung" },
  { key: "personenstand", art: "Art. 74 Abs. 1 Nr. 2 GG", type: "konkurrierend", ebene: "Bund", vollzug: "Land", label: "Personenstandswesen" },
  { key: "vereinsrecht", art: "Art. 74 Abs. 1 Nr. 3 GG", type: "konkurrierend", ebene: "Bund", label: "Vereinsrecht" },
  { key: "auslaenderrecht", art: "Art. 74 Abs. 1 Nr. 4 GG", type: "konkurrierend", ebene: "Bund", vollzug: "Land", label: "Aufenthalt und Niederlassung der Ausländer" },
  { key: "recht_der_wirtschaft", art: "Art. 74 Abs. 1 Nr. 11 GG", type: "konkurrierend", ebene: "Bund", vollzug: "Land", label: "Recht der Wirtschaft: Bergbau, Industrie, Energie, Handwerk, Gewerbe, Handel, Banken, Börsen, Versicherungen" },
  { key: "kernenergie_zivil", art: "Art. 74 Abs. 1 Nr. 11a GG", type: "konkurrierend", ebene: "Bund", label: "Staatliche Haftung für Kernenergieanlagen (zivile Nutzung)" },
  { key: "arbeitsrecht", art: "Art. 74 Abs. 1 Nr. 12 GG", type: "konkurrierend", ebene: "Bund", vollzug: "Land", label: "Arbeitsrecht, Sozialversicherung, Arbeitslosenversicherung" },
  { key: "ausbildungsbeihilfen", art: "Art. 74 Abs. 1 Nr. 13 GG", type: "konkurrierend", ebene: "Bund", label: "Ausbildungsbeihilfen, wissenschaftliche Forschung" },
  { key: "strassenverkehr", art: "Art. 74 Abs. 1 Nr. 22 GG", type: "konkurrierend", ebene: "Bund", vollzug: "Land", label: "Straßenverkehr, Kraftfahrwesen, Bau und Unterhaltung von Bundesstraßen" },
  { key: "umweltschutz_bund", art: "Art. 74 Abs. 1 Nr. 24 GG", type: "konkurrierend", ebene: "Bund", vollzug: "Land", label: "Abfallbeseitigung, Luftreinhaltung, Lärmbekämpfung" },
  { key: "tierschutz_bund", art: "Art. 74 Abs. 1 Nr. 20 GG", type: "konkurrierend", ebene: "Bund", vollzug: "Land", label: "Tierschutz, Lebensmittelrecht" },
  { key: "sozialhilfe", art: "Art. 74 Abs. 1 Nr. 7 GG", type: "konkurrierend", ebene: "Bund", vollzug: "Kommune", label: "Öffentliche Fürsorge / Sozialhilfe" },

  // ── Art. 72(3) GG — Abweichungsrecht der Länder ──────────────────────
  { key: "jagdwesen",         art: "Art. 72(3) Nr. 1 GG", type: "abweichungsrecht", ebene: "Bund", vollzug: "Land", label: "Jagdwesen (Länder dürfen abweichen)" },
  { key: "naturschutz",       art: "Art. 72(3) Nr. 2 GG", type: "abweichungsrecht", ebene: "Bund", vollzug: "Land", label: "Naturschutz und Landschaftspflege" },
  { key: "bodenverteilung",   art: "Art. 72(3) Nr. 3 GG", type: "abweichungsrecht", ebene: "Bund", vollzug: "Land", label: "Bodenverteilung" },
  { key: "raumordnung",       art: "Art. 72(3) Nr. 4 GG", type: "abweichungsrecht", ebene: "Bund", vollzug: "Land", label: "Raumordnung" },
  { key: "wasserhaushalt",    art: "Art. 72(3) Nr. 5 GG", type: "abweichungsrecht", ebene: "Bund", vollzug: "Land", label: "Wasserhaushalt (ohne stoff-/anlagenbezogene Regelungen)" },
  { key: "hochschulzulassung", art: "Art. 72(3) Nr. 6 GG", type: "abweichungsrecht", ebene: "Bund", vollzug: "Land", label: "Hochschulzulassung, Hochschulabschlüsse" },

  // ── Art. 70 GG — Residualklausel, Länder ausschließlich ──────────────
  { key: "polizeirecht",      art: "Art. 70 GG", type: "laender_ausschliesslich", ebene: "Land", label: "Polizei- und Ordnungsrecht" },
  { key: "kulturhoheit",      art: "Art. 70 GG", type: "laender_ausschliesslich", ebene: "Land", label: "Kulturhoheit (Schule, Hochschule, Rundfunk, Kunst)" },
  { key: "schulwesen",        art: "Art. 70 / Art. 7 GG", type: "laender_ausschliesslich", ebene: "Land", label: "Schulwesen, Schulpflicht, Lehrpläne" },
  { key: "rundfunk",          art: "Art. 70 GG + BVerfGE", type: "laender_ausschliesslich", ebene: "Land", label: "Rundfunk und Presse (Landesmedienrecht)" },
  { key: "kommunalrecht",     art: "Art. 70 GG", type: "laender_ausschliesslich", ebene: "Land", label: "Kommunalverfassungsrecht" },
  { key: "versammlungsrecht", art: "Art. 70 GG (seit Föd.Ref. I)", type: "laender_ausschliesslich", ebene: "Land", label: "Versammlungsrecht" },

  // ── Art. 28(2) GG — Kommunale Selbstverwaltung ───────────────────────
  { key: "kommunale_bauleitplanung", art: "Art. 28(2) GG + BauGB", type: "kommunal", ebene: "Kommune", label: "Kommunale Bauleitplanung (F-/B-Pläne)" },
  { key: "kommunale_steuern",        art: "Art. 28(2) GG + Art. 106(6) GG", type: "kommunal", ebene: "Kommune", label: "Kommunale Steuern (Gewerbe-, Grund-, Hundesteuer)" },
  { key: "strassenreinigung",        art: "Art. 28(2) GG", type: "kommunal", ebene: "Kommune", label: "Straßenreinigung, Winterdienst" },
  { key: "abfallentsorgung_komm",    art: "Art. 28(2) GG + KrWG", type: "kommunal", ebene: "Kommune", label: "Abfallentsorgung (operativ)" },
  { key: "spielplaetze",             art: "Art. 28(2) GG", type: "kommunal", ebene: "Kommune", label: "Spielplätze, Parkanlagen" },
  { key: "kita_traeger",             art: "Art. 28(2) GG + SGB VIII", type: "kommunal", ebene: "Kommune", label: "Kita-Trägerschaft (operativ, Rechtsgrundlage Bund)" },
  { key: "feuerwehr",                art: "Art. 28(2) GG + LBrKG", type: "kommunal", ebene: "Kommune", label: "Feuerwehr, nichtpolizeilicher Katastrophenschutz" },
  { key: "meldewesen",               art: "Art. 73 Abs. 1 Nr. 3 GG + BMG", type: "konkurrierend", ebene: "Bund", vollzug: "Kommune", label: "Meldewesen (Bundesmeldegesetz, kommunaler Vollzug)" },
];

export const GG_BY_KEY = Object.fromEntries(GG_COMPETENCES.map(c => [c.key, c]));
