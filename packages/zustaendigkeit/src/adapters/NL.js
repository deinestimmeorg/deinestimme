// ─── Country Adapter: Nederland — Spec v0.4 §3 (Phase 3a Scaffold) ───────
// Minimal-Stub: liefert korrekten Prozeduralpfad-Hinweis (Awb Art. 2:3/6:15)
// und markiert Ergebnis als rechtlich_ungeklaert_eskalationsbedarf bis der
// vollständige Adapter (bestuursorgaan-Kataster, Titel 10.1 Awb) existiert.

export const NL_ADAPTER = {
  country: "NL",
  hasAdapter: false, // flipped to true when Phase 3a ships
  meta: {
    territoriale_ebenen: ["EU", "Rijk", "Provincie", "Waterschap", "Gemeente"],
    level_mapping: {
      // DE-Ebenen → NL-Ebenen (für UI-Konsistenz)
      Bund: "Rijk",
      Land: "Provincie",
      Kreis: "Waterschap",
      Kommune: "Gemeente",
    },
    spezial_normen: [
      "Grondwet Art. 133 (Waterschappen als 4. Territorialebene)",
      "Awb Art. 1:1 (Definition bestuursorgaan)",
      "Awb Titel 10.1 (Mandat / Delegation / Attribution)",
      "Gemeentewet / Provinciewet / Waterschapswet",
      "Kaderwet zbo (zelfstandige bestuursorganen)",
    ],
    weiterleitung_basis: "Awb Art. 2:3 (Aanvraag) / Art. 6:15 (Bezwaar/Beroep)",
    weiterleitung_frist: "14 dagen",
    rechtsweg: "Rechtbank → Afdeling Bestuursrechtspraak Raad van State",
    rechtsprechungsanker: [
      "ECLI:NL:RVS:2019:2508 (Stikstof-PAS)",
      "ECLI:NL:RVS:2025:6150 (Delegation ohne Rechtsgrundlage)",
    ],
  },
  // Call this when country=NL is requested — returns a procedural hint block
  // even before the full adapter exists.
  proceduralHint: () => ({
    layer_d: "Prozeduralpfad NL (Awb)",
    deadlines: [
      "Aanvraag: 2 weken Weiterleitungspflicht bei Unzuständigkeit (Art. 2:3)",
      "Bezwaar/Beroep: unverzügliche Weiterleitung (Art. 6:15)",
    ],
    forwarding_duty: {
      basis: "Awb Art. 2:3 / 6:15",
      note: "Unzuständige Behörde muss an zuständige Behörde weiterleiten — keine Zurückweisung.",
    },
  }),
};
