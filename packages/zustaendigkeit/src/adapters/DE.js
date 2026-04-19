// ─── Country Adapter: Deutschland — Spec v0.4 §3 ─────────────────────────
// MVP-Wrapper um die bestehende DE-zentrische Logik. Behält rückwärts-
// kompatibles Verhalten — alle Tests laufen weiter über diesen Adapter.

export const DE_ADAPTER = {
  country: "DE",
  hasAdapter: true,
  // Reserved for future use: territoriale Hierarchie, Spezialnormen, etc.
  meta: {
    territoriale_ebenen: ["EU", "Bund", "Land", "Kreis", "Kommune"],
    spezial_normen: ["GG Art. 70-75", "VwVfG", "GO/Gemeindeordnungen"],
    weiterleitung_basis: "§ 3 Abs. 2 VwVfG",
    rechtsweg: "Verwaltungsgerichtsbarkeit (§ 40 VwGO)",
  },
};
