// ─── Country Adapter: IT — Spec v0.5 §4 ──────────────────────────────────
// Italien: asymmetrisch regionalisierter Staat.
// Besonderheit: invertierte Residualregel (Art. 117 Abs. 4 Cost.).
// Alles nicht explizit dem Staat zugewiesene fällt an die Regionen.
//
// MVP-Modus: generischer Standard + generischer Statuto-speciale-Adapter.
// Produktionsvariante: 7 Sub-Adapter-Regelwerke (5 Regionen + Trento + Bolzano).

// ─── Kompetenztypen nach Art. 117 Cost. ──
export const IT_COMPETENZE = {
  esclusiva_stato: {
    label: "Competenza legislativa esclusiva dello Stato",
    basis: "Art. 117 Abs. 2 Cost.",
    materien: [
      "Außenpolitik", "Einwanderung", "EU-Beziehungen", "Verteidigung",
      "Währung", "Justiz", "Zivil-/Strafrecht", "Staatsbürgerschaft",
      "Wettbewerbsschutz", "Umwelt/Ökosystem/Kulturgüter",
      "LEP (lit. m — Livelli Essenziali delle Prestazioni)",
    ],
  },
  concorrente: {
    label: "Legislazione concorrente",
    basis: "Art. 117 Abs. 3 Cost.",
    mechanismus: "Staat setzt Rahmengesetze, Regionen detaillieren",
    materien: [
      "Außenhandel", "Arbeitsschutz", "Gesundheitsschutz",
      "Raumordnung (governo del territorio)", "Zivilschutz",
      "große Verkehrs-/Schifffahrtsnetze", "Energieerzeugung/-transport",
    ],
  },
  residuale_regionale: {
    label: "Competenza residuale delle Regioni",
    basis: "Art. 117 Abs. 4 Cost.",
    mechanismus: "invertierte Residualregel — alles nicht enumerierte",
    materien: [
      "lokales Sozialwesen", "Berufsausbildung",
      "Landwirtschaft (soweit nicht EU)", "Tourismus",
      "lokales Handwerk", "lokaler Verkehr",
    ],
  },
};

// ─── Materie trasversali (Stufe-3-Trigger) ──
// Art. 117 Abs. 2 lit. s/e/m Cost. — Querschnittskompetenzen.
export const IT_MATERIE_TRASVERSALI = [
  {
    key: "tutela_ambiente",
    label: "Umweltschutz / tutela dell'ambiente",
    basis: "Art. 117 Abs. 2 lit. s Cost.",
    keywords: ["umwelt", "ambiente", "ecologia", "ökologie", "klima", "clima"],
  },
  {
    key: "tutela_concorrenza",
    label: "Wettbewerbsschutz / tutela della concorrenza",
    basis: "Art. 117 Abs. 2 lit. e Cost.",
    keywords: ["wettbewerb", "concorrenza", "markt", "mercato"],
  },
  {
    key: "lep",
    label: "Livelli Essenziali delle Prestazioni (LEP)",
    basis: "Art. 117 Abs. 2 lit. m Cost.",
    keywords: ["lep", "livelli essenziali", "mindeststandard", "lea"],
  },
];

// ─── Regioni a statuto speciale (Sub-Adapter-Familie) ──
export const IT_STATUTO_SPECIALE = {
  "it.statuto.sicilia": {
    id: "it.statuto.sicilia",
    label: "Regione Siciliana",
    basis: ["Cost. Art. 116", "Statuto Sicilia Art. 14, 17", "Finanznormen 2025"],
  },
  "it.statuto.sardegna": {
    id: "it.statuto.sardegna",
    label: "Regione Autonoma della Sardegna",
    basis: ["Cost. Art. 116", "Statuto Sardegna Art. 3", "Norme di attuazione"],
  },
  "it.statuto.valle_daosta": {
    id: "it.statuto.valle_daosta",
    label: "Regione Autonoma Valle d'Aosta",
    basis: ["Cost. Art. 116", "Statuto Valle d'Aosta", "Norme di attuazione — Finanzordnung"],
  },
  "it.statuto.friuli_venezia_giulia": {
    id: "it.statuto.friuli_venezia_giulia",
    label: "Regione Autonoma Friuli-Venezia Giulia",
    basis: ["Cost. Art. 116", "Statuto FVG Art. 4", "2026er Verfassungsgesetz"],
  },
  "it.statuto.trentino": {
    id: "it.statuto.trentino",
    label: "Regione Autonoma Trentino-Alto Adige (Hülle)",
    basis: ["Cost. Art. 116", "Statuto Art. 8"],
    hinweis: "Tragende Zuständigkeiten sitzen auf Provinzebene (Trento, Bolzano).",
  },
  "it.statuto.trentino.trento": {
    id: "it.statuto.trentino.trento",
    label: "Provincia Autonoma di Trento",
    basis: ["Statuto Art. 8", "eigenständige gesetzgeberische Potestà"],
  },
  "it.statuto.trentino.bolzano": {
    id: "it.statuto.trentino.bolzano",
    label: "Provincia Autonoma di Bolzano / Südtirol",
    basis: ["Statuto Art. 8", "eigenständige gesetzgeberische Potestà"],
  },
};

// Sub-adapter selector for IT territories.
export function selectITSubAdapter(territorium) {
  const t = (territorium || "").toLowerCase().trim();
  if (!t) return { sub_adapter_id: null, statuto_speciale: false };
  if (t === "sicilia" || t === "sizilien") {
    return { sub_adapter_id: "it.statuto.sicilia", statuto_speciale: true };
  }
  if (t === "sardegna" || t === "sardinien") {
    return { sub_adapter_id: "it.statuto.sardegna", statuto_speciale: true };
  }
  if (t.includes("valle d'aosta") || t === "aosta") {
    return { sub_adapter_id: "it.statuto.valle_daosta", statuto_speciale: true };
  }
  if (t.includes("friuli") || t.includes("venezia giulia")) {
    return { sub_adapter_id: "it.statuto.friuli_venezia_giulia", statuto_speciale: true };
  }
  if (t === "trento" || t === "trient") {
    return { sub_adapter_id: "it.statuto.trentino.trento", statuto_speciale: true };
  }
  if (t === "bolzano" || t === "bozen" || t === "südtirol" || t === "suedtirol" || t === "alto adige") {
    return { sub_adapter_id: "it.statuto.trentino.bolzano", statuto_speciale: true };
  }
  if (t.includes("trentino") || t.includes("alto adige")) {
    return { sub_adapter_id: "it.statuto.trentino", statuto_speciale: true };
  }
  return { sub_adapter_id: null, statuto_speciale: false };
}

// Detect materia trasversale in query/topic — drives Stufe-3 override.
export function detectMateriaTrasversale(queryOrTopic) {
  const blob = String(queryOrTopic || "").toLowerCase();
  for (const m of IT_MATERIE_TRASVERSALI) {
    if (m.keywords.some((kw) => blob.includes(kw))) {
      return m;
    }
  }
  return null;
}

// Indicative authority per level (IT).
export function indicativeAuthorityIT(level) {
  const map = {
    EU: "Istituzioni UE",
    Bund: "Stato (Governo + Parlamento italiano)",
    Stato: "Stato (Governo + Parlamento italiano)",
    Land: "Regione",
    Regione: "Regione",
    Kreis: "Provincia / Città Metropolitana",
    Provincia: "Provincia / Città Metropolitana",
    Kommune: "Comune",
    Comune: "Comune",
  };
  return map[level] || level;
}

export const IT_ADAPTER = {
  country: "IT",
  hasAdapter: true,
  meta: {
    grundnorm: "Costituzione della Repubblica Italiana, Art. 114–119 + Titolo V",
    territoriale_ebenen: ["EU", "Stato", "Regione", "Provincia/Città Metropolitana", "Comune"],
    residualregel: "invertiert — Art. 117 Abs. 4 Cost. weist Residualkompetenz den Regionen zu",
    spezial_normen: [
      "Art. 117 Cost. (Kompetenzkatalog)",
      "Art. 118 Cost. (vertikale Subsidiarität)",
      "TUEL — D.Lgs. 267/2000",
      "Statuti Speciali (Sicilia/Sardegna/VdA/FVG/TAA)",
    ],
    weiterleitung_basis: "L. 241/1990 (procedimento amministrativo)",
    rechtsweg: "TAR / Consiglio di Stato + Corte Costituzionale (doppelte Präjudizialität)",
    jurisprudenz_trigger: {
      granital: {
        ref: "Corte Cost. 170/1984, Granital",
        effect: "Anerkennung EU-Vorrang mit Controlimiti-Vorbehalt",
      },
      taricco: {
        ref: "EuGH C-105/14 / C-42/17; Corte Cost. Ord. 24/2017, Sent. 115/2018",
        effect: "Controlimiti — Verjährung als materiell-rechtlich, rückwirkende Verlängerung verboten",
      },
      sentenza_269_2017: {
        ref: "Corte Cost. 269/2017",
        effect: "doppelte Präjudizialität: zuerst Corte Cost., dann EuGH",
      },
    },
  },
  competenze: IT_COMPETENZE,
  materie_trasversali: IT_MATERIE_TRASVERSALI,
  statuti_speciali: IT_STATUTO_SPECIALE,
  selectSubAdapter: selectITSubAdapter,
  detectMateriaTrasversale,
  indicativeAuthority: indicativeAuthorityIT,
  proceduralHint: (territorium, sector) => {
    const base = {
      layer_d: "Prozeduralpfad IT",
      court_path: "TAR → Consiglio di Stato + Corte Costituzionale (Sent. 269/2017)",
      deadlines: [
        "Ricorso TAR: 60 Tage ab Kenntnisnahme (Art. 29 CPA)",
        "L. 241/1990: generelle 30-Tage-Verfahrensregel",
      ],
      forwarding_duty: { basis: "L. 241/1990 Art. 6 ff." },
    };
    // Sector: criminal law / fundamental rights → Sentenza-269/2017 escalation.
    if (sector === "criminal_law" || sector === "fundamental_rights") {
      return {
        ...base,
        sectoral_regime: "doppelte Präjudizialität",
        note: "Corte Costituzionale zuerst, dann ggf. EuGH via Art. 267 AEUV",
      };
    }
    const sel = selectITSubAdapter(territorium);
    if (sel.sub_adapter_id) {
      return {
        ...base,
        sub_adapter: sel.sub_adapter_id,
        statuto_speciale: true,
      };
    }
    return base;
  },
};
