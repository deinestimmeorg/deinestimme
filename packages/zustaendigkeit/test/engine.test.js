// ─── Benchmark Suite (Spec §8 Phase-1 Gold Set) ──────────────────────────
import { test } from "node:test";
import assert from "node:assert/strict";
import { findZustaendigkeit, normalize, classify } from "../src/index.js";

// ── 1. Smoke: exact alias resolves ───────────────────────────────────────
test("normalize: exact alias 'strompreise' → topic strompreise", () => {
  const r = normalize("Strompreise");
  assert.equal(r.topic?.id, "strompreise");
  assert.equal(r.match_type, "alias_exact");
});

// ── 2. Typo tolerated ────────────────────────────────────────────────────
test("normalize: typo 'hundesteuer' variations", () => {
  const r = normalize("hundesteur");
  assert.ok(r.topic, "should still resolve on 1-char typo");
});

// ── 3. Unknown falls through ─────────────────────────────────────────────
test("normalize: unknown noun has no match", () => {
  const r = normalize("xyzabc123");
  assert.equal(r.topic, null);
});

// ── 4. classify(null) triggers residual ──────────────────────────────────
test("classify(null) → Art. 30 GG residual", () => {
  const r = classify(null);
  assert.equal(r.primary_level, "Land");
  assert.ok(r.competence_type.includes("residual"));
});

// ── 5. Confidence in range ──────────────────────────────────────────────
test("confidence always in [0,1]", async () => {
  for (const q of ["strompreise", "schule", "datenschutz", "klimaschutz", "xxx"]) {
    const r = await findZustaendigkeit(q);
    assert.ok(r.confidence >= 0 && r.confidence <= 1, `bad conf for ${q}`);
  }
});

// ── 6. EU channels appear when EU is primary ─────────────────────────────
test("EU channels recommended for EU-primary queries", async () => {
  const r = await findZustaendigkeit("Zoll");
  assert.equal(r.primary_level, "EU");
  assert.ok(r.eu_channels?.recommended?.length > 0);
  assert.ok(r.eu_submission_template);
});

// ── 7. Evidence attached ─────────────────────────────────────────────────
test("evidence array is always populated", async () => {
  const r = await findZustaendigkeit("Mindestlohn");
  assert.ok(Array.isArray(r.evidence));
  assert.ok(r.evidence.length > 0);
});

// ── 8. Secondary levels listed ──────────────────────────────────────────
test("shared competence produces secondary levels", async () => {
  const r = await findZustaendigkeit("Umweltschutz");
  assert.ok(Array.isArray(r.secondary_levels));
});

// ── 9. Output format matches spec §6 ─────────────────────────────────────
test("output shape matches spec §6", async () => {
  const r = await findZustaendigkeit("Datenschutz");
  for (const k of ["input", "primary_level", "secondary_levels", "competence_type",
                   "confidence", "evidence", "explanation", "reasoning_trace"]) {
    assert.ok(k in r, `missing key: ${k}`);
  }
});

// ── 10. Reasoning trace has entries ─────────────────────────────────────
test("reasoning_trace populated", async () => {
  const r = await findZustaendigkeit("Schule");
  assert.ok(Array.isArray(r.reasoning_trace));
  assert.ok(r.reasoning_trace.length > 0);
});

// ── 11. GOLDEN BENCHMARK — 27 cases ─────────────────────────────────────
const GOLDEN = [
  // EU exclusive
  { q: "Zoll", primary: "EU" },
  { q: "Zollunion", primary: "EU" },
  { q: "Handelspolitik", primary: "EU" },
  { q: "Euro", primary: "EU" },
  { q: "Währung", primary: "EU" },

  // EU shared / strong EU
  { q: "Datenschutz", primary: ["EU", "Bund"] },
  { q: "KI-Regulierung", primary: "EU" },
  { q: "Strompreise", primary: ["EU", "Bund"] },
  { q: "Binnenmarkt", primary: "EU" },

  // Bund ausschließlich
  { q: "Reisepass", primary: "Bund" },
  { q: "Passwesen", primary: "Bund" },
  { q: "Personalausweis", primary: "Bund" },
  { q: "Kernenergie", primary: "Bund" },
  { q: "Waffenrecht", primary: "Bund" },
  { q: "Bundeswehr", primary: "Bund" },
  { q: "Telekommunikation", primary: ["Bund", "EU"] },

  // Konkurrierend Bund
  { q: "Asyl", primary: ["Bund", "EU"] },
  { q: "Mindestlohn", primary: "Bund" },
  { q: "Bürgergeld", primary: "Bund" },
  { q: "Mietpreisbremse", primary: "Bund" },

  // Land
  { q: "Schule", primary: "Land" },
  { q: "Schulpflicht", primary: "Land" },
  { q: "Polizei", primary: "Land" },
  { q: "Rundfunkbeitrag", primary: "Land" },

  // Kommunal
  { q: "Hundesteuer", primary: "Kommune" },
  { q: "Spielplätze", primary: "Kommune" },
  { q: "Müll", primary: "Kommune" },
];

test("golden benchmark 27/27", async () => {
  let pass = 0, fail = [];
  for (const c of GOLDEN) {
    const r = await findZustaendigkeit(c.q);
    const expected = Array.isArray(c.primary) ? c.primary : [c.primary];
    if (expected.includes(r.primary_level)) pass++;
    else fail.push(`${c.q}: got ${r.primary_level}, expected ${expected.join("|")} (scores: ${JSON.stringify(r.scores)})`);
  }
  assert.equal(pass, GOLDEN.length, `${fail.length} failed:\n${fail.join("\n")}`);
});
