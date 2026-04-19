// ─── Schicht B+C — Deterministic Engine + Ranking (Spec §4-5) ────────────
// classify(topic) → { primary_level, secondary_levels, competence_type, confidence, evidence, scores }

import { GG_BY_KEY } from "./data/gg.js";
import { TFEU_BY_KEY } from "./data/tfeu.js";
import { LEIKA_BY_GG_KEY } from "./data/leika.js";

// ── Level defaults per GG type (Spec §5) ─────────────────────────────────
const GG_EBENE_DEFAULT = {
  ausschliesslich_bund: "Bund",
  konkurrierend: "Bund",
  abweichungsrecht: "Bund",
  rahmen: "Bund",
  laender_ausschliesslich: "Land",
  residual: "Land",
  kommunal: "Kommune",
};

// GG type base weights (0-100) — direct legal basis
const GG_TYPE_WEIGHT = {
  ausschliesslich_bund: 75,
  konkurrierend: 45,
  abweichungsrecht: 35,
  rahmen: 30,
  laender_ausschliesslich: 55,
  kommunal: 70,
  residual: 25,
};

// TFEU type base weights (0-100) — direct legal basis
// Tuned so exclusive-Bund (75) outranks EU shared (55) + subsidiarity (~16)
const TFEU_TYPE_WEIGHT = {
  exclusive: 90,
  shared: 55,
  shared_parallel: 40,
  coordinating: 30,
  supporting: 20,
  cfsp: 40,
};

// Oates-Subsidiarität: Spillover / Skaleneffekte / Präferenzheterogenität (Spec §4.2 B)
// Per topic-domain bias (0-1). Weighted 20% of final confidence.
const SUBSIDIARITY_WEIGHT = {
  binnenmarkt:                  { EU: 1.0 },
  umwelt:                       { EU: 0.5, Bund: 0.5 },
  zollunion:                    { EU: 1.0 },
  gemeinsame_handelspolitik:    { EU: 1.0 },
  waehrungspolitik_euro:        { EU: 1.0 },
  sozialpolitik_harmonisiert:   { EU: 0.3, Bund: 0.9 },
  landwirtschaft_fischerei:     { EU: 0.8, Bund: 0.4 },
  raum_freiheit_sicherheit_recht:{ EU: 0.7, Bund: 0.7 },
  energie:                      { EU: 0.6, Bund: 0.6, Land: 0.2 },
  verkehr:                      { Bund: 0.7, Land: 0.5, Kommune: 0.3 },
  verbraucherschutz:            { EU: 0.7, Bund: 0.5 },
  kultur:                       { Land: 0.9 },
  bildung_jugend_sport:         { Land: 0.9, EU: 0.2 },
  schutz_gesundheit:            { Bund: 0.7, EU: 0.4 },
  gemeinsame_sicherheitsanliegen_gesundheit: { EU: 0.8, Bund: 0.6 },
  gasp:                         { EU: 0.8, Bund: 0.4 },
};

// ── Main API ─────────────────────────────────────────────────────────────
export function classify(topic, opts = {}) {
  if (!topic) {
    return {
      primary_level: "Land",
      secondary_levels: ["Kommune"],
      competence_type: ["residual"],
      confidence: 0.2,
      evidence: [{ source: "Art. 30 GG", label: "Residualregel: Ausübung staatlicher Befugnisse ist Sache der Länder" }],
      scores: { Bund: 10, Land: 25, Kommune: 15, EU: 0 },
      reasoning_trace: ["no topic match", "hit residual rule Art. 30 GG"],
    };
  }

  const scores = { Bund: 0, Land: 0, Kommune: 0, EU: 0 };
  const evidence = [];
  const competenceTypes = new Set();
  const reasoning = [];

  // ── 60% Rechtsgrundlagen (direct legal basis hits) ─────────────────
  for (const ggKey of topic.gg || []) {
    const g = GG_BY_KEY[ggKey];
    if (!g) continue;
    const ebene = g.ebene || GG_EBENE_DEFAULT[g.type] || "Bund";
    const weight = GG_TYPE_WEIGHT[g.type] || 30;
    scores[ebene] = (scores[ebene] || 0) + weight;

    // Vollzugsebene (Land/Kommune) bekommt Bonus, wenn Bundesgesetz von Land/Kommune ausgeführt
    if (g.vollzug && g.vollzug !== ebene) {
      const vollzugEbene = g.vollzug;
      scores[vollzugEbene] = (scores[vollzugEbene] || 0) + 30;
      competenceTypes.add("enforcement-split");
      reasoning.push(`GG ${g.key}: Rechtsgrundlage ${ebene}, Vollzug ${vollzugEbene}`);
    } else {
      reasoning.push(`GG ${g.key}: ${g.type} → ${ebene}`);
    }

    evidence.push({
      source: "gesetze-im-internet.de/gg",
      label: `${g.art} — ${g.label}`,
      weight,
    });
    competenceTypes.add(g.type);
  }

  for (const tfeuKey of topic.tfeu || []) {
    const t = TFEU_BY_KEY[tfeuKey];
    if (!t) continue;
    const weight = TFEU_TYPE_WEIGHT[t.type] || 30;
    scores.EU += weight;
    evidence.push({
      source: "EUR-Lex/TFEU",
      label: `${t.art} — ${t.label}`,
      weight,
    });
    competenceTypes.add(t.type);
    reasoning.push(`TFEU ${t.key}: ${t.type} → EU`);
  }

  // ── 20% Subsidiarity (Oates) ──────────────────────────────────────
  let subsidiarityBoost = { Bund: 0, Land: 0, Kommune: 0, EU: 0 };
  for (const tfeuKey of topic.tfeu || []) {
    const bias = SUBSIDIARITY_WEIGHT[tfeuKey];
    if (!bias) continue;
    for (const [lvl, w] of Object.entries(bias)) {
      subsidiarityBoost[lvl] += w * 20;
    }
  }
  for (const [lvl, b] of Object.entries(subsidiarityBoost)) {
    if (b > 0) {
      scores[lvl] += b;
      reasoning.push(`Subsidiarität ${lvl} +${b.toFixed(0)}`);
    }
  }

  // ── 15% Präzedenz / LeiKa ─────────────────────────────────────────
  for (const ggKey of topic.gg || []) {
    const leikaHits = LEIKA_BY_GG_KEY[ggKey] || [];
    for (const l of leikaHits) {
      const lvl = l.vollzug?.startsWith("Kommune") ? "Kommune"
                : l.vollzug?.startsWith("Land") ? "Land"
                : l.vollzug?.startsWith("Bund") ? "Bund" : null;
      if (lvl) {
        scores[lvl] += 5;
        reasoning.push(`LeiKa ${l.id} (${l.label}) → ${lvl} +5`);
      }
    }
  }

  // ── 5% Residualregel ──────────────────────────────────────────────
  const totalDirect = Object.values(scores).reduce((a, b) => a + b, 0);
  if (totalDirect < 10) {
    scores.Land += 15;
    scores.Kommune += 5;
    evidence.push({ source: "Art. 30 GG", label: "Residualregel: Länder zuständig, soweit nicht explizit Bund/EU" });
    competenceTypes.add("residual");
    reasoning.push("Residualregel Art. 30 GG angewendet");
  }

  // ── Confidence & Ranking ───────────────────────────────────────────
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = ranked[0][0];
  const secondaries = ranked.slice(1).filter(([, v]) => v >= 10).map(([k]) => k);

  const sum = Math.max(1, ranked.reduce((a, [, v]) => a + v, 0));
  const primaryShare = ranked[0][1] / sum;
  let confidence = Math.min(0.98, 0.35 + primaryShare * 0.7);
  if (ranked[0][1] < 20) confidence *= 0.6;

  // Shared competence marker
  if (ranked[0][1] > 0 && ranked[1] && ranked[1][1] >= ranked[0][1] * 0.65) {
    competenceTypes.add("shared");
  }

  return {
    primary_level: primary,
    secondary_levels: secondaries,
    competence_type: Array.from(competenceTypes),
    confidence: Number(confidence.toFixed(3)),
    evidence,
    scores,
    reasoning_trace: reasoning,
  };
}
