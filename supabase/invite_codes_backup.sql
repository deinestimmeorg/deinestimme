-- ═══════════════════════════════════════════════════
-- DeineStimme.org — Einladungscodes
-- Nach dem Hauptschema ausführen
-- ═══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS invite_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  scope TEXT NOT NULL DEFAULT 'plattform',  -- 'plattform', 'schreibkompass', 'vertragsanalyse', 'alles'
  used BOOLEAN DEFAULT false,
  used_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  used_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;

-- Jeder darf Codes prüfen (SELECT) und einlösen (UPDATE)
CREATE POLICY "Codes prüfbar" ON invite_codes FOR SELECT USING (true);
CREATE POLICY "Codes einlösbar" ON invite_codes FOR UPDATE USING (true);

-- ═══ ERSTE CODES GENERIEREN ═══
-- Ändere die Codes nach Belieben. Format: kurz, merkbar, einmalig.
INSERT INTO invite_codes (code, scope) VALUES
  -- Plattform-Zugänge (ersetzen das globale Passwort)
  ('MOND-ALPHA-2026', 'plattform'),
  ('MOND-BETA-2026', 'plattform'),
  ('MOND-GAMMA-2026', 'plattform'),
  ('MOND-DELTA-2026', 'plattform'),
  ('MOND-EPSILON-2026', 'plattform'),
  -- Schreibkompass-Zugänge
  ('KOMPASS-ALPHA-2026', 'schreibkompass'),
  ('KOMPASS-BETA-2026', 'schreibkompass'),
  ('KOMPASS-GAMMA-2026', 'schreibkompass'),
  -- Vertragsanalyse-Zugänge
  ('VERTRAG-ALPHA-2026', 'vertragsanalyse'),
  ('VERTRAG-BETA-2026', 'vertragsanalyse'),
  ('VERTRAG-GAMMA-2026', 'vertragsanalyse'),
  -- Vollzugang (alles)
  ('GERO-ADMIN-2026', 'alles'),
  ('TESTER-VIP-2026', 'alles');

-- Neue Codes später hinzufügen:
-- INSERT INTO invite_codes (code, scope) VALUES ('NEUER-CODE', 'plattform');

-- Benutzte Codes sehen:
-- SELECT code, scope, used, used_by, used_at FROM invite_codes ORDER BY created_at;
