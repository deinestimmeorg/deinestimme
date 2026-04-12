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
    title: "Für Institutionen",
    sub: "Beteiligung, die in Ergebnissen mündet — nicht in Aktenordnern.",
    problemTitle: "Das Problem",
    problemText: "Bürgerbeteiligung erzeugt oft große Mengen an Beiträgen, die sich nur schwer auswerten und weiterverarbeiten lassen. Die Beiträge sind fragmentiert, die Zuständigkeiten unklar, und am Ende bleibt bei den Beteiligten das Gefühl, dass nichts passiert.",
    solutionTitle: "Der DeineStimme-Ansatz",
    solutionText: "DeineStimme strukturiert Beteiligung so, dass die Ergebnisse direkt verwertbar sind. Vorschläge werden während der Erstellung durch Schreibunterstützung verbessert, durch die Gemeinschaft verfeinert und automatisch der zuständigen Verwaltungsebene zugeordnet.",
    useCasesTitle: "Anwendungsgebiete",
    useCases: [
      { icon: "◈", title: "Kommunale Bürgerbeteiligung", desc: "Bauleitplanung, Verkehrsplanung, Haushaltsplanung — überall wo Bürgerinnen und Bürger Vorschläge machen sollen, die auch umsetzbar sind.", status: "pilotbereit" },
      { icon: "⬡", title: "Partizipative Gesetzgebung", desc: "Strukturierte Eingaben zu Gesetzesentwürfen, die nicht nur gesammelt, sondern verbessert und an die richtige Ebene adressiert werden.", status: "konzept" },
      { icon: "✦", title: "Organisationsentwicklung", desc: "Interne Vorschlagswesen mit derselben Regel: Wer dagegen ist, macht einen besseren Vorschlag. Für Unternehmen, Vereine, Genossenschaften.", status: "konzept" },
      { icon: "◎", title: "Bildungseinrichtungen", desc: "Schüler- und Studierendenparlamente, die konstruktive Beteiligung lernen — mit Werkzeugen, die das Ergebnis verbessern.", status: "konzept" },
    ],
    advantagesTitle: "Vorteile gegenüber klassischen Beteiligungstools",
    advantages: [
      "Schreibunterstützung in Echtzeit — Beiträge werden besser, nicht nur mehr",
      "Gegenvorschlagspflicht — Kritik wird konstruktiv",
      "Zuständigkeitsnavigation — Vorschläge landen an der richtigen Stelle",
      "Reifegradmodell — nur strukturell vollständige Vorschläge werden weitergeleitet",
      "Vollständig Open Source — keine Vendor-Lock-in, keine Lizenzkosten",
      "DSGVO-konform — keine externen Schriftarten, keine Tracker",
    ],
    pilotTitle: "Pilotprojekt starten",
    pilotText: "Wir suchen Kommunen und Organisationen, die DeineStimme in einem konkreten Beteiligungsprozess testen möchten. Das Pilotprojekt umfasst Einrichtung, Anpassung an lokale Strukturen und Begleitung während der Laufzeit.",
    contactBtn: "Kontakt aufnehmen",
    platformBtn: "Plattform ansehen →",
  },
  en: {
    back: "← Back",
    title: "For institutions",
    sub: "Participation that leads to outcomes — not filing cabinets.",
    problemTitle: "The problem",
    problemText: "Public participation often generates large volumes of contributions that are difficult to evaluate and process. Contributions are fragmented, responsibilities unclear, and participants are left feeling that nothing happens.",
    solutionTitle: "The DeineStimme approach",
    solutionText: "DeineStimme structures participation so that results are directly actionable. Proposals are improved through writing support during creation, refined by the community, and automatically assigned to the responsible administrative level.",
    useCasesTitle: "Use cases",
    useCases: [
      { icon: "◈", title: "Municipal participation", desc: "Urban planning, transport planning, budget planning — wherever citizens should make proposals that are actually implementable.", status: "pilot-ready" },
      { icon: "⬡", title: "Participatory legislation", desc: "Structured inputs to legislative drafts that are not just collected but improved and addressed to the right level.", status: "concept" },
      { icon: "✦", title: "Organizational development", desc: "Internal proposal systems with the same rule: if you disagree, make a better proposal. For companies, associations, cooperatives.", status: "concept" },
      { icon: "◎", title: "Educational institutions", desc: "Student parliaments learning constructive participation — with tools that improve the outcome.", status: "concept" },
    ],
    advantagesTitle: "Advantages over traditional participation tools",
    advantages: [
      "Real-time writing support — contributions get better, not just more",
      "Counter-proposal requirement — criticism becomes constructive",
      "Jurisdiction navigation — proposals reach the right place",
      "Maturity model — only structurally complete proposals are forwarded",
      "Fully open source — no vendor lock-in, no license costs",
      "GDPR compliant — no external fonts, no trackers",
    ],
    pilotTitle: "Start a pilot project",
    pilotText: "We are looking for municipalities and organizations that want to test DeineStimme in a concrete participation process. The pilot includes setup, adaptation to local structures and support during the pilot period.",
    contactBtn: "Get in touch",
    platformBtn: "View platform →",
  },
};

function useLang() {
  const [params] = useSearchParams();
  return params.get("lang") || "de";
}

export default function InstitutionPage() {
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

      {/* Problem / Solution */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ background: CARD, border: `1px solid ${T}10`, borderRadius: "4px", padding: "28px", marginBottom: "12px" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: DIM, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>{c.problemTitle}</span>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "15px", lineHeight: 1.7, color: DIM, fontWeight: 300 }}>{c.problemText}</p>
        </div>
        <div style={{ background: T + "08", border: `1px solid ${T}20`, borderRadius: "4px", padding: "28px" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>{c.solutionTitle}</span>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "16px", lineHeight: 1.7, color: SILVER, fontWeight: 300 }}>{c.solutionText}</p>
        </div>
      </div>

      {/* Use Cases */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>{c.useCasesTitle}</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
          {c.useCases.map((u, i) => (
            <div key={i} style={{
              background: CARD, border: `1px solid ${T}10`, borderRadius: "4px", padding: "20px 24px",
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.6s ease ${200 + i * 100}ms`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px", color: T }}>{u.icon}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: SILVER }}>{u.title}</span>
                </div>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: u.status.includes("pilot") ? T : GOLD,
                  background: u.status.includes("pilot") ? T + "15" : GOLD + "15",
                  padding: "3px 8px", borderRadius: "2px",
                }}>{u.status.toUpperCase()}</span>
              </div>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "14px", lineHeight: 1.7, color: DIM, fontWeight: 300 }}>{u.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: T, letterSpacing: ".15em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>{c.advantagesTitle}</span>
        <div style={{ background: CARD, border: `1px solid ${T}10`, borderRadius: "4px", padding: "20px 24px" }}>
          {c.advantages.map((a, i) => (
            <div key={i} style={{
              display: "flex", gap: "12px", alignItems: "flex-start", padding: "8px 0",
              borderBottom: i < c.advantages.length - 1 ? `1px solid ${T}08` : "none",
            }}>
              <span style={{ color: T, fontSize: "10px", marginTop: "5px", flexShrink: 0 }}>▸</span>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "14px", lineHeight: 1.6, color: SILVER, fontWeight: 300 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pilot CTA */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{
          background: T + "06", border: `1px solid ${T}20`, borderRadius: "4px", padding: "32px",
          textAlign: "center",
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: T, display: "block", marginBottom: "12px" }}>{c.pilotTitle}</span>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "16px", lineHeight: 1.7, color: SILVER, fontWeight: 300, maxWidth: "500px", margin: "0 auto 24px" }}>{c.pilotText}</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:gero@deinestimme.org?subject=Pilotprojekt" style={{
              background: T + "15", border: `1px solid ${T}30`, borderRadius: "4px",
              padding: "14px 32px", fontFamily: "'DM Mono', monospace", fontSize: "13px",
              color: T, textDecoration: "none", letterSpacing: ".05em", minHeight: "48px",
              display: "flex", alignItems: "center",
            }}>{c.contactBtn}</a>
            <button onClick={() => navigate("/app")} style={{
              background: "transparent", border: `1px solid ${DIM}40`, borderRadius: "4px",
              padding: "14px 32px", fontFamily: "'DM Mono', monospace", fontSize: "13px",
              color: DIM, cursor: "pointer", letterSpacing: ".05em", minHeight: "48px",
            }}>{c.platformBtn}</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "40px 24px 24px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: DIM }}>gero@deinestimme.org</span>
      </div>
      <div style={{ textAlign: "center", padding: "0 24px 24px", fontFamily: "'DM Mono', monospace", fontSize: "11px", color: DIM + "80" }}>
        deinestimme.org · 2026
      </div>
    </div>
  );
}
