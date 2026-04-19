// ─── Public API — Spec §9 / v0.5 §9 ──────────────────────────────────────
// findZustaendigkeit(query, opts) → structured result
//
// v0.5 additions (backward compatible — alle v0.4-Felder bleiben):
//   sub_adapter_id        — asymmetrischer Sub-Adapter (Paris/Lyon/Corse/Art73/Art74,
//                           Statuto-Speciale Sicilia/Sardegna/…)
//   statuto_speciale      — Boolean: IT-Sonderautonomie
//   epci_class            — "CC" | "CA" | "CU" | "MET" | null (FR)
//   art73_74_regime       — "art73" | "art74" | null (FR Outre-mer)
//   override_register_version — "0.5" (7 Stufen)
//
// opts (neu in v0.5):
//   country       — "DE" | "NL" | "EU" | "FR" | "IT"
//   territorium   — optional: Territorium für Sub-Adapter-Auswahl
//                   (z.B. "Paris", "Sardegna", "Guadeloupe")
//   level         — optional: territoriale Ebene
//   epci_class    — optional: "CC"|"CA"|"CU"|"MET" für FR-EPCI
//   sector        — optional: Sektor-Hinweis für Prozeduralpfad

import { normalize } from "./normalize.js";
import { classify } from "./rules.js";
import { routeEU, buildSubmissionTemplate } from "./eu-channels.js";
import { TOPICS } from "./data/topics.js";
import { applyOverrides, OVERRIDE_STUFEN, OVERRIDE_VERSION } from "./overrides.js";
import { categorize, indicativeAuthority, CATEGORY, CATEGORY_LABELS } from "./categories.js";
import { DE_ADAPTER } from "./adapters/DE.js";
import { NL_ADAPTER } from "./adapters/NL.js";
import { EU_ADAPTER } from "./adapters/EU.js";
import { FR_ADAPTER } from "./adapters/FR.js";
import { IT_ADAPTER } from "./adapters/IT.js";

export { TOPICS };
export { normalize } from "./normalize.js";
export { classify } from "./rules.js";
export { EU_CHANNELS, routeEU, buildSubmissionTemplate } from "./eu-channels.js";
export { OVERRIDE_STUFEN, OVERRIDE_VERSION, applyOverrides } from "./overrides.js";
export { CATEGORY, CATEGORY_LABELS, categorize, indicativeAuthority } from "./categories.js";
export { DE_ADAPTER } from "./adapters/DE.js";
export { NL_ADAPTER } from "./adapters/NL.js";
export { EU_ADAPTER } from "./adapters/EU.js";
export { FR_ADAPTER, FR_BLOCS, FR_EPCI_CLASSES, FR_SUB_ADAPTERS, selectFRSubAdapter } from "./adapters/FR.js";
export { IT_ADAPTER, IT_COMPETENZE, IT_MATERIE_TRASVERSALI, IT_STATUTO_SPECIALE, selectITSubAdapter, detectMateriaTrasversale } from "./adapters/IT.js";

const ADAPTERS = {
  DE: DE_ADAPTER,
  NL: NL_ADAPTER,
  EU: EU_ADAPTER,
  FR: FR_ADAPTER,
  IT: IT_ADAPTER,
};

export async function findZustaendigkeit(query, opts = {}) {
  const country = opts.country || "DE";
  const adapter = ADAPTERS[country] || DE_ADAPTER;
  const territorium = opts.territorium || null;
  const level = opts.level || null;
  const epci_class = opts.epci_class || null;
  const sector = opts.sector || null;

  const norm = normalize(query);
  const cls = classify(norm.topic, opts);

  // Build human explanation
  const levelLabel = (lvl) => ({
    EU: "EU", Bund: "Bund", Land: "Land", Kommune: "Kommune",
  })[lvl] || lvl;

  const confPct = Math.round(cls.confidence * 100);
  const secondariesStr = (cls.secondary_levels || []).slice(0, 3).map(levelLabel).join(", ");
  const explanation = secondariesStr
    ? `Primär ${levelLabel(cls.primary_level)} (${confPct}%). Geteilt mit ${secondariesStr}.`
    : `Primär ${levelLabel(cls.primary_level)} (${confPct}%).`;

  // EU channel routing (unchanged)
  const euChannels = routeEU(cls);
  const submissionTemplate = euChannels
    ? buildSubmissionTemplate(query, { ...cls, explanation }, euChannels)
    : null;

  // Alternatives — topics with overlap
  const alternatives = norm.topic
    ? TOPICS
        .filter(t => t.id !== norm.topic.id &&
                     (t.gg || []).some(g => (norm.topic.gg || []).includes(g)))
        .slice(0, 3)
        .map(t => ({ id: t.id, label: t.de_label }))
    : [];

  // ── v0.5: Sub-adapter resolution (before override application) ──
  let sub_adapter_id = null;
  let statuto_speciale = false;
  let epci_class_out = null;
  let art73_74_regime = null;

  if (country === "FR" && typeof adapter.selectSubAdapter === "function") {
    const sel = adapter.selectSubAdapter(territorium, level, epci_class);
    sub_adapter_id = sel.sub_adapter_id;
    epci_class_out = sel.epci_class;
    art73_74_regime = sel.art73_74_regime;
  } else if (country === "IT" && typeof adapter.selectSubAdapter === "function") {
    const sel = adapter.selectSubAdapter(territorium);
    sub_adapter_id = sel.sub_adapter_id;
    statuto_speciale = sel.statuto_speciale;
  }

  // ── v0.5 override application (passes query + tags for Stufe 3) ──
  const { override_applied } = applyOverrides(cls, {
    country,
    hasAdapter: adapter.hasAdapter,
    topicId: norm.topic?.id,
    topicTags: norm.topic ? [norm.topic.id, norm.topic.de_label] : [],
    queryText: query,
  });

  // ── IT: if no override yet but materia trasversale detected → Stufe 3 ──
  let finalOverride = override_applied;
  if (!finalOverride && country === "IT" && typeof adapter.detectMateriaTrasversale === "function") {
    const mt = adapter.detectMateriaTrasversale(
      (query || "") + " " + (norm.topic?.de_label || "")
    );
    if (mt) {
      finalOverride = {
        stufe: 3,
        key: "transversale_durchbruchskompetenz",
        label_de: "Transversale nationale Durchbruchskompetenz",
        reason: `IT ${mt.label} (${mt.basis})`,
      };
    }
  }

  const category = categorize(cls, finalOverride);

  // Authorities: primary first, then secondaries (capped at 4).
  // v0.5: adapters provide their own indicativeAuthority() where present.
  const indicativeFn = typeof adapter.indicativeAuthority === "function"
    ? adapter.indicativeAuthority
    : (lvl) => indicativeAuthority(lvl, country);

  const authorities = cls.primary_level
    ? [
        {
          level: cls.primary_level,
          label: indicativeFn(cls.primary_level),
          role: "primary",
          sub_adapter_id,
          statuto_speciale,
          epci_class: epci_class_out,
          art73_74_regime,
        },
        ...(cls.secondary_levels || []).slice(0, 3).map((lvl) => ({
          level: lvl,
          label: indicativeFn(lvl),
          role: "secondary",
          sub_adapter_id: null,
          statuto_speciale: false,
          epci_class: null,
          art73_74_regime: null,
        })),
      ]
    : [];

  // Procedural path (Layer D)
  let procedural_path = null;
  if (typeof adapter.proceduralHint === "function") {
    // NL / FR / IT / EU adapters: pass territorium + sector where applicable
    if (country === "NL") {
      procedural_path = adapter.proceduralHint();
    } else if (country === "EU") {
      const s = sector || (norm.topic?.id === "datenschutz" ? "data_protection" : null);
      procedural_path = adapter.proceduralHint(s);
    } else if (country === "FR") {
      procedural_path = adapter.proceduralHint(territorium);
    } else if (country === "IT") {
      procedural_path = adapter.proceduralHint(territorium, sector);
    }
  }
  if (!procedural_path && finalOverride?.stufe === 6) {
    procedural_path = {
      layer_d: "Weiterleitung",
      deadlines: ["Unverzügliche Weiterleitung an zuständige Behörde"],
      forwarding_duty: { basis: "§ 3 Abs. 2 VwVfG (DE) / Awb 2:3 (NL) / CRPA L.114-2 (FR)" },
    };
  }

  return {
    input: query,
    country,
    primary_level: cls.primary_level,
    secondary_levels: cls.secondary_levels,
    competence_type: cls.competence_type,
    confidence: cls.confidence,
    evidence: cls.evidence,
    explanation,
    reasoning_trace: cls.reasoning_trace,
    scores: cls.scores,
    topic: norm.topic ? {
      id: norm.topic.id,
      label: norm.topic.de_label,
      label_de: norm.topic.de_label,
      label_en: norm.topic.en_label,
      match_type: norm.match_type,
      match_score: norm.match_score,
    } : null,
    alternatives,
    eu_channels: euChannels,
    eu_submission_template: submissionTemplate,
    // v0.4 fields
    category,
    override_applied: finalOverride,
    authorities,
    procedural_path,
    adapter: { country: adapter.country, hasAdapter: adapter.hasAdapter },
    // v0.5 fields
    sub_adapter_id,
    statuto_speciale,
    epci_class: epci_class_out,
    art73_74_regime,
    override_register_version: OVERRIDE_VERSION,
  };
}
