import { useState } from "react";
import { T } from "../tokens";

export default function SchreibkompassTool() {
  const [fullscreen, setFullscreen] = useState(false);

  if (fullscreen) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: T.bg }}>
        <button onClick={() => setFullscreen(false)} style={{
          position: "fixed", top: 10, right: 14, zIndex: 1001,
          background: T.surface, border: `1px solid ${T.accent}44`,
          borderRadius: T.r, padding: "6px 14px",
          color: T.accent, fontSize: 11, fontFamily: T.mono, cursor: "pointer",
        }}>← zurück zu deinestimme</button>
        <iframe
          src="/schreibkompass.html"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Glyphen-Schreibkompass v4"
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ color: T.accent, fontSize: 14, fontFamily: T.mono, fontWeight: 600 }}>GLYPHEN-SCHREIBKOMPASS</span>
        <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono, marginLeft: 8 }}>v4 — Shannon · Glyphen · Entitäten · Tagebuch</span>
      </div>

      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: T.rl, overflow: "hidden", marginBottom: 16,
      }}>
        <iframe
          src="/schreibkompass.html"
          style={{ width: "100%", height: 600, border: "none", display: "block" }}
          title="Glyphen-Schreibkompass v4"
        />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setFullscreen(true)} style={{
          background: T.accentDim, border: `1px solid ${T.accent}44`,
          borderRadius: T.r, padding: "8px 18px",
          color: T.accent, fontSize: 12, fontFamily: T.mono,
          fontWeight: 600, cursor: "pointer",
        }}>Vollbild öffnen</button>
        <button onClick={() => window.open("/schreibkompass.html", "_blank")} style={{
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: T.r, padding: "8px 18px",
          color: T.textMuted, fontSize: 12, fontFamily: T.mono, cursor: "pointer",
        }}>In neuem Tab öffnen ↗</button>
      </div>

      <div style={{ padding: "12px 16px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.r }}>
        <span style={{ color: T.accent, fontSize: 11, fontFamily: T.mono, fontWeight: 600 }}>Was der Schreibkompass kann</span>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { f: "Shannon-Entropie", d: "Informationsdichte deines Textes in Echtzeit" },
            { f: "Glyphen-Modus", d: "Erkennt ob du aneignest, transformierst, erschaffst, abgibst oder stasis schreibst" },
            { f: "Entitäten-Tracking", d: "Pulsiert wenn du über ein Objekt schreibst, verblasst wenn du abdriftest" },
            { f: "Schreibtemperatur", d: "5-Schichten-Algorithmus: Wort-Entropie, Trigramme, 4-Gramme, Lexik, Zeichenredundanz" },
            { f: "Rhetorik-Analyse", d: "Verhältnis IST-Zustand ↔ Transformationsvorschläge" },
            { f: "Konzept-Redundanz", d: "Jaccard-Ähnlichkeit: erkennt wenn du dieselbe These wiederholt formulierst" },
            { f: "Tagebuch", d: "Alle Texte mit Parametern speichern, Schreibstil-Evolution über die Zeit verfolgen" },
            { f: "Wikipedia-Panel", d: "Automatische Kontextinformation zu erkannten Entitäten" },
          ].map(({ f, d }) => (
            <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ color: T.accent, fontSize: 11, fontFamily: T.mono, fontWeight: 600, minWidth: 140 }}>{f}</span>
              <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.sans }}>{d}</span>
            </div>
          ))}
        </div>
        <p style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono, marginTop: 10 }}>
          Basiert auf Claude Shannons Informationstheorie (1948) · "sehen was fehlt" als Schreibhilfe · Journal wird lokal im Browser gespeichert
        </p>
      </div>
    </div>
  );
}
