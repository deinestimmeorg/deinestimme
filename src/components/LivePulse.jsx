import { useState, useEffect, useRef } from "react";
import { T } from "../tokens";

// ─── Simulierte Live-Aktivität (später durch Supabase Realtime ersetzen) ───
const ACTIVITIES = [
  { type: "vorschlag", text: "Neuer Vorschlag eingereicht", dim: "Bildung" },
  { type: "mitigation", text: "Lösung für Gefahr hinzugefügt", dim: "Wirtschaft" },
  { type: "stimme", text: "Stimme abgegeben", dim: "Sozial" },
  { type: "vorschlag", text: "Neuer Vorschlag eingereicht", dim: "Gesundheit" },
  { type: "match", text: "Co-Autoren gefunden!", dim: "Umwelt" },
  { type: "mitigation", text: "Bessere Lösung eingereicht", dim: "Technik" },
  { type: "stimme", text: "Stimme abgegeben", dim: "Bildung" },
  { type: "vorschlag", text: "Neuer Vorschlag eingereicht", dim: "Sozial" },
];

const NAMES = ["Ganymed", "Europa", "Titan", "Enceladus", "Triton", "Io", "Kallisto", "Rhea",
               "Sternschnuppe-4821", "Sternschnuppe-7103", "Sternschnuppe-2957"];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function LivePulse({ totalProposals = 0, totalUsers = 0, isConnected = true }) {
  const [events, setEvents] = useState([]);
  const [pulse, setPulse] = useState(false);
  const [simCount, setSimCount] = useState({ proposals: totalProposals || 23, users: totalUsers || 47 });
  const intervalRef = useRef(null);

  // Simulate live events (replace with Supabase realtime subscription later)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const activity = randomFrom(ACTIVITIES);
      const name = randomFrom(NAMES);
      const newEvent = {
        id: Date.now(),
        name,
        ...activity,
        time: new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 5));
      setPulse(true);
      setTimeout(() => setPulse(false), 800);

      // Increment counts occasionally
      if (Math.random() > 0.6) {
        setSimCount(prev => ({
          proposals: prev.proposals + (activity.type === "vorschlag" ? 1 : 0),
          users: prev.users + (Math.random() > 0.8 ? 1 : 0),
        }));
      }
    }, 4000 + Math.random() * 6000); // Random 4-10 second intervals

    return () => clearInterval(intervalRef.current);
  }, []);

  const typeIcon = { vorschlag: "◆", mitigation: "◇", stimme: "▸", match: "⬡" };
  const typeColor = { vorschlag: T.accent, mitigation: T.green, stimme: T.blue, match: T.gold };

  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl,
      overflow: "hidden",
    }}>
      {/* Pulse bar */}
      <div style={{
        height: 2, background: T.bg,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: pulse ? "100%" : "0%",
          background: `linear-gradient(90deg, transparent, ${T.accent}66, transparent)`,
          transition: pulse ? "width 0.8s ease-out" : "width 0.1s",
        }} />
      </div>

      <div style={{ padding: "12px 16px" }}>
        {/* Header with live stats */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: isConnected ? T.accent : T.coral,
              boxShadow: isConnected ? `0 0 6px ${T.accent}44` : "none",
              animation: isConnected ? "liveBlink 2s infinite" : "none",
            }} />
            <span style={{
              color: T.textMuted, fontSize: 10, fontFamily: T.mono,
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              schwarm
            </span>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ textAlign: "right" }}>
              <span style={{ color: T.accent, fontSize: 14, fontFamily: T.mono, fontWeight: 600 }}>
                {simCount.proposals}
              </span>
              <span style={{ color: T.textDim, fontSize: 9, fontFamily: T.mono, display: "block" }}>
                vorschläge
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ color: T.silver, fontSize: 14, fontFamily: T.mono, fontWeight: 600 }}>
                {simCount.users}
              </span>
              <span style={{ color: T.textDim, fontSize: 9, fontFamily: T.mono, display: "block" }}>
                stimmen
              </span>
            </div>
          </div>
        </div>

        {/* Live activity feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {events.map((event, i) => (
            <div
              key={event.id}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "4px 8px", borderRadius: T.r,
                background: i === 0 ? T.bg : "transparent",
                opacity: 1 - i * 0.15,
                transition: "all 0.4s ease",
                animation: i === 0 ? "fadeInLeft 0.4s ease-out" : "none",
              }}
            >
              <span style={{
                color: typeColor[event.type], fontSize: 10,
                fontFamily: T.mono, minWidth: 12,
              }}>
                {typeIcon[event.type]}
              </span>
              <span style={{
                color: event.name.startsWith("Stern") ? T.textMuted : T.accent,
                fontSize: 11, fontFamily: T.mono, minWidth: 80,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {event.name}
              </span>
              <span style={{
                color: T.silver, fontSize: 11, fontFamily: T.sans,
                flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {event.text}
              </span>
              <span style={{ color: T.textDim, fontSize: 9, fontFamily: T.mono, flexShrink: 0 }}>
                {event.time}
              </span>
            </div>
          ))}

          {events.length === 0 && (
            <p style={{ color: T.textDim, fontSize: 11, fontFamily: T.sans, textAlign: "center", padding: "8px 0" }}>
              Warte auf Aktivität...
            </p>
          )}
        </div>

        {/* Energy message */}
        <div style={{
          marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}`,
          textAlign: "center",
        }}>
          <p style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono, margin: 0, lineHeight: 1.5 }}>
            jeder beitrag ist energie · aufmerksamkeit formt die richtung
          </p>
        </div>
      </div>

      <style>{`
        @keyframes liveBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
