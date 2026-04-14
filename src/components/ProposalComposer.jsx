import { useState, useRef, useCallback } from "react";
import { T } from "../tokens";

// ─── Spracherkennung: IST-Zustand vs. Lösungsvorschlag ───
const IST_PATTERNS = [
  /\b(ist|sind|war|waren|gibt es|existiert|besteht|herrscht)\b/gi,
  /\b(aktuell|derzeit|momentan|gegenwärtig|bisher|zurzeit)\b/gi,
  /\b(problem|mangel|fehlt|mangelt|defizit|missstand|krise)\b/gi,
  /\b(leider|leider\s|bedauerlicherweise|unglücklicherweise)\b/gi,
  /\b(niemand|nichts|kein\w*|nirgends|nirgendwo)\b/gi,
  /\b(warum\s|wieso\s|weshalb\s)\b/gi,
  /\b(zu\s+wenig|zu\s+viel|zu\s+teuer|zu\s+langsam|zu\s+bürokratisch)\b/gi,
  /\b(scheitert|versagt|funktioniert\s+nicht|klappt\s+nicht)\b/gi,
];

const LOESUNG_PATTERNS = [
  /\b(sollte|könnte|müsste|muss|soll|kann|darf)\b/gi,
  /\b(vorschlag|lösung|alternative|ansatz|idee|konzept|entwurf)\b/gi,
  /\b(stattdessen|alternativ|besser\s+wäre|anstatt|anstelle)\b/gi,
  /\b(wenn\s+wir|man\s+könnte|man\s+sollte|wir\s+könnten|wir\s+sollten)\b/gi,
  /\b(einführen|ändern|verbessern|aufbauen|umsetzen|ermöglichen|fördern|stärken)\b/gi,
  /\b(wird|werden|sollen|wollen)\b/gi,
  /\b(ziel|vision|perspektive|chance|potenzial|möglichkeit)\b/gi,
  /\b(ich\s+schlage\s+vor|mein\s+vorschlag|konkret)\b/gi,
];

function analyzeText(text) {
  if (!text || text.trim().length < 10) return { ratio: 0.5, istScore: 0, loesungScore: 0, phase: "leer" };

  let istHits = 0;
  let loesungHits = 0;

  for (const pattern of IST_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) istHits += matches.length;
  }
  for (const pattern of LOESUNG_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) loesungHits += matches.length;
  }

  const total = istHits + loesungHits;
  if (total === 0) return { ratio: 0.5, istScore: 0, loesungScore: 0, phase: "neutral" };

  const ratio = loesungHits / total; // 0 = pure IST, 1 = pure LÖSUNG
  let phase;
  if (ratio < 0.25) phase = "beschreibung";
  else if (ratio < 0.5) phase = "uebergang";
  else if (ratio < 0.75) phase = "ansatz";
  else phase = "loesung";

  return { ratio, istScore: istHits, loesungScore: loesungHits, phase };
}

// ─── Scaffolding: Impulse je nach Phase ───
const SCAFFOLDING = {
  leer: {
    prompt: "Was beschäftigt dich?",
    hint: "Beschreibe was dir auffällt, was dich stört, oder was du dir wünschst. Jeder Anfang zählt.",
    emoji: "✦",
  },
  neutral: {
    prompt: "Du bist dabei, weiterschreiben...",
    hint: "Dein Text nimmt Form an. Erzähl weiter — wie sieht die Situation aus?",
    emoji: "◦",
  },
  beschreibung: {
    prompt: "Du beschreibst einen Zustand",
    hint: "Guter Kontext! Wenn du magst: Wie könnte eine Lösung aussehen? Was wäre ein erster Schritt?",
    emoji: "◐",
  },
  uebergang: {
    prompt: "Du bewegst dich zur Lösung",
    hint: "Du verbindest Problem und Ansatz — genau da entsteht der Vorschlag.",
    emoji: "◑",
  },
  ansatz: {
    prompt: "Ein Lösungsansatz entsteht",
    hint: "Stark. Wird der Vorschlag konkret genug, dass andere darauf aufbauen können?",
    emoji: "◕",
  },
  loesung: {
    prompt: "Konkreter Lösungsvorschlag",
    hint: "Das ist ein Vorschlag, den andere bewerten, verbessern und unterstützen können.",
    emoji: "●",
  },
};

// ─── Farbinterpolation IST → LÖSUNG ───
function phaseColor(ratio) {
  // coral (IST) → gold (Übergang) → accent/turquoise (LÖSUNG)
  if (ratio < 0.5) {
    const t = ratio * 2;
    return lerpColor(T.coral, T.gold, t);
  }
  const t = (ratio - 0.5) * 2;
  return lerpColor(T.gold, T.accent, t);
}

function lerpColor(a, b, t) {
  const parse = (hex) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

// ─── Hauptkomponente ───
export default function ProposalComposer({ topicTitle, onSubmit, onCancel, currentUser }) {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState({ ratio: 0.5, istScore: 0, loesungScore: 0, phase: "leer" });
  const [showHelper, setShowHelper] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const textareaRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounced analysis
  const updateAnalysis = useCallback((val) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setAnalysis(analyzeText(val));
    }, 200);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setText(val);
    updateAnalysis(val);
  };

  const handleSubmit = () => {
    if (text.trim().length < 20) return;
    setSubmitted(true);
    onSubmit?.({
      text: text.trim(),
      phase: analysis.phase,
      ratio: analysis.ratio,
    });
  };

  const scaffold = SCAFFOLDING[analysis.phase];
  const indicatorColor = phaseColor(analysis.ratio);
  const charCount = text.length;
  const isReady = charCount >= 20;

  if (submitted) {
    return (
      <div style={{
        background: T.surface, border: `1px solid ${T.accent}33`, borderRadius: T.rl,
        padding: 24, textAlign: "center",
        animation: "fadeInUp 0.5s ease-out",
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
        <p style={{ color: T.accent, fontSize: 15, fontFamily: T.mono, fontWeight: 600, marginBottom: 8 }}>
          Eingereicht.
        </p>
        <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6 }}>
          Deine Stimme fließt jetzt in den gemeinsamen Prozess ein.
          Andere können darauf aufbauen, verfeinern, oder einen besseren Vorschlag einbringen.
        </p>
        <p style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono, marginTop: 12 }}>
          {currentUser?.display_name} · {analysis.phase === "loesung" ? "Lösungsvorschlag" : analysis.phase === "beschreibung" ? "Zustandsbeschreibung" : "Beitrag"}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl,
      overflow: "hidden",
    }}>
      {/* Phase indicator bar */}
      <div style={{
        height: 3, background: T.bg,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${Math.max(analysis.ratio * 100, 5)}%`,
          background: `linear-gradient(90deg, ${T.coral}88, ${indicatorColor})`,
          transition: "width 0.6s ease, background 0.6s ease",
          borderRadius: "0 2px 2px 0",
        }} />
      </div>

      <div style={{ padding: "16px 18px" }}>
        {/* Topic context */}
        {topicTitle && (
          <div style={{
            fontSize: 11, fontFamily: T.mono, color: T.textMuted, marginBottom: 10,
            letterSpacing: "0.03em", textTransform: "uppercase",
          }}>
            Beitrag zu: <span style={{ color: T.silver }}>{topicTitle}</span>
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Was fällt dir auf? Was wünscht du dir? Was wäre ein guter erster Schritt?"
          rows={5}
          style={{
            width: "100%", background: T.bg, border: `1px solid ${T.border}`,
            borderRadius: T.r, padding: "12px 14px", color: T.text, fontSize: 14,
            fontFamily: T.sans, lineHeight: 1.65, outline: "none", resize: "vertical",
            boxSizing: "border-box",
            transition: "border-color 0.3s",
            borderColor: text.length > 10 ? indicatorColor + "44" : T.border,
          }}
        />

        {/* Live feedback strip */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 8, minHeight: 28,
        }}>
          {/* Phase indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 22, height: 22, borderRadius: "50%",
              background: indicatorColor + "22", color: indicatorColor,
              fontSize: 12, fontFamily: T.mono, fontWeight: 700,
              transition: "all 0.4s ease",
            }}>
              {scaffold.emoji}
            </span>
            <span style={{
              color: indicatorColor, fontSize: 12, fontFamily: T.mono, fontWeight: 500,
              transition: "color 0.4s ease",
            }}>
              {scaffold.prompt}
            </span>
          </div>

          {/* Char count */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              color: charCount < 20 ? T.textDim : T.textMuted,
              fontSize: 11, fontFamily: T.mono,
            }}>
              {charCount}
            </span>
            <button
              onClick={() => setShowHelper(!showHelper)}
              style={{
                background: "none", border: `1px solid ${T.border}`, borderRadius: T.r,
                padding: "3px 8px", color: T.textMuted, fontSize: 10,
                fontFamily: T.mono, cursor: "pointer",
              }}
            >
              {showHelper ? "×" : "?"}
            </button>
          </div>
        </div>

        {/* Helper / scaffolding panel */}
        {showHelper && (
          <div style={{
            marginTop: 8, padding: "12px 14px", background: T.bg,
            border: `1px solid ${T.border}`, borderRadius: T.r,
            animation: "fadeInUp 0.3s ease-out",
          }}>
            <p style={{
              color: T.silver, fontSize: 12, fontFamily: T.sans, lineHeight: 1.6,
              margin: "0 0 10px",
            }}>
              {scaffold.hint}
            </p>

            <div style={{
              display: "flex", flexDirection: "column", gap: 6,
              borderTop: `1px solid ${T.border}`, paddingTop: 10,
            }}>
              <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, letterSpacing: "0.05em" }}>
                HILFESTELLUNG
              </span>

              {/* Visual spectrum explanation */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <div style={{
                  flex: 1, height: 6, borderRadius: 3,
                  background: `linear-gradient(90deg, ${T.coral}, ${T.gold}, ${T.accent})`,
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: T.coral, fontSize: 10, fontFamily: T.mono }}>Zustand beschreiben</span>
                <span style={{ color: T.accent, fontSize: 10, fontFamily: T.mono }}>Lösung vorschlagen</span>
              </div>

              <p style={{ color: T.textMuted, fontSize: 11, fontFamily: T.sans, lineHeight: 1.5, margin: 0 }}>
                Beides ist wertvoll. Eine gute Zustandsbeschreibung hilft allen, das Problem zu verstehen.
                Ein Lösungsvorschlag bringt die Diskussion voran. Viele starke Beiträge verbinden beides —
                sie zeigen, was ist, und skizzieren, was sein könnte.
              </p>

              {/* Quick starters for people who need help */}
              <div style={{ marginTop: 8 }}>
                <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, letterSpacing: "0.05em" }}>
                  SO KANNST DU ANFANGEN
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
                  {[
                    { label: "Problem benennen", text: "In meinem Alltag fällt mir auf, dass..." },
                    { label: "Wunsch formulieren", text: "Ich wünsche mir, dass..." },
                    { label: "Lösung skizzieren", text: "Mein Vorschlag wäre, dass wir..." },
                    { label: "Erfahrung teilen", text: "In meiner Erfahrung funktioniert es besser, wenn..." },
                  ].map((starter, i) => (
                    <button
                      key={i}
                      onClick={() => { setText(starter.text); updateAnalysis(starter.text); textareaRef.current?.focus(); }}
                      style={{
                        background: T.surfaceHover, border: `1px solid ${T.border}`,
                        borderRadius: T.r, padding: "6px 10px", textAlign: "left",
                        cursor: "pointer", transition: "all 0.2s",
                        display: "flex", gap: 8, alignItems: "center",
                      }}
                    >
                      <span style={{ color: T.accent, fontSize: 10, fontFamily: T.mono, minWidth: 90 }}>{starter.label}</span>
                      <span style={{ color: T.textMuted, fontSize: 12, fontFamily: T.sans, fontStyle: "italic" }}>"{starter.text}"</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nudge when in pure IST mode for a while */}
        {analysis.phase === "beschreibung" && charCount > 80 && (
          <div style={{
            marginTop: 8, padding: "8px 12px",
            background: T.goldDim, border: `1px solid ${T.gold}22`,
            borderRadius: T.r,
            animation: "fadeInUp 0.4s ease-out",
          }}>
            <p style={{ color: T.gold, fontSize: 12, fontFamily: T.sans, margin: 0, lineHeight: 1.5 }}>
              💡 Guter Kontext. Tipp: Ergänze einen Satz wie <em>"Stattdessen könnte man..."</em> oder <em>"Mein Vorschlag wäre..."</em> — dann wird aus deiner Beobachtung ein Vorschlag, an dem andere weiterarbeiten können.
            </p>
          </div>
        )}

        {/* Submit area */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}`,
        }}>
          <div>
            {isReady && (
              <span style={{
                color: T.textMuted, fontSize: 11, fontFamily: T.mono,
                animation: "fadeInUp 0.3s ease-out",
              }}>
                {analysis.phase === "loesung" ? "✦ Lösungsvorschlag" :
                 analysis.phase === "ansatz" ? "◕ Ansatz" :
                 analysis.phase === "beschreibung" ? "◐ Zustandsbeschreibung" :
                 "◦ Beitrag"} — alles kann eingereicht werden
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {onCancel && (
              <button onClick={onCancel} style={{
                background: "none", border: `1px solid ${T.border}`, borderRadius: T.r,
                padding: "7px 14px", color: T.textMuted, fontSize: 12, fontFamily: T.mono,
                cursor: "pointer",
              }}>
                abbrechen
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={!isReady}
              style={{
                background: isReady ? indicatorColor : T.surfaceActive,
                color: isReady ? T.bg : T.textDim,
                border: "none", borderRadius: T.r, padding: "7px 18px",
                fontSize: 12, fontFamily: T.mono, fontWeight: 600,
                cursor: isReady ? "pointer" : "default",
                transition: "all 0.3s ease",
              }}
            >
              EINREICHEN
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
