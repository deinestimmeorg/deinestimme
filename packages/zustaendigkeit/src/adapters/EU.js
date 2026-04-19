// ─── Country Adapter: EU — Spec v0.4 §3 (Phase 3b Scaffold) ──────────────
// Bündelt sektorale EU-Spezialregime (DSGVO one-stop-shop, ECN, IMI).
// MVP: liefert Sektor-Hinweise + Vorabentscheidungspfad-Hinweis (Art. 267).

export const EU_ADAPTER = {
  country: "EU",
  hasAdapter: false, // flipped to true when Phase 3b ships
  meta: {
    grundnorm: "Art. 5 EUV (Prinzip der begrenzten Einzelermächtigung)",
    kompetenzkategorien: {
      exclusive: "Art. 3 AEUV (Zoll, Wettbewerb, Handelspolitik, Euro-Geldpolitik, Meeresfischerei)",
      shared: "Art. 4 AEUV (Binnenmarkt, Verbraucherschutz, Umwelt, Verkehr, Energie, …)",
      coordinating: "Art. 5 AEUV (Wirtschafts- und Beschäftigungspolitik)",
      cfsp: "Art. 24 EUV (Gemeinsame Außen- und Sicherheitspolitik)",
      supporting: "Art. 6 AEUV (Gesundheit, Industrie, Kultur, Bildung, Tourismus)",
    },
    sektorale_regime: {
      data_protection: {
        basis: "DSGVO Art. 56 / 60 / 65",
        mechanismus: "one-stop-shop: federführende Aufsichtsbehörde (LSA) + betroffene Aufsichtsbehörden (CSAs)",
        eskalation: "EDPB (European Data Protection Board) bei Streit",
      },
      competition: {
        basis: "VO 1/2003 + Bekanntmachung Kommission/ECN",
        mechanismus: "Fallzuweisung im European Competition Network (ECN); 2-Monats-Frist",
        verdraengung: "Art. 11 Abs. 6 VO 1/2003 — Kommissionseröffnung verdrängt nationale Verfahren",
      },
      single_market: {
        basis: "IMI-VO 1024/2012",
        mechanismus: "Internal Market Information System — Behörde-zu-Behörde-Anfragen",
      },
    },
    rechtsweg: "Art. 267 AEUV Vorabentscheidungsverfahren (CILFIT, Foto-Frost)",
    rechtsprechungsanker: [
      "Meroni (1958) — Delegationsgrenzen",
      "Romano (1981) — kein Quasi-Gesetzgeber",
      "ESMA (2014, C-270/12)",
      "Tobacco (2002, C-491/01)",
      "Facebook Ireland (2021, C-645/19) — DSGVO one-stop-shop",
    ],
  },
  proceduralHint: (sector) => {
    const base = {
      layer_d: "Prozeduralpfad EU",
      court_path: "Vorabentscheidungsverfahren Art. 267 AEUV bei Auslegungsfragen",
    };
    if (sector === "data_protection") {
      return {
        ...base,
        sectoral_regime: "DSGVO one-stop-shop",
        deadlines: ["LSA: 1 Monat Identifizierung", "CSAs: 4 Wochen Stellungnahme nach Entwurf", "EDPB: 1 Monat bei Streit (Art. 65)"],
      };
    }
    if (sector === "competition") {
      return {
        ...base,
        sectoral_regime: "ECN-Fallzuweisung",
        deadlines: ["ECN: 2 Monate Fallzuweisung nach Notifikation"],
      };
    }
    if (sector === "single_market") {
      return {
        ...base,
        sectoral_regime: "IMI",
        deadlines: ["IMI-Antwortfristen sind sektorspezifisch (siehe Basisrechtsakt)"],
      };
    }
    return base;
  },
};
