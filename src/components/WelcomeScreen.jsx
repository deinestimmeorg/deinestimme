import { useState } from "react";
import { supabase } from "../supabaseClient";
import { T } from "../tokens";

// ─── Echte Monde mit Beschreibungen ───
const MOONS = [
  { name: "Ganymed", planet: "Jupiter", diameter: "5268 km", emoji: "🪐", color: "#8B7355", desc: "Größter Mond im Sonnensystem — größer als Merkur. Eigenes Magnetfeld. Salzwasser-Ozean unter 150 km Eis.", wiki: "https://de.wikipedia.org/wiki/Ganymed_(Mond)" },
  { name: "Europa", planet: "Jupiter", diameter: "3122 km", emoji: "❄️", color: "#B8C4D0", desc: "Glatte Eiskruste über einem globalen Salzwasser-Ozean. Einer der vielversprechendsten Orte für außerirdisches Leben.", wiki: "https://de.wikipedia.org/wiki/Europa_(Mond)" },
  { name: "Kallisto", planet: "Jupiter", diameter: "4821 km", emoji: "🌑", color: "#5A5A6A", desc: "Älteste Oberfläche im Sonnensystem — 4 Milliarden Jahre Krater-Geschichte. Stiller Beobachter.", wiki: "https://de.wikipedia.org/wiki/Kallisto_(Mond)" },
  { name: "Titan", planet: "Saturn", diameter: "5150 km", emoji: "🌫️", color: "#C4A035", desc: "Einziger Mond mit dichter Atmosphäre. Methan-Seen, Regen, Flüsse — eine fremde Erde mit anderen Chemikalien.", wiki: "https://de.wikipedia.org/wiki/Titan_(Mond)" },
  { name: "Enceladus", planet: "Saturn", diameter: "504 km", emoji: "💎", color: "#E8E8F0", desc: "Klein aber spektakulär. Geysire am Südpol schießen Wasser ins All. Heißer Ozean unter dem Eis.", wiki: "https://de.wikipedia.org/wiki/Enceladus_(Mond)" },
  { name: "Triton", planet: "Neptun", diameter: "2707 km", emoji: "🧊", color: "#7A9AAA", desc: "Eingefangener Kuipergürtel-Körper. Retrograde Umlaufbahn — er läuft gegen den Strom. Stickstoff-Geysire.", wiki: "https://de.wikipedia.org/wiki/Triton_(Mond)" },
  { name: "Io", planet: "Jupiter", diameter: "3643 km", emoji: "🌋", color: "#D4A020", desc: "Vulkanischster Körper im Sonnensystem. Hunderte aktive Vulkane. Ständige Transformation.", wiki: "https://de.wikipedia.org/wiki/Io_(Mond)" },
  { name: "Rhea", planet: "Saturn", diameter: "1527 km", emoji: "🔘", color: "#A0A0B0", desc: "Zweitgrößter Saturn-Mond. Möglicherweise eigenes Ringsystem — ein Mond mit Ringen.", wiki: "https://de.wikipedia.org/wiki/Rhea_(Mond)" },
  { name: "Iapetus", planet: "Saturn", diameter: "1469 km", emoji: "◐", color: "#6B5B4A", desc: "Yin und Yang im All: eine Hälfte schneeweiß, die andere pechschwarz. 20 km hoher Äquatorgrat.", wiki: "https://de.wikipedia.org/wiki/Iapetus_(Mond)" },
  { name: "Dione", planet: "Saturn", diameter: "1123 km", emoji: "○", color: "#C8C8D0", desc: "Eisklippen und Schluchten. Subsurface-Ozean entdeckt. Ruhig, aber nicht tot.", wiki: "https://de.wikipedia.org/wiki/Dione_(Mond)" },
  { name: "Tethys", planet: "Saturn", diameter: "1062 km", emoji: "◯", color: "#D0D0DA", desc: "Fast reines Wassereis. Odysseus-Krater bedeckt 40% der Oberfläche.", wiki: "https://de.wikipedia.org/wiki/Tethys_(Mond)" },
  { name: "Mimas", planet: "Saturn", diameter: "396 km", emoji: "⊙", color: "#B0B0C0", desc: "Herschel-Krater macht ihn zum 'Todesstern'. Kleinster runder Himmelskörper durch Eigengravitation.", wiki: "https://de.wikipedia.org/wiki/Mimas_(Mond)" },
];

function MoonIcon({ moon, size = 42 }) {
  const r = size * 0.38;
  const cx = size / 2;
  const cy = size / 2;
  const hash = moon.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const craters = Array.from({ length: 3 + (hash % 4) }, (_, i) => ({
    x: cx + Math.cos(hash * i * 0.8) * r * 0.5,
    y: cy + Math.sin(hash * i * 1.1) * r * 0.4,
    r: 2 + (hash * (i + 1)) % 4,
  }));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <defs>
        <radialGradient id={`mg-${moon.name}`} cx="35%" cy="35%">
          <stop offset="0%" stopColor={moon.color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={moon.color} stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#mg-${moon.name})`} />
      {craters.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="rgba(0,0,0,0.15)" />
      ))}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={moon.color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export default function WelcomeScreen({ onComplete }) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("choice");
  const [detailMoon, setDetailMoon] = useState(null);

  const handlePickMoon = async (moon) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ display_name: moon.name, is_permanent: true }])
        .select().single();
      if (!error && data) {
        localStorage.setItem('deinestimme_user_id', data.id);
        localStorage.setItem('deinestimme_name', data.display_name);
        onComplete(data);
        return;
      }
    } catch (err) {
      console.warn("Supabase nicht erreichbar, Offline-Modus:", err.message);
    }
    // Offline fallback
    const offlineId = `offline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem('deinestimme_user_id', offlineId);
    localStorage.setItem('deinestimme_name', moon.name);
    onComplete({ id: offlineId, display_name: moon.name, is_permanent: true });
  };

  const handleSternschnuppe = async () => {
    setLoading(true);
    const displayName = `Sternschnuppe-${Math.floor(Math.random() * 9000 + 1000)}`;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ display_name: displayName, is_permanent: false }])
        .select().single();
      if (!error && data) {
        sessionStorage.setItem('deinestimme_user_id', data.id);
        sessionStorage.setItem('deinestimme_name', data.display_name);
        onComplete(data);
        return;
      }
    } catch (err) {
      console.warn("Supabase nicht erreichbar, Offline-Modus:", err.message);
    }
    // Offline fallback
    const offlineId = `offline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem('deinestimme_user_id', offlineId);
    sessionStorage.setItem('deinestimme_name', displayName);
    onComplete({ id: offlineId, display_name: displayName, is_permanent: false });
  };

  // ─── MOND-DETAIL MODAL ───
  if (detailMoon) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: T.sans }}>
        <div style={{ maxWidth: 440, width: "100%", background: T.surface, border: `1px solid ${T.accent}33`, borderRadius: "14px", padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <MoonIcon moon={detailMoon} size={80} />
          </div>
          <h3 style={{ color: T.text, fontSize: 20, fontWeight: 600, textAlign: "center", margin: "0 0 4px" }}>{detailMoon.name}</h3>
          <p style={{ color: T.accent, fontSize: 12, fontFamily: T.mono, textAlign: "center", margin: "0 0 16px" }}>
            {detailMoon.planet} · ⌀ {detailMoon.diameter}
          </p>
          <p style={{ color: T.silver, fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>{detailMoon.desc}</p>
          <a href={detailMoon.wiki} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: T.accent, fontSize: 12, fontFamily: T.mono, marginBottom: 16, textDecoration: "none" }}>
            → Wikipedia
          </a>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setDetailMoon(null)} style={{ flex: 1, padding: 10, background: T.bg, border: `1px solid ${T.border}`, borderRadius: T.r, color: T.textMuted, fontSize: 13, fontFamily: T.mono, cursor: "pointer" }}>zurück</button>
            <button disabled={loading} onClick={() => handlePickMoon(detailMoon)} style={{ flex: 2, padding: 10, background: T.accent, border: "none", borderRadius: T.r, color: T.bg, fontSize: 13, fontFamily: T.mono, fontWeight: 600, cursor: loading ? "wait" : "pointer" }}>
              {loading ? "..." : `Als ${detailMoon.name} beitreten`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── MOND-AUSWAHL ───
  if (step === "pickMoon") {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, padding: "40px 20px", fontFamily: T.sans, maxWidth: 520, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <span style={{ fontFamily: T.mono, fontSize: 20, fontWeight: 700, color: T.accent }}>deine</span>
          <span style={{ fontFamily: T.mono, fontSize: 20, fontWeight: 700, color: T.text }}>stimme</span>
          <p style={{ color: T.silver, marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>
            Wähle deinen Mond. Jeder Name stammt von einem echten Mond in unserem Sonnensystem.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {MOONS.map(moon => (
            <div key={moon.name} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <MoonIcon moon={moon} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: T.text, fontSize: 14, fontWeight: 500 }}>{moon.name}</div>
                <div style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono }}>{moon.planet} · {moon.emoji}</div>
              </div>
              <button onClick={() => setDetailMoon(moon)} style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: T.textMuted, fontSize: 12, cursor: "pointer", flexShrink: 0 }} title="Details">ⓘ</button>
              <button disabled={loading} onClick={() => handlePickMoon(moon)} style={{ background: T.accentDim, border: `1px solid ${T.accent}44`, borderRadius: T.r, padding: "6px 14px", color: T.accent, fontSize: 11, fontFamily: T.mono, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>wählen</button>
            </div>
          ))}
        </div>
        <button onClick={() => setStep("choice")} style={{ display: "block", margin: "20px auto 0", background: "none", border: "none", color: T.textMuted, fontSize: 12, fontFamily: T.mono, cursor: "pointer" }}>← zurück</button>
      </div>
    );
  }

  // ─── ERSTE AUSWAHL ───
  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: T.sans }}>
      <div style={{ maxWidth: 500, width: "100%" }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <span style={{ fontFamily: T.mono, fontSize: 24, fontWeight: 700, color: T.accent }}>deine</span>
          <span style={{ fontFamily: T.mono, fontSize: 24, fontWeight: 700, color: T.text }}>stimme</span>
          <span style={{ fontFamily: T.mono, fontSize: 12, color: T.textMuted }}>.org</span>
          <p style={{ color: T.silver, marginTop: 12, lineHeight: 1.6 }}>Bevor wir beginnen, wähle deine Form der Präsenz.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button disabled={loading} onClick={() => setStep("pickMoon")} style={{ background: T.surface, border: `1px solid ${T.accent}44`, borderRadius: T.rl, padding: 24, textAlign: "left", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ color: T.accent, fontFamily: T.mono, fontSize: 14, fontWeight: 600, textTransform: "uppercase" }}>Der Pionier</span>
              <span style={{ color: T.textMuted, fontFamily: T.mono, fontSize: 12 }}>Bleibt erhalten</span>
            </div>
            <p style={{ color: T.text, fontSize: 14, margin: "0 0 8px", fontWeight: 500 }}>Wähle den Namen eines echten Mondes aus unserem Sonnensystem.</p>
            <p style={{ color: T.silver, fontSize: 13, margin: 0, lineHeight: 1.5 }}>Dein Name wird lokal gespeichert. Du kannst jederzeit zurückkehren.</p>
          </button>
          <button disabled={loading} onClick={handleSternschnuppe} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: 24, textAlign: "left", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ color: T.text, fontFamily: T.mono, fontSize: 14, fontWeight: 600, textTransform: "uppercase" }}>Die Sternschnuppe</span>
              <span style={{ color: T.textMuted, fontFamily: T.mono, fontSize: 12 }}>Flüchtig</span>
            </div>
            <p style={{ color: T.text, fontSize: 14, margin: "0 0 8px", fontWeight: 500 }}>Du agierst für diese eine Sitzung.</p>
            <p style={{ color: T.silver, fontSize: 13, margin: 0, lineHeight: 1.5 }}>Vorschläge bleiben als anonyme Knotenpunkte (Netzblatt-Prinzip) erhalten.</p>
          </button>
        </div>
      </div>
    </div>
  );
}
