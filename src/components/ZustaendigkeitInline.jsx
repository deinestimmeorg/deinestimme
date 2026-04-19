import { useState, useEffect, useRef } from "react";
import { T } from "../tokens";
import { findZustaendigkeit, CATEGORY_LABELS } from "../../packages/zustaendigkeit/src/index.js";
import { getZustT } from "../zustaendigkeitI18n";

const LEVEL_COLOR = {
  EU: "#9B7BD4",
  Bund: "#4A90D9",
  Land: "#C4A35A",
  Kreis: "#D98B5C",
  Kommune: "#3DBB7D",
};

const CATEGORY_COLOR = {
  zustaendig: "#3DBB7D",
  mitwirkend_zustaendig: "#C4A35A",
  formell_unzustaendig_weiterleitungspflichtig: "#D98B5C",
  rechtlich_ungeklaert_eskalationsbedarf: "#E06C6C",
};

function levelLabel(lvl, tr) {
  return tr.levels[lvl] || lvl;
}

function LevelBadge({ level, tr, size = "md" }) {
  const color = LEVEL_COLOR[level] || T.silver;
  const padding = size === "sm" ? "3px 8px" : "4px 10px";
  const fontSize = size === "sm" ? 10 : 11;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding,
        background: color + "22",
        border: `1px solid ${color}55`,
        borderRadius: T.r,
        color: color,
        fontSize,
        fontFamily: T.mono,
        fontWeight: 600,
        letterSpacing: "0.03em",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {levelLabel(level, tr)}
    </span>
  );
}

function ConfidenceBar({ value }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  const color = pct >= 70 ? T.accent : pct >= 45 ? T.gold : T.coral;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
      <div
        style={{
          flex: 1,
          height: 5,
          background: T.bg,
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            transition: "width 0.4s ease, background 0.4s ease",
          }}
        />
      </div>
      <span style={{ color, fontSize: 11, fontFamily: T.mono, fontWeight: 600, minWidth: 36, textAlign: "right" }}>
        {pct}%
      </span>
    </div>
  );
}

/**
 * Inline Zuständigkeits-Anzeige.
 * Props:
 *  - query: string — the user input text
 *  - lang: string — language code (de|en|nl|fr|es|id)
 *  - variant: "composer" | "tab" — controls padding/spacing
 *  - minChars: number — debounce threshold (default 4)
 */
export default function ZustaendigkeitInline({ query, lang = "de", variant = "composer", minChars = 4 }) {
  const tr = getZustT(lang);
  const [result, setResult] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = (query || "").trim();
    if (q.length < minChars) {
      setResult(null);
      return;
    }
    let cancelled = false;
    debounceRef.current = setTimeout(async () => {
      try {
        const r = await findZustaendigkeit(q, { lang });
        if (!cancelled) setResult(r);
      } catch (err) {
        console.warn("[zustaendigkeit] engine error", err);
        if (!cancelled) setResult(null);
      }
    }, 220);
    return () => {
      cancelled = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, lang, minChars]);

  const pad = variant === "tab" ? "18px 20px" : "14px 16px";

  // Empty state
  if (!result) {
    return (
      <div
        style={{
          background: T.bg,
          border: `1px dashed ${T.border}`,
          borderRadius: T.r,
          padding: pad,
        }}
      >
        <p style={{ color: T.textMuted, fontSize: 12, fontFamily: T.mono, margin: 0, lineHeight: 1.5 }}>
          {tr.waiting}
        </p>
      </div>
    );
  }

  const noMatch = !result.topic || result.topic.match_type === "no_match";

  return (
    <div
      style={{
        background: T.bg,
        border: `1px solid ${T.border}`,
        borderRadius: T.r,
        padding: pad,
        animation: "zInlineFadeIn 0.3s ease-out",
      }}
    >
      <style>{`
        @keyframes zInlineFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span
          style={{
            color: T.silver,
            fontSize: 10,
            fontFamily: T.mono,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {tr.previewTitle}
        </span>
        {!noMatch && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none",
              border: `1px solid ${T.border}`,
              borderRadius: T.r,
              padding: "2px 8px",
              color: T.textMuted,
              fontSize: 10,
              fontFamily: T.mono,
              cursor: "pointer",
            }}
          >
            {expanded ? tr.hideDetails : tr.showDetails}
          </button>
        )}
      </div>

      {noMatch ? (
        <div>
          <p style={{ color: T.coral, fontSize: 12, fontFamily: T.sans, margin: "0 0 4px", lineHeight: 1.5 }}>
            {tr.noMatch}
          </p>
          {lang !== "de" && (
            <p style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, margin: 0, lineHeight: 1.5 }}>
              {tr.searchLanguageHint}
            </p>
          )}
        </div>
      ) : (
        <div>
          {/* v0.4: Category badge + override note */}
          {(result.category || result.override_applied) && (
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 10 }}>
              {result.category && (() => {
                const catColor = CATEGORY_COLOR[result.category] || T.silver;
                const catLabel =
                  (CATEGORY_LABELS[lang] && CATEGORY_LABELS[lang][result.category]) ||
                  CATEGORY_LABELS.en[result.category] ||
                  result.category;
                return (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "3px 10px",
                      background: catColor + "1A",
                      border: `1px solid ${catColor}66`,
                      borderRadius: T.r,
                      color: catColor,
                      fontSize: 10,
                      fontFamily: T.mono,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                    title="v0.4 Kategorie"
                  >
                    {catLabel}
                  </span>
                );
              })()}
              {result.override_applied && (
                <span
                  style={{
                    color: T.textMuted,
                    fontSize: 10,
                    fontFamily: T.mono,
                    padding: "2px 6px",
                    border: `1px dashed ${T.border}`,
                    borderRadius: T.r,
                  }}
                  title={
                    result.override_applied.reason
                      ? `Override-Stufe ${result.override_applied.stufe} — ${result.override_applied.reason}`
                      : `Override-Stufe ${result.override_applied.stufe}`
                  }
                >
                  Override {result.override_applied.stufe}: {result.override_applied.label_de}
                </span>
              )}
            </div>
          )}

          {/* Primary + secondary row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono }}>{tr.primaryLabel}:</span>
            <LevelBadge level={result.primary_level} tr={tr} />
            {result.secondary_levels?.length > 0 && (
              <>
                <span style={{ color: T.textDim, fontSize: 11, fontFamily: T.mono, marginLeft: 6 }}>
                  · {tr.secondaryLabel}:
                </span>
                {result.secondary_levels.slice(0, 3).map((lvl) => (
                  <LevelBadge key={lvl} level={lvl} tr={tr} size="sm" />
                ))}
              </>
            )}
          </div>

          {/* Confidence */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: expanded ? 12 : 0 }}>
            <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, minWidth: 70 }}>
              {tr.confidenceLabel}
            </span>
            <ConfidenceBar value={result.confidence || 0} />
          </div>

          {/* Expanded details */}
          {expanded && (
            <div style={{ marginTop: 8, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Detail
                  label={tr.matchLabel}
                  value={
                    result.topic.label_de ||
                    result.topic.label_en ||
                    result.topic.id ||
                    "—"
                  }
                />
                <Detail
                  label={tr.competenceLabel}
                  value={tr.competence[result.competence_type] || result.competence_type || "—"}
                />
                {result.evidence?.gg?.length > 0 && (
                  <Detail
                    label="GG"
                    value={result.evidence.gg
                      .slice(0, 3)
                      .map((e) => e.ref || e.key)
                      .join(" · ")}
                    mono
                  />
                )}
                {result.evidence?.tfeu?.length > 0 && (
                  <Detail
                    label="AEUV"
                    value={result.evidence.tfeu
                      .slice(0, 3)
                      .map((e) => e.ref || e.key)
                      .join(" · ")}
                    mono
                  />
                )}
                {/* v0.4: authorities[] */}
                {result.authorities?.length > 0 && (
                  <Detail
                    label="Behörde"
                    value={result.authorities.slice(0, 3).map((a) => a.label).join(" · ")}
                  />
                )}
                {/* v0.5: Sub-Adapter + EPCI + Art73/74 + Statuto speciale */}
                {result.sub_adapter_id && (
                  <Detail
                    label="Sub-Adapter"
                    value={result.sub_adapter_id}
                    mono
                  />
                )}
                {result.statuto_speciale && (
                  <Detail
                    label="Statuto"
                    value="speciale (IT-Sonderautonomie)"
                  />
                )}
                {result.epci_class && (
                  <Detail
                    label="EPCI"
                    value={result.epci_class}
                    mono
                  />
                )}
                {result.art73_74_regime && (
                  <Detail
                    label="Outre-mer"
                    value={result.art73_74_regime === "art73" ? "Art. 73 (identité législative)" : "Art. 74 (spécialité législative)"}
                  />
                )}
                {/* v0.4: procedural_path (Layer D) */}
                {result.procedural_path && (
                  <Detail
                    label="Verfahren"
                    value={[
                      result.procedural_path.layer_d,
                      ...(result.procedural_path.deadlines || []).slice(0, 2),
                    ].join(" · ")}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value, mono }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
      <span
        style={{
          color: T.textMuted,
          fontSize: 10,
          fontFamily: T.mono,
          minWidth: 70,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: T.silver,
          fontSize: 12,
          fontFamily: mono ? T.mono : T.sans,
          lineHeight: 1.5,
        }}
      >
        {value}
      </span>
    </div>
  );
}
