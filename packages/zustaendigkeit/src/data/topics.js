// ─── Topic Dictionary — Schicht A (Spec §3) ──────────────────────────────
// Kuratiertes Seed-Set ~85 Topics. Jeder Topic verknüpft:
//   aliases: Freitext-Varianten (Umlaute, Plural, Synonyme, EN)
//   eurovoc: EuroVoc-Concept-IDs (v4.17)
//   gg:      Keys aus data/gg.js
//   tfeu:    Keys aus data/tfeu.js
//   leikaType: LeiKa-Typisierung 1-5 (Hinweis, nicht bindend)

export const TOPICS = [
  // ── Energie / Klima ─────────────────────────────────────────────────
  { id: "strompreise", de_label: "Strompreise / Energiekosten",
    aliases: ["strompreise", "strompreis", "energiekosten", "energiepreis", "stromkosten", "electricity prices"],
    eurovoc: ["4463"], gg: ["recht_der_wirtschaft"], tfeu: ["energie", "binnenmarkt"], leikaType: 4 },
  { id: "kernenergie", de_label: "Kernenergie / Atomkraft",
    aliases: ["kernenergie", "atomkraft", "atom", "atomausstieg", "kernkraft", "nuclear"],
    eurovoc: ["897"], gg: ["kernenergie"], tfeu: [], leikaType: 1 },
  { id: "energiewende", de_label: "Energiewende / Erneuerbare",
    aliases: ["energiewende", "erneuerbare", "solar", "windkraft", "wind", "photovoltaik", "renewables"],
    eurovoc: ["4463"], gg: ["recht_der_wirtschaft"], tfeu: ["energie"], leikaType: 4 },
  { id: "klimaschutz", de_label: "Klimaschutz",
    aliases: ["klima", "klimaschutz", "co2", "klimawandel", "climate"],
    eurovoc: ["1422"], gg: ["umweltschutz_bund"], tfeu: ["umwelt"], leikaType: 2 },

  // ── Umwelt / Natur ──────────────────────────────────────────────────
  { id: "luftreinhaltung", de_label: "Luftreinhaltung",
    aliases: ["luftreinhaltung", "luftqualität", "smog", "feinstaub", "air quality"],
    eurovoc: ["4073"], gg: ["umweltschutz_bund"], tfeu: ["umwelt"], leikaType: 2 },
  { id: "naturschutz", de_label: "Naturschutz",
    aliases: ["naturschutz", "artenschutz", "landschaftsschutz", "nature protection"],
    eurovoc: ["3156"], gg: ["naturschutz"], tfeu: ["umwelt"], leikaType: 3 },
  { id: "wasserhaushalt", de_label: "Wasserhaushalt",
    aliases: ["wasserhaushalt", "gewässer", "wasserwirtschaft", "trinkwasser"],
    eurovoc: ["3454"], gg: ["wasserhaushalt"], tfeu: ["umwelt"], leikaType: 3 },
  { id: "abfall", de_label: "Müllabfuhr / Abfallentsorgung",
    aliases: ["müll", "muell", "abfall", "mülltonne", "entsorgung", "recycling", "waste"],
    eurovoc: ["3424"], gg: ["abfallentsorgung_komm"], tfeu: ["umwelt"], leikaType: 5 },
  { id: "tierschutz", de_label: "Tierschutz",
    aliases: ["tierschutz", "tierwohl", "animal welfare"],
    eurovoc: ["4526"], gg: ["tierschutz_bund"], tfeu: ["landwirtschaft_fischerei"], leikaType: 2 },

  // ── Innen / Migration ───────────────────────────────────────────────
  { id: "asyl", de_label: "Asylverfahren",
    aliases: ["asyl", "asylverfahren", "asylbewerber", "flüchtlinge", "geflüchtete", "asylum"],
    eurovoc: ["2234"], gg: ["auslaenderrecht"], tfeu: ["raum_freiheit_sicherheit_recht"], leikaType: 1 },
  { id: "einbuergerung", de_label: "Einbürgerung",
    aliases: ["einbürgerung", "einburgerung", "staatsbürgerschaft", "naturalization", "citizenship"],
    eurovoc: ["1275"], gg: ["staatsangehoerigkeit"], tfeu: [], leikaType: 2 },
  { id: "auslaenderrecht", de_label: "Aufenthaltsrecht",
    aliases: ["aufenthaltsrecht", "aufenthaltsgenehmigung", "aufenthaltstitel", "visa", "residence"],
    eurovoc: ["2234"], gg: ["auslaenderrecht"], tfeu: ["raum_freiheit_sicherheit_recht"], leikaType: 2 },
  { id: "passwesen", de_label: "Passwesen / Ausweis",
    aliases: ["pass", "reisepass", "personalausweis", "ausweis", "passwesen", "passport"],
    eurovoc: ["3493"], gg: ["freizuegigkeit"], tfeu: [], leikaType: 4 },
  { id: "meldewesen", de_label: "Meldewesen",
    aliases: ["anmelden", "meldewesen", "ummelden", "wohnsitz", "meldebestätigung"],
    eurovoc: ["3493"], gg: ["meldewesen"], tfeu: [], leikaType: 4 },

  // ── Soziales / Arbeit ───────────────────────────────────────────────
  { id: "mindestlohn", de_label: "Mindestlohn",
    aliases: ["mindestlohn", "lohnuntergrenze", "minimum wage"],
    eurovoc: ["4418"], gg: ["arbeitsrecht"], tfeu: ["sozialpolitik_harmonisiert"], leikaType: 1 },
  { id: "buergergeld", de_label: "Bürgergeld / Grundsicherung",
    aliases: ["bürgergeld", "buergergeld", "grundsicherung", "alg ii", "hartz iv", "sgb ii"],
    eurovoc: ["4419"], gg: ["arbeitsrecht", "sozialhilfe"], tfeu: ["sozialpolitik_harmonisiert"], leikaType: 4 },
  { id: "rente", de_label: "Rente / Altersvorsorge",
    aliases: ["rente", "altersvorsorge", "rentenversicherung", "pension"],
    eurovoc: ["4419"], gg: ["arbeitsrecht"], tfeu: ["sozialpolitik_koord"], leikaType: 1 },
  { id: "krankenversicherung", de_label: "Krankenversicherung",
    aliases: ["krankenversicherung", "gkv", "krankenkasse", "health insurance"],
    eurovoc: ["2830"], gg: ["arbeitsrecht"], tfeu: ["sozialpolitik_koord"], leikaType: 1 },
  { id: "arbeitslosigkeit", de_label: "Arbeitslosigkeit / ALG",
    aliases: ["arbeitslos", "arbeitslosigkeit", "arbeitslosengeld", "alg", "unemployment"],
    eurovoc: ["4364"], gg: ["arbeitsrecht"], tfeu: ["beschaeftigungspolitik_koord"], leikaType: 1 },
  { id: "kindergeld", de_label: "Kindergeld",
    aliases: ["kindergeld", "elterngeld", "familienkasse", "child benefit"],
    eurovoc: ["4418"], gg: ["arbeitsrecht"], tfeu: [], leikaType: 1 },

  // ── Familie / Bildung ───────────────────────────────────────────────
  { id: "kita", de_label: "Kita / Kindergarten",
    aliases: ["kita", "kindergarten", "kindertagesstätte", "krippe", "betreuung", "daycare"],
    eurovoc: ["2836"], gg: ["kita_traeger"], tfeu: ["bildung_jugend_sport"], leikaType: 4 },
  { id: "schule", de_label: "Schule / Schulwesen",
    aliases: ["schule", "schulen", "schulwesen", "schulpflicht", "schulsystem", "school"],
    eurovoc: ["1479"], gg: ["schulwesen"], tfeu: ["bildung_jugend_sport"], leikaType: 3 },
  { id: "hochschule", de_label: "Hochschule / Uni",
    aliases: ["hochschule", "uni", "universität", "university", "studium"],
    eurovoc: ["2229"], gg: ["hochschulzulassung"], tfeu: ["bildung_jugend_sport"], leikaType: 3 },
  { id: "bafoeg", de_label: "BAföG",
    aliases: ["bafög", "bafoeg", "ausbildungsbeihilfe", "student loan"],
    eurovoc: ["4426"], gg: ["ausbildungsbeihilfen"], tfeu: [], leikaType: 4 },

  // ── Wirtschaft / Steuern / Finanzen ─────────────────────────────────
  { id: "mwst", de_label: "Mehrwertsteuer",
    aliases: ["mehrwertsteuer", "mwst", "umsatzsteuer", "vat"],
    eurovoc: ["4500"], gg: ["recht_der_wirtschaft"], tfeu: ["binnenmarkt"], leikaType: 1 },
  { id: "gewerbe", de_label: "Gewerbeanmeldung",
    aliases: ["gewerbe", "gewerbeanmeldung", "gewerbeschein", "business registration"],
    eurovoc: ["4385"], gg: ["recht_der_wirtschaft"], tfeu: ["binnenmarkt"], leikaType: 4 },
  { id: "hundesteuer", de_label: "Hundesteuer",
    aliases: ["hundesteuer", "dog tax"],
    eurovoc: ["4500"], gg: ["kommunale_steuern"], tfeu: [], leikaType: 5 },
  { id: "grundsteuer", de_label: "Grundsteuer",
    aliases: ["grundsteuer", "property tax"],
    eurovoc: ["4500"], gg: ["kommunale_steuern"], tfeu: [], leikaType: 4 },

  // ── Wohnen / Bau ────────────────────────────────────────────────────
  { id: "wohnungsnot", de_label: "Wohnungsnot / Mieten",
    aliases: ["wohnungsnot", "miete", "mieten", "mietpreisbremse", "wohnen", "housing"],
    eurovoc: ["2773"], gg: ["buergerliches_recht"], tfeu: [], leikaType: 3 },
  { id: "baugenehmigung", de_label: "Baugenehmigung",
    aliases: ["baugenehmigung", "bauantrag", "bebauungsplan", "building permit"],
    eurovoc: ["2773"], gg: ["kommunale_bauleitplanung"], tfeu: [], leikaType: 3 },
  { id: "spielplaetze", de_label: "Spielplätze",
    aliases: ["spielplatz", "spielplätze", "spielplatze", "playground"],
    eurovoc: ["2773"], gg: ["spielplaetze", "kommunale_bauleitplanung"], tfeu: [], leikaType: 5 },

  // ── Verkehr ─────────────────────────────────────────────────────────
  { id: "strassenbau", de_label: "Straßenbau / Bundesstraßen",
    aliases: ["straßen", "strassen", "straßenbau", "autobahn", "bundesstraßen", "roads"],
    eurovoc: ["4355"], gg: ["strassenverkehr"], tfeu: ["verkehr"], leikaType: 2 },
  { id: "oepnv", de_label: "ÖPNV / Nahverkehr",
    aliases: ["öpnv", "oepnv", "nahverkehr", "bus", "bahn", "public transport"],
    eurovoc: ["4355"], gg: ["strassenverkehr"], tfeu: ["verkehr"], leikaType: 3 },
  { id: "fuehrerschein", de_label: "Führerschein",
    aliases: ["führerschein", "fuehrerschein", "driving license"],
    eurovoc: ["4355"], gg: ["strassenverkehr"], tfeu: [], leikaType: 2 },
  { id: "kfz", de_label: "Kfz-Zulassung",
    aliases: ["kfz", "auto anmelden", "autozulassung", "kennzeichen", "car registration"],
    eurovoc: ["4355"], gg: ["strassenverkehr"], tfeu: [], leikaType: 2 },

  // ── Digital / Datenschutz / KI ──────────────────────────────────────
  { id: "datenschutz", de_label: "Datenschutz",
    aliases: ["datenschutz", "dsgvo", "gdpr", "privacy", "data protection"],
    eurovoc: ["32"], gg: ["gewerblicher_rechtsschutz"], tfeu: ["binnenmarkt"], leikaType: 1 },
  { id: "ki_regulierung", de_label: "KI-Regulierung",
    aliases: ["ki", "künstliche intelligenz", "artificial intelligence", "ai", "ai act"],
    eurovoc: ["32"], gg: [], tfeu: ["binnenmarkt", "forschung_raumfahrt"], leikaType: 1 },
  { id: "urheberrecht", de_label: "Urheberrecht",
    aliases: ["urheberrecht", "copyright"],
    eurovoc: ["44"], gg: ["gewerblicher_rechtsschutz"], tfeu: ["binnenmarkt"], leikaType: 1 },
  { id: "telekommunikation", de_label: "Telekommunikation / Netz",
    aliases: ["telekom", "telekommunikation", "breitband", "5g", "netz", "internet"],
    eurovoc: ["3450"], gg: ["post_telekommunikation"], tfeu: ["binnenmarkt"], leikaType: 1 },

  // ── Justiz / Sicherheit ─────────────────────────────────────────────
  { id: "polizei", de_label: "Polizei / Ordnung",
    aliases: ["polizei", "ordnungsamt", "police"],
    eurovoc: ["600"], gg: ["polizeirecht"], tfeu: [], leikaType: 3 },
  { id: "strafrecht", de_label: "Strafrecht",
    aliases: ["strafrecht", "stgb", "criminal law"],
    eurovoc: ["1896"], gg: ["buergerliches_recht"], tfeu: [], leikaType: 2 },
  { id: "waffenrecht", de_label: "Waffenrecht",
    aliases: ["waffen", "waffenrecht", "gun law"],
    eurovoc: ["902"], gg: ["waffen_sprengstoff"], tfeu: [], leikaType: 1 },
  { id: "versammlung", de_label: "Versammlungsrecht",
    aliases: ["versammlung", "demo", "demonstration", "protest"],
    eurovoc: ["2475"], gg: ["versammlungsrecht"], tfeu: [], leikaType: 3 },

  // ── Gesundheit ──────────────────────────────────────────────────────
  { id: "arzneimittel", de_label: "Arzneimittel / Medikamente",
    aliases: ["arzneimittel", "medikament", "medikamente", "drug", "pharmacy"],
    eurovoc: ["1916"], gg: [], tfeu: ["gemeinsame_sicherheitsanliegen_gesundheit", "binnenmarkt"], leikaType: 1 },
  { id: "krankenhaus", de_label: "Krankenhäuser",
    aliases: ["krankenhaus", "klinik", "hospital"],
    eurovoc: ["2830"], gg: [], tfeu: ["schutz_gesundheit"], leikaType: 3 },
  { id: "pflege", de_label: "Pflege",
    aliases: ["pflege", "pflegeheim", "altenpflege", "care"],
    eurovoc: ["4419"], gg: ["arbeitsrecht"], tfeu: ["sozialpolitik_koord"], leikaType: 1 },

  // ── Aussenpolitik / EU ──────────────────────────────────────────────
  { id: "zoll", de_label: "Zoll / Zollunion",
    aliases: ["zoll", "zölle", "zoellner", "zollunion", "customs"],
    eurovoc: ["1062"], gg: ["zoll_aussenhandel"], tfeu: ["zollunion"], leikaType: 1 },
  { id: "binnenmarkt", de_label: "Binnenmarkt",
    aliases: ["binnenmarkt", "europäischer binnenmarkt", "europaeischer binnenmarkt", "single market"],
    eurovoc: ["1437"], gg: [], tfeu: ["binnenmarkt"], leikaType: 1 },
  { id: "handelspolitik", de_label: "Handelspolitik",
    aliases: ["handelspolitik", "außenhandel", "trade policy", "freihandel"],
    eurovoc: ["1068"], gg: ["zoll_aussenhandel"], tfeu: ["gemeinsame_handelspolitik"], leikaType: 1 },
  { id: "waehrung", de_label: "Währung / Euro",
    aliases: ["euro", "währung", "waehrung", "geldpolitik", "ezb", "currency"],
    eurovoc: ["1413"], gg: ["waehrung_geld"], tfeu: ["waehrungspolitik_euro"], leikaType: 1 },
  { id: "gasp", de_label: "Außenpolitik / GASP",
    aliases: ["außenpolitik", "aussenpolitik", "gasp", "diplomatie", "foreign policy"],
    eurovoc: ["1058"], gg: ["auswaertige_angelegenheiten"], tfeu: ["gasp"], leikaType: 1 },
  { id: "verteidigung", de_label: "Verteidigung / Bundeswehr",
    aliases: ["verteidigung", "bundeswehr", "militär", "defence"],
    eurovoc: ["910"], gg: ["auswaertige_angelegenheiten"], tfeu: ["gasp"], leikaType: 1 },

  // ── Landwirtschaft / Verbraucherschutz ──────────────────────────────
  { id: "landwirtschaft", de_label: "Landwirtschaft",
    aliases: ["landwirtschaft", "bauern", "agrar", "farming"],
    eurovoc: ["162"], gg: [], tfeu: ["landwirtschaft_fischerei"], leikaType: 2 },
  { id: "verbraucherschutz", de_label: "Verbraucherschutz",
    aliases: ["verbraucherschutz", "consumer"],
    eurovoc: ["1262"], gg: ["buergerliches_recht"], tfeu: ["verbraucherschutz"], leikaType: 1 },
  { id: "lebensmittel", de_label: "Lebensmittelsicherheit",
    aliases: ["lebensmittel", "essen", "food safety"],
    eurovoc: ["1590"], gg: ["tierschutz_bund"], tfeu: ["verbraucherschutz"], leikaType: 2 },

  // ── Kultur / Medien ─────────────────────────────────────────────────
  { id: "rundfunk", de_label: "Rundfunk / ÖR",
    aliases: ["rundfunk", "öffentlich-rechtlich", "ard", "zdf", "gez", "rundfunkbeitrag", "broadcasting"],
    eurovoc: ["3367"], gg: ["rundfunk"], tfeu: ["kultur"], leikaType: 3 },
  { id: "kultur", de_label: "Kultur",
    aliases: ["kultur", "kunst", "culture"],
    eurovoc: ["906"], gg: ["kulturhoheit"], tfeu: ["kultur"], leikaType: 3 },
  { id: "sport", de_label: "Sport",
    aliases: ["sport", "verein", "sportförderung"],
    eurovoc: ["3110"], gg: ["kulturhoheit"], tfeu: ["bildung_jugend_sport"], leikaType: 3 },

  // ── Feuerwehr / Katastrophenschutz ──────────────────────────────────
  { id: "feuerwehr", de_label: "Feuerwehr",
    aliases: ["feuerwehr", "brandschutz", "fire department"],
    eurovoc: ["2475"], gg: ["feuerwehr"], tfeu: ["zivilschutz"], leikaType: 3 },
  { id: "katastrophenschutz", de_label: "Katastrophenschutz",
    aliases: ["katastrophenschutz", "zivilschutz", "civil protection"],
    eurovoc: ["2475"], gg: ["feuerwehr"], tfeu: ["zivilschutz"], leikaType: 3 },

  // ── Jagd / Fischerei ────────────────────────────────────────────────
  { id: "jagd", de_label: "Jagd",
    aliases: ["jagd", "jäger", "jagdschein", "hunting"],
    eurovoc: ["3156"], gg: ["jagdwesen"], tfeu: [], leikaType: 3 },
];

// Build alias → topic index (used by normalize.js)
export function buildAliasIndex() {
  const idx = {};
  for (const topic of TOPICS) {
    for (const a of topic.aliases) {
      const norm = a.toLowerCase().trim();
      if (!idx[norm]) idx[norm] = topic;
    }
    idx[topic.id] = topic;
    idx[topic.de_label.toLowerCase()] = topic;
  }
  return idx;
}
