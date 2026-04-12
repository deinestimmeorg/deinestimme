import { useState, useCallback } from "react";
import { T } from "../tokens";

// ═══ GLYPH PATTERNS v6 — Full Engine (P1+P3+P8) ═══
const PATTERNS = {
  de: {
    aneignung: [
      /\bwir\s+behalten\s+uns\b/i,
      /\bwir\s+dürfen\b/i,
      /\bunwiderruflich\b/i,
      /\b(?:du|Sie)\s+(?:gewährst|gewähren)\s+uns\b/i,
      /\bweltweite.*?lizenz\b/i,
      /\bnicht\s+exklusive.*?lizenz\b/i,
      /\bnicht\s+übertragbar\b/i,
      /\bwir\s+(?:können|dürfen)\s+(?:deine|ihre|Ihre)\b/i,
      /\bRecht\s+vor.*?zu\s+(?:ändern|kündigen|aussetzen|sperren|entfernen|beenden)\b/i,
      /\bbehält\s+sich.*?(?:das\s+Recht|vor|alle.*?Rechte)\b/i,
      /\bberechtigt.*?zu\s+(?:sperren|kündigen|ändern|einschränken|einstellen|aussetzen|belasten|berechnen|entfernen|liquidieren|verkaufen|widerrufen)\b/i,
      /\bvorbehalten\b/i,
      /\bsind\s+(?:wir\s+)?berechtigt\b/i,
      /\bsammeln\s+und\s+nutzen\b/i,
      /\b(?:Starlink|Apple|Google|Telekom|Vodafone|Anbieter|Versicherer|Bank|N26|Handelsblatt|Revolut|Fondsmanager)\s+(?:kann|darf|ist\s+berechtigt|behält\s+sich)\b/i,
      /\b(?:Sie\s+)?ermächtigen\s+(?:Starlink|uns|den\s+Anbieter|Revolut)\b/i,
      /\b(?:wird|werden)\s+(?:unverzüglich\s+)?(?:erhoben|eingezogen|belastet|berechnet|abgebucht|einbehalten)\b/i,
      /\bGebühr\s+(?:für|wird|in\s+Höhe\s+von)\b/i,
      /\bVertragsstrafe\b/i,
      /\bnach\s+(?:eigenem|alleinigem)\s+Ermessen\b/i,
      /\bautomatisch\s+(?:aktualisieren|installieren|abbuchen|belasten|verlängern)\b/i,
      /\bPfandrecht\b/i,
      /\bSicherungsübereignung\b/i,
      /\bSicherungsabtretung\b/i,
      /\bAufrechnungsbeschränkung\b/i,
      /\bEigentumsvorbehalt\b/i,
      /\bkönnen\s+wir.*?(?:sperren|kündigen|einschränken|einstellen|ändern|anpassen|schließen|verkaufen|liquidieren)\b/i,
      /\bwir\s+(?:sammeln|erfassen|nutzen|verwenden|erheben|verarbeiten|speichern|übermitteln)\b/i,
      /\bBonitätsprüfung\b/i,
      /\bÜberprüfung\s+der\s+tatsächlichen\s+Nutzung\b/i,
      /\bfristlos(?:e|er)?\s+(?:Kündigung|kündigen)\b/i,
      /\bSperrung\b/i,
      /\bZugangssperre\b/i,
      /\bwir\s+(?:können|dürfen|sind\s+berechtigt)\b/i,
      /\bPreisanpassung\b/i,
    ],
    transformation: [
      /\bjederzeit\s+(?:ändern|anpassen)\b/i,
      /\bPreise.*?können\s+sich.*?ändern\b/i,
      /\bBedingungen.*?(?:ändern|anpassen|aktualisieren)\b/i,
      /\bwir\s+können.*?(?:ändern|aussetzen|einstellen)\b/i,
      /\bÄnderungen\s+(?:der|des|dieser|an)\b/i,
      /\bkönnen\s+sich.*?ändern\b/i,
      /\bbisweilen\s+(?:ändern|aufheben)\b/i,
      /\bfortgesetzte\s+Nutzung.*?(?:Zustimmung|einverstanden)\b/i,
      /\bTeile\s+dieser\s+Bedingungen.*?(?:ersetzen|ändern|ergänzen)\b/i,
      /\bvon\s+Zeit\s+zu\s+Zeit\b/i,
      /\baktualisiert\s+werden\b/i,
      /\bUmstellung\s+(?:auf|von)\b/i,
      /\beinseitig\s+(?:zu\s+)?ändern\b/i,
      /\bÄnderung\s+(?:der|des|von)\s+(?:Vertragsbedingungen|Preise|Entgelte)\b/i,
    ],
    erschaffung: [
      /\b(?:du|Sie)\s+(?:erhältst|erhalten|bekommst|bekommen|hast|haben)\s+(?:das\s+Recht|Anspruch|ein\s+Recht)\b/i,
      /\bWiderrufsrecht\b/i,
      /\bRücktrittsrecht\b/i,
      /\b(?:du|Sie)\s+(?:kannst|können|darfst|dürfen).*?(?:kündigen|widerrufen|stornieren|zurücktreten|zurückgeben|zurückfordern)\b/i,
      /\b(?:Erstattung|Rückerstattung|vollständige\s+Rückerstattung)\b/i,
      /\bAnspruch\s+auf\b/i,
      /\bVersicherungsschutz\b/i,
      /\bversichert\s+ist\b/i,
      /\bwir\s+(?:zahlen|erstatten|übernehmen|leisten|gewähren|stellen\s+zur\s+Verfügung)\b/i,
      /\bDeckungssumme\b/i,
      /\bKündigungsrecht\b/i,
      /\bEigentum\s+(?:geht\s+über|wird\s+übertragen)\b/i,
      /\bkeine\s+Mindestvertragslaufzeit\b/i,
      /\bSie\s+können\s+jederzeit\b/i,
      /\berstattungsfähig\b/i,
      /\bkostenlos\b/i,
      /\bkostenfrei\b/i,
      /\bunentgeltlich\b/i,
      /\bEntschädigung\s+(?:verlangen|in\s+Höhe)\b/i,
      /\bBeschwerde(?:verfahren|n)?\b/i,
      /\bSchlichtung(?:sstelle|sverfahren)?\b/i,
      /\bOmbudsmann\b/i,
      /\bStreitbeilegung\b/i,
      /\bEinlagensicherung\b/i,
      /\bEinlagenversicherung\b/i,
      /\bAnlegerschutz\b/i,
      /\bder\s+(?:Kunde|Mieter|Verbraucher)\s+(?:kann|darf|ist\s+berechtigt)\b/i,
      /\bMieter\s+(?:ist|hat|darf|kann)\b/i,
      /\bdem\s+Mieter\s+(?:steht|wird|ist)\b/i,
      /\b(?:du|Sie)\s+(?:kannst|können)\b/i,
      /\bsteht\s+(?:dir|Ihnen)\b/i,
      /\banteilig\s+erstattet\b/i,
      /\bZugang\s+(?:zu|zum|zur)\b/i,
      /\bwir\s+bieten\s+(?:Ihnen|dir)\b/i,
      /\bwir\s+(?:senden|liefern|übermitteln|berichten)\s+(?:Ihnen|dir)\b/i,
      /\bwir\s+bieten\b.*?\ban\b/i,
      /\b(?:provisions|gebühren|kosten)freie?\b/i,
      /\bkeine\s+(?:Gebühren?|Kosten|Provision|Aufschläge)\b/i,
      /\b(?:bis\s+zu\s+\S+\s+(?:Euro|EUR|€)\s+)?geschützt\b/i,
      /\b(?:getrennt\s+und\s+geschützt|separat\s+verwahrt)\b/i,
    ],
    abgabe: [
      /\b(?:du|Sie)\s+(?:verzichtest|verzichten)\b/i,
      /\bHaftung\s+(?:ist\s+)?ausgeschlossen\b/i,
      /\b(?:du|Sie)\s+(?:bist|sind|bleibst|bleiben).*?(?:verantwortlich|haftbar|zahlungspflichtig)\b/i,
      /\bauf\s+(?:eigenes|Ihr|Ihr\s+eigenes)\s+Risiko\b/i,
      /\b(?:haftet|haften|ist|sind)\s+nicht\b/i,
      /\bkeine\s+(?:Haftung|Gewährleistung|Garantie)\b/i,
      /\bnicht\s+(?:gestattet|erlaubt|berechtigt)\b/i,
      /\b(?:du|Sie)\s+(?:darfst|dürfen)\s+(?:nicht|keine)\b/i,
      /\bausgeschlossen\b/i,
      /\bkein\s+Versicherungsschutz\b/i,
      /\b(?:du|Sie)\s+(?:bist|sind|bleibst|bleiben)\s+verpflichtet\b/i,
      /\bSie\s+(?:haften|sind\s+(?:direkt\s+)?(?:verantwortlich|zuständig))\b/i,
      /\bSie\s+(?:erklären\s+sich\s+damit\s+einverstanden|stimmen\s+zu)\b/i,
      /\bSie\s+(?:müssen|sind\s+verpflichtet|haben\s+die\s+Pflicht)\b/i,
      /\bliegt\s+in\s+Ihrer\s+Verantwortung\b/i,
      /\bauf\s+Ihre\s+Kosten\b/i,
      /\bnicht\s+erstattungsfähig\b/i,
      /\bHaftungsfreistellung\b/i,
      /\bschadlos\s+(?:zu\s+)?halten\b/i,
      /\bzu\s+entschädigen\b/i,
      /\bRisikoübernahme\b/i,
      /\bist\s+untersagt\b/i,
      /\bverboten\b/i,
      /\berlöscht\s+(?:die|Ihr|das).*?(?:Garantie|Widerrufsrecht|Recht)\b/i,
      /\bVersäumnis\b/i,
      /\bMitwirkungspflicht(?:en)?\b/i,
      /\bObliegenheit(?:en)?\b/i,
      /\bSelbstbeteiligung\b/i,
      /\bkeinen\s+Anspruch\s+auf\b/i,
      /\bder\s+(?:Kunde|Mieter)\s+(?:ist\s+verpflichtet|hat|muss|haftet)\b/i,
      /\bMieter\s+(?:haftet|muss|ist\s+verpflichtet|hat\s+(?:zu|die))\b/i,
      /\bSchönheitsreparaturen\b/i,
      /\bWertverlust\b/i,
      /\bPfleglich\s+(?:zu\s+)?behandeln\b/i,
    ],
    stasis: [
      /\b(?:im\s+Sinne\s+(?:dieser|von|des)|wie\s+(?:oben|unten|nachstehend)\s+(?:beschrieben|definiert))\b/i,
      /\b(?:nachstehend|vorstehend|im\s+Folgenden)\b/i,
      /\bgemäß\s+(?:den|der|diesem|diesen|Abschnitt|§|Ziffer|Nr\.|Art\.)\b/i,
      /\bvorbehaltlich\b/i,
      /\bsofern\s+(?:nicht|verfügbar|zutreffend)\b/i,
      /\bim\s+Rahmen\s+(?:der|des|von|dieser)\b/i,
      /\bder\s+Begriff\b/i,
      /\b(?:einschließlich|insbesondere),?\s+(?:aber\s+nicht\s+beschränkt\s+auf|unter\s+anderem)\b/i,
      /\bsoweit\s+(?:zutreffend|anwendbar|nachfolgend|gesetzlich)\b/i,
      /\bzur\s+Klarstellung\b/i,
      /\bwie\s+(?:in|im|auf)\s+(?:der|dem|den|Abschnitt|dieser|Ziffer)\b/i,
      /\bSalvatorische\s+Klausel\b/i,
      /\bGerichtsstand\b/i,
      /\bgeltendes\s+Recht\b/i,
      /\b(?:zugrunde\s+liegende\s+Vorschrift|BGB|HGB|VVG|TKG|ZAG)\b/i,
      /\bWiderrufsbelehrung\b/i,
      /\bMuster-Widerrufsformular\b/i,
    ],
  },
  en: {
    aneignung: [
      /\bwe\s+(?:reserve|retain|may|can|will|shall)\b/i,
      /\birrevocable\b/i,
      /\bworldwide\s+(?:license|right)\b/i,
      /\bnon-exclusive.*?license\b/i,
      /\bnon-transferable\b/i,
      /\bwe\s+(?:may|can|will)\s+(?:suspend|terminate|restrict|modify|block|remove|charge|collect|retain|deduct)\b/i,
      /\bat\s+(?:our|its)\s+(?:sole|own)\s+discretion\b/i,
      /\bwe\s+(?:collect|gather|use|process|store|share|disclose|transfer)\b/i,
      /\byou\s+(?:grant|authorize|permit|consent)\b/i,
      /\byou\s+(?:hereby\s+)?assign\b/i,
      /\bwe\s+(?:are|shall\s+be)\s+entitled\b/i,
      /\bpenalty\b/i,
      /\bfee\s+(?:for|will|in\s+the\s+amount)\b/i,
      /\bautomatically\s+(?:charge|debit|renew)\b/i,
      /\bwe\s+(?:reserve|retain)\s+all\b/i,
      /\bstarlink\s+(?:may|can|reserves|retains|will)\b/i,
      /\bxai\s+(?:may|can|reserves)\b/i,
      /\bwe\s+own\b/i,
      /\byou\s+(?:acknowledge\s+and\s+)?agree\b/i,
      /\b(?:the\s+)?(?:Company|Provider|Vendor|Licensor|Supplier)\s+(?:may|can|reserves?|retains?|shall)\b/i,
      /\b(?:the\s+)?(?:Company|Provider|Vendor|Licensor|Supplier)\s+(?:shall\s+)?(?:own|retain\s+all|reserve\s+all)\b/i,
    ],
    transformation: [
      /\bmay\s+(?:change|modify|update|amend|revise)\b/i,
      /\bfrom\s+time\s+to\s+time\b/i,
      /\b(?:terms|conditions|prices|fees)\s+(?:may|can)\s+(?:change|be\s+(?:changed|modified|updated))\b/i,
      /\bcontinued\s+use.*?(?:constitutes|means|implies)\s+(?:acceptance|agreement|consent)\b/i,
      /\bwe\s+(?:may|will)\s+(?:update|modify|change|amend)\b/i,
      /\bsubject\s+to\s+change\b/i,
    ],
    erschaffung: [
      /\byou\s+(?:have|retain|are\s+entitled\s+to|may\s+(?:exercise|request))\s+(?:the\s+right|a\s+right|rights)\b/i,
      /\bright\s+of\s+withdrawal\b/i,
      /\bright\s+to\s+cancel\b/i,
      /\brefund\b/i,
      /\breimburs\w+\b/i,
      /\byou\s+(?:can|may)\s+(?:cancel|terminate|withdraw|return)\b/i,
      /\byou\s+(?:retain|keep)\s+(?:your\s+)?ownership\b/i,
      /\bno\s+minimum\s+(?:term|contract)\b/i,
      /\bfree\s+of\s+charge\b/i,
      /\bat\s+no\s+cost\b/i,
      /\bwe\s+(?:will|shall)\s+(?:pay|refund|reimburse|provide|deliver|grant)\b/i,
      /\binsurance\s+(?:coverage|protection|scheme)\b/i,
      /\bcompensation\b/i,
      /\bwe\s+(?:offer|provide|make\s+available|supply|deliver)\s+(?:you|the\s+(?:customer|user|client))\b/i,
      /\bwe\s+offer\b/i,
      /\b(?:commission|fee)-?\s*free\b/i,
      /\bno\s+(?:fees?|charges?|commission|costs?)\b/i,
      /\bprotected\s+(?:up\s+to|by)\b/i,
      /\byour\s+(?:ETF|investment|portfolio|account|plan|funds)\b/i,
      /\bwe\s+(?:perform|execute|manage|administer)\b/i,
      /\b(?:segregated|protected)\s+(?:and\s+)?(?:safeguarded|protected|held)\b/i,
      /\b(?:grants?|provides?|offers?|makes?\s+available|delivers?)\s+(?:to\s+)?(?:Customer|Client|Subscriber|User|Licensee)\b/i,
      /\b(?:the\s+)?(?:Company|Provider|Vendor|Licensor|Supplier)\s+(?:shall\s+)?(?:grants?|provides?|offers?|delivers?|makes?\s+available)\b/i,
      /\bCustomer\s+(?:shall\s+)?(?:have|retain|receive|be\s+entitled|is\s+entitled)\b/i,
      /\bCustomer\s+(?:may|can|is\s+permitted|is\s+authorized)\b/i,
      /\b(?:grants?\s+Customer|grants?\s+to\s+Customer)\b/i,
      /\bCustomer'?s?\s+(?:right|license|access|entitlement)\b/i,
      /\b(?:available\s+to|provided\s+to)\s+(?:Customer|Client|Subscriber|User)\b/i,
    ],
    abgabe: [
      /\byou\s+(?:waive|forfeit|relinquish|release)\b/i,
      /\b(?:no|without)\s+(?:warranty|guarantee|liability)\b/i,
    ],
    stasis: [
      /\bas\s+(?:defined|described|set\s+forth|used)\s+(?:in|herein|above|below)\b/i,
      /\bhereinafter\b/i,
      /\bherein\b/i,
      /\bpursuant\s+to\b/i,
      /\bsubject\s+to\b/i,
      /\bfor\s+the\s+(?:purposes|avoidance)\s+of\b/i,
      /\bnotwithstanding\b/i,
      /\bseverability\b/i,
      /\bgoverning\s+law\b/i,
      /\bjurisdiction\b/i,
      /\bincluding\s+(?:but\s+not\s+limited\s+to|without\s+limitation)\b/i,
      /\bcollectively\b/i,
    ],
  },
};

// ═══ Void Clause Detection (Rechtsraum-Filter) ═══
const VOID_PATTERNS = {
  as_is: [/\bas[- ]is\b/i, /\bas[- ]available\b/i, /\bwithout\s+warranty/i, /\bkeine\s+Gewährleistung/i],
  indemnity: [/\bindemnif/i, /\bHaftungsfreistellung/i, /\bschadlos\s+halten/i, /\bFreistellung/i],
  class_action: [/\bclass[- ]action\b.*\bwaiver\b/i, /\bSammelklage\b.*\bverzicht/i, /\bclass\s+action/i],
  ip_assignment: [/\birrevocable\b.*\bassign/i, /\bunwiderruflich\b.*\b(?:Abtretung|Übertragung)/i],
  forced_arbitration: [/\bbinding\s+arbitration/i, /\bSchiedsgerichtsvereinbarung/i],
};

function detectVoidClauses(sentences) {
  const found = [];
  for (let i = 0; i < sentences.length; i++) {
    for (const [type, pats] of Object.entries(VOID_PATTERNS)) {
      if (pats.some(p => p.test(sentences[i]))) {
        found.push({ index: i, text: sentences[i].trim(), type });
        break;
      }
    }
  }
  return found;
}

// ═══ Baseline v6.1 — 33 Reference Contracts ═══
const BASELINE = [
  { name: "IDEAL: NovaSpace DE (Gemini)", mi: 0.1, klasse: "ideal" },
  { name: "N26 Metal AGB", mi: 0.1, klasse: "ideal" },
  { name: "IDEAL: Aether DE (Grok)", mi: 0.3, klasse: "ideal" },
  { name: "Google AGB DE", mi: 0.5, klasse: "ideal" },
  { name: "Getsafe Haftpflicht", mi: 0.5, klasse: "ideal" },
  { name: "Getsafe NB", mi: 0.5, klasse: "ideal" },
  { name: "N26 AGB", mi: 0.5, klasse: "ideal" },
  { name: "Getsafe Privathaftpflicht AVB", mi: 0.7, klasse: "fair" },
  { name: "Mietvertrag (Mieterschutzbund)", mi: 0.7, klasse: "fair" },
  { name: "McFit AGB", mi: 0.7, klasse: "fair" },
  { name: "IDEAL: SaaS DE (ChatGPT)", mi: 1.0, klasse: "fair" },
  { name: "IDEAL: NovaSpace US (Gemini)", mi: 1.0, klasse: "fair" },
  { name: "PayPal AGB-Update", mi: 1.0, klasse: "fair" },
  { name: "Handelsblatt AGB", mi: 1.0, klasse: "fair" },
  { name: "Deutsche Bank Elektr. Medien", mi: 1.1, klasse: "fair" },
  { name: "OpenAI Business Terms", mi: 1.2, klasse: "fair" },
  { name: "Apple AGB", mi: 1.3, klasse: "fair" },
  { name: "eBay/OPP", mi: 1.3, klasse: "fair" },
  { name: "SCHUFA AGB", mi: 1.4, klasse: "fair" },
  { name: "Deutsche Bank AGB", mi: 1.4, klasse: "fair" },
  { name: "Vodafone AGB", mi: 1.5, klasse: "fair" },
  { name: "Atlassian Customer Agreement", mi: 1.7, klasse: "moderat" },
  { name: "IDEAL: SaaS US (ChatGPT)", mi: 1.7, klasse: "moderat" },
  { name: "Telekom AGB DE 2026", mi: 1.7, klasse: "moderat" },
  { name: "IDEAL: Aether US (Grok)", mi: 2.0, klasse: "moderat" },
  { name: "AHB Versicherung", mi: 2.0, klasse: "moderat" },
  { name: "GitHub Terms of Service", mi: 3.0, klasse: "moderat" },
  { name: "Revolut Securities AGB", mi: 3.0, klasse: "moderat" },
  { name: "FreeNow AGB", mi: 3.2, klasse: "asymm." },
  { name: "Grok/xAI ToS + AUP", mi: 3.7, klasse: "asymm." },
  { name: "Starlink DE-Bedingungen", mi: 5.0, klasse: "asymm." },
  { name: "Congstar AGB", mi: 5.0, klasse: "asymm." },
  { name: "Signal Terms & Privacy", mi: 7.0, klasse: "aggressiv" },
];


// ═══ Analysis Engine ═══
function analyzeContract(text) {
  if (!text || text.length < 20) return null;

  const isEN = /\b(the|and|you|we|our|your|shall|may|will|upon|hereby)\b/i.test(text);
  const lang = isEN ? "en" : "de";
  const pats = PATTERNS[lang];

  const sentences = text.split(/[.;!?]+/).filter(s => s.trim().length > 10);

  let counts = { aneignung: 0, erschaffung: 0, transformation: 0, abgabe: 0, stasis: 0 };
  const classified = [];

  for (const sentence of sentences) {
    let matched = false;
    const results = {};

    for (const [glyph, patterns] of Object.entries(pats)) {
      const hits = patterns.filter(p => p.test(sentence));
      if (hits.length > 0) {
        results[glyph] = hits.length;
        matched = true;
      }
    }

    if (matched) {
      const best = Object.entries(results).sort((a, b) => b[1] - a[1])[0][0];
      counts[best]++;
      classified.push({ text: sentence.trim(), glyph: best, hits: results[best] });
    } else {
      counts.stasis++;
      classified.push({ text: sentence.trim(), glyph: "stasis", hits: 0 });
    }
  }

  const voidClauses = detectVoidClauses(sentences);
  const A = counts.aneignung + counts.abgabe;
  const E = counts.erschaffung;
  const total = sentences.length;
  const stasisFraction = counts.stasis / Math.max(total, 1);

  // Subtract void clauses from A
  const voidInA = voidClauses.filter(v => {
    const c = classified[v.index];
    return c && (c.glyph === "aneignung" || c.glyph === "abgabe");
  }).length;
  const A_filtered = Math.max(A - voidInA, 0);

  const MI_raw = E > 0 ? A / E : (A > 0 ? A * 10 : 0);
  const MI_filtered = E > 0 ? A_filtered / E : (A_filtered > 0 ? A_filtered * 10 : 0);

  let klasse = "ideal";
  if (MI_filtered > 0.5) klasse = "fair";
  if (MI_filtered > 1.5) klasse = "moderat";
  if (MI_filtered > 3.0) klasse = "asymmetrisch";
  if (MI_filtered > 5.0) klasse = "aggressiv";

  const klasseColors = {
    ideal: T.accent, fair: "#3DBB7D", moderat: T.gold,
    asymmetrisch: "#E8954A", aggressiv: T.coral,
  };

  return {
    lang, sentences: total, counts, classified,
    voidClauses, voidCount: voidClauses.length,
    MI_raw: MI_raw.toFixed(1), MI_filtered: MI_filtered.toFixed(1),
    klasse, klasseColor: klasseColors[klasse],
    stasisPct: (stasisFraction * 100).toFixed(0),
  };
}

const GLYPH_INFO = {
  aneignung: { label: "Aneignung", symbol: "●", color: "#4A9EDB", desc: "Rechte nehmen, Kontrolle behalten" },
  transformation: { label: "Transformation", symbol: "◈", color: "#E8A838", desc: "Veränderung, Anpassung" },
  erschaffung: { label: "Erschaffung", symbol: "◆", color: "#00C9B0", desc: "Rechte geben, Schutz bieten" },
  abgabe: { label: "Abgabe", symbol: "○", color: "#E24B4A", desc: "Pflichten auferlegen, Verzicht fordern" },
  stasis: { label: "Stasis", symbol: "◌", color: "#8B919A", desc: "Formhülle, Definitionen, Neutrales" },
};

const DEMO_CONTRACTS = {
  fair: "Sie erhalten Zugang zu unserem Service kostenlos. Wir schützen Ihre Daten gemäß DSGVO. Sie haben das Recht, Ihre Daten jederzeit zu löschen. Sie können den Dienst jederzeit kündigen. Wir bieten Ihnen einen verschlüsselten Nachrichtenservice. Ihre Nachrichten werden Ende-zu-Ende verschlüsselt übertragen. Wir speichern keine Metadaten über Ihre Kommunikation. Wir stellen Ihnen monatliche Transparenzberichte zur Verfügung. Sie können jederzeit Ihre gespeicherten Daten exportieren. Ein Widerrufsrecht besteht innerhalb von 14 Tagen.",
  aggressiv: "Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Wir übernehmen keine Haftung für Schäden jeglicher Art. Sie verzichten auf alle Ansprüche gegenüber dem Anbieter. Wir dürfen Ihre Daten an Dritte weitergeben. Sie stimmen der Übertragung Ihrer Rechte an uns zu. Wir können Ihren Account jederzeit ohne Angabe von Gründen sperren. Sie erklären sich mit Sammelklageverzicht einverstanden. Der Service wird as-is ohne Gewährleistung bereitgestellt. Sie sind verpflichtet, uns schadlos zu halten. Wir sammeln und nutzen Ihre Nutzungsdaten nach eigenem Ermessen.",
};

export default function VertragsanalyseTool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [showClassified, setShowClassified] = useState(false);
  const [showBaseline, setShowBaseline] = useState(false);

  const handleAnalyze = useCallback(() => {
    const r = analyzeContract(text);
    setResult(r);
  }, [text]);

  const loadDemo = (key) => {
    setText(DEMO_CONTRACTS[key]);
    setTimeout(() => {
      setResult(analyzeContract(DEMO_CONTRACTS[key]));
    }, 100);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ color: T.accent, fontSize: 14, fontFamily: T.mono, fontWeight: 600 }}>GLYPHEN-VERTRAGSANALYSE</span>
        <span style={{ color: T.textMuted, fontSize: 11, fontFamily: T.mono, marginLeft: 8 }}>v6 — Nährwertlabel für Verträge · 209 Patterns · 33 Referenzverträge</span>
        <p style={{ color: T.silver, fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, margin: "8px 0 0" }}>
          Füge einen Vertragstext ein. Die Engine analysiert jede Klausel nach den fünf Glyphen und berechnet den Macht-Index (MI) —
          wie ein Nährwertlabel: niemand verbietet die Chips, aber man sieht, was drin ist.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => loadDemo("fair")} style={{
          background: T.accentDim, border: `1px solid ${T.accent}44`, borderRadius: T.r,
          padding: "6px 14px", color: T.accent, fontSize: 11, fontFamily: T.mono, cursor: "pointer",
        }}>Demo: Fairer Vertrag</button>
        <button onClick={() => loadDemo("aggressiv")} style={{
          background: T.coralDim, border: `1px solid ${T.coral}44`, borderRadius: T.r,
          padding: "6px 14px", color: T.coral, fontSize: 11, fontFamily: T.mono, cursor: "pointer",
        }}>Demo: Aggressiver Vertrag</button>
        <button onClick={() => setShowBaseline(!showBaseline)} style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.r,
          padding: "6px 14px", color: T.textMuted, fontSize: 11, fontFamily: T.mono, cursor: "pointer",
        }}>{showBaseline ? "▾" : "▸"} 33 Referenzverträge</button>
      </div>

      {showBaseline && (
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.rl, padding: 12, marginBottom: 16, maxHeight: 300, overflowY: "auto" }}>
          <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, textTransform: "uppercase" }}>Baseline v6.1 — Kalibrierungsreferenz</span>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
            {BASELINE.map((c, i) => {
              const kColors = { ideal: T.accent, fair: "#3DBB7D", moderat: T.gold, "asymm.": "#E8954A", asymmetrisch: "#E8954A", aggressiv: T.coral };
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 8px", borderRadius: T.r, background: i % 2 === 0 ? "transparent" : T.bg }}>
                  <span style={{ color: kColors[c.klasse] || T.textDim, fontSize: 11, fontFamily: T.mono, fontWeight: 600, minWidth: 36 }}>{c.mi}</span>
                  <div style={{ width: Math.min(c.mi * 15, 120), height: 4, borderRadius: 2, background: kColors[c.klasse] || T.textDim }} />
                  <span style={{ color: T.silver, fontSize: 11, fontFamily: T.sans, flex: 1 }}>{c.name}</span>
                  <span style={{ color: kColors[c.klasse] || T.textDim, fontSize: 9, fontFamily: T.mono }}>{c.klasse}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <textarea
        value={text}
        onChange={e => { setText(e.target.value); setResult(null); }}
        placeholder="AGB, Nutzungsbedingungen, Mietvertrag, Arbeitsvertrag... hier einfügen"
        rows={8}
        style={{
          width: "100%", background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: T.rl, padding: "14px 18px", color: T.text, fontSize: 14,
          fontFamily: T.sans, lineHeight: 1.7, outline: "none",
          resize: "vertical", boxSizing: "border-box",
        }}
      />

      <button onClick={handleAnalyze} disabled={text.length < 30} style={{
        marginTop: 12, width: "100%", padding: "12px",
        background: text.length >= 30 ? T.accent : T.surfaceActive,
        color: text.length >= 30 ? T.bg : T.textDim,
        border: "none", borderRadius: T.r,
        fontSize: 14, fontFamily: T.mono, fontWeight: 600,
        cursor: text.length >= 30 ? "pointer" : "default",
      }}>ANALYSIEREN</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <div style={{
            background: T.surface, border: `1px solid ${result.klasseColor}44`,
            borderRadius: T.rl, padding: "20px", marginBottom: 16,
            borderLeft: `4px solid ${result.klasseColor}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, textTransform: "uppercase" }}>Macht-Index</span>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
                  <span style={{ color: result.klasseColor, fontSize: 36, fontFamily: T.mono, fontWeight: 700 }}>{result.MI_filtered}</span>
                  {result.voidCount > 0 && (
                    <span style={{ color: T.textDim, fontSize: 12, fontFamily: T.mono, textDecoration: "line-through" }}>{result.MI_raw}</span>
                  )}
                </div>
                <span style={{ color: result.klasseColor, fontSize: 13, fontFamily: T.mono, fontWeight: 600, textTransform: "uppercase" }}>{result.klasse}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, display: "block" }}>{result.sentences} klauseln · {result.lang.toUpperCase()}</span>
                <span style={{ color: T.textMuted, fontSize: 10, fontFamily: T.mono, display: "block" }}>{result.stasisPct}% stasis (formhülle)</span>
                {result.voidCount > 0 && (
                  <span style={{ color: T.gold, fontSize: 10, fontFamily: T.mono, display: "block" }}>{result.voidCount} void-klauseln erkannt</span>
                )}
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                {[
                  { label: "ideal", max: 0.5, color: T.accent },
                  { label: "fair", max: 1.5, color: "#3DBB7D" },
                  { label: "moderat", max: 3.0, color: T.gold },
                  { label: "asymm.", max: 5.0, color: "#E8954A" },
                  { label: "aggr.", max: 10, color: T.coral },
                ].map(s => (
                  <div key={s.label} style={{
                    flex: 1, height: 6, borderRadius: 3,
                    background: s.label === result.klasse || (s.label === "asymm." && result.klasse === "asymmetrisch") ? s.color : s.color + "33",
                  }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {["0", "0.5", "1.5", "3.0", "5.0", "10+"].map(v => (
                  <span key={v} style={{ color: T.textDim, fontSize: 9, fontFamily: T.mono }}>{v}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 16 }}>
            {Object.entries(GLYPH_INFO).map(([key, info]) => {
              const count = result.counts[key] || 0;
              const pct = ((count / Math.max(result.sentences, 1)) * 100).toFixed(0);
              return (
                <div key={key} style={{
                  background: T.surface, border: `1px solid ${info.color}33`,
                  borderRadius: T.r, padding: "10px 8px", textAlign: "center",
                }}>
                  <span style={{ color: info.color, fontSize: 18, display: "block" }}>{info.symbol}</span>
                  <span style={{ color: info.color, fontSize: 18, fontFamily: T.mono, fontWeight: 700, display: "block" }}>{count}</span>
                  <span style={{ color: T.textDim, fontSize: 9, fontFamily: T.mono, display: "block" }}>{pct}%</span>
                  <span style={{ color: T.textMuted, fontSize: 9, fontFamily: T.mono, display: "block", marginTop: 2 }}>{info.label}</span>
                </div>
              );
            })}
          </div>

          {result.voidCount > 0 && (
            <div style={{
              background: T.goldDim, border: `1px solid ${T.gold}33`,
              borderRadius: T.r, padding: "12px 14px", marginBottom: 16,
            }}>
              <span style={{ color: T.gold, fontSize: 11, fontFamily: T.mono, fontWeight: 600 }}>
                VOID-KLAUSELN ({result.voidCount}) — in DE/EU teilweise nichtig
              </span>
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                {result.voidClauses.map((v, i) => (
                  <div key={i} style={{
                    padding: "6px 10px", background: T.bg, borderRadius: T.r,
                    borderLeft: `2px solid ${T.gold}`,
                  }}>
                    <span style={{ color: T.gold, fontSize: 9, fontFamily: T.mono, marginRight: 8 }}>{v.type}</span>
                    <span style={{ color: T.silver, fontSize: 11, fontFamily: T.sans, lineHeight: 1.4 }}>
                      {v.text.slice(0, 120)}{v.text.length > 120 ? "..." : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => setShowClassified(!showClassified)} style={{
            background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.r,
            padding: "8px 14px", color: T.textMuted, fontSize: 11, fontFamily: T.mono,
            cursor: "pointer", width: "100%", textAlign: "left",
          }}>
            {showClassified ? "▾" : "▸"} Alle {result.classified.length} Klauseln anzeigen
          </button>

          {showClassified && (
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
              {result.classified.map((c, i) => (
                <div key={i} style={{
                  padding: "6px 10px", background: T.surface,
                  borderLeft: `3px solid ${GLYPH_INFO[c.glyph]?.color || T.textDim}`,
                  borderRadius: "0 4px 4px 0", fontSize: 12, lineHeight: 1.5,
                }}>
                  <span style={{ color: GLYPH_INFO[c.glyph]?.color, fontSize: 9, fontFamily: T.mono, fontWeight: 600, marginRight: 8 }}>
                    {GLYPH_INFO[c.glyph]?.label}
                  </span>
                  <span style={{ color: T.silver, fontFamily: T.sans }}>
                    {c.text.slice(0, 150)}{c.text.length > 150 ? "..." : ""}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 16, padding: "12px 16px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.r }}>
            <span style={{ color: T.textDim, fontSize: 10, fontFamily: T.mono }}>
              MI = (Aneignung + Abgabe) ÷ Erschaffung · ≤0.5 ideal · 0.5–1.5 fair · 1.5–3.0 moderat · 3.0–5.0 asymmetrisch · &gt;5.0 aggressiv ·
              "Vertragssprache ≠ Unternehmenswerte" — die Engine misst das Dokument, nicht die Absicht ·
              Void-Klauseln (as-is, indemnity, Sammelklageverzicht) werden für MI_filtered vom Zähler abgezogen
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
