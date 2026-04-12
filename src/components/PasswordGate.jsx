import { useState } from "react";
import { T } from "../tokens";
import { useTranslation } from "./LanguageSelector";

const TEST_PASSWORD = "deinestimme2026";

export default function PasswordGate({ children }) {
  const { t } = useTranslation();
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("ds_auth") === "true"
  );
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === TEST_PASSWORD) {
      sessionStorage.setItem("ds_auth", "true");
      setAuthenticated(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (authenticated) return children;

  return (
    <div style={{
      minHeight: "100vh", background: T.bg, display: "flex",
      alignItems: "center", justifyContent: "center", padding: 20,
      fontFamily: T.sans,
    }}>
      <div style={{
        maxWidth: 400, width: "100%", textAlign: "center",
        animation: shake ? "shake 0.4s ease-in-out" : "none",
      }}>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
        `}</style>

        <div style={{ marginBottom: 32 }}>
          <span style={{ fontFamily: T.mono, fontSize: 28, fontWeight: 700, color: T.accent }}>deine</span>
          <span style={{ fontFamily: T.mono, fontSize: 28, fontWeight: 700, color: T.text }}>stimme</span>
          <span style={{ fontFamily: T.mono, fontSize: 12, color: T.textDim }}>.org</span>
        </div>

        <div style={{
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: T.rl, padding: "32px 24px",
        }}>
          <p style={{ color: T.silver, fontSize: 14, lineHeight: 1.6, margin: "0 0 6px" }}>
            {t.passwordTitle}
          </p>
          <p style={{ color: T.textMuted, fontSize: 12, fontFamily: T.mono, margin: "0 0 24px" }}>
            {t.passwordSub}
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.passwordPlaceholder}
              autoFocus
              style={{
                width: "100%", background: T.bg,
                border: `1px solid ${error ? T.coral : T.border}`,
                borderRadius: T.r, padding: "12px 16px",
                color: T.text, fontSize: 15, fontFamily: T.mono,
                outline: "none", boxSizing: "border-box",
              }}
            />
            <button type="submit" style={{
              width: "100%", marginTop: 12, padding: "12px",
              background: input.trim() ? T.accent : T.surfaceActive,
              color: input.trim() ? T.bg : T.textDim,
              border: "none", borderRadius: T.r,
              fontSize: 13, fontFamily: T.mono, fontWeight: 600,
              cursor: input.trim() ? "pointer" : "default",
            }}>
              {t.passwordButton}
            </button>
          </form>

          {error && (
            <p style={{ color: T.coral, fontSize: 12, fontFamily: T.mono, marginTop: 12 }}>{t.passwordWrong}</p>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <p style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono, lineHeight: 1.5 }}>{t.footer}</p>
          <button onClick={() => { localStorage.removeItem("ds_lang"); window.location.reload(); }} style={{
            background: "none", border: "none", color: T.textDim, fontSize: 10,
            fontFamily: T.mono, cursor: "pointer", marginTop: 8, textDecoration: "underline",
          }}>
            🌐 Sprache / Language / Bahasa
          </button>
        </div>
      </div>
    </div>
  );
}
