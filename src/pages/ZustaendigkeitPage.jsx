import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { findZustaendigkeit, TOPICS } from "../../packages/zustaendigkeit/src/index.js";

// ── Design tokens (match rest of site) ──────────────────────────────────
const T = "#00C9B0";
const VOID = "#0B0B0F";
const DIM = "#1A1A22";
const LEVEL_COLOR = {
  EU:      "#9B7BD4",
  Bund:    "#4A90D9",
  Land:    "#C4A35A",
  Kommune: "#3DBB7D",
};
const LEVEL_LABEL_DE = { EU: "Europäische Union", Bund: "Bund", Land: "Bundesland", Kommune: "Kommune" };
const LEVEL_LABEL_EN = { EU: "European Union", Bund: "Federal", Land: "State", Kommune: "Municipal" };

// ── i18n ────────────────────────────────────────────────────────────────
const CONTENT = {
  de: {
    brand: "DeineStimme",
    back: "← zurück",
    title: "Zuständigkeits-Engine",
    subtitle: "Thema → Wer entscheidet: Kommune, Land, Bund oder EU?",
    placeholder: "Z. B. Strompreise, Schule, Datenschutz, Hundesteuer …",
    hint: "Frei eintippen. Die Engine erkennt ~85 Themen, Umlaute und Schreibvarianten.",
    primary: "Primäre Ebene",
    secondary: "Geteilt mit",
    confidence: "Confidence",
    evidence: "Rechtsgrundlagen",
    explanation: "Erklärung",
    reasoning: "Reasoning-Trace",
    alternatives: "Verwandte Themen",
    euChannels: "EU-Partizipationskanäle",
    fitScore: "Passung",
    submissionTpl: "Vorab-Einreichung (Template)",
    copyTpl: "Template kopieren",
    empty: "Gib ein Thema ein — z. B. „Strompreise“.",
    noMatch: "Kein Topic-Match gefunden. Fällt auf Art. 30 GG (Residualregel) zurück.",
    examples: "Beispiele:",
    about: "Über die Engine",
    aboutBody: "Hybride Zuordnung nach Grundgesetz (GG) + AEUV/TFEU + LeiKa/FIM + EuroVoc. Confidence-Formel 60/20/15/5: 60% Rechtsgrundlagen-Treffer, 20% Subsidiaritäts-Test (Oates: Spillover/Skaleneffekte/Präferenzheterogenität), 15% Präzedenz/Praxis, 5% Residualregel. Phase-1-Release v0.1, kuratierte Seed-Daten.",
    spec: "Spec v0.3",
    contact: "Strauss & Reinemann GbR",
    langSwitch: "EN",
  },
  en: {
    brand: "DeineStimme",
    back: "← back",
    title: "Competence Engine",
    subtitle: "Topic → Who decides: Municipality, State, Federation, or EU?",
    placeholder: "e.g. electricity prices, school, data protection, dog tax …",
    hint: "Type freely. Engine handles ~85 topics, German umlauts and spelling variants.",
    primary: "Primary level",
    secondary: "Shared with",
    confidence: "Confidence",
    evidence: "Legal basis",
    explanation: "Explanation",
    reasoning: "Reasoning trace",
    alternatives: "Related topics",
    euChannels: "EU participation channels",
    fitScore: "Fit",
    submissionTpl: "Submission template",
    copyTpl: "Copy template",
    empty: "Enter a topic — e.g. \"electricity prices\".",
    noMatch: "No topic match. Falling back to Art. 30 GG (residual rule).",
    examples: "Examples:",
    about: "About the engine",
    aboutBody: "Hybrid classification based on Grundgesetz (GG) + TFEU + LeiKa/FIM + EuroVoc. Confidence formula 60/20/15/5: 60% legal-basis match, 20% subsidiarity (Oates: spillover/economies of scale/preference heterogeneity), 15% precedent, 5% residual rule. Phase-1 release v0.1, curated seed data.",
    spec: "Spec v0.3",
    contact: "Strauss & Reinemann GbR",
    langSwitch: "DE",
  },
};

const EXAMPLES = ["Strompreise", "Schule", "Datenschutz", "Hundesteuer", "Asyl", "Mindestlohn", "KI-Regulierung"];

// ── Components ──────────────────────────────────────────────────────────
function ConfidenceGauge({ value }) {
  const pct = Math.round((value || 0) * 100);
  const color = pct >= 75 ? "#3DBB7D" : pct >= 50 ? T : pct >= 30 ? "#C4A35A" : "#D96A6A";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 8, background: DIM, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, transition: "width .3s" }} />
      </div>
      <div style={{ color, fontFamily: "DM Mono", fontSize: 14, minWidth: 40, textAlign: "right" }}>{pct}%</div>
    </div>
  );
}

function MetaChip({ label, color = T }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      marginRight: 6,
      marginBottom: 4,
      fontSize: 11,
      fontFamily: "DM Mono",
      color,
      border: `1px solid ${color}40`,
      borderRadius: 3,
      background: `${color}10`,
    }}>{label}</span>
  );
}

function LevelBadge({ level, label, size = "md" }) {
  const c = LEVEL_COLOR[level] || T;
  const px = size === "lg" ? { fontSize: 28, padding: "10px 16px" } : { fontSize: 14, padding: "4px 10px" };
  return (
    <span style={{
      display: "inline-block",
      color: c,
      border: `1px solid ${c}`,
      background: `${c}18`,
      fontFamily: "Crimson Pro",
      fontWeight: 600,
      borderRadius: 4,
      letterSpacing: 0.5,
      ...px,
    }}>{label || level}</span>
  );
}

function EuChannelsSection({ channels, template, lang, ui }) {
  const [copied, setCopied] = useState(false);
  if (!channels?.recommended?.length) return null;
  const copy = async () => {
    if (!template) return;
    try {
      await navigator.clipboard.writeText(template);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div style={{ marginTop: 32, padding: "20px 0", borderTop: `1px solid #222` }}>
      <h3 style={{ fontFamily: "Crimson Pro", fontSize: 22, color: "#fff", margin: "0 0 16px" }}>{ui.euChannels}</h3>
      {channels.recommended.map(ch => (
        <div key={ch.id} style={{ marginBottom: 16, padding: 16, background: DIM, borderRadius: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <div style={{ fontFamily: "Crimson Pro", fontSize: 18, color: "#fff" }}>{ch.name}</div>
            <div style={{ fontFamily: "DM Mono", fontSize: 12, color: T }}>{ui.fitScore} {Math.round(ch.fit_score * 100)}%</div>
          </div>
          <div style={{ fontFamily: "DM Mono", fontSize: 12, color: "#888", marginBottom: 8 }}>{ch.rechtsgrundlage}</div>
          <div style={{ fontFamily: "Crimson Pro", fontSize: 14, color: "#ccc", marginBottom: 4 }}>
            <strong style={{ color: "#fff" }}>Hürde:</strong> {ch.huerde.unterschriften}
          </div>
          <div style={{ fontFamily: "Crimson Pro", fontSize: 14, color: "#ccc", marginBottom: 4 }}>
            <strong style={{ color: "#fff" }}>Verbindlichkeit:</strong> {ch.verbindlichkeit}
          </div>
          {ch.precedents?.length > 0 && (
            <div style={{ marginTop: 8 }}>
              {ch.precedents.slice(0, 2).map((p, i) => (
                <MetaChip key={i} label={`${p.name} → ${p.outcome}`} color="#888" />
              ))}
            </div>
          )}
          <a href={ch.url} target="_blank" rel="noopener noreferrer"
             style={{ display: "inline-block", marginTop: 10, color: T, fontFamily: "DM Mono", fontSize: 12, textDecoration: "none" }}>
            → {ch.url}
          </a>
        </div>
      ))}
      {template && (
        <div>
          <button onClick={copy} style={{
            background: "transparent", border: `1px solid ${T}`, color: T,
            padding: "8px 14px", borderRadius: 4, fontFamily: "DM Mono", fontSize: 12, cursor: "pointer",
          }}>
            {copied ? "✓ kopiert" : ui.copyTpl}
          </button>
          <pre style={{
            marginTop: 12, padding: 16, background: "#08080c", color: "#ccc",
            fontFamily: "DM Mono", fontSize: 11, lineHeight: 1.5, borderRadius: 4,
            overflow: "auto", maxHeight: 400, whiteSpace: "pre-wrap",
          }}>{template}</pre>
        </div>
      )}
    </div>
  );
}

function ResultView({ result, ui, lang }) {
  if (!result) return null;
  const labels = lang === "de" ? LEVEL_LABEL_DE : LEVEL_LABEL_EN;

  return (
    <div style={{ marginTop: 28 }}>
      {/* Primary level card */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", marginBottom: 18 }}>
        <LevelBadge level={result.primary_level} label={labels[result.primary_level] || result.primary_level} size="lg" />
        {result.secondary_levels?.length > 0 && (
          <div>
            <div style={{ fontFamily: "DM Mono", fontSize: 11, color: "#888", marginBottom: 4 }}>{ui.secondary}</div>
            {result.secondary_levels.map(l => (
              <span key={l} style={{ marginRight: 8 }}>
                <LevelBadge level={l} label={labels[l] || l} />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Confidence */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "DM Mono", fontSize: 11, color: "#888", marginBottom: 4 }}>{ui.confidence}</div>
        <ConfidenceGauge value={result.confidence} />
      </div>

      {/* Explanation */}
      <p style={{ fontFamily: "Crimson Pro", fontSize: 18, color: "#ddd", lineHeight: 1.5 }}>
        {result.explanation}
      </p>

      {/* Competence types */}
      {result.competence_type?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          {result.competence_type.map(t => <MetaChip key={t} label={t} />)}
        </div>
      )}

      {/* Evidence */}
      {result.evidence?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: "DM Mono", fontSize: 11, color: "#888", marginBottom: 8 }}>{ui.evidence}</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {result.evidence.map((e, i) => (
              <li key={i} style={{ padding: "6px 0", borderBottom: "1px solid #1f1f26", fontFamily: "Crimson Pro", fontSize: 15, color: "#ccc" }}>
                <span style={{ color: T, fontFamily: "DM Mono", fontSize: 11, marginRight: 8 }}>{e.source}</span>
                {e.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reasoning trace */}
      {result.reasoning_trace?.length > 0 && (
        <details style={{ marginBottom: 18 }}>
          <summary style={{ cursor: "pointer", fontFamily: "DM Mono", fontSize: 11, color: "#888" }}>{ui.reasoning}</summary>
          <ul style={{ marginTop: 8, padding: 0, listStyle: "none" }}>
            {result.reasoning_trace.map((line, i) => (
              <li key={i} style={{ fontFamily: "DM Mono", fontSize: 11, color: "#777", padding: "2px 0" }}>→ {line}</li>
            ))}
          </ul>
        </details>
      )}

      {/* Alternatives */}
      {result.alternatives?.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "DM Mono", fontSize: 11, color: "#888", marginBottom: 6 }}>{ui.alternatives}</div>
          {result.alternatives.map(a => (
            <Link key={a.id} to={`/zustaendigkeit?q=${encodeURIComponent(a.label)}`}
                  style={{ marginRight: 12, color: T, fontFamily: "Crimson Pro", fontSize: 15, textDecoration: "none" }}>
              {a.label}
            </Link>
          ))}
        </div>
      )}

      {/* EU channels */}
      <EuChannelsSection channels={result.eu_channels} template={result.eu_submission_template} lang={lang} ui={ui} />
    </div>
  );
}

function AboutSection({ ui }) {
  return (
    <section style={{ marginTop: 56, padding: "24px 0", borderTop: "1px solid #1f1f26" }}>
      <h3 style={{ fontFamily: "Crimson Pro", fontSize: 22, color: "#fff", margin: "0 0 10px" }}>{ui.about}</h3>
      <p style={{ fontFamily: "Crimson Pro", fontSize: 16, color: "#999", lineHeight: 1.6 }}>{ui.aboutBody}</p>
      <div style={{ marginTop: 12, fontFamily: "DM Mono", fontSize: 11, color: "#666" }}>
        {ui.spec} · {ui.contact}
      </div>
    </section>
  );
}

// ── Main page ───────────────────────────────────────────────────────────
export default function ZustaendigkeitPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lang, setLang] = useState(searchParams.get("lang") === "en" ? "en" : "de");
  const ui = CONTENT[lang];

  const initial = params.query || searchParams.get("q") || "";
  const [query, setQuery] = useState(initial);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef();

  // Debounced lookup
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query || !query.trim()) {
      setResult(null);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const r = await findZustaendigkeit(query);
        setResult(r);
      } catch (e) {
        console.error(e);
        setResult(null);
      }
      setLoading(false);
    }, 220);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // URL sync
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (query) next.set("q", query); else next.delete("q");
    if (lang !== "de") next.set("lang", lang); else next.delete("lang");
    setSearchParams(next, { replace: true });
  }, [query, lang]);

  return (
    <div style={{ minHeight: "100vh", background: VOID, color: "#fff", fontFamily: "Crimson Pro" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 20px 80px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <Link to="/" style={{ color: T, fontFamily: "DM Mono", fontSize: 12, textDecoration: "none" }}>{ui.back}</Link>
          <div style={{ fontFamily: "DM Mono", fontSize: 12, color: "#555" }}>{ui.brand}</div>
          <button onClick={() => setLang(lang === "de" ? "en" : "de")}
                  style={{ background: "transparent", border: `1px solid #333`, color: "#888",
                           padding: "4px 10px", borderRadius: 3, fontFamily: "DM Mono", fontSize: 11, cursor: "pointer" }}>
            {ui.langSwitch}
          </button>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "Crimson Pro", fontWeight: 300, fontSize: 44, margin: 0, letterSpacing: -0.5 }}>
          {ui.title}
        </h1>
        <p style={{ fontFamily: "Crimson Pro", fontSize: 20, color: "#999", margin: "8px 0 32px" }}>
          {ui.subtitle}
        </p>

        {/* Search input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ui.placeholder}
          autoFocus
          style={{
            width: "100%",
            padding: "16px 18px",
            background: DIM,
            border: `1px solid ${query ? T : "#2a2a35"}`,
            borderRadius: 6,
            fontFamily: "Crimson Pro",
            fontSize: 18,
            color: "#fff",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color .2s",
          }}
        />
        <div style={{ fontFamily: "DM Mono", fontSize: 11, color: "#555", marginTop: 6 }}>{ui.hint}</div>

        {/* Examples */}
        {!query && (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontFamily: "DM Mono", fontSize: 11, color: "#666", marginBottom: 6 }}>{ui.examples}</div>
            {EXAMPLES.map(ex => (
              <button key={ex} onClick={() => setQuery(ex)}
                      style={{
                        background: "transparent", border: `1px solid #2a2a35`,
                        color: "#aaa", padding: "4px 10px", marginRight: 6, marginBottom: 6,
                        borderRadius: 3, fontFamily: "Crimson Pro", fontSize: 14, cursor: "pointer",
                      }}>
                {ex}
              </button>
            ))}
          </div>
        )}

        {/* Result */}
        {loading && <div style={{ marginTop: 32, fontFamily: "DM Mono", fontSize: 12, color: "#666" }}>…</div>}
        {result && <ResultView result={result} ui={ui} lang={lang} />}
        {!query && !result && (
          <p style={{ marginTop: 32, color: "#666", fontFamily: "Crimson Pro", fontSize: 16 }}>{ui.empty}</p>
        )}

        <AboutSection ui={ui} />
      </div>
    </div>
  );
}
