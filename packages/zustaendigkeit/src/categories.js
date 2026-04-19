// ─── 4-Kategorien-Output — Spec v0.4 §4 ──────────────────────────────────
// Rechtsverbindliche Kategorisierung für das Engine-Ergebnis.

export const CATEGORY = {
  ZUSTAENDIG: "zustaendig",
  MITWIRKEND: "mitwirkend_zustaendig",
  WEITERLEITUNGSPFLICHTIG: "formell_unzustaendig_weiterleitungspflichtig",
  UNGEKLAERT: "rechtlich_ungeklaert_eskalationsbedarf",
};

export const CATEGORY_LABELS = {
  de: {
    zustaendig: "zuständig",
    mitwirkend_zustaendig: "mitwirkend zuständig",
    formell_unzustaendig_weiterleitungspflichtig: "formell unzuständig, weiterleitungspflichtig",
    rechtlich_ungeklaert_eskalationsbedarf: "rechtlich ungeklärt, Eskalationsbedarf",
  },
  en: {
    zustaendig: "competent",
    mitwirkend_zustaendig: "co-competent",
    formell_unzustaendig_weiterleitungspflichtig: "formally not competent, forwarding duty",
    rechtlich_ungeklaert_eskalationsbedarf: "legally unresolved, escalation needed",
  },
  nl: {
    zustaendig: "bevoegd",
    mitwirkend_zustaendig: "medebevoegd",
    formell_unzustaendig_weiterleitungspflichtig: "formeel onbevoegd, doorzendplicht",
    rechtlich_ungeklaert_eskalationsbedarf: "juridisch onopgehelderd, escalatienodig",
  },
  fr: {
    zustaendig: "compétent",
    mitwirkend_zustaendig: "co-compétent",
    formell_unzustaendig_weiterleitungspflichtig: "formellement incompétent, devoir de transmission",
    rechtlich_ungeklaert_eskalationsbedarf: "juridiquement non résolu, escalade nécessaire",
  },
  es: {
    zustaendig: "competente",
    mitwirkend_zustaendig: "co-competente",
    formell_unzustaendig_weiterleitungspflichtig: "formalmente no competente, deber de remisión",
    rechtlich_ungeklaert_eskalationsbedarf: "jurídicamente no resuelto, escalada necesaria",
  },
  id: {
    zustaendig: "berwenang",
    mitwirkend_zustaendig: "ikut berwenang",
    formell_unzustaendig_weiterleitungspflichtig: "secara formal tidak berwenang, wajib meneruskan",
    rechtlich_ungeklaert_eskalationsbedarf: "belum jelas secara hukum, perlu eskalasi",
  },
};

// Derive the 4-Kategorien-Output from classifier result + override.
export function categorize(cls, override_applied) {
  if (!cls || !cls.primary_level) {
    return CATEGORY.UNGEKLAERT;
  }

  // Hard override first (v0.5: 7-stage register — WEITERLEITUNG=6, GERICHTSPFAD=7)
  if (override_applied) {
    if (override_applied.stufe === 6) return CATEGORY.WEITERLEITUNGSPFLICHTIG;
    if (override_applied.stufe === 7) return CATEGORY.UNGEKLAERT;
    // Stufe 3 (transversale Durchbruchskompetenz) → mitwirkend,
    // da Zentralstaat regionale/lokale Exklusivität durchbricht.
    if (override_applied.stufe === 3) return CATEGORY.MITWIRKEND;
  }

  const conf = cls.confidence ?? 0;
  const hasSecondaries = (cls.secondary_levels || []).length > 0;
  const comp = cls.competence_type || "";

  // Very low confidence → escalate
  if (conf < 0.3) return CATEGORY.UNGEKLAERT;

  // Shared / konkurrierend with actual secondary levels → mitwirkend
  if (hasSecondaries || comp === "shared" || comp === "konkurrierend") {
    return CATEGORY.MITWIRKEND;
  }

  // Default: clearly competent
  return CATEGORY.ZUSTAENDIG;
}

// Map level → indicative authority label per country (MVP stub).
// Real adapters (Phase 3a/3b) will replace this with referenced registers.
export function indicativeAuthority(level, country = "DE") {
  const map = {
    DE: {
      EU: "Europäische Kommission / zuständige Agentur",
      Bund: "Bundesministerium (sektorspezifisch)",
      Land: "Landesministerium / Staatskanzlei",
      Kreis: "Landratsamt / Kreisverwaltung",
      Kommune: "Stadtverwaltung / Gemeinde",
    },
    NL: {
      EU: "Europese Commissie / bevoegd agentschap",
      Bund: "Rijksministerie (Rijk)",
      Land: "Provincie (Gedeputeerde Staten)",
      Kreis: "Waterschap (bij water/bodem)",
      Kommune: "Gemeente (B&W)",
    },
    FR: {
      EU: "Commission européenne / agence compétente",
      Bund: "L'État (République française)",
      État: "L'État (République française)",
      Land: "Région (Conseil régional)",
      Région: "Région (Conseil régional)",
      Kreis: "Département (Conseil départemental)",
      Département: "Département (Conseil départemental)",
      Kommune: "Commune / EPCI",
      Commune: "Commune / EPCI",
    },
    IT: {
      EU: "Istituzioni UE",
      Bund: "Stato (Governo + Parlamento italiano)",
      Stato: "Stato (Governo + Parlamento italiano)",
      Land: "Regione",
      Regione: "Regione",
      Kreis: "Provincia / Città Metropolitana",
      Provincia: "Provincia / Città Metropolitana",
      Kommune: "Comune",
      Comune: "Comune",
    },
  };
  return (map[country] || map.DE)[level] || level;
}
