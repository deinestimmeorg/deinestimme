import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const T = "#00C9B0";
const VOID = "#0B0B0F";
const SILVER = "#C0C8D0";
const DIM = "#5A6068";
const CARD = "#111116";

const CONTENT = {
  de: {
    back: "← Zurück",
    title: "Wie DeineStimme funktioniert",
    sub: "Kein Konsens um des Konsenses willen. Ein System, das Widerspruch in bessere Vorschläge verwandelt.",
    principle: "Das Grundprinzip",
    principleText: "Wer dagegen ist, macht einen besseren Vorschlag. Diese eine Regel verändert alles: Kritik wird konstruktiv, Blockade wird Energie, Meinung wird Gestaltung.",
    modulesTitle: "Die Module",
    modules: [
      { icon: "✦", name: "Vorschlag schreiben", desc: "Du beschreibst, was dich beschäftigt. Während du schreibst, zeigt dir das System, ob du gerade das Problem beschreibst oder bereits eine Lösung formulierst. Beides ist wertvoll.", status: "live" },
      { icon: "◈", name: "Wirkungsanalyse", desc: "Jeder Vorschlag wird in sechs Dimensionen betrachtet: Wirtschaft, Gesundheit, Bildung, Technik, Soziales, Umwelt. Chancen und Gefahren werden sichtbar — und für jede Gefahr gibt es einen Raum für Lösungen.", status: "live" },
      { icon: "◎", name: "Schreibkompass", desc: "Ein Analysewerkzeug, das Informationsdichte, Wiederholungen, rhetorische Balance und Konzeptüberlappung misst. Damit werden Vorschläge klarer — ohne dass du Verwaltungssprache lernen musst.", status: "live" },
      { icon: "⬡", name: "Zuständigkeitsnavigation", desc: "Wer ist zuständig? Gemeinde, Land, Bund oder EU? Das System zeigt dir, welche Ebene für dein Thema verantwortlich ist — damit dein Vorschlag an der richtigen Stelle ankommt.", status: "live", href: "/zustaendigkeit" },
      { icon: "◇", name: "Gegenvorschlag", desc: "Du bist nicht einverstanden? Dann schreibe einen besseren Vorschlag. Beide werden nebeneinander gestellt, verglichen und von der Gemeinschaft verfeinert.", status: "geplant" },
    ],
    flowTitle: "Der Ablauf",
    steps: [
      "Du wählst ein Thema oder beschreibst ein eigenes Anliegen.",
      "Während du schreibst, analysiert das System deinen Text in Echtzeit.",
      "Dein Vorschlag wird in sechs Dimensionen auf Chancen und Risiken geprüft.",
      "Andere können Gegenvorschläge einreichen — keine Kritik ohne Alternative.",
      "Das System erkennt, welche Vorschläge sich annähern und zusammengeführt werden können.",
      "Reife Vorschläge werden an die zuständige Ebene weitergeleitet.",
    ],
    cta: "Zur Plattform →",
    openSource: "Vollständig Open Source",
    openSourceText: "Der gesamte Code ist unter AGPL-3.0 frei verfügbar. Jede Kommune, jede Organisation kann DeineStimme einsetzen, anpassen und weiterentwickeln.",
  },
  en: {
    back: "← Back",
    title: "How DeineStimme works",
    sub: "No consensus for its own sake. A system that turns disagreement into better proposals.",
    principle: "The core principle",
    principleText: "If you disagree, make a better proposal. This single rule changes everything: criticism becomes constructive, blocking becomes energy, opinion becomes design.",
    modulesTitle: "The modules",
    modules: [
      { icon: "✦", name: "Write a proposal", desc: "Describe what concerns you. As you write, the system shows whether you're describing the problem or already formulating a solution. Both are valuable.", status: "live" },
      { icon: "◈", name: "Impact assessment", desc: "Every proposal is examined across six dimensions: economy, health, education, technology, social, environment. Opportunities and risks become visible — and each risk has space for solutions.", status: "live" },
      { icon: "◎", name: "Schreibkompass", desc: "An analysis tool measuring information density, repetition, rhetorical balance and concept overlap. It helps proposals become clearer — without requiring formal policy language.", status: "live" },
      { icon: "⬡", name: "Jurisdiction navigation", desc: "Who is responsible? Municipality, state, federal or EU? The system shows which level of government is responsible for your topic — so your proposal reaches the right place.", status: "live", href: "/zustaendigkeit" },
      { icon: "◇", name: "Counter-proposal", desc: "You disagree? Then write a better proposal. Both are placed side by side, compared and refined by the community.", status: "planned" },
    ],
    flowTitle: "The process",
    steps: [
      "You select a topic or describe your own concern.",
      "As you write, the system analyzes your text in real time.",
      "Your proposal is assessed for opportunities and risks across six dimensions.",
      "Others can submit counter-proposals — no criticism without alternative.",
      "The system identifies proposals that converge and can be synthesized.",
      "Mature proposals are routed to the responsible government level.",
    ],
    cta: "Go to platform →",
    openSource: "Fully open source",
    openSourceText: "All code is freely available under AGPL-3.0. Any municipality, any organization can deploy, adapt and develop DeineStimme further.",
  },
};

function useLang() {
  const [params] = useSearchParams();
  return params.get("lang") || "de";
}

export default function VerstehenPage() {
  const lang = useLang();
  const c = CONTENT[lang] || CONTENT.de;
  const navigate = useNavigate();
  const [vis, setVis] = useState(false);

  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

  return (
    <div style={{ background: VOID, minHeight: "100vh", color: SILVER }}>
      <style>{`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      {/* Nav */}
      <nav style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => navigate("/")} style={{
          background: "none", border: "none", color: DIM, fontFamily: "'DM Mono', monospace",
          fontSize: "12px", cursor: "pointer", letterSpacing: ".05em", padding: "8px 0",
          minHeight: "44px", display: "flex", alignItems: "center",
        }}>{c.back}</button>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em" }}>DEINESTIMME.ORG</span>
      </nav>

      {/* Header */}
      <div style={{
        maxWidth: "720px", margin: "0 auto", padding: "60px 24px 40px",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease",
      }}>
        <h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 300, lineHeight: 1.3, marginBottom: "16px" }}>{c.title}</h1>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "17px", lineHeight: 1.7, color: DIM, fontWeight: 300 }}>{c.sub}</p>
      </div>

      {/* Principle */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ background: T + "08", border: `1px solid ${T}20`, borderRadius: "4px", padding: "28px" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>{c.principle}</span>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "18px", lineHeight: 1.7, fontWeight: 300, color: SILVER }}>{c.principleText}</p>
        </div>
      </div>

      {/* Modules */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>{c.modulesTitle}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {c.modules.map((m, i) => {
            const inner = (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "16px", color: T }}>{m.icon}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", fontWeight: 400, color: SILVER }}>{m.name}</span>
                    {m.href && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, marginLeft: "4px" }}>→</span>}
                  </div>
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: m.status === "live" ? T : "#E8943A",
                    background: m.status === "live" ? T + "15" : "#E8943A15",
                    padding: "3px 8px", borderRadius: "2px",
                  }}>{m.status === "live" ? "LIVE" : (lang === "de" ? "GEPLANT" : "PLANNED")}</span>
                </div>
                <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "15px", lineHeight: 1.7, color: DIM, fontWeight: 300 }}>{m.desc}</p>
              </>
            );
            const baseStyle = {
              background: CARD, border: `1px solid ${T}10`, borderRadius: "4px", padding: "20px 24px",
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.6s ease ${200 + i * 100}ms`,
              display: "block", textDecoration: "none", color: "inherit",
            };
            if (m.href) {
              return (
                <a key={i} href={m.href} style={{ ...baseStyle, cursor: "pointer" }}
                   onMouseEnter={(e) => { e.currentTarget.style.border = `1px solid ${T}40`; e.currentTarget.style.background = "#161620"; }}
                   onMouseLeave={(e) => { e.currentTarget.style.border = `1px solid ${T}10`; e.currentTarget.style.background = CARD; }}
                >{inner}</a>
              );
            }
            return <div key={i} style={baseStyle}>{inner}</div>;
          })}
        </div>
      </div>

      {/* Flow */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>{c.flowTitle}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {c.steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "12px 0" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%", border: `1px solid ${T}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T,
                }}>{i + 1}</div>
                {i < c.steps.length - 1 && <div style={{ width: "1px", height: "20px", background: T + "20", marginTop: "4px" }} />}
              </div>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "15px", lineHeight: 1.7, color: SILVER, fontWeight: 300, paddingTop: "2px" }}>{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Source */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ background: CARD, border: `1px solid ${T}10`, borderRadius: "4px", padding: "24px" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: T }}>{c.openSource}</span>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "15px", lineHeight: 1.7, color: DIM, fontWeight: 300, marginTop: "8px" }}>{c.openSourceText}</p>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: DIM, display: "block", marginTop: "8px" }}>github.com/deinestimmeorg/deinestimme · AGPL-3.0</span>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px", textAlign: "center" }}>
        <button onClick={() => navigate("/app")} style={{
          background: T + "12", border: `1px solid ${T}30`, borderRadius: "4px",
          padding: "14px 32px", fontFamily: "'DM Mono', monospace", fontSize: "13px",
          color: T, cursor: "pointer", letterSpacing: ".05em", transition: "all 0.3s",
          minHeight: "48px",
        }}>{c.cta}</button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "24px", fontFamily: "'DM Mono', monospace", fontSize: "11px", color: DIM + "80" }}>
        deinestimme.org · 2026
      </div>
    </div>
  );
}
