// ─── Schicht A — Normalisierung (Spec §3) ────────────────────────────────
// Freitext → kontrolliertes Konzept (Topic).
// Strategie: alias-exact > substring > token-Jaccard > fuzzy-Levenshtein > LeiKa-Label.

import { TOPICS, buildAliasIndex } from "./data/topics.js";
import { LEIKA_SEED } from "./data/leika.js";

const ALIAS_INDEX = buildAliasIndex();

// ── German-friendly folding ──────────────────────────────────────────────
export function foldGerman(s) {
  return (s || "")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Lightweight German stemming — strip common inflections
export function stem(w) {
  return foldGerman(w)
    .replace(/(ungen|ung|heit|keit|schaft|lich|bar|isch)$/i, "")
    .replace(/(en|er|es|em|s|e)$/i, "");
}

export function tokens(s) {
  return foldGerman(s).split(" ").filter(t => t.length >= 2).map(stem).filter(Boolean);
}

// Levenshtein (Wagner-Fischer)
export function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const prev = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    let cur = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= n; j++) prev[j] = cur[j];
  }
  return prev[n];
}

export function jaccard(a, b) {
  const A = new Set(a), B = new Set(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

// ── Main entry: query → { topic, match_type, match_score } ───────────────
export function normalize(query) {
  const q = foldGerman(query);
  if (!q) return { topic: null, match_type: "empty", match_score: 0 };

  // Strategy 1: exact alias hit
  if (ALIAS_INDEX[q]) {
    return { topic: ALIAS_INDEX[q], match_type: "alias_exact", match_score: 1.0 };
  }

  // Strategy 2: substring match against aliases
  for (const [alias, topic] of Object.entries(ALIAS_INDEX)) {
    const fa = foldGerman(alias);
    if (!fa || fa.length < 3) continue;
    if (q.includes(fa) || fa.includes(q)) {
      const score = Math.min(fa.length, q.length) / Math.max(fa.length, q.length);
      if (score >= 0.5) {
        return { topic, match_type: "substring", match_score: score };
      }
    }
  }

  // Strategy 3: token-Jaccard overlap
  const qTokens = tokens(query);
  let bestJac = { topic: null, score: 0 };
  for (const topic of TOPICS) {
    const allAliasTokens = topic.aliases.flatMap(a => tokens(a));
    const s = jaccard(qTokens, allAliasTokens);
    if (s > bestJac.score) bestJac = { topic, score: s };
  }
  if (bestJac.score >= 0.34) {
    return { topic: bestJac.topic, match_type: "token_jaccard", match_score: bestJac.score };
  }

  // Strategy 4: fuzzy Levenshtein (per-alias best)
  let bestLev = { topic: null, score: 0, dist: Infinity };
  for (const topic of TOPICS) {
    for (const a of topic.aliases) {
      const fa = foldGerman(a);
      if (!fa) continue;
      const d = lev(q, fa);
      const rel = d / Math.max(q.length, fa.length);
      if (rel < 0.25 && rel < bestLev.score || bestLev.topic === null) {
        if (d < bestLev.dist) {
          bestLev = { topic, score: 1 - rel, dist: d };
        }
      }
    }
  }
  if (bestLev.topic && bestLev.score > 0.7) {
    return { topic: bestLev.topic, match_type: "fuzzy_levenshtein", match_score: bestLev.score };
  }

  // Strategy 5: LeiKa label fallback
  for (const l of LEIKA_SEED) {
    const lf = foldGerman(l.label);
    if (!lf) continue;
    if (q.includes(lf) || lf.includes(q) || jaccard(qTokens, tokens(l.label)) >= 0.4) {
      const pseudoTopic = TOPICS.find(t => t.gg?.includes(l.gg));
      if (pseudoTopic) {
        return { topic: pseudoTopic, match_type: "leika_fallback", match_score: 0.55, via_leika: l.id };
      }
    }
  }

  return { topic: null, match_type: "no_match", match_score: 0 };
}
