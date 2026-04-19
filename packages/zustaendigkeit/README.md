# @deinestimme/zustaendigkeit

**Politische Zuständigkeitszuordnung — Open-Source npm-Modul**
Thema → Gemeinde / Kreis / Land / Bund / EU mit Confidence, Evidence und Explanation.

Hybride Architektur: **LeiKa/FIM + GG-Regelwerk + EUR-Lex/CELLAR + EuroVoc** — aufgebaut nach der technischen Spezifikation v0.3 (Strauss & Reinemann GbR, 14. April 2026).

License: **AGPL-3.0-or-later**

---

## Installation

```bash
npm install @deinestimme/zustaendigkeit
```

## Schnellstart (Spec §9)

```js
import { findZustaendigkeit } from "@deinestimme/zustaendigkeit";

const result = await findZustaendigkeit("Strompreise", { country: "DE" });
```

## Architektur — Drei-Schichten-Modell

| Schicht | Datei | Aufgabe |
|---|---|---|
| **A** Normalisierung | `src/normalize.js` | Freitext → kontrolliertes Konzept (Topic, EuroVoc, LeiKa) |
| **B** Deterministische Engine | `src/rules.js` + `src/data/gg.js` + `src/data/tfeu.js` | GG Art. 28/30/70–74 + TFEU Art. 2–6 + LeiKa Typisierung 1–5 |
| **C** Ranking + Confidence | `src/rules.js` (60/20/15/5) | Hybrid-Score 0–100 pro Ebene |

## Confidence-Formel (Spec §4.2)

- **60 %** Rechtsgrundlagen-Treffer (direkt = 1.0, indirekt = 0.6)
- **20 %** Subsidiaritäts-Test (Spillover, Skaleneffekte, Präferenzheterogenität — Oates)
- **15 %** Präzedenz / Praxis (Häufigkeit realer Regelungen, LeiKa-Hits)
- **5 %** Residualregel (Art. 30 GG / Art. 70 GG)

## Tests

```bash
npm test
```

Erwartung: 11 Subtests, 27/27 Benchmark-Cases (100%).

## Roadmap (Spec §8)

- **Phase 1** (*dieses Release*): DE-MVP, Seed-Daten, JSON-API
- **Phase 2**: Vollständige LeiKa/EuroVoc-Ingestion, NLP, Benchmark-Set, SPARQL-Live
- **Phase 3**: EU-Erweiterung mit Country Adapters, ELI/CELLAR, CPSV-AP

## Neuheitsgrad (Addendum B)

**NULL PRIOR ART.** Stand: 14. April 2026.

## Lizenz

AGPL-3.0-or-later.
