import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const TURQUOISE = "#00C9B0";
const VOID = "#0B0B0F";
const SILVER = "#C0C8D0";
const DIM = "#5A6068";
const CARD_BG = "#111116";

const LANGS = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
  { code: "nl", label: "NL" },
  { code: "id", label: "ID" },
];

const AUDIO_FILES = {
  de: "/audio/Deine_Stimme_Intro_DE_DSvoice1.mp3",
  en: "/audio/Deine_Stimme_Intro_EN_DSVoice1.mp3",
  fr: "/audio/Deine_Stimme_Intro_FR_DSVoice1.mp3",
  es: "/audio/Deine_Stimme_Intro_ES_DSVoice1.mp3",
  nl: "/audio/Deine_Stimme_Intro_NL_DSVoice1.mp3",
  id: "/audio/Deine_stimme_Intro_ID_DSVoice1.mp3",
};

const AUDIO_DURATIONS = { de: 53.3, en: 42.7, fr: 44.4, es: 46.2, nl: 49.6, id: 55.7 };

// Door link targets
const DOOR_LINKS = {
  0: "/app",           // Alltag → Platform
  1: "/verstehen",     // Verstehen → Explanation
  2: "/mitbauen",      // Mitbauen → Build with us
  3: "/institution",   // Institution → Use cases
};

function useIsMobile(breakpoint = 640) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return mobile;
}

const MANIFEST = {
  de: [
    "In Zeiten der Stagnation ist es Zeit,\nden Rahmen zu verändern.",
    "Nicht mit mehr Lärm.\nNicht mit mehr Polarisierung.",
    "Nicht mit Königen, Idolen\noder Zuschauern.",
    "Sondern mit einem System,\ndas Menschen befähigt,\nZukunft gemeinsam zu bauen.",
    "Kein Konsens\num des Konsenses willen.",
    "Wenn es trägt, geht es weiter.\nWenn nicht, mach es besser.",
    "Deine Stimme verschwindet nicht.\nSie wird sichtbar.",
    "Sie wird Struktur.\nSie wird ein Rahmen,\nin dem Menschen leben können.",
    "Nicht Abhängigkeit.\nBefähigung.",
    "Nicht Opposition als Identität.\nGestaltung als Verantwortung.",
    "Baue mit an dem,\nwas als Nächstes kommt.",
  ],
  en: [
    "In times of stagnation,\nit is time to change the framework.",
    "Not with more noise.\nNot with more polarization.",
    "Not with kings, idols,\nor spectators.",
    "But with a system\nthat enables people\nto build the future together.",
    "No consensus\nfor its own sake.",
    "If it works, proceed.\nIf not, improve it.",
    "Your voice does not disappear.\nIt becomes visible.",
    "It becomes structure.\nIt becomes a framework\npeople can live in.",
    "Not dependency.\nEnablement.",
    "Not opposition as identity.\nConstruction as responsibility.",
    "Build what comes next.",
  ],
  fr: [
    "En temps de stagnation,\nil est temps de changer le cadre.",
    "Pas avec plus de bruit.\nPas avec plus de polarisation.",
    "Pas avec des rois, des idoles\nou des spectateurs.",
    "Mais avec un système\nqui permet aux gens\nde construire l'avenir ensemble.",
    "Pas de consensus\npour le consensus.",
    "Si ça tient, on continue.\nSinon, fais mieux.",
    "Ta voix ne disparaît pas.\nElle devient visible.",
    "Elle devient structure.\nElle devient un cadre\ndans lequel les gens peuvent vivre.",
    "Pas la dépendance.\nL'émancipation.",
    "Pas l'opposition comme identité.\nLa construction comme responsabilité.",
    "Construis ce qui vient ensuite.",
  ],
  es: [
    "En tiempos de estancamiento,\nes hora de cambiar el marco.",
    "No con más ruido.\nNo con más polarización.",
    "No con reyes, ídolos\no espectadores.",
    "Sino con un sistema\nque capacita a las personas\npara construir el futuro juntos.",
    "No consenso\npor el consenso.",
    "Si funciona, adelante.\nSi no, hazlo mejor.",
    "Tu voz no desaparece.\nSe hace visible.",
    "Se convierte en estructura.\nSe convierte en un marco\nen el que la gente puede vivir.",
    "No dependencia.\nCapacitación.",
    "No oposición como identidad.\nConstrucción como responsabilidad.",
    "Construye lo que viene después.",
  ],
  nl: [
    "In tijden van stagnatie\nis het tijd om het kader te veranderen.",
    "Niet met meer lawaai.\nNiet met meer polarisatie.",
    "Niet met koningen, idolen\nof toeschouwers.",
    "Maar met een systeem\ndat mensen in staat stelt\nde toekomst samen te bouwen.",
    "Geen consensus\nom het consensus.",
    "Als het draagt, gaan we verder.\nZo niet, doe het beter.",
    "Je stem verdwijnt niet.\nZe wordt zichtbaar.",
    "Ze wordt structuur.\nZe wordt een kader\nwaarin mensen kunnen leven.",
    "Geen afhankelijkheid.\nBekrachtiging.",
    "Geen oppositie als identiteit.\nVormgeving als verantwoordelijkheid.",
    "Bouw mee aan wat hierna komt.",
  ],
  id: [
    "Di masa stagnasi,\ninilah saatnya mengubah kerangka.",
    "Bukan dengan lebih banyak kebisingan.\nBukan dengan lebih banyak polarisasi.",
    "Bukan dengan tokoh, idola,\natau penonton.",
    "Tetapi dengan sistem\nyang memberdayakan semua orang\nuntuk membangun masa depan bersama\n— dalam semangat gotong royong.",
    "Bukan musyawarah tanpa arah.",
    "Kalau hasilnya kokoh, lanjutkan.\nKalau belum, perbaiki bersama.",
    "Suaramu tidak hilang.\nSuaramu menjadi terlihat.",
    "Suaramu menjadi struktur.\nSuaramu menjadi kerangka\ntempat kita bisa hidup bersama.",
    "Bukan ketergantungan.\nPemberdayaan.",
    "Bukan oposisi sebagai identitas.\nMembangun sebagai tanggung jawab bersama.",
    "Bawa suaramu.\nBangun bersama apa yang akan datang.",
  ],
};

const CONTENT = {
  de: {
    headline: "Wenn etwas nicht trägt,\nmach es besser.",
    sub: "DeineStimme gibt Menschen die Werkzeuge, aus Anliegen, Kritik und Ideen tragfähige Vorschläge zu machen — gemeinsam, sichtbar und konstruktiv.",
    doors: [
      { tag: "Alltag", text: "Dich stört etwas — aber du weißt nicht, wohin damit? Hier machst du daraus einen konkreten Vorschlag. Ohne Titel, ohne Antrag, ohne Vorwissen.", btn: "Problem in Vorschlag verwandeln" },
      { tag: "Verstehen", text: "Du willst erst sehen, ob das wirklich Sinn ergibt? Fair. Schau dir in wenigen Minuten an, wie das Prinzip funktioniert und entscheide danach.", btn: "So funktioniert es" },
      { tag: "Mitbauen", text: "Du willst nicht warten, bis andere etwas verändern? Dann geh rein. Hier gestaltest du mit, wie Lösungen entstehen und besser werden.", btn: "Jetzt mitbauen" },
      { tag: "Institution", text: "Sie suchen ein Verfahren, das Beteiligung in Ergebnisse übersetzt? DeineStimme macht Beiträge nachvollziehbar, verbessert Vorschläge iterativ und zeigt, was tragfähig ist.", btn: "Pilotprojekt anfragen" },
    ],
    seeAll: "Erst alles ansehen",
    listenLabel: "Manifest anhören",
  },
  en: {
    headline: "If it doesn't hold up,\nmake it better.",
    sub: "DeineStimme gives people the tools to turn concerns, criticism and ideas into viable proposals — together, visibly and constructively.",
    doors: [
      { tag: "Everyday", text: "Something's broken — but you don't know where to take it? Here you turn it into a concrete proposal. No degree, no application, no prerequisites.", btn: "Turn problem into proposal" },
      { tag: "Understand", text: "You want to see if this actually makes sense first? Fair. Take a few minutes to see how the principle works and decide after.", btn: "How it works" },
      { tag: "Build", text: "You don't want to wait for others to change things? Then go in. Here you shape how solutions emerge and improve.", btn: "Start building" },
      { tag: "Institution", text: "Looking for a process that translates participation into results? DeineStimme makes contributions traceable, improves proposals iteratively and shows what holds up.", btn: "Start a pilot" },
    ],
    seeAll: "See everything first",
    listenLabel: "Listen to manifest",
  },
  fr: {
    headline: "Si ça ne tient pas,\nfais mieux.",
    sub: "DeineStimme donne aux gens les outils pour transformer préoccupations, critiques et idées en propositions viables — ensemble, visiblement et constructivement.",
    doors: [
      { tag: "Quotidien", text: "Quelque chose te dérange — mais tu ne sais pas quoi en faire ? Ici tu en fais une proposition concrète. Sans diplôme, sans dossier, sans prérequis.", btn: "Transformer le problème" },
      { tag: "Comprendre", text: "Tu veux d'abord voir si ça a vraiment du sens ? Normal. Regarde en quelques minutes comment le principe fonctionne et décide après.", btn: "Comment ça marche" },
      { tag: "Construire", text: "Tu ne veux pas attendre que d'autres changent les choses ? Alors entre. Ici tu participes à façonner comment les solutions émergent.", btn: "Commencer à construire" },
      { tag: "Institution", text: "Vous cherchez un processus qui traduit la participation en résultats ? DeineStimme rend les contributions traçables et montre ce qui tient.", btn: "Lancer un pilote" },
    ],
    seeAll: "Tout voir d'abord",
    listenLabel: "Écouter le manifeste",
  },
  es: {
    headline: "Si no se sostiene,\nhazlo mejor.",
    sub: "DeineStimme da a las personas las herramientas para convertir preocupaciones, críticas e ideas en propuestas viables — juntos, de forma visible y constructiva.",
    doors: [
      { tag: "Cotidiano", text: "Algo no funciona — pero no sabes a dónde llevarlo? Aquí lo conviertes en una propuesta concreta. Sin título, sin solicitud, sin requisitos.", btn: "Convertir problema en propuesta" },
      { tag: "Entender", text: "Quieres ver primero si esto realmente tiene sentido? Justo. Mira en pocos minutos cómo funciona el principio y decide después.", btn: "Cómo funciona" },
      { tag: "Construir", text: "No quieres esperar a que otros cambien las cosas? Entonces entra. Aquí participas en cómo surgen y mejoran las soluciones.", btn: "Empezar a construir" },
      { tag: "Institución", text: "Buscan un proceso que traduzca participación en resultados? DeineStimme mejora propuestas iterativamente y muestra lo que se sostiene.", btn: "Iniciar un piloto" },
    ],
    seeAll: "Ver todo primero",
    listenLabel: "Escuchar el manifiesto",
  },
  nl: {
    headline: "Als het niet draagt,\ndoe het beter.",
    sub: "DeineStimme geeft mensen de tools om zorgen, kritiek en ideeën om te zetten in haalbare voorstellen — samen, zichtbaar en constructief.",
    doors: [
      { tag: "Dagelijks", text: "Iets klopt niet — maar je weet niet waar je ermee naartoe moet? Hier maak je er een concreet voorstel van. Geen titel, geen aanvraag nodig.", btn: "Probleem in voorstel omzetten" },
      { tag: "Begrijpen", text: "Je wilt eerst zien of dit echt zinvol is? Logisch. Bekijk in een paar minuten hoe het principe werkt en beslis daarna.", btn: "Zo werkt het" },
      { tag: "Meebouwen", text: "Je wilt niet wachten tot anderen iets veranderen? Ga dan naar binnen. Hier vorm je mee hoe oplossingen ontstaan en beter worden.", btn: "Nu meebouwen" },
      { tag: "Instelling", text: "Zoekt u een proces dat participatie in resultaten vertaalt? DeineStimme maakt bijdragen traceerbaar en toont wat standhoudt.", btn: "Pilotproject starten" },
    ],
    seeAll: "Eerst alles bekijken",
    listenLabel: "Manifest beluisteren",
  },
  id: {
    headline: "Kalau tidak kokoh,\nperbaiki.",
    sub: "DeineStimme memberi orang alat untuk mengubah kekhawatiran, kritik, dan ide menjadi proposal yang layak — bersama, terlihat, dan konstruktif.",
    doors: [
      { tag: "Sehari-hari", text: "Ada yang salah — tapi kamu tidak tahu harus dibawa ke mana? Di sini kamu mengubahnya menjadi proposal konkret. Tanpa gelar, tanpa prasyarat.", btn: "Ubah masalah jadi proposal" },
      { tag: "Memahami", text: "Kamu ingin lihat dulu apakah ini masuk akal? Wajar. Lihat dalam beberapa menit bagaimana prinsipnya bekerja dan putuskan setelahnya.", btn: "Cara kerjanya" },
      { tag: "Membangun", text: "Kamu tidak mau menunggu orang lain mengubah sesuatu? Maka masuklah. Di sini kamu ikut membentuk bagaimana solusi muncul.", btn: "Mulai membangun" },
      { tag: "Institusi", text: "Mencari proses yang menerjemahkan partisipasi menjadi hasil? DeineStimme memperbaiki proposal secara iteratif dan menunjukkan apa yang kokoh.", btn: "Mulai proyek percontohan" },
    ],
    seeAll: "Lihat semua dulu",
    listenLabel: "Dengarkan manifesto",
  },
};

function EnergyOrb({ size = 280 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const draw = useCallback((canvas) => {
    const w = size, h = size, cx = w / 2, cy = h / 2, r = w * 0.18;
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");
    let t = 0;
    function frame() {
      t += 0.008;
      ctx.clearRect(0, 0, w * dpr, h * dpr);
      ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 + t * 0.3;
        ctx.beginPath(); ctx.ellipse(cx, cy, r * 2.8 + Math.sin(t + i) * 15, r * 1.8 + Math.cos(t * .7 + i) * 10, a, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,201,176,${.06 + Math.sin(t + i) * .03})`; ctx.lineWidth = 1; ctx.stroke();
      }
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + t * .5, ar = r * 1.6 + Math.sin(t * 1.3 + i * .7) * 20;
        ctx.beginPath(); ctx.arc(cx, cy, ar, a - .4, a + .4);
        const g = ctx.createLinearGradient(cx + Math.cos(a - .4) * ar, cy + Math.sin(a - .4) * ar, cx + Math.cos(a + .4) * ar, cy + Math.sin(a + .4) * ar);
        g.addColorStop(0, "rgba(0,201,176,0)"); g.addColorStop(.5, `rgba(0,201,176,${.15 + Math.sin(t * 2 + i) * .08})`); g.addColorStop(1, "rgba(0,201,176,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
      }
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.2);
      g1.addColorStop(0, `rgba(0,201,176,${.12 + Math.sin(t * 1.5) * .04})`); g1.addColorStop(.4, "rgba(0,201,176,.04)"); g1.addColorStop(1, "rgba(0,201,176,0)");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, w, h);
      const cg = ctx.createRadialGradient(cx - r * .2, cy - r * .2, 0, cx, cy, r);
      cg.addColorStop(0, `rgba(200,230,255,${.6 + Math.sin(t * 2) * .1})`); cg.addColorStop(.3, "rgba(0,201,176,.35)"); cg.addColorStop(.7, "rgba(0,140,130,.15)"); cg.addColorStop(1, "rgba(0,80,70,0)");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = cg; ctx.fill();
      const sg = ctx.createRadialGradient(cx + r * .05, cy + r * .1, 0, cx, cy, r * .25);
      sg.addColorStop(0, `rgba(232,148,58,${.7 + Math.sin(t * 3) * .2})`); sg.addColorStop(.5, "rgba(232,148,58,.15)"); sg.addColorStop(1, "rgba(232,148,58,0)");
      ctx.beginPath(); ctx.arc(cx + r * .05, cy + r * .1, r * .25, 0, Math.PI * 2); ctx.fillStyle = sg; ctx.fill();
      const eg = ctx.createRadialGradient(cx, cy, r * .9, cx, cy, r);
      eg.addColorStop(0, "rgba(0,201,176,0)"); eg.addColorStop(1, `rgba(0,201,176,${.2 + Math.sin(t) * .08})`);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = eg; ctx.lineWidth = 2; ctx.stroke();
      for (let i = 0; i < 12; i++) {
        const pa = (i / 12) * Math.PI * 2 + t * .7, pd = r * 1.2 + Math.sin(t * 2 + i * 1.3) * r * .8;
        ctx.beginPath(); ctx.arc(cx + Math.cos(pa) * pd, cy + Math.sin(pa) * pd, 1 + Math.sin(t * 3 + i) * .5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,201,176,${.3 + Math.sin(t * 2 + i * .5) * .2})`; ctx.fill();
      }
      ctx.restore(); animRef.current = requestAnimationFrame(frame);
    }
    frame();
  }, [size]);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = size * dpr; c.height = size * dpr;
    c.style.width = size + "px"; c.style.height = size + "px";
    draw(c);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [size, draw]);
  return <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} />;
}

function ManifestSequence({ lines, lang, isMobile }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [playing, setPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);
  const totalDuration = AUDIO_DURATIONS[lang];
  const lineCount = lines.length;
  const perLine = totalDuration / lineCount;
  const c = CONTENT[lang];

  useEffect(() => {
    setIndex(0); setPhase("idle"); setPlaying(false);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    const audio = new Audio(AUDIO_FILES[lang]);
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", () => setAudioLoaded(true));
    audio.addEventListener("error", () => setAudioLoaded(false));
    audio.addEventListener("ended", () => { setPlaying(false); setPhase("done"); });
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, [lang]);

  useEffect(() => {
    if (!playing) return;
    let timer;
    if (phase === "in") timer = setTimeout(() => setPhase("hold"), 600);
    else if (phase === "hold") {
      const holdTime = (perLine * 1000) - 1200;
      timer = setTimeout(() => setPhase("out"), Math.max(800, holdTime));
    } else if (phase === "out") {
      timer = setTimeout(() => {
        if (index < lineCount - 1) { setIndex(i => i + 1); setPhase("in"); }
        else { setPhase("done"); setPlaying(false); }
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [phase, index, playing, perLine, lineCount]);

  const handlePlay = () => {
    if (playing) { setPlaying(false); if (audioRef.current) audioRef.current.pause(); return; }
    setIndex(0); setPhase("in"); setPlaying(true);
    if (audioRef.current && audioLoaded) { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); }
  };

  const getOpacity = () => (phase === "idle" || phase === "out") ? 0 : 1;
  const getTransform = () => phase === "idle" ? "translateY(16px)" : phase === "out" ? "translateY(-16px)" : "translateY(0)";
  const displayText = phase === "done" ? lines[lines.length - 1] : lines[index];

  const orbSize = isMobile ? 280 : 400;
  const btnSize = isMobile ? 56 : 64;

  return (
    <div style={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: isMobile ? "0 20px" : 0 }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: playing ? 0.5 : 0.25, transition: "opacity 1s ease", pointerEvents: "none" }}>
        <EnergyOrb size={orbSize} />
      </div>
      <button onClick={handlePlay} style={{
        position: "relative", zIndex: 3, width: btnSize + "px", height: btnSize + "px", borderRadius: "50%",
        border: `1.5px solid ${playing ? TURQUOISE : TURQUOISE + "80"}`,
        background: playing ? TURQUOISE + "15" : "transparent",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: isMobile ? "32px" : "48px", transition: "all 0.3s",
        WebkitTapHighlightColor: "transparent",
      }}>
        {playing ? (
          <div style={{ display: "flex", gap: "5px" }}>
            <div style={{ width: "3px", height: "18px", background: TURQUOISE, borderRadius: "1px" }} />
            <div style={{ width: "3px", height: "18px", background: TURQUOISE, borderRadius: "1px" }} />
          </div>
        ) : (
          <div style={{ width: 0, height: 0, borderLeft: `16px solid ${TURQUOISE}`, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", marginLeft: "3px" }} />
        )}
      </button>
      {phase === "idle" && (
        <p style={{ position: "relative", zIndex: 3, fontFamily: "'DM Mono', monospace", fontSize: "11px", color: DIM, letterSpacing: "0.15em", marginBottom: "32px", textTransform: "uppercase", textAlign: "center" }}>
          {c.listenLabel}
        </p>
      )}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: isMobile ? "0 8px" : "0 32px", maxWidth: "680px", minHeight: isMobile ? "120px" : "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: isMobile ? "clamp(18px, 5vw, 26px)" : "clamp(22px, 4vw, 34px)", lineHeight: 1.5, fontWeight: 300, color: SILVER, whiteSpace: "pre-line", opacity: getOpacity(), transform: getTransform(), transition: "opacity 0.6s ease, transform 0.6s ease", margin: 0 }}>
          {playing || phase === "done" ? displayText : ""}
        </p>
      </div>
      {(playing || phase === "done") && (
        <div style={{ position: "relative", zIndex: 3, display: "flex", gap: isMobile ? "3px" : "4px", justifyContent: "center", marginTop: isMobile ? "32px" : "48px", flexWrap: "wrap", maxWidth: isMobile ? "200px" : "none" }}>
          {lines.map((_, i) => (
            <div key={i} style={{
              width: i === index && phase !== "done" ? (isMobile ? "18px" : "24px") : i <= index || phase === "done" ? (isMobile ? "6px" : "8px") : "4px",
              height: "3px", borderRadius: "2px",
              background: i < index || phase === "done" ? TURQUOISE + "60" : i === index && phase !== "done" ? TURQUOISE : DIM + "40",
              transition: "all 0.4s ease",
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

function DoorCard({ tag, text, btn, index, isMobile, lang }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleClick = () => {
    const link = DOOR_LINKS[index];
    if (!link) return;
    if (link.startsWith("mailto:")) window.location.href = link;
    else navigate(`${link}?lang=${lang}`);
  };

  return (
    <div ref={ref} onClick={handleClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "#161620" : CARD_BG,
        border: `1px solid ${hover ? TURQUOISE + "30" : TURQUOISE + "10"}`,
        borderRadius: "4px",
        padding: isMobile ? "24px 20px" : "32px 28px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        gap: isMobile ? "20px" : "24px",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: `opacity .6s ease ${index * 100}ms, transform .6s ease ${index * 100}ms, background .3s, border-color .3s`,
        cursor: "pointer",
        minHeight: isMobile ? "200px" : "260px",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: ".15em", color: TURQUOISE, textTransform: "uppercase", display: "block", marginBottom: isMobile ? "12px" : "16px" }}>{tag}</span>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: isMobile ? "16px" : "17px", lineHeight: 1.7, color: SILVER, fontWeight: 300, margin: 0 }}>{text}</p>
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: hover ? TURQUOISE : DIM, letterSpacing: ".05em", transition: "color .3s", display: "flex", alignItems: "center", gap: "8px", minHeight: "44px" }}>
        <span>{btn}</span>
        <span style={{ transform: hover ? "translateX(4px)" : "translateX(0)", transition: "transform .3s", display: "inline-block" }}>→</span>
      </div>
    </div>
  );
}

export default function DeineStimmeLanding() {
  const [lang, setLang] = useState("de");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const [heroVis, setHeroVis] = useState(false);
  const isMobile = useIsMobile();
  const c = CONTENT[lang];
  const m = MANIFEST[lang];

  useEffect(() => {
    if (!heroRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeroVis(true); }, { threshold: .1 });
    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY || 0);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const orbHeroSize = isMobile ? 160 : 220;
  const orbFooterSize = isMobile ? 80 : 120;

  return (
    <div style={{ background: VOID, minHeight: "100vh", color: SILVER, overflowX: "hidden" }}>
      {/* Fonts loaded via @fontsource in main.jsx — DSGVO-konform */}

      {/* Meta viewport — should be in index.html but adding as safety */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        button { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "center", gap: isMobile ? "2px" : "4px",
        padding: isMobile ? "12px 8px" : "16px 24px",
        background: `linear-gradient(to bottom, ${VOID}, ${VOID}ee 60%, transparent)`,
      }}>
        {LANGS.map(l => (
          <button key={l.code} onClick={() => setLang(l.code)} style={{
            fontFamily: "'DM Mono', monospace", fontSize: isMobile ? "10px" : "11px",
            letterSpacing: ".1em",
            padding: isMobile ? "8px 10px" : "6px 12px",
            background: lang === l.code ? TURQUOISE + "18" : "transparent",
            border: lang === l.code ? `1px solid ${TURQUOISE}40` : "1px solid transparent",
            color: lang === l.code ? TURQUOISE : DIM,
            cursor: "pointer", borderRadius: "2px", transition: "all .3s",
            minHeight: "44px", minWidth: "44px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {l.label}
          </button>
        ))}
      </nav>

      {/* Hero */}
      <div ref={heroRef} style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: isMobile ? "80px 20px 40px" : "80px 24px 40px",
        position: "relative",
      }}>
        <EnergyOrb size={orbHeroSize} />
        <h1 style={{
          fontFamily: "'DM Mono', monospace", fontSize: isMobile ? "12px" : "clamp(13px,1.8vw,15px)",
          fontWeight: 400, letterSpacing: isMobile ? ".2em" : ".3em", color: TURQUOISE,
          marginTop: isMobile ? "20px" : "24px", marginBottom: isMobile ? "32px" : "48px",
          opacity: heroVis ? 1 : 0, transform: heroVis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease .3s, transform 1s ease .3s",
        }}>DEINESTIMME.ORG</h1>
        <p style={{
          fontFamily: "'Crimson Pro', serif",
          fontSize: isMobile ? "clamp(24px,7vw,32px)" : "clamp(26px,4.5vw,42px)",
          lineHeight: 1.4, fontWeight: 300,
          color: SILVER, maxWidth: "700px", margin: "0 auto 40px", whiteSpace: "pre-line",
          opacity: heroVis ? 1 : 0, transform: heroVis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease .6s, transform 1s ease .6s",
        }}>{c.headline}</p>
        <p style={{
          fontFamily: "'Crimson Pro', serif",
          fontSize: isMobile ? "15px" : "17px",
          lineHeight: 1.7, fontWeight: 300,
          color: DIM, maxWidth: "520px", margin: "0 auto",
          padding: isMobile ? "0 8px" : 0,
          opacity: heroVis ? 1 : 0, transition: "opacity 1s ease 1s",
        }}>{c.sub}</p>
        <div style={{
          position: "absolute", bottom: isMobile ? "24px" : "40px",
          left: "50%", transform: "translateX(-50%)",
          opacity: Math.max(0, 1 - scrollY / 200),
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <div style={{ width: "1px", height: isMobile ? "32px" : "48px", background: `linear-gradient(to bottom, transparent, ${DIM})`, marginBottom: "8px" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: DIM, letterSpacing: ".15em" }}>SCROLL</span>
        </div>
      </div>

      {/* Manifest */}
      <ManifestSequence lines={m} lang={lang} isMobile={isMobile} />

      {/* Divider */}
      <div style={{ width: "1px", height: isMobile ? "48px" : "80px", background: `linear-gradient(to bottom, transparent, ${TURQUOISE}30, transparent)`, margin: isMobile ? "0 auto 48px" : "0 auto 80px" }} />

      {/* Doors */}
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: isMobile ? "0 16px 40px" : "0 24px 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))",
          gap: isMobile ? "12px" : "20px",
        }}>
          {c.doors.map((d, i) => (
            <DoorCard key={`${lang}-${i}`} tag={d.tag} text={d.text} btn={d.btn} index={i} isMobile={isMobile} lang={lang} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: isMobile ? "32px" : "48px" }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "12px", color: DIM,
            cursor: "pointer", letterSpacing: ".05em",
            borderBottom: `1px solid ${DIM}40`, paddingBottom: "2px",
            display: "inline-block", minHeight: "44px", lineHeight: "44px",
          }}>
            {c.seeAll} →
          </span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: isMobile ? "80px 24px 48px" : "120px 24px 80px" }}>
        <EnergyOrb size={orbFooterSize} />
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: isMobile ? "clamp(18px,5vw,24px)" : "clamp(20px,3vw,28px)", fontWeight: 300, color: SILVER, marginTop: "24px", marginBottom: "0" }}>deinestimme.org</p>
      </div>
      <div style={{ textAlign: "center", padding: "24px", fontFamily: "'DM Mono', monospace", fontSize: "11px", color: DIM + "80" }}>2026</div>
    </div>
  );
}
