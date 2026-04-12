import { useState, useCallback, useRef, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import ProposalComposer from "./components/ProposalComposer";
import LivePulse from "./components/LivePulse";
import { supabase } from "./supabaseClient";
import { T } from "./tokens";
import { TOPICS, LEITPRINZIPIEN, TIMELINE, WIRTSCHAFT_BEISPIELE, INFRASTRUKTUR_SOUVERAENITAET } from "./content";

function Badge({ children, color = T.accent, bg = T.accentDim }) {
  return <span style={{ fontSize: 10, fontWeight: 600, fontFamily: T.mono, color, background: bg, padding: "2px 7px", borderRadius: "4px", letterSpacing: "0.03em", textTransform: "uppercase" }}>{children}</span>;
}

// ─── IMPACT ASSESSMENT ───
const IMPACT_DIMENSIONS = [
  { id: "wirtschaft", label: "Wirtschaft", icon: "W", color: T.gold, desc: "Arbeitsplätze, Märkte, Kosten, Wertschöpfung" },
  { id: "gesundheit", label: "Gesundheit", icon: "G", color: T.green, desc: "Physisches und psychisches Wohlbefinden" },
  { id: "bildung", label: "Bildung & Kultur", icon: "B", color: T.blue, desc: "Wissen, Diversität, neue Perspektiven" },
  { id: "technik", label: "Technisch", icon: "T", color: T.purple, desc: "Machbarkeit, Infrastruktur, Innovation" },
  { id: "sozial", label: "Sozial & Zusammenleben", icon: "S", color: T.accent, desc: "Gemeinschaft, Integration, Vertrauen" },
  { id: "umwelt", label: "Umwelt", icon: "U", color: T.green, desc: "Klima, Ressourcen, Nachhaltigkeit" },
];

const SAMPLE_IMPACT = {
  proposalText: "Dauerhafte Normalzeit (MEZ, UTC+1) + gesetzlicher Anspruch auf Gleitzeit",
  dimensions: [
    {
      id: "wirtschaft",
      chance: { score: 65, text: "Flexible Arbeitszeiten können Produktivität steigern. Neue Dienstleistungen rund um Gleitzeitmanagement." },
      gefahr: { score: 30, text: "Branchen mit festen Schichten (Produktion, Pflege) können Gleitzeit schwer umsetzen." },
      mitigation: { text: "Branchenspezifische Ausnahmen mit Kompensation. Schichtarbeiter erhalten Zuschlag für Frühschicht in dunklen Monaten.", count: 3 },
      netEffect: "chance",
    },
    {
      id: "gesundheit",
      chance: { score: 85, text: "Normalzeit entspricht dem Biorhythmus. Weniger Herzinfarkte, besserer Schlaf, weniger Unfälle in der Umstellungswoche." },
      gefahr: { score: 10, text: "Manche Menschen bevorzugen subjektiv längere Abende im Sommer." },
      mitigation: { text: "Aufklärung über Chronobiologie. Freizeitangebote in Morgenstunden ausbauen.", count: 1 },
      netEffect: "chance",
    },
    {
      id: "bildung",
      chance: { score: 70, text: "Schulbeginn ab 9:00 verbessert Lernleistung nachweislich. Chronobiologie als Schulfach — neues Verständnis für natürliche Rhythmen." },
      gefahr: { score: 15, text: "Eltern mit frühem Arbeitsbeginn brauchen Betreuungslösungen." },
      mitigation: { text: "Frühbetreuung an Schulen. Arbeitgeber-Kooperation für familienfreundliche Gleitzeit.", count: 4 },
      netEffect: "chance",
    },
    {
      id: "technik",
      chance: { score: 95, text: "Triviale Umstellung — Software-Updates, fertig. Einmalige Aktion. Weniger Fehlerquellen als halbjährliche Umstellung." },
      gefahr: { score: 5, text: "Legacy-Systeme in manchen Branchen brauchen manuelle Anpassung." },
      mitigation: null,
      netEffect: "chance",
    },
    {
      id: "sozial",
      chance: { score: 50, text: "Signal: Politik hört auf Wissenschaft UND Bevölkerung. Vertrauensgewinn. Weniger Streit um 'Sommer vs. Winter'." },
      gefahr: { score: 25, text: "Emotionale Bindung an 'lange Sommerabende'. Kultureller Widerstand." },
      mitigation: { text: "Framing: Es geht nicht um weniger Sommer, sondern um gesündere Morgen. Kampagne mit Chronobiologen.", count: 2 },
      netEffect: "chance",
    },
  ],
};

function ImpactBar({ dimension, data, onAddMitigation }) {
  const [expanded, setExpanded] = useState(false);
  const dim = IMPACT_DIMENSIONS.find(d => d.id === dimension);
  const netScore = data.chance.score - data.gefahr.score;
  const barWidth = Math.abs(netScore);
  const isPositive = netScore >= 0;

  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "14px 16px", marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: dim.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: T.mono, fontWeight: 700, color: dim.color, flexShrink: 0 }}>{dim.icon}</div>
        <span style={{ color: T.text, fontSize: 14, fontWeight: 500, fontFamily: T.sans, flex: 1 }}>{dim.label}</span>
        <span style={{ color: isPositive ? T.green : T.coral, fontSize: 13, fontFamily: T.mono, fontWeight: 600 }}>
          {isPositive ? "+" : ""}{netScore}
        </span>
        <span style={{ color: T.textDim, fontSize: 12 }}>{expanded ? "▾" : "▸"}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 4, height: 20 }}>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: `${!isPositive ? barWidth : 0}%`, height: 6, background: T.coral, borderRadius: "3px 0 0 3px", transition: "width 0.4s" }} />
        </div>
        <div style={{ width: 2, height: 14, background: T.textDim, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ width: `${isPositive ? barWidth : 0}%`, height: 6, background: T.green, borderRadius: "0 3px 3px 0", transition: "width 0.4s" }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <span style={{ color: T.coral, fontSize: 10, fontFamily: T.mono }}>gefahr {data.gefahr.score}</span>
        <span style={{ color: T.green, fontSize: 10, fontFamily: T.mono }}>chance {data.chance.score}</span>
      </div>

      {expanded && (
        <div style={{ marginTop: 12, borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.green }} />
              <span style={{ color: T.green, fontSize: 11, fontFamily: T.mono, fontWeight: 600 }}>CHANCE</span>
            </div>
            <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: 0, paddingLeft: 14 }}>{data.chance.text}</p>
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.coral }} />
              <span style={{ color: T.coral, fontSize: 11, fontFamily: T.mono, fontWeight: 600 }}>GEFAHR</span>
            </div>
            <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: 0, paddingLeft: 14 }}>{data.gefahr.text}</p>
          </div>

          <div style={{ background: data.mitigation ? T.accentDim : T.coralDim, borderRadius: T.r, padding: "10px 14px", borderLeft: `3px solid ${data.mitigation ? T.accent : T.coral}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ color: data.mitigation ? T.accent : T.coral, fontSize: 11, fontFamily: T.mono, fontWeight: 600 }}>
                {data.mitigation ? "LÖSUNGSVORSCHLAG FÜR GEFAHR" : "NOCH KEIN LÖSUNGSVORSCHLAG"}
              </span>
              {data.mitigation && <Badge color={T.accent} bg={T.accentDim}>{data.mitigation.count} vorschläge</Badge>}
            </div>
            {data.mitigation ? (
              <p style={{ color: T.silver, fontSize: 12, fontFamily: T.sans, lineHeight: 1.5, margin: "4px 0 0" }}>{data.mitigation.text}</p>
            ) : (
              <p style={{ color: T.silver, fontSize: 12, fontFamily: T.sans, lineHeight: 1.5, margin: "4px 0 0" }}>
                Hier fehlt noch ein Vorschlag, wie mit dieser Gefahr umgegangen werden kann.
              </p>
            )}
            <button onClick={() => onAddMitigation(dimension)} style={{ marginTop: 8, background: "none", border: `1px solid ${data.mitigation ? T.accent + "44" : T.coral + "44"}`, borderRadius: T.r, padding: "4px 12px", color: data.mitigation ? T.accent : T.coral, fontSize: 11, fontFamily: T.mono, cursor: "pointer" }}>
              + {data.mitigation ? "besseren vorschlag" : "lösung vorschlagen"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ImpactAssessment({ impact, onAddMitigation }) {
  const totalChance = impact.dimensions.reduce((s, d) => s + d.chance.score, 0);
  const totalGefahr = impact.dimensions.reduce((s, d) => s + d.gefahr.score, 0);
  const netTotal = totalChance - totalGefahr;
  const unmitgated = impact.dimensions.filter(d => !d.mitigation).length;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ color: T.accent, fontSize: 12, fontFamily: T.mono, fontWeight: 600 }}>WIRKUNGSANALYSE</span>
        <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono }}>|</span>
        <span style={{ color: T.silver, fontSize: 12, fontFamily: T.sans, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{impact.proposalText}</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1, background: T.greenDim, borderRadius: T.r, padding: "10px 12px", border: `1px solid ${T.green}22` }}>
          <span style={{ color: T.green, fontSize: 10, fontFamily: T.mono, display: "block" }}>gesamtchance</span>
          <span style={{ color: T.green, fontSize: 22, fontWeight: 700, fontFamily: T.mono }}>{totalChance}</span>
        </div>
        <div style={{ flex: 1, background: T.coralDim, borderRadius: T.r, padding: "10px 12px", border: `1px solid ${T.coral}22` }}>
          <span style={{ color: T.coral, fontSize: 10, fontFamily: T.mono, display: "block" }}>gesamtgefahr</span>
          <span style={{ color: T.coral, fontSize: 22, fontWeight: 700, fontFamily: T.mono }}>{totalGefahr}</span>
        </div>
        <div style={{ flex: 1, background: netTotal >= 0 ? T.accentDim : T.coralDim, borderRadius: T.r, padding: "10px 12px", border: `1px solid ${netTotal >= 0 ? T.accent : T.coral}22` }}>
          <span style={{ color: netTotal >= 0 ? T.accent : T.coral, fontSize: 10, fontFamily: T.mono, display: "block" }}>netto</span>
          <span style={{ color: netTotal >= 0 ? T.accent : T.coral, fontSize: 22, fontWeight: 700, fontFamily: T.mono }}>{netTotal >= 0 ? "+" : ""}{netTotal}</span>
        </div>
      </div>

      {unmitgated > 0 && (
        <div style={{ background: T.goldDim, border: `1px solid ${T.gold}22`, borderRadius: T.r, padding: "8px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: T.gold, fontSize: 14, fontFamily: T.mono }}>!</span>
          <span style={{ color: T.gold, fontSize: 12, fontFamily: T.sans }}>{unmitgated} Gefahrenbereich{unmitgated > 1 ? "e" : ""} ohne Lösungsvorschlag — hier kannst du helfen</span>
        </div>
      )}

      {impact.dimensions.map(d => (
        <ImpactBar key={d.id} dimension={d.id} data={d} onAddMitigation={onAddMitigation} />
      ))}

      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "14px 16px", marginTop: 8 }}>
        <span style={{ color: T.silver, fontSize: 11, fontFamily: T.mono, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Vertrauensindikator</span>
        <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono }}>gefahren adressiert</span>
            <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
              {impact.dimensions.map(d => (
                <div key={d.id} style={{ flex: 1, height: 6, borderRadius: 3, background: d.mitigation ? T.accent : T.coral + "44" }} />
              ))}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono }}>score</span>
            <div style={{ color: T.accent, fontSize: 18, fontFamily: T.mono, fontWeight: 700 }}>
              {Math.round((impact.dimensions.filter(d => d.mitigation).length / impact.dimensions.length) * 100)}%
            </div>
          </div>
        </div>
        <p style={{ color: T.textDim, fontSize: 11, fontFamily: T.sans, margin: "8px 0 0", lineHeight: 1.4 }}>
          Je mehr Gefahren mit Lösungsvorschlägen adressiert sind, desto höher das Vertrauen. Der "Angreifer" wird zum Lösungsbringer.
        </p>
      </div>
    </div>
  );
}

// ─── META-DEVELOPMENT: DEINESTIMME BUILDS ITSELF ───
const BUILD_NEEDS = [
  { id: "n1", category: "Frontend", status: "offen", priority: "hoch", title: "Pol.is-artiges Opinion-Clustering", description: "ML-basierte Gruppierung ähnlicher Vorschläge mit visueller Darstellung der Meinungslandschaft.", skills: ["Machine Learning", "React", "D3.js / Dataviz"], supportCount: 0, proposals: 0 },
  { id: "n2", category: "Backend", status: "offen", priority: "hoch", title: "Authentifizierung: eine Stimme pro Person", description: "Sicherstellen, dass jeder Mensch nur einmal abstimmt, ohne unnötige Datensammlung.", skills: ["Auth/Security", "Node.js / Python", "Datenschutz / DSGVO"], supportCount: 0, proposals: 0 },
  { id: "n3", category: "Backend", status: "in arbeit", priority: "hoch", title: "Supabase Backend + Persistenz", description: "Persistenz-Layer für alle Daten: Themen, Vorschläge, Abstimmungen, Nutzerprofile. REST API + Realtime für Live-Updates.", skills: ["Supabase", "PostgreSQL", "API Design"], supportCount: 0, proposals: 0 },
  { id: "n4", category: "KI", status: "offen", priority: "mittel", title: "Automatische Themen-Zusammenfassung", description: "KI-gestützte Zusammenfassung jedes Themas: Was wurde gesagt, wo liegt der Konsens, was ist strittig.", skills: ["LLM Integration", "NLP", "Prompt Engineering"], supportCount: 0, proposals: 0 },
  { id: "n5", category: "Recht", status: "offen", priority: "mittel", title: "Automatischer Rechtscheck ab Schwellenwert", description: "Ab einer definierten Stimmenzahl: automatische Analyse, welche Gesetze betroffen sind.", skills: ["Jura / Verwaltungsrecht", "Legal Tech", "API zu Rechtsdatenbanken"], supportCount: 0, proposals: 0 },
  { id: "n6", category: "Design", status: "offen", priority: "mittel", title: "Barrierefreiheit + Mobile-First", description: "WCAG 2.1 AA konform. Screenreader-Support. Touch-optimiert. Leichte Sprache als Option.", skills: ["Accessibility / WCAG", "Mobile UI/UX", "Leichte Sprache"], supportCount: 0, proposals: 0 },
  { id: "n7", category: "Content", status: "offen", priority: "mittel", title: "Blick über den Tellerrand — Länderdatenbank", description: "Für jedes Thema: Wie handhaben es andere Länder?", skills: ["Research", "API Integration", "Datenkuratierung"], supportCount: 0, proposals: 0 },
  { id: "n8", category: "Community", status: "offen", priority: "hoch", title: "Moderations-System ohne Zensur", description: "Community-getragene Qualitätssicherung. Kein Löschen, aber Kennzeichnung: sachlich/emotional, quellenbasiert/meinungsbasiert.", skills: ["Community Management", "Trust & Safety", "UX Design"], supportCount: 0, proposals: 0 },
  { id: "n9", category: "Video", status: "offen", priority: "niedrig", title: "Erklärvideo-Pipeline pro Thema", description: "Jedes Thema bekommt ein kurzes Video (2-5 Min).", skills: ["Videoproduktion", "Motion Graphics", "KI-Video"], supportCount: 0, proposals: 0 },
  { id: "n10", category: "Infrastruktur", status: "offen", priority: "mittel", title: "Übertragbarkeit — i18n + White-Label", description: "Mehrsprachigkeit, kulturelle Anpassung, White-Label-Fähigkeit.", skills: ["i18n/l10n", "React", "Konfigurationsmanagement"], supportCount: 0, proposals: 0 },
];

function NeedCard({ need, onPropose }) {
  const [expanded, setExpanded] = useState(false);
  const priorityColors = { hoch: T.coral, mittel: T.gold, niedrig: T.silver };
  const catColors = { Frontend: T.blue, Backend: T.purple, KI: T.accent, Recht: T.gold, Design: T.green, Content: T.coral, Community: T.accent, Video: T.gold, Infrastruktur: T.silver };

  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "14px 16px", transition: "all 0.2s" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
        <Badge color={catColors[need.category] || T.silver} bg={(catColors[need.category] || T.silver) + "22"}>{need.category}</Badge>
        <Badge color={priorityColors[need.priority]} bg={priorityColors[need.priority] + "22"}>{need.priority}</Badge>
        <Badge color={T.textMuted} bg={T.surfaceActive}>{need.status}</Badge>
      </div>
      <p style={{ color: T.text, fontSize: 14, fontWeight: 500, fontFamily: T.sans, margin: "0 0 4px", lineHeight: 1.4, cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
        {need.title} <span style={{ color: T.textDim, fontSize: 12 }}>{expanded ? "▾" : "▸"}</span>
      </p>
      {expanded && (
        <div style={{ marginTop: 8 }}>
          <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: "0 0 10px" }}>{need.description}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono }}>gesucht:</span>
            {need.skills.map((s, i) => (
              <span key={i} style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, padding: "2px 8px", background: T.accentDim, borderRadius: T.r }}>{s}</span>
            ))}
          </div>
          <button onClick={() => onPropose(need.id)} style={{ background: T.accentDim, border: `1px solid ${T.accent}44`, borderRadius: T.r, padding: "5px 12px", color: T.accent, fontSize: 11, fontFamily: T.mono, fontWeight: 600, cursor: "pointer" }}>+ ich kann helfen / vorschlag</button>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP (v0.4) ───
export default function DeineStimmeApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("themen");
  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [mitigationTarget, setMitigationTarget] = useState(null);
  const [mitigationText, setMitigationText] = useState("");

  // Check for returning user
  useEffect(() => {
    const localId = localStorage.getItem('deinestimme_user_id');
    const localName = localStorage.getItem('deinestimme_name');
    const sessionId = sessionStorage.getItem('deinestimme_user_id');
    const sessionName = sessionStorage.getItem('deinestimme_name');

    if (localId && localName) {
      setCurrentUser({ id: localId, display_name: localName, is_permanent: true });
    } else if (sessionId && sessionName) {
      setCurrentUser({ id: sessionId, display_name: sessionName, is_permanent: false });
    }
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('public:proposals')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'proposals' }, payload => {
        console.log('Neuer Vorschlag eingetroffen!', payload.new);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Guard: no user → welcome screen
  if (!currentUser) {
    return <WelcomeScreen onComplete={setCurrentUser} />;
  }

  const handleAddMitigation = (dimId) => {
    setMitigationTarget(dimId);
    setMitigationText("");
  };

  const handleProposalSubmit = (proposal) => {
    console.log("Proposal submitted:", proposal);
    // TODO: Insert into Supabase
    setTimeout(() => setComposerOpen(false), 2000);
  };

  const tabs = [
    { id: "themen", label: "Themen" },
    { id: "vorschlag", label: "Vorschlag einreichen" },
    { id: "impact", label: "Wirkungsanalyse" },
    { id: "timeline", label: "Fahrplan" },
    { id: "build", label: "Mitbauen" },
    { id: "needs", label: "Was wir brauchen" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.sans, padding: "20px 14px", maxWidth: 720, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <span style={{ fontFamily: T.mono, fontSize: 20, fontWeight: 700, color: T.accent }}>deine</span>
            <span style={{ fontFamily: T.mono, fontSize: 20, fontWeight: 700, color: T.text }}>stimme</span>
            <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim }}>.org</span>
          </div>
          <p style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono, margin: "2px 0 0" }}>v0.4 — schreibassistent + schwarm</p>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ color: currentUser.is_permanent ? T.accent : T.text, fontSize: 13, fontFamily: T.mono, fontWeight: 600 }}>
            {currentUser.display_name}
          </span>
          <p style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono, margin: "2px 0 0" }}>
            {currentUser.is_permanent ? "Pionier" : "Flüchtig"}
          </p>
        </div>
      </div>

      {/* Live Pulse — Schwarm */}
      <div style={{ marginBottom: 16 }}>
        <LivePulse isConnected={true} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setView(t.id); if (t.id === "vorschlag") setComposerOpen(true); }} style={{
            background: view === t.id ? T.surfaceActive : "transparent",
            border: `1px solid ${view === t.id ? T.borderHover : "transparent"}`,
            borderRadius: T.r, padding: "7px 14px",
            color: view === t.id ? (t.id === "vorschlag" ? T.accent : T.text) : T.textMuted,
            fontSize: 12, fontFamily: T.mono, cursor: "pointer",
            fontWeight: view === t.id ? 600 : 400,
          }}>{t.label}</button>
        ))}
      </div>

      {/* ═══ LEITPRINZIPIEN (always visible) ═══ */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {LEITPRINZIPIEN.map(lp => (
          <div key={lp.id} style={{
            flex: 1, padding: "8px 10px", background: T.surface,
            border: `1px solid ${T.border}`, borderRadius: T.r,
          }}>
            <span style={{ color: T.accent, fontSize: 10, fontFamily: T.mono, fontWeight: 700 }}>{lp.icon}</span>
            <p style={{ color: T.textMuted, fontSize: 10, fontFamily: T.sans, margin: "2px 0 0", lineHeight: 1.3 }}>{lp.label}</p>
          </div>
        ))}
      </div>

      {/* ═══ THEMEN VIEW ═══ */}
      {view === "themen" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: 0 }}>
              Die Themen kommen aus dem Grundsatzprogramm, dem Bürgerprogramm und dem Wirtschaftsprogramm.
              Jedes Thema kann Vorschläge erhalten, die über die Wirkungsanalyse bewertet werden.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TOPICS.map(topic => {
              const catColors = { Sozial: T.accent, Infrastruktur: T.purple, Wirtschaft: T.gold, Bildung: T.blue, Demokratie: T.green, Verfassung: T.coral, Umwelt: T.green };
              return (
                <div key={topic.id} style={{
                  background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl,
                  padding: "14px 16px", cursor: "pointer", transition: "all 0.2s",
                }} onClick={() => { setSelectedTopic(topic); setView("vorschlag"); }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap", alignItems: "center" }}>
                    <Badge color={catColors[topic.category] || T.silver} bg={(catColors[topic.category] || T.silver) + "22"}>
                      {topic.category}
                    </Badge>
                    <span style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono }}>{topic.source}</span>
                  </div>
                  <p style={{ color: T.text, fontSize: 14, fontWeight: 500, fontFamily: T.sans, margin: "0 0 4px", lineHeight: 1.4 }}>
                    {topic.title}
                  </p>
                  <p style={{ color: T.silver, fontSize: 12, fontFamily: T.sans, lineHeight: 1.5, margin: 0 }}>
                    {topic.desc}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                    <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono }}>
                      {topic.proposalCount} vorschläge · {topic.voteCount} stimmen
                    </span>
                    <span style={{ color: T.accent, fontSize: 11, fontFamily: T.mono }}>vorschlag einreichen →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wirtschaft Beispiele */}
          <div style={{ background: T.surface, border: `1px solid ${T.gold}22`, borderRadius: T.rl, padding: "16px", marginTop: 16 }}>
            <span style={{ color: T.gold, fontSize: 11, fontFamily: T.mono, fontWeight: 600, textTransform: "uppercase" }}>
              Verantwortungs-Freiheits-Tausch — Beispiele
            </span>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {WIRTSCHAFT_BEISPIELE.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", background: T.bg, borderRadius: T.r, fontSize: 12 }}>
                  <span style={{ color: T.gold, fontFamily: T.mono, fontWeight: 600, minWidth: 80 }}>{b.branche}</span>
                  <span style={{ color: T.silver, fontFamily: T.sans, flex: 1 }}>{b.verantwortung}</span>
                  <span style={{ color: T.accent, fontFamily: T.mono, fontSize: 10 }}>→</span>
                  <span style={{ color: T.accent, fontFamily: T.sans, flex: 1, fontSize: 11 }}>{b.freiheit}</span>
                </div>
              ))}
            </div>
            <p style={{ color: T.textDim, fontSize: 11, fontFamily: T.sans, margin: "10px 0 0", fontStyle: "italic" }}>
              Wirtschaft ist Bewirtung. Nährt Ihr Unternehmen?
            </p>
          </div>

          {/* Infrastruktur Souveränität */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "16px", marginTop: 12 }}>
            <span style={{ color: T.silver, fontSize: 11, fontFamily: T.mono, fontWeight: 600, textTransform: "uppercase" }}>
              Wem gehört das Nervensystem?
            </span>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
              {INFRASTRUKTUR_SOUVERAENITAET.map((inf, i) => {
                const statusColor = { kritisch: T.coral, warnung: T.gold, gesichert: T.green };
                return (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 10px", background: T.bg, borderRadius: T.r }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor[inf.status], flexShrink: 0 }} />
                    <span style={{ color: T.text, fontSize: 12, fontFamily: T.mono, fontWeight: 600, minWidth: 100 }}>{inf.bereich}</span>
                    <span style={{ color: T.silver, fontSize: 11, fontFamily: T.sans, flex: 1 }}>{inf.detail}</span>
                    <Badge color={statusColor[inf.status]} bg={statusColor[inf.status] + "22"}>{inf.status}</Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ TIMELINE VIEW ═══ */}
      {view === "timeline" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: 0 }}>
              Wir kommen um zu gehen. Dieser Plan ist der Weg — von der Vereinsgründung bis zur Überflüssigkeit.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {TIMELINE.map((phase, i) => {
              const statusColors = { aktiv: T.accent, geplant: T.gold, vision: T.purple };
              return (
                <div key={phase.phase} style={{
                  background: T.surface, border: `1px solid ${phase.status === "aktiv" ? T.accent + "33" : T.border}`,
                  borderRadius: T.rl, padding: "16px", position: "relative",
                  borderLeft: `3px solid ${statusColors[phase.status]}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: statusColors[phase.status], fontSize: 24, fontFamily: T.mono, fontWeight: 700, opacity: 0.4 }}>{phase.phase}</span>
                      <div>
                        <span style={{ color: T.text, fontSize: 15, fontWeight: 600, fontFamily: T.sans }}>{phase.title}</span>
                        <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono, display: "block" }}>{phase.zeitraum}</span>
                      </div>
                    </div>
                    <Badge color={statusColors[phase.status]} bg={statusColors[phase.status] + "22"}>{phase.status}</Badge>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
                    {phase.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: statusColors[phase.status], marginTop: 6, flexShrink: 0, opacity: 0.5 }} />
                        <span style={{ color: T.silver, fontSize: 12, fontFamily: T.sans, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final note */}
          <div style={{ textAlign: "center", marginTop: 20, padding: "16px" }}>
            <p style={{ color: T.textDim, fontSize: 12, fontFamily: T.sans, fontStyle: "italic", lineHeight: 1.6 }}>
              Maßstab: Wenn es ohne uns funktioniert, haben wir unseren Job gemacht.
            </p>
          </div>
        </div>
      )}

      {/* ═══ VORSCHLAG VIEW (v0.4) ═══ */}
      {view === "vorschlag" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: 0 }}>
              Deine Stimme wird gehört. Schreibe frei — die Plattform hilft dir dabei, aus einer Beobachtung
              einen konkreten Vorschlag zu formen. Jeder Beitrag ist Energie, die in den gemeinsamen Prozess fließt.
            </p>
          </div>

          <ProposalComposer
            topicTitle={selectedTopic?.title || "Freier Vorschlag"}
            onSubmit={handleProposalSubmit}
            currentUser={currentUser}
          />

          {/* How it works */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "16px", marginTop: 16 }}>
            <span style={{ color: T.silver, fontSize: 11, fontFamily: T.mono, fontWeight: 600, textTransform: "uppercase" }}>Wie funktioniert das?</span>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { step: "1", text: "Schreibe frei was dich beschäftigt — es gibt kein falsch. Auch eine Beobachtung ohne Lösung ist wertvoll." },
                { step: "2", text: "Während du schreibst, zeigt dir die Anzeige ob du gerade beschreibst oder bereits einen Lösungsansatz formulierst." },
                { step: "3", text: "Beides kann eingereicht werden. Beschreibungen geben Kontext. Lösungen bringen die Diskussion voran." },
                { step: "4", text: "Andere können auf deinem Beitrag aufbauen, ihn verfeinern, oder einen besseren Vorschlag einreichen." },
                { step: "5", text: "Die Kernregel bleibt: Wer dagegen ist, macht einen besseren Vorschlag. So entsteht Energie statt Blockade." },
              ].map(s => (
                <div key={s.step} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: T.accent, fontSize: 12, fontFamily: T.mono, fontWeight: 700, minWidth: 18, marginTop: 1 }}>{s.step}.</span>
                  <span style={{ color: T.silver, fontSize: 12, fontFamily: T.sans, lineHeight: 1.5 }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ IMPACT VIEW ═══ */}
      {view === "impact" && (
        <div>
          <ImpactAssessment impact={SAMPLE_IMPACT} onAddMitigation={handleAddMitigation} />

          {mitigationTarget && (
            <div style={{ marginTop: 12, background: T.surface, border: `1px solid ${T.accent}33`, borderRadius: T.rl, padding: "16px", boxShadow: `0 0 24px ${T.accent}08` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ color: T.accent, fontSize: 12, fontFamily: T.mono, fontWeight: 600 }}>
                  LÖSUNG FÜR: {IMPACT_DIMENSIONS.find(d => d.id === mitigationTarget)?.label}
                </span>
                <button onClick={() => setMitigationTarget(null)} style={{ background: "none", border: "none", color: T.textMuted, fontSize: 16, cursor: "pointer" }}>×</button>
              </div>
              <p style={{ color: T.silver, fontSize: 12, fontFamily: T.sans, margin: "0 0 10px", lineHeight: 1.5 }}>
                Wie kann die Gefahr in diesem Bereich adressiert werden? Dein Vorschlag verwandelt das Risiko in eine Chance — und baut Vertrauen.
              </p>
              <textarea value={mitigationText} onChange={e => setMitigationText(e.target.value)} placeholder="Konkreter Lösungsvorschlag..." rows={3} style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.r, padding: "9px 12px", color: T.text, fontSize: 13, fontFamily: T.sans, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <button disabled={mitigationText.trim().length < 10} onClick={() => { setMitigationTarget(null); setMitigationText(""); }} style={{ background: mitigationText.trim().length >= 10 ? T.accent : T.surfaceActive, color: mitigationText.trim().length >= 10 ? T.bg : T.textDim, border: "none", borderRadius: T.r, padding: "7px 18px", fontSize: 12, fontFamily: T.mono, fontWeight: 600, cursor: mitigationText.trim().length >= 10 ? "pointer" : "default" }}>EINREICHEN</button>
              </div>
            </div>
          )}

          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "16px", marginTop: 16 }}>
            <span style={{ color: T.silver, fontSize: 11, fontFamily: T.mono, fontWeight: 600, textTransform: "uppercase" }}>Wie funktioniert die Wirkungsanalyse?</span>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { step: "1", text: "Jeder Vorschlag wird in 6 Dimensionen bewertet: Wirtschaft, Gesundheit, Bildung, Technik, Sozial, Umwelt" },
                { step: "2", text: "Pro Dimension: Was ist die Chance? Was ist die Gefahr? — ehrlich, transparent, ohne Schönfärberei" },
                { step: "3", text: "Für jede Gefahr: Wer einen Vorschlag macht, der woanders Schaden verursacht, schlägt gleichzeitig eine Lösung vor" },
                { step: "4", text: "Der 'Angreifer' wird zum Lösungsbringer — das baut Vertrauen statt Feindbilder" },
                { step: "5", text: "Der Vertrauensindikator zeigt: Sind alle Gefahren adressiert? Je höher, desto reifer der Vorschlag" },
              ].map(s => (
                <div key={s.step} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: T.accent, fontSize: 12, fontFamily: T.mono, fontWeight: 700, minWidth: 18, marginTop: 1 }}>{s.step}.</span>
                  <span style={{ color: T.silver, fontSize: 12, fontFamily: T.sans, lineHeight: 1.5 }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ META-BUILD VIEW ═══ */}
      {view === "build" && (
        <div>
          <div style={{ background: T.accentDim, border: `1px solid ${T.accent}22`, borderRadius: T.rl, padding: "16px", marginBottom: 16 }}>
            <span style={{ color: T.accent, fontSize: 13, fontFamily: T.mono, fontWeight: 600 }}>DeineStimme baut sich selbst.</span>
            <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: "8px 0 0" }}>
              Die Plattform nutzt ihren eigenen Mechanismus für ihre eigene Entwicklung. Jedes Feature, jede Verbesserung, jeder Bug-Fix kann als Vorschlag eingereicht werden — mit der gleichen Regel: kein Dagegen ohne Alternative.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { title: "Wie wird das Clustering der Vorschläge implementiert?", votes: 34, proposals: 3, status: "in diskussion" },
              { title: "Mobile App oder Progressive Web App?", votes: 28, proposals: 5, status: "in diskussion" },
              { title: "Welches Auth-System schützt Privatsphäre UND verhindert Mehrfachabstimmung?", votes: 22, proposals: 4, status: "in diskussion" },
              { title: "Soll die KI Zusammenfassungen automatisch oder auf Anfrage erstellen?", votes: 15, proposals: 2, status: "offen" },
              { title: "Wie werden Experten eingebunden ohne Hierarchie zu erzeugen?", votes: 41, proposals: 6, status: "in diskussion" },
            ].map((item, i) => (
              <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ color: T.text, fontSize: 13, fontWeight: 500, fontFamily: T.sans, margin: 0, lineHeight: 1.4, flex: 1 }}>{item.title}</p>
                  <Badge color={T.gold} bg={T.goldDim}>{item.status}</Badge>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8, color: T.textMuted, fontSize: 11, fontFamily: T.mono }}>
                  <span>{item.votes} stimmen</span>
                  <span>{item.proposals} vorschläge</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ NEEDS VIEW ═══ */}
      {view === "needs" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: 0 }}>
              Was wir brauchen, um DeineStimme zu bauen. Jeder Punkt ist ein offener Baustein — wenn du die Skills hast oder jemanden kennst, melde dich.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <Badge color={T.coral} bg={T.coralDim}>4 hoch</Badge>
            <Badge color={T.gold} bg={T.goldDim}>4 mittel</Badge>
            <Badge color={T.silver} bg={T.surfaceActive}>2 niedrig</Badge>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {BUILD_NEEDS.sort((a, b) => {
              const p = { hoch: 0, mittel: 1, niedrig: 2 };
              return p[a.priority] - p[b.priority];
            }).map(n => (
              <NeedCard key={n.id} need={n} onPropose={(id) => alert(`Vorschlag für ${id} — kommt in v0.5`)} />
            ))}
          </div>

          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "16px", marginTop: 16 }}>
            <span style={{ color: T.silver, fontSize: 11, fontFamily: T.mono, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Wo wir diese Menschen finden</span>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { name: "Code for Germany / Code for All", desc: "Civic Tech Community — genau unser Feld", url: "codefor.de", color: T.accent },
                { name: "Pol.is Open Source Community", desc: "ML-Clustering für Deliberation", url: "github.com/compdemocracy/polis", color: T.blue },
                { name: "Decidim Community", desc: "Partizipative Demokratie-Infrastruktur", url: "decidim.org", color: T.purple },
                { name: "Prototype Fund / BMBF", desc: "Förderung für Civic Tech Projekte in DE — bis 158.000€", url: "prototypefund.de", color: T.gold },
                { name: "OKFN Deutschland", desc: "Open Knowledge Foundation — offene Daten", url: "okfn.de", color: T.green },
                { name: "Liquid Democracy e.V.", desc: "Verein für digitale Beteiligung in Berlin", url: "liqd.net", color: T.accent },
                { name: "D-64 Zentrum für Digitalen Fortschritt", desc: "Digitalpolitik-Thinktank", url: "d-64.org", color: T.coral },
                { name: "NetzpolitikOrg / CCC Community", desc: "Digitale Rechte + technische Expertise", url: "netzpolitik.org", color: T.silver },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 12px", background: T.bg, borderRadius: T.r }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ color: T.text, fontSize: 13, fontWeight: 500, fontFamily: T.sans }}>{c.name}</span>
                    <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.sans, display: "block" }}>{c.desc}</span>
                  </div>
                  <span style={{ color: T.accent, fontSize: 10, fontFamily: T.mono, flexShrink: 0 }}>{c.url}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 40, padding: "16px 0", borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
        <p style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono, margin: 0 }}>die würde des menschen als oberstes gebot — alles weitere lässt sich daraus ableiten</p>
        <p style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono, margin: "4px 0 0" }}>deinestimme.org — prototyp v0.4</p>
      </div>
    </div>
  );
}
