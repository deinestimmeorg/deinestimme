-- ═══════════════════════════════════════════════════
-- DeineStimme.org — Supabase Schema v0.4
-- Ausführen im Supabase SQL Editor (supabase.com → SQL)
-- ═══════════════════════════════════════════════════

-- 1. Profile (Monde und Sternschnuppen)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  display_name TEXT NOT NULL,
  is_permanent BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Themen
CREATE TABLE IF NOT EXISTS topics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Vorschläge (Kernstück mit Netzblatt-Prinzip: ON DELETE SET NULL)
CREATE TABLE IF NOT EXISTS proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  text TEXT NOT NULL,
  phase TEXT DEFAULT 'neutral', -- leer/neutral/beschreibung/uebergang/ansatz/loesung
  ratio REAL DEFAULT 0.5,       -- 0 = pure IST, 1 = pure LÖSUNG
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Wirkungsanalyse (Chancen, Gefahren, Lösungen)
CREATE TABLE IF NOT EXISTS impacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  dimension TEXT NOT NULL,
  chance_score INTEGER NOT NULL,
  chance_text TEXT NOT NULL,
  gefahr_score INTEGER NOT NULL,
  gefahr_text TEXT NOT NULL,
  mitigation_text TEXT,
  mitigation_count INTEGER DEFAULT 0
);

-- 5. Abstimmungen (eine Stimme pro Person pro Vorschlag)
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, proposal_id)
);

-- 6. Row Level Security aktivieren
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE impacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- 7. Policies: Alle können lesen, nur authentifizierte können schreiben
-- (Für den Prototyp: anon kann alles — wird für Produktion verschärft)
CREATE POLICY "Alle können Profile sehen" ON profiles FOR SELECT USING (true);
CREATE POLICY "Alle können Profile erstellen" ON profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Alle können Themen sehen" ON topics FOR SELECT USING (true);
CREATE POLICY "Alle können Themen erstellen" ON topics FOR INSERT WITH CHECK (true);

CREATE POLICY "Alle können Vorschläge sehen" ON proposals FOR SELECT USING (true);
CREATE POLICY "Alle können Vorschläge erstellen" ON proposals FOR INSERT WITH CHECK (true);

CREATE POLICY "Alle können Impacts sehen" ON impacts FOR SELECT USING (true);
CREATE POLICY "Alle können Impacts erstellen" ON impacts FOR INSERT WITH CHECK (true);

CREATE POLICY "Alle können Votes sehen" ON votes FOR SELECT USING (true);
CREATE POLICY "Alle können Votes erstellen" ON votes FOR INSERT WITH CHECK (true);

-- 8. Realtime aktivieren für Live-Updates
ALTER PUBLICATION supabase_realtime ADD TABLE proposals;
ALTER PUBLICATION supabase_realtime ADD TABLE votes;

-- 9. Erstes Thema anlegen
INSERT INTO topics (title, description) VALUES (
  'Dauerhafte Normalzeit (MEZ, UTC+1) + gesetzlicher Anspruch auf Gleitzeit',
  'Soll Deutschland dauerhaft zur Normalzeit (Winterzeit, MEZ/UTC+1) zurückkehren und gleichzeitig einen gesetzlichen Anspruch auf Gleitzeit einführen?'
);
