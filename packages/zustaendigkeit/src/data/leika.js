// ─── LeiKa / FIM — Leistungs-Typisierung (Spec v0.3 §2) ──────────────────
// Typisierung 1-5 nach LeiKa/XZuFi-Dokumentation (FITKO)

export const LEIKA_TYPES = {
  1: { code: 1, label: "Vollzug durch Bund — Rechtsgrundlage Bund" },
  2: { code: 2, label: "Vollzug durch Land — Rechtsgrundlage Bund" },
  3: { code: 3, label: "Vollzug durch Land — Rechtsgrundlage Land" },
  4: { code: 4, label: "Vollzug durch Kommune — Rechtsgrundlage Bund" },
  5: { code: 5, label: "Vollzug durch Kommune — Rechtsgrundlage Kommune" },
};

// Kuratiertes Seed-Set. Phase-2 lädt den vollen FIM/LeiKa-Export (~6000 Leistungen).
export const LEIKA_SEED = [
  { id: "99010", label: "Reisepass beantragen", type: 4, rechtsgrundlage: "PassG (Bund)", vollzug: "Kommune", gg: "freizuegigkeit" },
  { id: "99011", label: "Personalausweis beantragen", type: 4, rechtsgrundlage: "PAuswG (Bund)", vollzug: "Kommune", gg: "freizuegigkeit" },
  { id: "99012", label: "Meldebestätigung", type: 4, rechtsgrundlage: "BMG (Bund)", vollzug: "Kommune", gg: "meldewesen" },
  { id: "99013", label: "Ummeldung Wohnsitz", type: 4, rechtsgrundlage: "BMG (Bund)", vollzug: "Kommune", gg: "meldewesen" },
  { id: "99020", label: "Aufenthaltserlaubnis", type: 2, rechtsgrundlage: "AufenthG (Bund)", vollzug: "Land", gg: "auslaenderrecht" },
  { id: "99021", label: "Niederlassungserlaubnis", type: 2, rechtsgrundlage: "AufenthG (Bund)", vollzug: "Land", gg: "auslaenderrecht" },
  { id: "99030", label: "Kita-Platz / Kindergarten", type: 4, rechtsgrundlage: "SGB VIII (Bund)", vollzug: "Kommune", gg: "kita_traeger" },
  { id: "99031", label: "Schulanmeldung", type: 3, rechtsgrundlage: "Schulgesetz (Land)", vollzug: "Land", gg: "schulwesen" },
  { id: "99032", label: "Schulpflicht", type: 3, rechtsgrundlage: "Schulgesetz (Land)", vollzug: "Land", gg: "schulwesen" },
  { id: "99040", label: "Hundesteuer anmelden", type: 5, rechtsgrundlage: "Hundesteuersatzung (Kommune)", vollzug: "Kommune", gg: "kommunale_steuern" },
  { id: "99041", label: "Gewerbesteuer", type: 4, rechtsgrundlage: "GewStG (Bund) + Hebesatz (Kommune)", vollzug: "Kommune", gg: "kommunale_steuern" },
  { id: "99042", label: "Grundsteuer", type: 4, rechtsgrundlage: "GrStG (Bund) + Hebesatz (Kommune)", vollzug: "Kommune", gg: "kommunale_steuern" },
  { id: "99050", label: "Baugenehmigung", type: 3, rechtsgrundlage: "LBO (Land) + BauGB (Bund)", vollzug: "Land", gg: "kommunale_bauleitplanung" },
  { id: "99051", label: "Bebauungsplan", type: 5, rechtsgrundlage: "BauGB + kommunale Satzung", vollzug: "Kommune", gg: "kommunale_bauleitplanung" },
  { id: "99060", label: "Führerschein", type: 2, rechtsgrundlage: "StVG + FeV (Bund)", vollzug: "Land", gg: "strassenverkehr" },
  { id: "99061", label: "Kfz-Zulassung", type: 2, rechtsgrundlage: "StVG (Bund)", vollzug: "Land", gg: "strassenverkehr" },
  { id: "99070", label: "Gewerbeanmeldung", type: 4, rechtsgrundlage: "GewO (Bund)", vollzug: "Kommune", gg: "recht_der_wirtschaft" },
  { id: "99071", label: "Handwerkskarte", type: 2, rechtsgrundlage: "HwO (Bund)", vollzug: "Land", gg: "recht_der_wirtschaft" },
  { id: "99080", label: "Arbeitslosengeld I", type: 1, rechtsgrundlage: "SGB III (Bund)", vollzug: "Bund (BA)", gg: "arbeitsrecht" },
  { id: "99081", label: "Bürgergeld (ALG II)", type: 4, rechtsgrundlage: "SGB II (Bund)", vollzug: "Kommune (Jobcenter)", gg: "arbeitsrecht" },
  { id: "99082", label: "Sozialhilfe", type: 4, rechtsgrundlage: "SGB XII (Bund)", vollzug: "Kommune", gg: "sozialhilfe" },
  { id: "99090", label: "Krankenversicherung (gesetzlich)", type: 1, rechtsgrundlage: "SGB V (Bund)", vollzug: "Bund/Selbstverwaltung", gg: "arbeitsrecht" },
  { id: "99091", label: "Pflegeversicherung", type: 1, rechtsgrundlage: "SGB XI (Bund)", vollzug: "Bund/Selbstverwaltung", gg: "arbeitsrecht" },
  { id: "99100", label: "Eheschließung / Standesamt", type: 4, rechtsgrundlage: "PStG (Bund)", vollzug: "Kommune", gg: "personenstand" },
  { id: "99101", label: "Geburtsurkunde", type: 4, rechtsgrundlage: "PStG (Bund)", vollzug: "Kommune", gg: "personenstand" },
  { id: "99110", label: "Asylverfahren", type: 1, rechtsgrundlage: "AsylG (Bund)", vollzug: "Bund (BAMF)", gg: "auslaenderrecht" },
  { id: "99111", label: "Einbürgerung", type: 2, rechtsgrundlage: "StAG (Bund)", vollzug: "Land", gg: "staatsangehoerigkeit" },
  { id: "99120", label: "Jagdschein", type: 3, rechtsgrundlage: "BJagdG + Landesjagdgesetz", vollzug: "Land", gg: "jagdwesen" },
  { id: "99121", label: "Fischereischein", type: 3, rechtsgrundlage: "Landesfischereigesetz", vollzug: "Land", gg: "kulturhoheit" },
  { id: "99130", label: "Müllabfuhr / Abfallentsorgung (operativ)", type: 5, rechtsgrundlage: "Abfallsatzung (Kommune) + KrWG", vollzug: "Kommune", gg: "abfallentsorgung_komm" },
  { id: "99131", label: "Straßenreinigung", type: 5, rechtsgrundlage: "Kommunale Satzung", vollzug: "Kommune", gg: "strassenreinigung" },
  { id: "99132", label: "Feuerwehr / Brandschutz", type: 3, rechtsgrundlage: "Landesbrandschutzgesetz", vollzug: "Land/Kommune", gg: "feuerwehr" },
  { id: "99140", label: "Spielplätze (Bau/Pflege)", type: 5, rechtsgrundlage: "Kommunale Grünflächensatzung", vollzug: "Kommune", gg: "spielplaetze" },
  { id: "99150", label: "Versammlungsanzeige", type: 3, rechtsgrundlage: "Landesversammlungsgesetz", vollzug: "Land", gg: "versammlungsrecht" },
  { id: "99160", label: "Polizeiliche Anzeige", type: 3, rechtsgrundlage: "PolG (Land)", vollzug: "Land", gg: "polizeirecht" },
  { id: "99170", label: "BAföG-Antrag", type: 4, rechtsgrundlage: "BAföG (Bund)", vollzug: "Kommune/Land", gg: "ausbildungsbeihilfen" },
  { id: "99180", label: "Kindergeld", type: 1, rechtsgrundlage: "EStG/BKGG (Bund)", vollzug: "Bund (Familienkasse)", gg: "arbeitsrecht" },
  { id: "99190", label: "Rundfunkbeitrag", type: 3, rechtsgrundlage: "Rundfunkstaatsvertrag (Land)", vollzug: "Land", gg: "rundfunk" },
  { id: "99200", label: "Datenschutzbeschwerde", type: 1, rechtsgrundlage: "DSGVO (EU) + BDSG (Bund)", vollzug: "Land (LfD)", gg: "gewerblicher_rechtsschutz" },
];

export const LEIKA_BY_GG_KEY = LEIKA_SEED.reduce((acc, l) => {
  if (!l.gg) return acc;
  (acc[l.gg] ||= []).push(l);
  return acc;
}, {});
