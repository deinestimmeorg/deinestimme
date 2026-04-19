// ─── EU-Partizipationskanäle (Spec EU_Partizipationskanaele §1-7) ────────
// EBI / PETI / CoFoE / Art. 225 AEUV
// Output: { recommended[], all[], submission_template }

export const EU_CHANNELS = {
  EBI: {
    id: "EBI",
    name: "Europäische Bürgerinitiative",
    short: "ECI",
    url: "https://europa.eu/citizens-initiative/",
    rechtsgrundlage: "Art. 11(4) EUV + VO 2019/788",
    huerde: { unterschriften: "1.000.000 in mindestens 7 EU-Staaten innerhalb 12 Monaten", min_pro_land: "Variabel (z.B. DE 67.680, FR 55.695)" },
    verbindlichkeit: "Kommission muss prüfen + öffentlich Stellung nehmen (3 Monate)",
    wirksamkeit: "Hoch — kann Gesetzgebungsverfahren auslösen",
    precedents: [
      { name: "Right2Water (2013)", outcome: "Trinkwasserrichtlinie 2020/2184" },
      { name: "Stop Vivisection (2015)", outcome: "Kommission lehnte ab, leitete Reform der Tierversuchs-RL ein" },
      { name: "Minority SafePack (2020)", outcome: "Teilweise berücksichtigt in EU-Programmen" },
      { name: "End the Cage Age (2020)", outcome: "Kommission kündigte Gesetzesvorschlag 2023 an" },
    ],
  },
  PETI: {
    id: "PETI",
    name: "Petition an das Europäische Parlament",
    short: "Petition EP",
    url: "https://petiport.secure.europarl.europa.eu/petitions/",
    rechtsgrundlage: "Art. 24 + 227 AEUV",
    huerde: { unterschriften: "Eine einzelne Person reicht aus", min_pro_land: "Keine" },
    verbindlichkeit: "Wird im PETI-Ausschuss behandelt; kann Anhörungen, Resolutionen, Klagen anstoßen",
    wirksamkeit: "Mittel — Sichtbarkeit + politischer Druck, keine direkte Gesetzespflicht",
    precedents: [
      { name: "Glyphosat-Petitionen", outcome: "Mit-anstoß für Verbotsdebatte" },
      { name: "Diesel-Skandal Petitionen", outcome: "Untersuchungsausschuss EMIS" },
    ],
  },
  COFOE: {
    id: "COFOE",
    name: "Konferenz zur Zukunft Europas / Folgeprozesse",
    short: "CoFoE",
    url: "https://futureu.europa.eu/",
    rechtsgrundlage: "Politisches Mandat EP/Rat/Kommission 2021-22 + Folgeinitiativen",
    huerde: { unterschriften: "Keine — Vorschläge können einzeln eingereicht werden", min_pro_land: "Keine" },
    verbindlichkeit: "Niedrig — politische Selbstverpflichtung, keine Rechtsfolge",
    wirksamkeit: "Niedrig-Mittel — Beteiligungsplattform, hängt von politischem Aufgreifen ab",
    precedents: [
      { name: "CoFoE Final Report (2022)", outcome: "49 Vorschläge, teilweise in Kommissions-Arbeitsprogramm aufgenommen" },
    ],
  },
  ART_225: {
    id: "ART_225",
    name: "Initiativrecht des Europäischen Parlaments",
    short: "Art. 225 AEUV",
    url: "https://www.europarl.europa.eu/",
    rechtsgrundlage: "Art. 225 AEUV",
    huerde: { unterschriften: "EP-Mehrheit erforderlich (kein Bürger-Kanal)", min_pro_land: "n/a" },
    verbindlichkeit: "Kommission muss tätig werden ODER Begründung für Untätigkeit vorlegen",
    wirksamkeit: "Hoch — quasi-Initiativrecht des Parlaments",
    precedents: [
      { name: "Right to disconnect (2021)", outcome: "Kommission angekündigt zu handeln" },
    ],
  },
};

// ── Channel-Routing nach Verdict ─────────────────────────────────────────
export function routeEU(classification, opts = {}) {
  const { primary_level, competence_type, scores } = classification;

  // Nur empfehlen, wenn EU eine Rolle spielt
  if (primary_level !== "EU" && (scores?.EU || 0) < 25) {
    return null;
  }

  const isExclusive = (competence_type || []).includes("exclusive");
  const isShared    = (competence_type || []).includes("shared");
  const isSupporting= (competence_type || []).includes("supporting");

  const ranked = Object.values(EU_CHANNELS).map(c => {
    let fit = 0.5;
    if (c.id === "EBI") {
      fit = isExclusive ? 0.95 : isShared ? 0.85 : 0.6;
    } else if (c.id === "PETI") {
      fit = 0.7; // niedrige Hürde, immer einsetzbar
    } else if (c.id === "COFOE") {
      fit = isSupporting ? 0.65 : 0.4;
    } else if (c.id === "ART_225") {
      fit = 0.55; // nicht direkt für Bürger
    }
    return { ...c, fit_score: Number(fit.toFixed(2)) };
  }).sort((a, b) => b.fit_score - a.fit_score);

  return {
    recommended: ranked.slice(0, 2),
    all: ranked,
  };
}

// ── Submission template ──────────────────────────────────────────────────
export function buildSubmissionTemplate(query, classification, channels) {
  if (!channels?.recommended?.length) return null;
  const top = channels.recommended[0];
  const evidenceLines = (classification.evidence || []).slice(0, 3)
    .map(e => `  • ${e.label} (${e.source})`).join("\n");

  return `# Vorab-Einreichung: ${top.name}

## Anliegen
${query}

## Rechtsgrundlage (EU)
${evidenceLines || "  • Siehe Begründung unten"}

## Zuständigkeit
Primär: ${classification.primary_level}
Geteilt mit: ${(classification.secondary_levels || []).join(", ") || "—"}
Kompetenztyp: ${(classification.competence_type || []).join(", ")}
Confidence: ${(classification.confidence * 100).toFixed(0)}%

## Begründung
${classification.explanation || classification.reasoning_trace?.[0] || ""}

## Einreichungs-Hürde
${top.huerde.unterschriften} — ${top.huerde.min_pro_land}

## Präzedenzfälle
${top.precedents.map(p => `  • ${p.name}: ${p.outcome}`).join("\n")}

## Nächste Schritte
1. Vorbereiten: Organisator/in registrieren auf ${top.url}
2. Unterschriftensammlung starten
3. Kommission/EP einreichen → öffentliche Anhörung
`;
}
