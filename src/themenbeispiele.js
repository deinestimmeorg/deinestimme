// ─── DeineStimme: Top-Probleme DE/NL/FR (April 2026) ───
// Debattierte, ungelöste Themen laut Statista / ARD-DeutschlandTrend / Ipsos-Sorgenbarometer /
// Politbarometer (DE), Ipsos/NOS/Politico/NL Times (NL), Odoxa/Ipsos/Elabe/Figaro (FR).
// Alle Vorschläge folgen DeineStimme-Prinzip: Kein Dagegen ohne eigenen Gegenvorschlag
// + Impact-Assessment (Wirtschaft/Gesundheit/Soziales/Umwelt).
//
// Datenfelder pro Thema:
//   id             — eindeutige ID (de-01, nl-07, fr-13 …)
//   country        — "DE" | "NL" | "FR"
//   rank           — 1-20 (Top-20 Platz)
//   title          — Überschrift (Landessprache / DE-Zusammenfassung)
//   title_local    — Originalbegriff (z.B. "Stikstofkrise", "Pouvoir d'achat")
//   problem        — Kurzbeschreibung (kann leer sein bei Kurzthemen 6–20)
//   proposals      — Array von Lösungsvorschlägen (leer bei Kurzthemen 6–20)
//   sources        — Quellen-Chips (statista, ipsos, ard, politbarometer …)
//   zust_hint      — { primary_level, competence_type, note } — Engine-Hinweis
//                     für v0.4 4-Kategorien-Output (nur Vorab-Einschätzung)
//   detail_level   — "full" (1–5) | "short" (6–20)

export const THEMEN = [
  // ═══ DEUTSCHLAND ═══
  {
    id: "de-01",
    country: "DE",
    rank: 1,
    title: "Wirtschaftskrise / Standortkosten",
    title_local: "Wirtschaftskrise / Standortkosten",
    problem:
      "Hohe Energie-, Arbeits- und Steuerkosten + Bürokratie verhindern Investitionen; Wachstum stagniert.",
    proposals: [
      "Temporärer Energiepreisdeckel für Industrie, gegenfinanziert durch CO₂-Steuer-Umlage auf Importe.",
      'Einheitliches „Deutschland-Ticket 2.0" für Bürokratieabbau mit automatisierter Genehmigung unter 6 Monaten.',
      "Steuerfreie Investitionszulage für KMU bei Klimaneutralität (Impact: +1,2 % BIP).",
      "Fachkräfte-Visa mit automatischer Anerkennung + Sprachpflicht.",
      "Branchenspezifische Ausnahmen von Mindestlohn bei Tarifbindung mit Mitigationsfonds für Niedriglohnsektoren.",
    ],
    sources: ["statista", "ard", "ipsos"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "konkurrierend",
      note: "Bürokratieabbau/Genehmigungen: Land/Kommune mitwirkend. Energiepreisdeckel: EU-Beihilferecht prüfen.",
    },
    detail_level: "full",
  },
  {
    id: "de-02",
    country: "DE",
    rank: 2,
    title: "Rentensicherung",
    title_local: "Rentensicherung",
    problem: "Demografischer Druck + fehlende Nachhaltigkeit; 57 % nennen es Top-Sorge.",
    proposals: [
      "Automatische Rentenformel mit Demografie-Faktor + Kapitalstock ab 2027.",
      "Freiwillige private Vorsorge mit Steuerabzug bis 5.000 €/Jahr.",
      "Erhöhung Regelaltersgrenze auf 67 mit Ausnahmen für körperlich Schwerarbeitende.",
      "Zuwanderer-Rentenpunkte nur bei 5 Jahren Beitragszahlung.",
      "Bundeszuschuss aus CO₂-Einnahmen für Beitragsstabilität.",
    ],
    sources: ["politbarometer", "ipsos"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "ausschliesslich_bund",
      note: "Sozialversicherung: Art. 74 Abs. 1 Nr. 12 GG — Bund konkurrierend, faktisch ausschließlich.",
    },
    detail_level: "full",
  },
  {
    id: "de-03",
    country: "DE",
    rank: 3,
    title: "Zuwanderung / Integration",
    title_local: "Zuwanderung / Integration",
    problem: "Hohe Aufnahmezahlen bei begrenzter Integration und Kommunalbelastung.",
    proposals: [
      "Punkte-System für qualifizierte Zuwanderung mit Sprach- und Integrationspflicht.",
      "Schnellverfahren Abschiebung bei Straftaten + EU-Rücknahmeabkommen.",
      "Kommunaler Integrationsfonds mit Gegenleistung (Sprache/Arbeit).",
      "Obergrenze pro Jahr mit parlamentarischer Anpassung.",
      'Pilot „Willkommenszentren" mit 6-Monats-Qualifizierung.',
    ],
    sources: ["ard", "ipsos", "politbarometer"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "konkurrierend",
      note: "Aufenthaltsrecht Bund, Integration/Unterbringung Land+Kommune. EU-Rücknahmeabkommen: EU-Kompetenz.",
    },
    detail_level: "full",
  },
  {
    id: "de-04",
    country: "DE",
    rank: 4,
    title: "Klima- und Energiewende",
    title_local: "Klima- und Energiewende",
    problem: "Hohe Kosten + Netzausbau-Stau; keine tragfähige Balance.",
    proposals: [
      "Beschleunigtes Planungsrecht für Erneuerbare mit Bürgerbeteiligung.",
      "Kernkraft-Option für Grundlast bei Sicherheitsupgrade.",
      "Wasserstoff-Strategie mit EU-Importabkommen.",
      "CO₂-Steuer mit vollständiger Rückerstattung an Haushalte.",
      "Sektorenkopplung (Wärme + Verkehr) mit Förderung nur bei Netzverträglichkeit.",
    ],
    sources: ["statista", "ard"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "konkurrierend",
      note: "Energierecht Bund; Planungsrecht Land; Grundlast/CO₂-Preis EU-Emissionshandel (ETS).",
    },
    detail_level: "full",
  },
  {
    id: "de-05",
    country: "DE",
    rank: 5,
    title: "Bezahlbarer Wohnraum",
    title_local: "Bezahlbarer Wohnraum",
    problem: "Fehlbestand + Baukostenexplosion; keine ausreichende Neubau-Offensive.",
    proposals: [
      "Bundesweites Baulandmobilisierungsgesetz mit Vorkaufsrecht Kommunen.",
      "Steuererleichterung für serielles Bauen (Modulbau).",
      "Mietpreisbremse 2.0 mit Ausnahmen für Neubau.",
      "Sozialer Wohnungsbau mit 30 % Quote + privater Co-Finanzierung.",
      "Digitales Baugenehmigungsverfahren bundesweit.",
    ],
    sources: ["statista", "ard", "politbarometer"],
    zust_hint: {
      primary_level: "Land",
      competence_type: "laender_ausschliesslich",
      note: "Wohnungsbau: Land-Kompetenz. Mietrecht: Bund. Baugenehmigung: Kommune (UPUA).",
    },
    detail_level: "full",
  },
  {
    id: "de-06",
    country: "DE",
    rank: 6,
    title: "Pflege- und Gesundheitswesen",
    title_local: "Pflege- und Gesundheitswesen",
    problem: "Personalmangel + Finanzierungslücke.",
    proposals: [
      "Ausbildungsvergütung Pflege + Zuwanderer-Qualifizierung.",
      "Präventionsfonds aus Krankenkassenbeiträgen.",
      "Digitaler Pflege-TÜV für Entlastung.",
      "Steuerfreie Zuschläge für Nacht-/Wochenendarbeit.",
      "Ambulante vor stationärer Versorgung mit Bonusmodell.",
    ],
    sources: ["ipsos", "ard"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "konkurrierend",
      note: "SGB XI/V (Bund); Krankenhausplanung Land; kommunale Altenhilfe.",
    },
    detail_level: "full",
  },
  {
    id: "de-07",
    country: "DE",
    rank: 7,
    title: "Inflation / Lebenshaltungskosten",
    title_local: "Inflation / Lebenshaltungskosten",
    problem: "Dauerbelastung Haushalte trotz Stabilisierung.",
    proposals: [
      "Temporärer MwSt.-Senkung auf Grundnahrungsmittel.",
      "Energiepreisgarantie für Haushalte.",
      "Lohn-Indexierung für Mindestlohn.",
      "Mietkostenzuschuss für Geringverdiener.",
      "Verbraucherpreis-Transparenz-App mit staatlicher Förderung.",
    ],
    sources: ["ipsos", "statista"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "konkurrierend",
      note: "Geldpolitik: EZB/EU. Steuer: Bund. Wohngeld: Bund+Land.",
    },
    detail_level: "full",
  },
  {
    id: "de-08",
    country: "DE",
    rank: 8,
    title: "Innere Sicherheit / Extremismus",
    title_local: "Innere Sicherheit / Extremismus",
    problem: "Steigende Gewalt + Polarisierung.",
    proposals: [
      "Mehr Polizeistellen in Brennpunkten + Präventionsprogramme.",
      "Schnellverfahren für Gewalttaten.",
      "Digitale Radikalisierungsfrühwarnung.",
      "Schulprogramm Demokratieerziehung.",
      "Bundesweites Extremismus-Monitoring mit jährlichem Bericht.",
    ],
    sources: ["ard", "politbarometer"],
    zust_hint: {
      primary_level: "Land",
      competence_type: "laender_ausschliesslich",
      note: "Polizeirecht: Länder. Strafrecht: Bund (Art. 74 Abs. 1 Nr. 1 GG). Bildung: Länder.",
    },
    detail_level: "full",
  },
  // DE 9–20 (kurz)
  { id: "de-09", country: "DE", rank: 9, title: "Soziales Gefälle", detail_level: "short", sources: ["ard"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "de-10", country: "DE", rank: 10, title: "Bürokratie", detail_level: "short", sources: ["statista"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "de-11", country: "DE", rank: 11, title: "Fachkräftemangel", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "de-12", country: "DE", rank: 12, title: "Verteidigung", detail_level: "short", sources: ["politbarometer"], zust_hint: { primary_level: "Bund", competence_type: "ausschliesslich_bund" } },
  { id: "de-13", country: "DE", rank: 13, title: "Ukraine-Hilfe", detail_level: "short", sources: ["ard"], zust_hint: { primary_level: "EU", competence_type: "cfsp", note: "GASP koordiniert, bilaterale Bund-Kompetenz" } },
  { id: "de-14", country: "DE", rank: 14, title: "Bildung", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "Land", competence_type: "laender_ausschliesslich" } },
  { id: "de-15", country: "DE", rank: 15, title: "Landwirtschaft", detail_level: "short", sources: ["statista"], zust_hint: { primary_level: "EU", competence_type: "shared", note: "GAP/EU-Rahmen, nationale Umsetzung" } },
  { id: "de-16", country: "DE", rank: 16, title: "Digitalisierung", detail_level: "short", sources: ["ard"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "de-17", country: "DE", rank: 17, title: "Steuerlast", detail_level: "short", sources: ["politbarometer"], zust_hint: { primary_level: "Bund", competence_type: "ausschliesslich_bund" } },
  { id: "de-18", country: "DE", rank: 18, title: "Politikverdruss", detail_level: "short", sources: ["ard"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend", note: "Wahlrecht Bund, Partizipation alle Ebenen" } },
  { id: "de-19", country: "DE", rank: 19, title: "Infrastruktur", detail_level: "short", sources: ["statista"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "de-20", country: "DE", rank: 20, title: "EU-Souveränität", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "EU", competence_type: "exclusive" } },

  // ═══ NIEDERLANDE ═══
  {
    id: "nl-01",
    country: "NL",
    rank: 1,
    title: "Wohnungsnot (400.000 Fehlbestand)",
    title_local: "Woningnood",
    problem: "Baustopp durch Regulierung + Zuwanderung.",
    proposals: [
      "Nationales Baubeschleunigungsgesetz mit Ausnahmen Stikstof.",
      "Modularbau-Pflicht für Neubau.",
      "Mietpreisindex mit Neubau-Bonus.",
      "Kommunales Vorkaufsrecht + Bürgerbeteiligung.",
      "Steueranreiz für Investoren bei Sozialwohnungen.",
    ],
    sources: ["ipsos", "nos", "nl-times"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "konkurrierend",
      note: "Omgevingswet 2024: Gemeinde + Provincie + Rijk. Waterschap mitwirkend bei Bodem/Wasser.",
    },
    detail_level: "full",
  },
  {
    id: "nl-02",
    country: "NL",
    rank: 2,
    title: "Stikstof-/Stickstoffkrise",
    title_local: "Stikstofcrisis",
    problem: "Baustopp Landwirtschaft vs. Umwelt.",
    proposals: [
      "Technologie-Fonds für emissionsarme Landwirtschaft.",
      "Flächenhandel mit CO₂-Gutschriften.",
      "EU-konforme Ausnahmen für strategische Projekte.",
      "Freiwilliger Rückkauf mit Übergangsgeld.",
      "Präzisionslandwirtschaft-Pflicht mit Subvention.",
    ],
    sources: ["politico", "nl-times", "nos"],
    zust_hint: {
      primary_level: "EU",
      competence_type: "shared",
      note: "Habitat-RL 92/43/EWG: EU-Rahmen. Umsetzung Rijk + Provincie. RvS-Urteile 2019/2025 determinierend.",
    },
    detail_level: "full",
  },
  {
    id: "nl-03",
    country: "NL",
    rank: 3,
    title: "Migration / Asyl",
    title_local: "Migratie / Asiel",
    problem: "Überlastung Aufnahmezentren.",
    proposals: [
      "EU-Außengrenzenschutz + Rücknahmeabkommen.",
      "Punkte-System für Arbeitsmigration.",
      "Schnellverfahren Ablehnung + Abschiebung.",
      "Integrationspflicht mit Sprachkurs.",
      "Obergrenze mit parlamentarischer Anpassung.",
    ],
    sources: ["ipsos", "nos", "nl-times"],
    zust_hint: {
      primary_level: "EU",
      competence_type: "shared",
      note: "GEAS (EU-Asylpaket 2024). Unterbringung Rijk/COA, Gemeinde mitwirkend.",
    },
    detail_level: "full",
  },
  {
    id: "nl-04",
    country: "NL",
    rank: 4,
    title: "Gesundheitskosten / Zorg",
    title_local: "Zorgkosten",
    problem: "Wartezeiten + Finanzierung.",
    proposals: [
      "Präventionsbonus in Versicherung.",
      "Digitaler Gesundheits-Check.",
      "Zuwanderer-Pflegekräfte mit Anerkennung.",
      "Ambulante Priorisierung.",
      "Steuerfreie Zusatzversicherung.",
    ],
    sources: ["nl-times", "ipsos"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "konkurrierend",
      note: "Zvw/Wlz: Rijk. Wmo 2015: Gemeinde. EU: nur Patientenrechte (RL 2011/24).",
    },
    detail_level: "full",
  },
  {
    id: "nl-05",
    country: "NL",
    rank: 5,
    title: "Stromnetz / Energie",
    title_local: "Netcongestie / Energie",
    problem: "Kapazitätsengpässe bei Energiewende.",
    proposals: [
      "Beschleunigtes Netzausbau-Gesetz.",
      "Wasserstoff-Pipeline-Förderung.",
      "Speicherpflicht für Erneuerbare.",
      "EU-Importabkommen Strom.",
      "Bürger-Energiegenossenschaften mit Steuerbonus.",
    ],
    sources: ["nos", "politico"],
    zust_hint: {
      primary_level: "EU",
      competence_type: "shared",
      note: "EU-Strombinnenmarkt-VO 2019/943. ACM-Regulierung national. TenneT gemeinsam mit DE.",
    },
    detail_level: "full",
  },
  // NL 6–20 (kurz)
  { id: "nl-06", country: "NL", rank: 6, title: "Lebenshaltungskosten", title_local: "Koopkracht", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "nl-07", country: "NL", rank: 7, title: "Verteidigungsausgaben", title_local: "Defensie-uitgaven", detail_level: "short", sources: ["politico"], zust_hint: { primary_level: "Bund", competence_type: "ausschliesslich_bund" } },
  { id: "nl-08", country: "NL", rank: 8, title: "Politische Fragmentierung", title_local: "Politieke versnippering", detail_level: "short", sources: ["nos"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "nl-09", country: "NL", rank: 9, title: "Infrastruktur", title_local: "Infrastructuur", detail_level: "short", sources: ["nl-times"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "nl-10", country: "NL", rank: 10, title: "Arbeitskräftemangel", title_local: "Personeelstekort", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "nl-11", country: "NL", rank: 11, title: "Landwirtschaftsumbau", title_local: "Landbouwtransitie", detail_level: "short", sources: ["politico"], zust_hint: { primary_level: "EU", competence_type: "shared" } },
  { id: "nl-12", country: "NL", rank: 12, title: "EU-Politik", title_local: "EU-beleid", detail_level: "short", sources: ["nos"], zust_hint: { primary_level: "EU", competence_type: "exclusive" } },
  { id: "nl-13", country: "NL", rank: 13, title: "Digitalisierung", title_local: "Digitalisering", detail_level: "short", sources: ["nl-times"], zust_hint: { primary_level: "EU", competence_type: "shared", note: "DSA/DMA/AI-Act" } },
  { id: "nl-14", country: "NL", rank: 14, title: "Sozialleistungen", title_local: "Sociale voorzieningen", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "nl-15", country: "NL", rank: 15, title: "Kriminalität", title_local: "Criminaliteit", detail_level: "short", sources: ["nos"], zust_hint: { primary_level: "Bund", competence_type: "ausschliesslich_bund" } },
  { id: "nl-16", country: "NL", rank: 16, title: "Klimaneutralität 2030", title_local: "Klimaatneutraliteit 2030", detail_level: "short", sources: ["politico"], zust_hint: { primary_level: "EU", competence_type: "shared" } },
  { id: "nl-17", country: "NL", rank: 17, title: "Bildung", title_local: "Onderwijs", detail_level: "short", sources: ["nl-times"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend", note: "OCW-Ministerium, aber Schulbestuur autonom" } },
  { id: "nl-18", country: "NL", rank: 18, title: "Pflege", title_local: "Ouderenzorg", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "Kommune", competence_type: "kommunal", note: "Wmo 2015" } },
  { id: "nl-19", country: "NL", rank: 19, title: "Korruption", title_local: "Corruptie", detail_level: "short", sources: ["nos"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "nl-20", country: "NL", rank: 20, title: "Regionale Ungleichheit", title_local: "Regionale ongelijkheid", detail_level: "short", sources: ["nl-times"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },

  // ═══ FRANKREICH ═══
  {
    id: "fr-01",
    country: "FR",
    rank: 1,
    title: "Kaufkraft / Lebenshaltungskosten",
    title_local: "Pouvoir d'achat",
    problem: "Hohe Preise bei stagnierenden Löhnen.",
    proposals: [
      "Temporärer MwSt.-Senkung Grundgüter.",
      "Energiepreisgarantie Haushalte.",
      "Lohnindexierung Mindestlohn.",
      "Mietkostenzuschuss Geringverdiener.",
      "Präventionsfonds aus Unternehmenssteuern.",
    ],
    sources: ["odoxa", "elabe", "ipsos"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "konkurrierend",
      note: "SMIC national. TVA: EU-Rahmen (RL 2006/112) + nationale Umsetzung. APL: Département.",
    },
    detail_level: "full",
  },
  {
    id: "fr-02",
    country: "FR",
    rank: 2,
    title: "Politische Instabilität / Budget 2026",
    title_local: "Instabilité politique / Budget 2026",
    problem: "Keine Mehrheit + 49.3-Nutzung.",
    proposals: [
      "Verfassungsreform Minderheitsregeln mit Vertrauensvotum.",
      "Bürgerhaushalt-Pilot auf nationaler Ebene.",
      "Überparteilicher Haushaltsausschuss.",
      "Automatische Schuldenbremse mit Ausnahmen.",
      "Direkte Demokratie-Elemente bei Budget.",
    ],
    sources: ["figaro", "odoxa", "ipsos"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "ausschliesslich_bund",
      note: "Verfassungsrecht: Art. 49.3 Constitution. LOLF-Haushaltsrecht national.",
    },
    detail_level: "full",
  },
  {
    id: "fr-03",
    country: "FR",
    rank: 3,
    title: "Sicherheit / Insécurité",
    title_local: "Insécurité / Narcotrafic",
    problem: "Steigende Kriminalität + Narcotrafic.",
    proposals: [
      "Mehr Polizeikräfte in Brennpunkten.",
      "Schnellverfahren Drogenkriminalität.",
      "Präventionsprogramme Schulen.",
      "EU-Grenzschutz + Abschiebung.",
      "Community-Policing mit Bürgerbeteiligung.",
    ],
    sources: ["elabe", "odoxa", "figaro"],
    zust_hint: {
      primary_level: "Bund",
      competence_type: "ausschliesslich_bund",
      note: "Polizei national (zentralisiert), aber EU-Grenzschutz Frontex (shared). Kommune: Police municipale.",
    },
    detail_level: "full",
  },
  {
    id: "fr-04",
    country: "FR",
    rank: 4,
    title: "Öffentliche Verschuldung",
    title_local: "Dette publique",
    problem: "Defizitabbau ohne Austerität.",
    proposals: [
      "Wachstumsfonds aus Privatisierungserlösen.",
      "Steuerreform Reiche mit Investitionsanreiz.",
      "EU-Finanztransaktionssteuer.",
      "Ausgabenkontrolle mit KI-gestützter Prüfung.",
      "Bürgerbeteiligung Haushaltsplanung.",
    ],
    sources: ["ipsos", "odoxa", "figaro"],
    zust_hint: {
      primary_level: "EU",
      competence_type: "coordinating",
      note: "Fiskalpakt/SGP-EU-Rahmen. Nationale Umsetzung Parlament. FTT EU-Vorschlag seit 2013 offen.",
    },
    detail_level: "full",
  },
  {
    id: "fr-05",
    country: "FR",
    rank: 5,
    title: "Immigration",
    title_local: "Immigration",
    problem: "Kontrolle + Integration.",
    proposals: [
      "Punkte-System qualifizierte Zuwanderung.",
      "Schnellverfahren Ablehnung.",
      "Integrationspflicht + Sprachkurs.",
      "EU-Rücknahmeabkommen.",
      "Obergrenze mit jährlicher Anpassung.",
    ],
    sources: ["elabe", "odoxa", "ipsos"],
    zust_hint: {
      primary_level: "EU",
      competence_type: "shared",
      note: "GEAS/Schengen EU-Rahmen. Nationale Umsetzung Innenministerium. Préfet regional.",
    },
    detail_level: "full",
  },
  // FR 6–20 (kurz)
  { id: "fr-06", country: "FR", rank: 6, title: "Gesundheitssystem", title_local: "Système de santé", detail_level: "short", sources: ["odoxa"], zust_hint: { primary_level: "Bund", competence_type: "ausschliesslich_bund" } },
  { id: "fr-07", country: "FR", rank: 7, title: "Energiepreise", title_local: "Prix de l'énergie", detail_level: "short", sources: ["elabe"], zust_hint: { primary_level: "EU", competence_type: "shared" } },
  { id: "fr-08", country: "FR", rank: 8, title: "Korruption", title_local: "Corruption", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "fr-09", country: "FR", rank: 9, title: "Stabilität Politik", title_local: "Stabilité politique", detail_level: "short", sources: ["figaro"], zust_hint: { primary_level: "Bund", competence_type: "ausschliesslich_bund" } },
  { id: "fr-10", country: "FR", rank: 10, title: "Bildung", title_local: "Éducation", detail_level: "short", sources: ["odoxa"], zust_hint: { primary_level: "Bund", competence_type: "ausschliesslich_bund", note: "Education Nationale zentralisiert" } },
  { id: "fr-11", country: "FR", rank: 11, title: "Renten", title_local: "Retraites", detail_level: "short", sources: ["elabe"], zust_hint: { primary_level: "Bund", competence_type: "ausschliesslich_bund" } },
  { id: "fr-12", country: "FR", rank: 12, title: "Arbeitsmarkt", title_local: "Marché du travail", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "fr-13", country: "FR", rank: 13, title: "Klimawandel", title_local: "Changement climatique", detail_level: "short", sources: ["odoxa"], zust_hint: { primary_level: "EU", competence_type: "shared" } },
  { id: "fr-14", country: "FR", rank: 14, title: "EU-Rolle", title_local: "Rôle de l'UE", detail_level: "short", sources: ["figaro"], zust_hint: { primary_level: "EU", competence_type: "exclusive" } },
  { id: "fr-15", country: "FR", rank: 15, title: "Landwirtschaft", title_local: "Agriculture", detail_level: "short", sources: ["elabe"], zust_hint: { primary_level: "EU", competence_type: "shared" } },
  { id: "fr-16", country: "FR", rank: 16, title: "Digitalisierung", title_local: "Numérique", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "EU", competence_type: "shared" } },
  { id: "fr-17", country: "FR", rank: 17, title: "Regionale Ungleichheit", title_local: "Inégalités territoriales", detail_level: "short", sources: ["odoxa"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
  { id: "fr-18", country: "FR", rank: 18, title: "Wohnen", title_local: "Logement", detail_level: "short", sources: ["elabe"], zust_hint: { primary_level: "Kommune", competence_type: "kommunal" } },
  { id: "fr-19", country: "FR", rank: 19, title: "Pflege", title_local: "Dépendance / EHPAD", detail_level: "short", sources: ["ipsos"], zust_hint: { primary_level: "Land", competence_type: "laender_ausschliesslich", note: "Département-Kompetenz APA" } },
  { id: "fr-20", country: "FR", rank: 20, title: "Politische Partizipation", title_local: "Participation politique", detail_level: "short", sources: ["figaro"], zust_hint: { primary_level: "Bund", competence_type: "konkurrierend" } },
];

// Quellenkatalog mit Anzeigenamen
export const THEMEN_SOURCES = {
  statista: { label: "Statista", country: "DE" },
  ard: { label: "ARD-DeutschlandTrend", country: "DE" },
  ipsos: { label: "Ipsos", country: "INT" },
  politbarometer: { label: "Politbarometer (ZDF)", country: "DE" },
  nos: { label: "NOS", country: "NL" },
  politico: { label: "Politico", country: "EU" },
  "nl-times": { label: "NL Times", country: "NL" },
  odoxa: { label: "Odoxa", country: "FR" },
  elabe: { label: "Elabe", country: "FR" },
  figaro: { label: "Le Figaro", country: "FR" },
};

// ═══ Helpers ═══
export function themenByCountry(country) {
  return THEMEN.filter((t) => t.country === country).sort((a, b) => a.rank - b.rank);
}

export function themaById(id) {
  return THEMEN.find((t) => t.id === id);
}

// Build a "seed" text for the ProposalComposer when a user clicks a theme card.
// The composer text is always German (Eingabeebene), even if the UI language differs —
// the engine is DE-first. This matches Request-A clarification.
export function themaAsComposerSeed(t) {
  if (!t) return "";
  const header = `[Thema ${t.country}-${String(t.rank).padStart(2, "0")}] ${t.title}`;
  if (t.detail_level === "full") {
    const lines = [header];
    if (t.problem) lines.push(`\nProblem: ${t.problem}`);
    if (t.proposals?.length) {
      lines.push("\nEigene Vorschläge (kein Dagegen ohne Gegenvorschlag):");
      t.proposals.forEach((p, i) => lines.push(`${i + 1}. ${p}`));
    }
    lines.push("\nImpact-Assessment: Wirtschaft / Gesundheit / Soziales / Umwelt — bitte ergänzen.");
    return lines.join("\n");
  }
  return `${header}\n\nBitte konkreten Vorschlag mit Impact-Assessment (Wirtschaft / Gesundheit / Soziales / Umwelt) ergänzen.`;
}

// i18n labels for the themen-gallery (only short strings; full content stays DE)
export const THEMEN_UI = {
  de: {
    sectionTitle: "Top-Probleme — debattiert, ungelöst",
    sectionSub:
      "Top-20 je Land (April 2026). Quellen: Statista · ARD · Ipsos · Politbarometer · NOS · NL Times · Politico · Odoxa · Elabe · Le Figaro.",
    countryLabel: { DE: "Deutschland", NL: "Niederlande", FR: "Frankreich" },
    problemLabel: "Problem",
    proposalsLabel: "Lösungsvorschläge",
    shortNote: "Detaillierte Vorschläge auf Anfrage — oder direkt mitbauen.",
    toComposer: "→ in Vorschlag übernehmen",
    hintLabel: "Zuständigkeit (Vorab)",
    testBadge: "v0.4 test",
    expand: "mehr",
    collapse: "weniger",
  },
  en: {
    sectionTitle: "Top problems — debated, unsolved",
    sectionSub:
      "Top-20 per country (April 2026). Sources: Statista · ARD · Ipsos · Politbarometer · NOS · NL Times · Politico · Odoxa · Elabe · Le Figaro.",
    countryLabel: { DE: "Germany", NL: "Netherlands", FR: "France" },
    problemLabel: "Problem",
    proposalsLabel: "Proposals",
    shortNote: "Detailed proposals on request — or just start building.",
    toComposer: "→ use in proposal",
    hintLabel: "Competence (preview)",
    testBadge: "v0.4 test",
    expand: "more",
    collapse: "less",
  },
  nl: {
    sectionTitle: "Top-problemen — bediscussieerd, onopgelost",
    sectionSub:
      "Top-20 per land (april 2026). Bronnen: Statista · ARD · Ipsos · Politbarometer · NOS · NL Times · Politico · Odoxa · Elabe · Le Figaro.",
    countryLabel: { DE: "Duitsland", NL: "Nederland", FR: "Frankrijk" },
    problemLabel: "Probleem",
    proposalsLabel: "Voorstellen",
    shortNote: "Gedetailleerde voorstellen op aanvraag — of begin direct mee te bouwen.",
    toComposer: "→ gebruik in voorstel",
    hintLabel: "Bevoegdheid (voorlopig)",
    testBadge: "v0.4 test",
    expand: "meer",
    collapse: "minder",
  },
  fr: {
    sectionTitle: "Top-problèmes — débattus, non résolus",
    sectionSub:
      "Top-20 par pays (avril 2026). Sources : Statista · ARD · Ipsos · Politbarometer · NOS · NL Times · Politico · Odoxa · Elabe · Le Figaro.",
    countryLabel: { DE: "Allemagne", NL: "Pays-Bas", FR: "France" },
    problemLabel: "Problème",
    proposalsLabel: "Propositions",
    shortNote: "Propositions détaillées sur demande — ou commencez directement à contribuer.",
    toComposer: "→ utiliser dans la proposition",
    hintLabel: "Compétence (aperçu)",
    testBadge: "v0.4 test",
    expand: "plus",
    collapse: "moins",
  },
  es: {
    sectionTitle: "Top-problemas — debatidos, sin resolver",
    sectionSub:
      "Top-20 por país (abril 2026). Fuentes: Statista · ARD · Ipsos · Politbarometer · NOS · NL Times · Politico · Odoxa · Elabe · Le Figaro.",
    countryLabel: { DE: "Alemania", NL: "Países Bajos", FR: "Francia" },
    problemLabel: "Problema",
    proposalsLabel: "Propuestas",
    shortNote: "Propuestas detalladas bajo petición — o empieza a construir directamente.",
    toComposer: "→ usar en propuesta",
    hintLabel: "Competencia (vista previa)",
    testBadge: "v0.4 test",
    expand: "más",
    collapse: "menos",
  },
  id: {
    sectionTitle: "Masalah utama — diperdebatkan, belum terselesaikan",
    sectionSub:
      "Top-20 per negara (April 2026). Sumber: Statista · ARD · Ipsos · Politbarometer · NOS · NL Times · Politico · Odoxa · Elabe · Le Figaro.",
    countryLabel: { DE: "Jerman", NL: "Belanda", FR: "Prancis" },
    problemLabel: "Masalah",
    proposalsLabel: "Usulan",
    shortNote: "Usulan rinci atas permintaan — atau langsung ikut membangun.",
    toComposer: "→ gunakan dalam usulan",
    hintLabel: "Kewenangan (pratinjau)",
    testBadge: "v0.4 test",
    expand: "lebih",
    collapse: "kurang",
  },
};

export function getThemenT(lang) {
  return THEMEN_UI[lang] || THEMEN_UI.en;
}
