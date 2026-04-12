// ─── DeineStimme: Echte Programminhalte ───
// Extrahiert aus Grundsatzprogramm, Bürgerprogramm, Wirtschaftsprogramm, Action Plan

export const LEITPRINZIPIEN = [
  { id: "erweiterung", label: "Erweiterung statt Zwang", icon: "I", desc: "Kann das Spielfeld erweitert werden, sodass das Problem seine Ursache verliert?" },
  { id: "unwissenheit", label: "Unwissenheit, nicht Bosheit", icon: "II", desc: "Aufklärung, nicht Bestrafung. Kein Feindbild — eine Handlungsaufforderung." },
  { id: "sehen", label: "Niemanden zurücklassen, jeden sehen", icon: "III", desc: "Würde bemisst sich an der Existenz, nicht an der Leistung." },
];

export const TOPICS = [
  {
    id: "t1",
    title: "Grundeinkommen statt Jobcenter",
    category: "Sozial",
    desc: "Ein UBI, das Existenzangst nimmt. Ohne Anträge, ohne Bedarfsprüfung. Du existierst — das reicht.",
    source: "Bürgerprogramm §1",
    proposalCount: 0,
    voteCount: 0,
  },
  {
    id: "t2",
    title: "Wohnraum — Grundvoraussetzung, kein Spekulationsobjekt",
    category: "Sozial",
    desc: "Genossenschaftliche Wohnmodelle. Dein Zuhause gehört dir und deiner Gemeinschaft — nicht einem Fonds in London.",
    source: "Bürgerprogramm §2",
    proposalCount: 0,
    voteCount: 0,
  },
  {
    id: "t3",
    title: "Energie: Leitungen öffentlich, Erzeugung Wettbewerb",
    category: "Infrastruktur",
    desc: "Staat hält Übertragungsnetz. Stabile, planbare Preise. Dein Licht bleibt an, egal was an der Börse passiert.",
    source: "Bürgerprogramm §3 + Grundsatzprogramm III.4",
    proposalCount: 0,
    voteCount: 0,
  },
  {
    id: "t4",
    title: "Verantwortungs-Freiheits-Tausch für Unternehmen",
    category: "Wirtschaft",
    desc: "Unternehmen übernehmen messbaren Beitrag für die Gemeinschaft. Dafür fallen nutzlose Auflagen weg. Ergebnismessung, nicht Berichtsmessung.",
    source: "Wirtschaftsprogramm §1",
    proposalCount: 0,
    voteCount: 0,
  },
  {
    id: "t5",
    title: "Nordost-Korridor: Hamburg–Berlin–Leipzig",
    category: "Wirtschaft",
    desc: "Sonderwirtschaftszone als Reallabor. Bürokratiefreiheit, 7-Sprachen-Zone, Skills statt Zertifikate, Repair/Recycle-Hubs.",
    source: "Grundsatzprogramm IV",
    proposalCount: 0,
    voteCount: 0,
  },
  {
    id: "t6",
    title: "Bildung als Infrastruktur, nicht als Dienstleistung",
    category: "Bildung",
    desc: "Fehler ist kein Versagen — er zeigt, wo noch was fehlt. Kompetenz statt Kontrolle. Technologie als verlängerter Arm.",
    source: "Bürgerprogramm §6 + Grundsatzprogramm V.3",
    proposalCount: 0,
    voteCount: 0,
  },
  {
    id: "t7",
    title: "Digitale Teilhabe-Plattform",
    category: "Demokratie",
    desc: "Laufend mitbestimmen — nicht alle vier Jahre. Offen, nachvollziehbar, für jeden. DeineStimme.org ist der Prototyp.",
    source: "Bürgerprogramm §7",
    proposalCount: 0,
    voteCount: 0,
  },
  {
    id: "t8",
    title: "Konsistenzgebot — Art. 20 Abs. 5 GG",
    category: "Verfassung",
    desc: "Jede Institution, die Regeln setzt, muss selbst mindestens gleichwertigen Maßstäben unterliegen.",
    source: "Grundsatzprogramm III.2",
    proposalCount: 0,
    voteCount: 0,
  },
  {
    id: "t9",
    title: "Zukunftsfonds: Dein Geld, deine Region",
    category: "Wirtschaft",
    desc: "Privatkapital fließt in Infrastruktur, Schulen, Energieprojekte. Du bestimmst mit, wohin — nicht ein Fondsmanager.",
    source: "Bürgerprogramm §8 + Wirtschaftsprogramm §2",
    proposalCount: 0,
    voteCount: 0,
  },
  {
    id: "t10",
    title: "Umwelt: Dinge besser machen, nicht verbieten",
    category: "Umwelt",
    desc: "Weniger Stau statt Fahrverbote. Reparieren statt Wegwerfen. Gewächshäuser mit Rechenzentrum-Wärme. Verstand, nicht Verzicht.",
    source: "Bürgerprogramm §11",
    proposalCount: 0,
    voteCount: 0,
  },
];

export const TIMELINE = [
  {
    phase: "I",
    title: "Fundament",
    zeitraum: "0–12 Monate",
    status: "aktiv",
    items: [
      "Vereinsgründung, Grundsatzprogramm finalisieren",
      "Juristische Prüfung aller Verfassungsergänzungen",
      "Stakeholder-Gespräche: Bundesländer, IHK/HWK, Energieversorger",
      "Machbarkeitsstudie Nordost-Korridor",
      "Digitale Teilhabe-Plattform als Prototyp (DeineStimme.org)",
      "Kommunikationsstrategie: Vier Zielgruppen-Übersetzungen",
    ],
  },
  {
    phase: "II",
    title: "Pilotprojekte",
    zeitraum: "1–3 Jahre",
    status: "geplant",
    items: [
      "Regulatory Sandbox im Korridor starten",
      "Erste Microgrids in Betrieb",
      "UBI-Pilotprojekt in Korridor-Kommune",
      "Verantwortungs-Freiheits-Tausch mit 10–20 Unternehmen",
      "Zukunftsfonds-Pilotprojekt",
      "Teilhabe-Plattform live schalten",
    ],
  },
  {
    phase: "III",
    title: "Skalierung",
    zeitraum: "3–7 Jahre",
    status: "geplant",
    items: [
      "Verfassungsergänzungen in parlamentarischen Prozess",
      "Korridor operativ ausbauen",
      "UBI schrittweise bundesweit",
      "Skills-System neben Kammersystem",
      "Bundesnetzgesellschaft gründen",
    ],
  },
  {
    phase: "IV",
    title: "Überflüssig werden",
    zeitraum: "7+ Jahre",
    status: "vision",
    items: [
      "Strukturen selbsttragend?",
      "Korridor-Prinzip auf weitere Regionen/EU übertragen",
      "Exportierbare Modelle dokumentieren",
      "Partei-Auflösung, wenn Kernaufgaben erfüllt",
    ],
  },
];

export const WIRTSCHAFT_BEISPIELE = [
  { branche: "Energie", verantwortung: "Regionale Versorgungssicherheit", freiheit: "Wegfall redundanter Berichtspflichten" },
  { branche: "Logistik", verantwortung: "Lieferketten-Diversifizierung (20%)", freiheit: "Steuererleichterungen" },
  { branche: "Technologie", verantwortung: "Digitale Infrastruktur für Region", freiheit: "Vereinfachte Genehmigungen" },
  { branche: "Bau", verantwortung: "Bezahlbarer Wohnraum", freiheit: "Bevorzugter Zugang zu öffentlichen Aufträgen" },
  { branche: "Lebensmittel", verantwortung: "Regionale Versorgungssicherheit", freiheit: "Reduzierte Kontrollfrequenzen" },
];

export const INFRASTRUKTUR_SOUVERAENITAET = [
  { bereich: "Energienetze", detail: "TenneT (NL), 50Hertz (80% Elia/BE), Amprion (Finanzinvestoren)", status: "kritisch" },
  { bereich: "Steuerungssoftware", detail: "PSI Software — 83,24% Warburg Pincus (USA) seit 2026", status: "kritisch" },
  { bereich: "Verwaltungscloud", detail: "Delos Cloud: deutsches Etikett auf Microsoft Azure", status: "warnung" },
  { bereich: "Bundesdruckerei", detail: "2000 privatisiert → pleite → 2009 Rückkauf → 100% Bund", status: "gesichert" },
];

export const VIER_SPRACHEN = [
  { zielgruppe: "Breite Gesellschaft", ton: "Klar, direkt, ohne Fachchinesisch", kanal: "Kurze Videos, Social Media, Bürgergespräche" },
  { zielgruppe: "Verwaltung & Politik", ton: "Sachlich, datengestützt, lösungsorientiert", kanal: "Policy Papers, Fachgespräche" },
  { zielgruppe: "Wirtschaft & Investoren", ton: "Business Case, ROI, Wettbewerbsvorteil", kanal: "Wirtschaftsprogramm, Branchenveranstaltungen" },
  { zielgruppe: "Konservativ / Skeptisch", ton: "Respektvoll, traditionsverbunden, konkret", kanal: "Lokale Veranstaltungen, Vereinsarbeit" },
];
