import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const T = "#00C9B0";
const VOID = "#0B0B0F";
const SILVER = "#C0C8D0";
const DIM = "#5A6068";
const CARD = "#111116";
const GOLD = "#E8943A";

const CONTENT = {
  de: {
    back: "← Zurück",
    title: "Mitbauen",
    sub: "DeineStimme baut sich selbst — mit demselben Prinzip, das die Plattform ausmacht.",
    howTitle: "Wie du beitragen kannst",
    ways: [
      { icon: "✦", title: "Vorschläge schreiben", desc: "Geh auf die Plattform und formuliere einen Vorschlag zu einem Thema, das dich beschäftigt. Jeder Beitrag — ob Problembeschreibung oder Lösung — ist wertvoll." },
      { icon: "◇", title: "Gegenvorschläge machen", desc: "Du siehst einen Vorschlag, der nicht weit genug geht oder das Falsche adressiert? Mach einen besseren. So entsteht Qualität." },
      { icon: "◎", title: "Testen und Feedback geben", desc: "Nutze die Werkzeuge, finde Fehler, beschreibe was unklar ist. Jedes Feedback hilft, die Plattform besser zu machen." },
      { icon: "⬡", title: "Code beitragen", desc: "Der gesamte Code ist Open Source (AGPL-3.0). Du kannst Features bauen, Bugs fixen oder die Dokumentation verbessern." },
    ],
    videoTitle: "Erklärvideo",
    videoPlaceholder: "Das Erklärvideo wird gerade produziert. Es zeigt den gesamten Ablauf — vom ersten Gedanken bis zum fertigen Vorschlag.",
    comingSoon: "In Produktion",
    stackTitle: "Technischer Stack",
    stack: [
      { label: "Frontend", value: "React 18 + Vite" },
      { label: "Backend", value: "Supabase (PostgreSQL)" },
      { label: "Deployment", value: "Vercel" },
      { label: "Analyse", value: "Schreibkompass (JS)" },
      { label: "Lizenz", value: "AGPL-3.0" },
    ],
    cta: "Zur Plattform →",
    githubCta: "Code auf GitHub →",
  },
  en: {
    back: "← Back",
    title: "Build with us",
    sub: "DeineStimme builds itself — using the same principle that drives the platform.",
    howTitle: "How you can contribute",
    ways: [
      { icon: "✦", title: "Write proposals", desc: "Go to the platform and formulate a proposal about something that concerns you. Every contribution — whether problem description or solution — is valuable." },
      { icon: "◇", title: "Make counter-proposals", desc: "You see a proposal that doesn't go far enough or addresses the wrong thing? Make a better one. That's how quality emerges." },
      { icon: "◎", title: "Test and give feedback", desc: "Use the tools, find bugs, describe what's unclear. Every piece of feedback helps make the platform better." },
      { icon: "⬡", title: "Contribute code", desc: "All code is open source (AGPL-3.0). You can build features, fix bugs or improve the documentation." },
    ],
    videoTitle: "Explainer video",
    videoPlaceholder: "The explainer video is currently being produced. It will show the entire process — from first thought to finished proposal.",
    comingSoon: "In production",
    stackTitle: "Technical stack",
    stack: [
      { label: "Frontend", value: "React 18 + Vite" },
      { label: "Backend", value: "Supabase (PostgreSQL)" },
      { label: "Deployment", value: "Vercel" },
      { label: "Analysis", value: "Schreibkompass (JS)" },
      { label: "License", value: "AGPL-3.0" },
    ],
    cta: "Go to platform →",
    githubCta: "Code on GitHub →",
  },
};

function useLang() {
  const [params] = useSearchParams();
  return params.get("lang") || "de";
}

export default function MitbauenPage() {
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
          fontSize: "12px", cursor: "pointer", letterSpacing: ".05em", padding: "8px 0", minHeight: "44px",
          display: "flex", alignItems: "center",
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

      {/* Ways to contribute */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>{c.howTitle}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {c.ways.map((w, i) => (
            <div key={i} style={{
              background: CARD, border: `1px solid ${T}10`, borderRadius: "4px", padding: "20px 24px",
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.6s ease ${200 + i * 100}ms`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ fontSize: "16px", color: T }}>{w.icon}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: SILVER }}>{w.title}</span>
              </div>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "15px", lineHeight: 1.7, color: DIM, fontWeight: 300 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video placeholder */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>{c.videoTitle}</span>
        <div style={{
          background: CARD, border: `1px solid ${T}10`, borderRadius: "4px", padding: "48px 24px",
          textAlign: "center",
        }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%", border: `1px solid ${T}30`,
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
          }}>
            <div style={{ width: 0, height: 0, borderLeft: `18px solid ${T}40`, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", marginLeft: "4px" }} />
          </div>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "15px", lineHeight: 1.7, color: DIM, fontWeight: 300, maxWidth: "400px", margin: "0 auto 16px" }}>{c.videoPlaceholder}</p>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: ".1em",
            textTransform: "uppercase", color: GOLD, background: GOLD + "15",
            padding: "3px 8px", borderRadius: "2px",
          }}>{c.comingSoon}</span>
        </div>
      </div>

      {/* Stack */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>{c.stackTitle}</span>
        <div style={{ background: CARD, border: `1px solid ${T}10`, borderRadius: "4px", padding: "20px 24px" }}>
          {c.stack.map((s, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "8px 0",
              borderBottom: i < c.stack.length - 1 ? `1px solid ${T}08` : "none",
            }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: DIM }}>{s.label}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: SILVER }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => navigate("/app")} style={{
          background: T + "12", border: `1px solid ${T}30`, borderRadius: "4px",
          padding: "14px 32px", fontFamily: "'DM Mono', monospace", fontSize: "13px",
          color: T, cursor: "pointer", letterSpacing: ".05em", minHeight: "48px",
        }}>{c.cta}</button>
        <button onClick={() => window.open("https://github.com/deinestimmeorg/deinestimme", "_blank")} style={{
          background: "transparent", border: `1px solid ${DIM}40`, borderRadius: "4px",
          padding: "14px 32px", fontFamily: "'DM Mono', monospace", fontSize: "13px",
          color: DIM, cursor: "pointer", letterSpacing: ".05em", minHeight: "48px",
        }}>{c.githubCta}</button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "24px", fontFamily: "'DM Mono', monospace", fontSize: "11px", color: DIM + "80" }}>
        deinestimme.org · 2026
      </div>
    </div>
  );
}
