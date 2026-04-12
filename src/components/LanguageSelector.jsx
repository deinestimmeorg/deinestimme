import { useState } from "react";
import { T } from "../tokens";

const LANGUAGES = [
  { code: "de", label: "Deutsch", greeting: "Willkommen", sub: "Sprache wählen" },
  { code: "en", label: "English", greeting: "Welcome", sub: "Choose language" },
  { code: "id", label: "Bahasa Indonesia", greeting: "Selamat datang", sub: "Pilih bahasa" },
];

export default function LanguageSelector({ onSelect }) {
  return (
    <div style={{
      minHeight: "100vh", background: T.bg, display: "flex",
      alignItems: "center", justifyContent: "center", padding: 20,
      fontFamily: T.sans,
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lang-btn { transition: all 0.2s ease; }
        .lang-btn:hover { transform: scale(1.02); border-color: rgba(0,201,176,0.5) !important; }
      `}</style>

      <div style={{ maxWidth: 440, width: "100%", textAlign: "center", animation: "fadeIn 0.6s ease-out" }}>
        <div style={{ marginBottom: 36 }}>
          <span style={{ fontFamily: T.mono, fontSize: 28, fontWeight: 700, color: T.accent }}>deine</span>
          <span style={{ fontFamily: T.mono, fontSize: 28, fontWeight: 700, color: T.text }}>stimme</span>
          <span style={{ fontFamily: T.mono, fontSize: 12, color: T.textDim }}>.org</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.code}
              className="lang-btn"
              onClick={() => onSelect(lang.code)}
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: T.rl,
                padding: "22px 24px",
                cursor: "pointer",
                textAlign: "center",
                animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`,
              }}
            >
              <span style={{
                color: T.text, fontSize: 20, fontWeight: 600,
                fontFamily: T.sans, display: "block", marginBottom: 4,
              }}>
                {lang.label}
              </span>
              <span style={{
                color: T.textMuted, fontSize: 13, fontFamily: T.mono,
              }}>
                {lang.greeting}
              </span>
            </button>
          ))}
        </div>

        <p style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono, marginTop: 28, lineHeight: 1.5 }}>
          die würde des menschen als oberstes gebot
        </p>
      </div>
    </div>
  );
}

// ═══ Translations ═══
export const translations = {
  de: {
    passwordTitle: "Geschlossener Testbereich",
    passwordSub: "prototyp v0.6 — einladung erforderlich",
    passwordPlaceholder: "Zugangscode eingeben...",
    passwordButton: "eintreten",
    passwordWrong: "falscher code — bitte erneut versuchen",
    welcomeTitle: "Bevor wir beginnen, wähle deine Form der Präsenz.",
    pioneerTitle: "Der Pionier",
    pioneerKeep: "Bleibt erhalten",
    pioneerDesc: "Wähle den Namen eines echten Mondes aus unserem Sonnensystem.",
    pioneerSub: "Dein Name wird lokal gespeichert. Du kannst jederzeit zurückkehren.",
    starTitle: "Die Sternschnuppe",
    starKeep: "Flüchtig",
    starDesc: "Du agierst für diese eine Sitzung.",
    starSub: "Vorschläge bleiben als anonyme Knotenpunkte erhalten.",
    moonChoose: "Wähle deinen Mond. Jeder Name stammt von einem echten Mond in unserem Sonnensystem.",
    moonSelect: "wählen",
    moonJoin: "beitreten",
    back: "zurück",
    inviteTitle: "Dieser Bereich ist einladungsgeschützt.",
    inviteSub: "Du brauchst einen persönlichen Einladungscode.",
    inviteOnce: "Jeder Code funktioniert einmal.",
    invitePlaceholder: "EINLADUNGSCODE",
    inviteButton: "eintreten",
    inviteWrong: "Code ungültig oder bereits benutzt",
    inviteError: "Verbindungsfehler — bitte erneut versuchen",
    logout: "abmelden",
    footer: "die würde des menschen als oberstes gebot — alles weitere lässt sich daraus ableiten",
  },
  en: {
    passwordTitle: "Closed test area",
    passwordSub: "prototype v0.6 — invitation required",
    passwordPlaceholder: "Enter access code...",
    passwordButton: "enter",
    passwordWrong: "wrong code — please try again",
    welcomeTitle: "Before we begin, choose your form of presence.",
    pioneerTitle: "The Pioneer",
    pioneerKeep: "Permanent",
    pioneerDesc: "Choose the name of a real moon from our solar system.",
    pioneerSub: "Your name is stored locally. You can return anytime.",
    starTitle: "The Shooting Star",
    starKeep: "Ephemeral",
    starDesc: "You act for this one session.",
    starSub: "Proposals remain as anonymous nodes in the network.",
    moonChoose: "Choose your moon. Each name comes from a real moon in our solar system.",
    moonSelect: "choose",
    moonJoin: "join as",
    back: "back",
    inviteTitle: "This area requires an invitation.",
    inviteSub: "You need a personal invite code.",
    inviteOnce: "Each code works once.",
    invitePlaceholder: "INVITE CODE",
    inviteButton: "enter",
    inviteWrong: "Code invalid or already used",
    inviteError: "Connection error — please try again",
    logout: "sign out",
    footer: "human dignity as the highest principle — everything else follows from it",
  },
  id: {
    passwordTitle: "Area uji tertutup",
    passwordSub: "prototipe v0.6 — undangan diperlukan",
    passwordPlaceholder: "Masukkan kode akses...",
    passwordButton: "masuk",
    passwordWrong: "kode salah — silakan coba lagi",
    welcomeTitle: "Sebelum kita mulai, pilih bentuk kehadiranmu.",
    pioneerTitle: "Sang Perintis",
    pioneerKeep: "Permanen",
    pioneerDesc: "Pilih nama bulan asli dari tata surya kita.",
    pioneerSub: "Namamu disimpan secara lokal. Kamu bisa kembali kapan saja.",
    starTitle: "Bintang Jatuh",
    starKeep: "Sementara",
    starDesc: "Kamu berpartisipasi untuk sesi ini saja.",
    starSub: "Usulan tetap tersimpan sebagai titik anonim dalam jaringan.",
    moonChoose: "Pilih bulanmu. Setiap nama berasal dari bulan nyata di tata surya kita.",
    moonSelect: "pilih",
    moonJoin: "bergabung sebagai",
    back: "kembali",
    inviteTitle: "Area ini dilindungi undangan.",
    inviteSub: "Kamu memerlukan kode undangan pribadi.",
    inviteOnce: "Setiap kode hanya berlaku sekali.",
    invitePlaceholder: "KODE UNDANGAN",
    inviteButton: "masuk",
    inviteWrong: "Kode tidak valid atau sudah digunakan",
    inviteError: "Kesalahan koneksi — silakan coba lagi",
    logout: "keluar",
    footer: "martabat manusia sebagai prinsip tertinggi — segala hal lain mengikutinya",
  },
};

export function useTranslation() {
  const lang = localStorage.getItem("ds_lang") || "de";
  const t = translations[lang] || translations.de;
  return { t, lang };
}
