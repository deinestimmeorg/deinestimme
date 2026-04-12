import { useState } from "react";
import { supabase } from "../supabaseClient";

import { T } from "../tokens";

const MOONS = ["Ganymed", "Europa", "Kallisto", "Titan", "Enceladus", "Triton", "Io", "Rhea", "Iapetus", "Dione", "Tethys", "Mimas"];

export default function WelcomeScreen({ onComplete }) {
  const [loading, setLoading] = useState(false);

  const handleChoice = async (isPermanent) => {
    setLoading(true);
    
    // Zufälligen Namen generieren
    const randomMoon = MOONS[Math.floor(Math.random() * MOONS.length)];
    const displayName = isPermanent ? randomMoon : `Sternschnuppe-${Math.floor(Math.random() * 9000 + 1000)}`;

    try {
      // Nutzer in unsere neue Supabase-Datenbank eintragen
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ display_name: displayName, is_permanent: isPermanent }])
        .select()
        .single();

      if (error) throw error;

      // ID lokal speichern, damit das Gerät den Nutzer wiedererkennt
      if (isPermanent) {
        localStorage.setItem('deinestimme_user_id', data.id);
        localStorage.setItem('deinestimme_name', data.display_name);
      } else {
        sessionStorage.setItem('deinestimme_user_id', data.id);
        sessionStorage.setItem('deinestimme_name', data.display_name);
      }

      onComplete(data); // Weiter zur Haupt-App
    } catch (err) {
      console.error("Fehler beim Erstellen der Identität:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: T.sans }}>
      <div style={{ maxWidth: 500, width: "100%" }}>
        
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <span style={{ fontFamily: T.mono, fontSize: 24, fontWeight: 700, color: T.accent }}>deine</span>
          <span style={{ fontFamily: T.mono, fontSize: 24, fontWeight: 700, color: T.text }}>stimme</span>
          <span style={{ fontFamily: T.mono, fontSize: 12, color: T.textMuted }}>.org</span>
          <p style={{ color: T.silver, marginTop: 12, lineHeight: 1.6 }}>
            Bevor wir beginnen, wähle deine Form der Präsenz. Deine Entscheidung schützt deine Handlungsfreiheit.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* Option 1: Der Pionier */}
          <button 
            disabled={loading}
            onClick={() => handleChoice(true)}
            style={{ background: T.surface, border: `1px solid ${T.accent}44`, borderRadius: T.rl, padding: 24, textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ color: T.accent, fontFamily: T.mono, fontSize: 14, fontWeight: 600, textTransform: "uppercase" }}>Der Pionier</span>
              <span style={{ color: T.textMuted, fontFamily: T.mono, fontSize: 12 }}>Bleibt erhalten</span>
            </div>
            <p style={{ color: T.text, fontSize: 14, margin: "0 0 8px", fontWeight: 500 }}>Du erhältst den Namen eines Mondes (z.B. "Europa").</p>
            <p style={{ color: T.silver, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
              Dein Name wird lokal auf diesem Gerät gespeichert. Du kannst die Plattform verlassen und später als Co-Autor an deinen Ideen weiterarbeiten. 
            </p>
          </button>

          {/* Option 2: Die Sternschnuppe */}
          <button 
            disabled={loading}
            onClick={() => handleChoice(false)}
            style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: 24, textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ color: T.text, fontFamily: T.mono, fontSize: 14, fontWeight: 600, textTransform: "uppercase" }}>Die Sternschnuppe</span>
              <span style={{ color: T.textMuted, fontFamily: T.mono, fontSize: 12 }}>Flüchtig</span>
            </div>
            <p style={{ color: T.text, fontSize: 14, margin: "0 0 8px", fontWeight: 500 }}>Du agierst für diese eine Sitzung.</p>
            <p style={{ color: T.silver, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
              Sobald du den Browser schließt, verschwindet deine Identität. Deine eingereichten Vorschläge bleiben als anonyme Knotenpunkte (Netzblatt-Prinzip) für die Gemeinschaft erhalten.
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}
