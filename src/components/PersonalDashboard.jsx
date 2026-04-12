import { useState, useEffect } from "react";
import { T } from "../tokens";

// ─── Kategorien aus dem Grundsatzprogramm ───
const CATEGORIES = [
  { id: "sozial", label: "Sozial & Würde", icon: "S", color: T.accent, desc: "UBI, Wohnraum, Proaktive Erkennung" },
  { id: "wirtschaft", label: "Wirtschaft", icon: "W", color: "#C4A35A", desc: "Verantwortungs-Freiheits-Tausch, Zukunftsfonds" },
  { id: "infrastruktur", label: "Infrastruktur", icon: "I", color: "#9B7BD4", desc: "Energienetze, Nordost-Korridor, Souveränität" },
  { id: "bildung", label: "Bildung & Kultur", icon: "B", color: "#4A90D9", desc: "Bildung als Infrastruktur, Skills statt Zertifikate" },
  { id: "demokratie", label: "Demokratie", icon: "D", color: "#3DBB7D", desc: "Digitale Teilhabe, Konsistenzgebot" },
  { id: "umwelt", label: "Umwelt", icon: "U", color: "#3DBB7D", desc: "Repair/Recycle, Microgrids, Rohstoffkreislauf" },
  { id: "verfassung", label: "Verfassung", icon: "V", color: "#E85D4A", desc: "Art. 20 Abs. 5, Grundvoraussetzungen" },
  { id: "sicherheit", label: "Sicherheit", icon: "X", color: "#8B919A", desc: "Interdependenz, Offline-Fähigkeit, Menschenrechte" },
];

export default function PersonalDashboard({ user }) {
  // Simulierte Engagement-Daten (später aus Supabase: votes + proposals pro Kategorie)
  const [engagement, setEngagement] = useState({});

  useEffect(() => {
    // TODO: Replace with real Supabase query
    // SELECT category, COUNT(*) FROM proposals WHERE author_id = user.id GROUP BY category
    const simulated = {};
    CATEGORIES.forEach(cat => {
      simulated[cat.id] = Math.random() > 0.3 ? Math.floor(Math.random() * 100) : 0;
    });
    setEngagement(simulated);
  }, [user]);

  const active = CATEGORIES.filter(c => engagement[c.id] > 0);
  const blind = CATEGORIES.filter(c => !engagement[c.id]);
  const totalScore = Object.values(engagement).reduce((a, b) => a + b, 0);
  const balance = active.length / CATEGORIES.length;

  return (
    <div>
      {/* Übersicht */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <div style={{ flex: 1, background: T.surface, borderRadius: T.rl, padding: "12px 14px", border: `1px solid ${T.border}` }}>
          <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, display: "block" }}>bereiche berührt</span>
          <span style={{ color: T.accent, fontSize: 22, fontWeight: 700, fontFamily: T.mono }}>{active.length}<span style={{ fontSize: 12, color: T.textDim }}>/{CATEGORIES.length}</span></span>
        </div>
        <div style={{ flex: 1, background: T.surface, borderRadius: T.rl, padding: "12px 14px", border: `1px solid ${T.border}` }}>
          <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, display: "block" }}>gesamt-engagement</span>
          <span style={{ color: T.text, fontSize: 22, fontWeight: 700, fontFamily: T.mono }}>{totalScore}</span>
        </div>
        <div style={{ flex: 1, background: T.surface, borderRadius: T.rl, padding: "12px 14px", border: `1px solid ${T.border}` }}>
          <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, display: "block" }}>balance</span>
          <span style={{ color: balance > 0.6 ? "#3DBB7D" : balance > 0.3 ? "#C4A35A" : "#E85D4A", fontSize: 22, fontWeight: 700, fontFamily: T.mono }}>
            {Math.round(balance * 100)}%
          </span>
        </div>
      </div>

      {/* Balance-Balken pro Kategorie */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: "14px 16px", marginBottom: 12 }}>
        <span style={{ color: T.silver, fontSize: 11, fontFamily: T.mono, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Deine Stimme — Engagement-Profil
        </span>
        <p style={{ color: T.textMuted, fontSize: 12, fontFamily: T.sans, margin: "4px 0 14px", lineHeight: 1.4 }}>
          Je ausgeglichener dein Profil, desto stärker dein Beitrag zur Schwarmintelligenz.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CATEGORIES.map(cat => {
            const value = engagement[cat.id] || 0;
            const maxVal = Math.max(...Object.values(engagement), 1);
            const width = (value / maxVal) * 100;

            return (
              <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: value > 0 ? cat.color + "22" : T.surfaceActive,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontFamily: T.mono, fontWeight: 700,
                  color: value > 0 ? cat.color : T.textDim, flexShrink: 0,
                }}>
                  {cat.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ color: value > 0 ? T.silver : T.textDim, fontSize: 12, fontFamily: T.sans }}>{cat.label}</span>
                    <span style={{ color: value > 0 ? cat.color : T.textDim, fontSize: 11, fontFamily: T.mono }}>{value}</span>
                  </div>
                  <div style={{ height: 4, background: T.bg, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${width}%`,
                      background: value > 0 ? cat.color : "transparent",
                      borderRadius: 2, transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blinde Flecken */}
      {blind.length > 0 && (
        <div style={{
          background: "#C4A35A12", border: `1px solid #C4A35A22`,
          borderRadius: T.rl, padding: "14px 16px", marginBottom: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ color: "#C4A35A", fontSize: 14, fontFamily: T.mono }}>!</span>
            <span style={{ color: "#C4A35A", fontSize: 12, fontFamily: T.mono, fontWeight: 600 }}>
              BLINDE FLECKEN — {blind.length} Bereich{blind.length > 1 ? "e" : ""} unberührt
            </span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {blind.map(cat => (
              <span key={cat.id} style={{
                fontSize: 11, fontFamily: T.mono, color: cat.color,
                padding: "3px 10px", background: cat.color + "15",
                borderRadius: T.r, border: `1px solid ${cat.color}22`,
              }}>
                {cat.label}
              </span>
            ))}
          </div>
          <p style={{ color: T.textMuted, fontSize: 11, fontFamily: T.sans, margin: "8px 0 0", lineHeight: 1.4 }}>
            Diese Bereiche brauchen noch deine Perspektive. Jeder Blick deckt etwas auf, das andere übersehen.
          </p>
        </div>
      )}

      {/* Nutzer-Info */}
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: T.rl, padding: "14px 16px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ color: user?.is_permanent ? T.accent : T.text, fontSize: 15, fontFamily: T.mono, fontWeight: 600 }}>
              {user?.display_name}
            </span>
            <span style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono, display: "block", marginTop: 2 }}>
              {user?.is_permanent ? "Pionier · Mond" : "Sternschnuppe · Flüchtig"}
            </span>
          </div>
          <span style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono }}>
            Beigetreten: {new Date(user?.created_at || Date.now()).toLocaleDateString("de-DE")}
          </span>
        </div>
      </div>
    </div>
  );
}
