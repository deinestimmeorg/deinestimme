// ─── Country Adapter: FR — Spec v0.5 §3 ──────────────────────────────────
// Frankreich: dezentralisierter Einheitsstaat nach Art. 1 Constitution.
// Post-loi-NOTRe (2015): keine clause de compétence générale mehr für
// Région und Département — nur noch für Commune.
//
// MVP-Modus: generische Blocs de compétences + EPCI-Klassen-Discriminator +
// generische Sub-Adapter (Paris, Lyon, Corse, Art73, Art74).
// Produktionsvariante: je Einheit ein eigenes Regelwerk.

// ─── Blocs de compétences (CGCT) ──
// Äquivalent zur DE-LeiKa-Typisierung, aber territorial sortiert.
export const FR_BLOCS = {
  etat: {
    label: "L'État",
    materien: [
      "Justiz", "Verteidigung", "Außenpolitik", "innere Sicherheit",
      "nationale Bildungscurricula", "staatliche Steuern",
      "nationale Gesundheitspolitik",
    ],
    basis: ["Constitution", "CGCT L.1111-1"],
  },
  region: {
    label: "Région",
    materien: [
      "wirtschaftliche Entwicklung (SRDEII)",
      "Raumordnung (SRADDET)",
      "EU-Strukturfonds",
      "TER-Regionalverkehr",
      "Bau/Unterhalt Lycées",
      "Berufsbildung",
    ],
    basis: ["CGCT L.4221-1 ff.", "Loi NOTRe 2015"],
  },
  departement: {
    label: "Département",
    materien: [
      "RSA", "Behindertenhilfe", "Kinder-/Seniorenbetreuung",
      "ländliche Infrastruktur", "Départementstraßen", "SDIS",
      "Bau/Unterhalt Collèges",
    ],
    basis: ["CGCT L.3211-1 ff."],
  },
  commune: {
    label: "Commune",
    materien: [
      "Stadtplanung (PLU)", "ÖPNV lokal", "Wasser/Abwasser",
      "Abfall", "Grundschulen", "Zivilstand",
    ],
    basis: ["CGCT L.2121-29", "clause de compétence générale (communale)"],
  },
};

// ─── EPCI-Klassen (v0.5 §2.3) ──
// Discriminator: vier Hauptklassen mit unterschiedlichen Pflichtblöcken.
export const FR_EPCI_CLASSES = {
  CC: {
    label: "Communauté de communes",
    basis: "CGCT Art. L5214-16",
    pflichtkern: [
      "Raumordnung", "wirtschaftliche Entwicklung", "GEMAPI",
      "Aufnahmeflächen gens du voyage", "Abfall",
    ],
    besonderheit: "Delegationsmöglichkeiten Wasser/Abwasser; intérêt communautaire binnen 2 Jahren",
  },
  CA: {
    label: "Communauté d'agglomération",
    basis: "CGCT Art. L5216-5",
    pflichtkern: [
      "wirtschaftliche Entwicklung", "Raumordnung inkl. Mobilität",
      "sozialer Wohnungsbau", "Stadtpolitik", "GEMAPI",
    ],
    besonderheit: "Breiterer Pflichtkatalog",
  },
  CU: {
    label: "Communauté urbaine",
    basis: "CGCT Art. L5215-20",
    pflichtkern: [
      "kollektive Dienste", "Umwelt", "zusätzliche Pflichtblöcke",
    ],
    besonderheit: "Keine optionalen Kompetenzen im klassischen Sinn",
  },
  MET: {
    label: "Métropole",
    basis: "CGCT Art. L5217-2",
    pflichtkern: [
      "sehr breite Pflichtblöcke",
      "konventionelle Übernahme staatlicher/departementaler/regionaler Zuständigkeiten",
    ],
    besonderheit: "Sonderregime Métropole du Grand Paris und Métropole de Lyon",
  },
};

// ─── Collectivités à statut particulier (Sub-Adapter) ──
export const FR_SUB_ADAPTERS = {
  "fr.paris": {
    id: "fr.paris",
    label: "Ville de Paris",
    basis: ["CGCT Art. L2512-1", "CGCT Art. L2512-13"],
    mechanismus: "collectivité à statut particulier anstelle Commune + Département",
    besonderheit: "préfet de police hält Polizei-Sonderkompetenz (Art. L2512-13)",
  },
  "fr.lyon": {
    id: "fr.lyon",
    label: "Métropole de Lyon",
    basis: ["CGCT Art. L3611-1", "CGCT Art. L3641-1/-2"],
    mechanismus: "hybride Ebene: Gemeinde + EPCI + Département in einem",
    besonderheit: "ersetzt frühere Communauté urbaine + Département Rhône",
  },
  "fr.corse": {
    id: "fr.corse",
    label: "Collectivité de Corse",
    basis: ["CGCT Art. L4421-1", "CGCT Art. L4422-16"],
    mechanismus: "collectivité à statut particulier seit 2018",
    besonderheit: "Assemblée de Corse hält Vorschlagsrecht zu Gesetzen/Verordnungen",
  },
  "fr.art73": {
    id: "fr.art73",
    label: "Outre-mer Art. 73 (identité législative)",
    basis: ["Constitution Art. 73"],
    einheiten: ["Guadeloupe", "Guyane", "Martinique", "La Réunion", "Mayotte"],
    mechanismus: "nationale Gesetze gelten von Rechts wegen",
    lockerungsinstrumente: ["Anpassung", "Habilitation", "Experiment"],
  },
  "fr.art74": {
    id: "fr.art74",
    label: "Outre-mer Art. 74 (spécialité législative)",
    basis: ["Constitution Art. 74"],
    einheiten: [
      "Saint-Barthélemy", "Saint-Martin", "Saint-Pierre-et-Miquelon",
      "Wallis-et-Futuna", "Polynésie française",
    ],
    mechanismus: "Kompetenzen durch organisches Recht je Einheit",
  },
};

// Sub-adapter selector for FR territories.
// Returns { sub_adapter_id, statuto_speciale:false, epci_class, art73_74_regime }
export function selectFRSubAdapter(territorium, level, epci_class) {
  const t = (territorium || "").toLowerCase();
  if (t === "paris" || t.includes("ville de paris")) {
    return { sub_adapter_id: "fr.paris", epci_class: null, art73_74_regime: null };
  }
  if (t === "lyon" || t.includes("métropole de lyon") || t.includes("metropole de lyon")) {
    return { sub_adapter_id: "fr.lyon", epci_class: "MET", art73_74_regime: null };
  }
  if (t === "corse" || t.includes("corse") || t.includes("corsica")) {
    return { sub_adapter_id: "fr.corse", epci_class: null, art73_74_regime: null };
  }
  if (/(guadeloupe|guyane|martinique|la réunion|la reunion|mayotte)/i.test(t)) {
    return { sub_adapter_id: "fr.art73", epci_class: null, art73_74_regime: "art73" };
  }
  if (/(saint-barthélemy|saint-barthelemy|saint-martin|saint-pierre|wallis|polynésie|polynesie)/i.test(t)) {
    return { sub_adapter_id: "fr.art74", epci_class: null, art73_74_regime: "art74" };
  }
  // EPCI-level without territorial special status
  if ((level || "").toLowerCase() === "epci") {
    return {
      sub_adapter_id: null,
      epci_class: epci_class && FR_EPCI_CLASSES[epci_class] ? epci_class : null,
      art73_74_regime: null,
    };
  }
  return { sub_adapter_id: null, epci_class: null, art73_74_regime: null };
}

// Indicative authority per level (FR).
export function indicativeAuthorityFR(level) {
  const map = {
    EU: "Institutionen der Europäischen Union",
    Bund: "L'État (République française)",
    État: "L'État (République française)",
    Land: "Région",
    Région: "Région",
    Kreis: "Département",
    Département: "Département",
    Kommune: "Commune / EPCI",
    Commune: "Commune / EPCI",
  };
  return map[level] || level;
}

export const FR_ADAPTER = {
  country: "FR",
  hasAdapter: true,
  meta: {
    grundnorm: "Constitution du 4 octobre 1958, Art. 1 (République décentralisée)",
    territoriale_ebenen: ["EU", "État", "Région", "Département", "Commune", "EPCI"],
    spezial_normen: [
      "CGCT (Code général des collectivités territoriales)",
      "Constitution Art. 72/73/74",
      "Loi NOTRe 2015 — Ende der clause de compétence générale für Région/Département",
    ],
    weiterleitung_basis: "Art. L.114-2 CRPA",
    rechtsweg: "Juridiction administrative (Conseil d'État)",
    bloc_counts: {
      communes: "~35.000",
      epci_classes: 4,
      sub_adapters: 5,
    },
    jurisprudenz_trigger: {
      arcelor: {
        ref: "CE 08.02.2007, Arcelor",
        effect: "Verfassungsidentität + équivalence-des-protections-Prüfung",
      },
      french_data_network: {
        ref: "CE 21.04.2021, French Data Network",
        effect: "Ablehnung ultra-vires-Kontrolle; Stufe-3-Trigger nationale Sicherheit",
      },
    },
  },
  blocs: FR_BLOCS,
  epciClasses: FR_EPCI_CLASSES,
  subAdapters: FR_SUB_ADAPTERS,
  selectSubAdapter: selectFRSubAdapter,
  indicativeAuthority: indicativeAuthorityFR,
  proceduralHint: (territorium) => {
    const base = {
      layer_d: "Prozeduralpfad FR",
      forwarding_duty: { basis: "Art. L.114-2 CRPA" },
      court_path: "Juridiction administrative (Conseil d'État)",
      deadlines: [
        "Saisine préalable: 2 Monate (Art. R.421-1 CJA)",
        "Unzuständige Behörde: unverzügliche Weiterleitung (L.114-2 CRPA)",
      ],
    };
    const sel = selectFRSubAdapter(territorium);
    if (sel.sub_adapter_id) {
      return {
        ...base,
        sub_adapter: sel.sub_adapter_id,
        sub_adapter_note: FR_SUB_ADAPTERS[sel.sub_adapter_id]?.mechanismus,
      };
    }
    return base;
  },
};
