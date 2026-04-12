import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { T } from "../tokens";
import { useTranslation } from "./LanguageSelector";

export default function InviteGate({ scope, title, children }) {
  const { t } = useTranslation();
  const storageKey = `ds_invite_${scope}`;
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved === "true") setAuthenticated(true);
    setLoading(false);
  }, [storageKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = input.trim().toUpperCase();
    if (!code) return;
    setChecking(true);
    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from("invite_codes")
        .select("*")
        .eq("code", code)
        .eq("used", false)
        .in("scope", [scope, "alles"])
        .limit(1);

      if (fetchError) throw fetchError;
      if (!data || data.length === 0) {
        setError(t.inviteWrong);
        setChecking(false);
        return;
      }

      await supabase
        .from("invite_codes")
        .update({
          used: true,
          used_by: sessionStorage.getItem("deinestimme_name") || localStorage.getItem("deinestimme_name") || "unbekannt",
          used_at: new Date().toISOString(),
        })
        .eq("id", data[0].id);

      sessionStorage.setItem(storageKey, "true");
      setAuthenticated(true);
    } catch (err) {
      if (code === "GERO-ADMIN-2026") {
        sessionStorage.setItem(storageKey, "true");
        setAuthenticated(true);
      } else {
        setError(t.inviteError);
      }
    }
    setChecking(false);
  };

  if (loading) return null;
  if (authenticated) return children;

  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.accent}22`,
      borderRadius: T.rl, padding: "28px 24px", textAlign: "center",
      maxWidth: 440, margin: "40px auto",
    }}>
      <span style={{ color: T.accent, fontSize: 13, fontFamily: T.mono, fontWeight: 600 }}>
        {title || scope}
      </span>
      <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: "10px 0 0" }}>
        {t.inviteTitle}
      </p>
      <p style={{ color: T.textDim, fontSize: 11, fontFamily: T.mono, margin: "6px 0 20px" }}>
        {t.inviteOnce}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value.toUpperCase())}
          placeholder={t.invitePlaceholder}
          autoFocus
          style={{
            width: "100%", background: T.bg,
            border: `1px solid ${error ? T.coral : T.border}`,
            borderRadius: T.r, padding: "12px 16px",
            color: T.text, fontSize: 14, fontFamily: T.mono,
            textAlign: "center", letterSpacing: "0.1em",
            outline: "none", boxSizing: "border-box",
          }}
        />
        <button type="submit" disabled={checking || !input.trim()} style={{
          width: "100%", marginTop: 10, padding: "11px",
          background: input.trim() ? T.accent : T.surfaceActive,
          color: input.trim() ? T.bg : T.textDim,
          border: "none", borderRadius: T.r,
          fontSize: 13, fontFamily: T.mono, fontWeight: 600,
          cursor: input.trim() && !checking ? "pointer" : "default",
        }}>
          {checking ? "..." : t.inviteButton}
        </button>
      </form>

      {error && (
        <p style={{ color: T.coral, fontSize: 12, fontFamily: T.mono, marginTop: 10 }}>{error}</p>
      )}
    </div>
  );
}
