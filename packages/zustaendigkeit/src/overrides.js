// ─── Override-Register — Spec v0.5 §2.1 ──────────────────────────────────
// 7-Stufen-Prioritätsordnung (Breaking Change ggü. v0.4).
// Härtere Stufe schlägt weichere — auch gegen Confidence-Score
// (Stufen 1–3 dürfen nie überstimmt werden).
//
// Migration v0.4 → v0.5: Neue Stufe 3 „Transversale Durchbruchskompetenz"
// drückt die bisherigen Stufen 3–6 um einen Platz nach unten (4–7).
// Rechtfertigung: IT materie trasversali (Umwelt/Wettbewerb/LEP),
// DE Art. 84/85 GG Bundesaufsicht, NL medebewind, FR intérêt national
// via Conseil-constitutionnel- / Conseil-d'État-Judikatur.
//
// Wird in Schicht D (Prozeduralpfad) eingespielt, NICHT in Schicht A/B/C,
// damit die Topic-Normalisierung und Confidence-Berechnung unverändert
// bleiben. Die Kategorisierung (4-Kategorien-Output) konsultiert diese
// Tabelle als letzte Station vor der Rückgabe.

export const OVERRIDE_STUFEN = [
  {
    stufe: 1,
    key: "unionsrecht_exklusiv",
    label_de: "Unionsrechtliche Exklusivkompetenz",
    label_en: "EU exclusive competence",
    // Triggers: Zoll, Wettbewerbsrecht bei Unionsdimension, Handelspolitik,
    // Währungspolitik Euro-Mitgliedstaaten, Meeresfischerei, etc.
    basis: ["Art. 3 AEUV"],
    beispiele: ["Zollunion", "Wettbewerbsrecht mit Unionsdimension", "Handelspolitik", "Euro-Währungspolitik"],
    effect: "override_primary",
    effect_note: "Primärlevel → EU, unabhängig von nationalem Zuschnitt.",
  },
  {
    stufe: 2,
    key: "eu_sektoral_spezial",
    label_de: "Sektoraler EU-Sonderrahmen",
    label_en: "Sectoral EU regime",
    basis: ["DSGVO Art. 56/60/65", "VO 1/2003 Art. 11", "IMI-VO 1024/2012"],
    beispiele: ["DSGVO one-stop-shop", "ECN-Fallzuweisung", "IMI-Verfahren", "EBA/ESMA-Koordination"],
    effect: "procedural_override",
    effect_note: "Nationale Zuständigkeit bleibt, aber Verfahrenspfad wird sektoral bestimmt.",
  },
  {
    stufe: 3,
    key: "transversale_durchbruchskompetenz",
    label_de: "Transversale nationale Durchbruchskompetenz",
    label_en: "Transversal national breakthrough competence",
    // v0.5 NEW: finalistische Querschnittsziele, die regionale/lokale
    // Exklusivität durchbrechen. Cross-adapter Pattern.
    basis: [
      "IT: Art. 117 Abs. 2 lit. s/e/m Cost. (Umwelt, Wettbewerb, LEP)",
      "DE: Art. 84/85 GG (Bundesaufsicht)",
      "NL: medebewind",
      "FR: intérêt national (CE French Data Network 2021)",
    ],
    beispiele: [
      "IT Regione erlässt Tourismusgesetz → Staat interveniert über Umweltschutz",
      "DE Land führt Bundesgesetz aus → Bundesaufsicht Art. 84 Abs. 3 GG",
      "FR Sicherheitsthema → Arcelor-/French-Data-Network-Prüfung verdrängt EU-Zugriff",
    ],
    effect: "breakthrough",
    effect_note: "Zentralstaatliche Kompetenz durchschneidet regionale/lokale Exklusivität transversal.",
  },
  {
    stufe: 4,
    key: "nationale_spezialnorm",
    label_de: "Nationale Spezialnorm",
    label_en: "National special provision",
    basis: [
      "DE: GG Art. 70–75",
      "NL: Kaderwet zbo / Awb",
      "FR: régalienne Kompetenzen",
      "IT: enumerative Materien Art. 117 Abs. 2 Cost.",
    ],
    beispiele: [
      "Art. 73 GG (ausschl. Bundeskompetenz)",
      "Art. 1:1 Awb (bestuursorgaan)",
      "Art. L.1111-1 CGCT (collectivités territoriales)",
      "Art. 117 Abs. 2 Cost. lit. a–r",
    ],
    effect: "confirm_or_adjust",
    effect_note: "Bestätigt oder justiert die aus der Topic-Normalisierung abgeleitete Ebene.",
  },
  {
    stufe: 5,
    key: "delegation_mandat_attribution",
    label_de: "Delegation / Mandat / Attribution",
    label_en: "Delegation / mandate / attribution",
    basis: ["Titel 10.1 Awb (NL)", "Art. 80 GG", "Ordonnance (FR)", "Norme di attuazione (IT)"],
    beispiele: [
      "Mandat (NL Art. 10:1 Awb) — Entscheidung im Namen des delegierenden Organs",
      "Delegation (NL Art. 10:13 Awb) — eigenständige Ausübung",
      "Attribution — originäre gesetzliche Zuweisung",
      "Konvention zwischen Métropole und Département (FR)",
    ],
    effect: "trace_chain",
    effect_note: "Verweist auf die originäre Organisationseinheit; ggf. Ungültigkeit bei fehlender Rechtsgrundlage (ECLI:NL:RVS:2025:6150).",
  },
  {
    stufe: 6,
    key: "weiterleitungspflicht",
    label_de: "Weiterleitungspflicht",
    label_en: "Forwarding duty",
    basis: ["Art. 2:3/6:15 Awb (NL)", "§ 3 Abs. 2 VwVfG (DE)", "Art. L.114-2 CRPA (FR)"],
    beispiele: [
      "Unzuständige Behörde muss Antrag an zuständige weiterleiten (NL: 2 Wochen).",
      "Beschwerde bei unzuständiger Stelle → automatische Weiterleitung.",
    ],
    effect: "procedural_path",
    effect_note: "Output-Kategorie: formell_unzustaendig_weiterleitungspflichtig.",
  },
  {
    stufe: 7,
    key: "gerichtspfad",
    label_de: "Gerichtspfad",
    label_en: "Court path",
    basis: [
      "Art. 267 AEUV",
      "Awb Hoofdstuk 8 (NL)",
      "Art. 19 IV GG (DE)",
      "Controlimiti + Sent. 269/2017 (IT)",
      "Arcelor-équivalence (FR)",
    ],
    beispiele: [
      "Vorabentscheidungsverfahren Art. 267 AEUV",
      "Beroep bij de bestuursrechter (NL)",
      "Verwaltungsgerichtlicher Rechtsweg (DE)",
      "Doppelte Präjudizialität IT (Corte Cost. 269/2017)",
    ],
    effect: "escalation",
    effect_note: "Output-Kategorie: rechtlich_ungeklaert_eskalationsbedarf.",
  },
];

// Map: stufe number → entry
export const OVERRIDE_BY_STUFE = Object.fromEntries(
  OVERRIDE_STUFEN.map((s) => [s.stufe, s])
);

// Key-list for external callers doing schema migration checks.
export const OVERRIDE_VERSION = "0.5";

// Apply override heuristics to a classification result.
// Returns { override_applied: null | { stufe, key, label_de }, adjusted: partial-cls }
// Conservative: applies only high-confidence triggers — the heavy lifting
// stays with the country/sub adapters.
//
// Stufe 1: explicit EU exclusive via competence_type
// Stufe 2: sector-specific EU regime (DSGVO heuristic)
// Stufe 3 (NEW v0.5): transversal breakthrough trigger
//   - IT: materie trasversali keywords in evidence/topic
//   - DE: Bundesaufsicht Art. 84/85 topics
//   - FR: national-security / intérieur topics
//   - NL: medebewind topics
// Stufe 6: country-context mismatch with engine base language (forwarding)
export function applyOverrides(cls, opts = {}) {
  if (!cls) return { override_applied: null, cls };

  const country = opts.country || "DE";
  const topicId = opts.topicId || cls.topic_id;
  const evidenceBlob = JSON.stringify(cls.evidence || {});
  const topicBlob = JSON.stringify(opts.topicTags || [])
    + " " + (opts.queryText || "");

  // Stufe 1: EU exclusive via competence_type
  if (cls.competence_type === "exclusive" && cls.primary_level === "EU") {
    return mkOverride(1);
  }

  // Stufe 2: sektorales EU-Regime — heuristic via topic id or evidence
  if (topicId === "datenschutz" || /(DSGVO|GDPR)/i.test(evidenceBlob)) {
    return mkOverride(2);
  }

  // Stufe 3 (v0.5 NEW): transversale Durchbruchskompetenz
  if (country === "IT") {
    // Umwelt / Wettbewerb / LEP trasversale
    if (/(umwelt|ambiente|wettbewerb|concorrenza|lep|essenzial)/i.test(topicBlob)
        || topicId === "umweltschutz" || topicId === "wettbewerb") {
      return mkOverride(3, { reason: "IT materie trasversali (Art. 117 lit. s/e/m Cost.)" });
    }
  }
  if (country === "DE") {
    // Bundesaufsicht trigger — conservative: only explicit mention of "Bundesaufsicht"
    if (/bundesaufsicht/i.test(topicBlob) || /Art\.\s*8[45]/.test(topicBlob)) {
      return mkOverride(3, { reason: "DE Art. 84/85 GG Bundesaufsicht" });
    }
  }
  if (country === "FR") {
    // intérêt national / national-security trigger
    if (/(sicherheit|sécurité|s[eé]curit[eé]|terroris|nachrichtendienst|renseignement|surveillance)/i.test(topicBlob)) {
      return mkOverride(3, { reason: "FR intérêt national (Arcelor / French Data Network)" });
    }
  }
  if (country === "NL") {
    // medebewind trigger
    if (/medebewind/i.test(topicBlob)) {
      return mkOverride(3, { reason: "NL medebewind" });
    }
  }

  // Stufe 6: Country context mismatch with DE classifier — forwarding duty
  if (opts.country && opts.country !== "DE" && !opts.hasAdapter) {
    return mkOverride(6);
  }

  return { override_applied: null, cls };
}

function mkOverride(stufe, extra = {}) {
  const entry = OVERRIDE_BY_STUFE[stufe];
  return {
    override_applied: {
      stufe,
      key: entry.key,
      label_de: entry.label_de,
      ...extra,
    },
  };
}
