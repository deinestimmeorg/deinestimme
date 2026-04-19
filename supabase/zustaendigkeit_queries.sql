-- ─── Zustaendigkeits-Engine: Query-Log & Benchmark-Set ─────────────────────
-- Speichert anonymisierte Abfragen, um Phase 2 (Spec §8) zu speisen:
--   • Erweiterung des Topic-Dictionaries
--   • Labeled Benchmark-Set für NLP-Training
--   • Explainability-Statistiken
-- Datum: April 2026
-- ──────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS zustaendigkeit_queries (
  id              BIGSERIAL PRIMARY KEY,
  query_text      TEXT NOT NULL,
  country         VARCHAR(2) DEFAULT 'DE',
  primary_level   VARCHAR(16) NOT NULL,
  secondary_levels TEXT[] DEFAULT '{}',
  competence_type TEXT[] DEFAULT '{}',
  confidence      NUMERIC(4, 3) NOT NULL CHECK (confidence BETWEEN 0 AND 1),
  topic_id        VARCHAR(128),
  match_type      VARCHAR(24),
  match_score     NUMERIC(4, 3),
  eu_channels_count INT DEFAULT 0,
  user_agent_hash TEXT, -- optional: sha256 for bot-filter only
  lang            VARCHAR(4) DEFAULT 'de',
  session_id      UUID,   -- not user-linked, just rate-limit grouping
  ip_hash         TEXT,   -- optional: salted sha256 for fraud prevention
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_zust_query_text   ON zustaendigkeit_queries (lower(query_text));
CREATE INDEX IF NOT EXISTS idx_zust_primary      ON zustaendigkeit_queries (primary_level);
CREATE INDEX IF NOT EXISTS idx_zust_topic        ON zustaendigkeit_queries (topic_id);
CREATE INDEX IF NOT EXISTS idx_zust_created      ON zustaendigkeit_queries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_zust_low_conf     ON zustaendigkeit_queries (confidence) WHERE confidence < 0.4;

-- ── Feedback: "War diese Zuordnung richtig?" ─────────────────────────────
CREATE TABLE IF NOT EXISTS zustaendigkeit_feedback (
  id              BIGSERIAL PRIMARY KEY,
  query_id        BIGINT REFERENCES zustaendigkeit_queries(id) ON DELETE CASCADE,
  verdict         VARCHAR(12) NOT NULL CHECK (verdict IN ('correct', 'partial', 'wrong', 'unclear')),
  suggested_level VARCHAR(16), -- user-suggested correction
  comment         TEXT,
  lang            VARCHAR(4) DEFAULT 'de',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_zust_fb_query     ON zustaendigkeit_feedback (query_id);
CREATE INDEX IF NOT EXISTS idx_zust_fb_verdict   ON zustaendigkeit_feedback (verdict);

-- ── Row-level security ───────────────────────────────────────────────────
ALTER TABLE zustaendigkeit_queries  ENABLE ROW LEVEL SECURITY;
ALTER TABLE zustaendigkeit_feedback ENABLE ROW LEVEL SECURITY;

-- Anonymous inserts ok; nobody reads except service_role
DROP POLICY IF EXISTS "zust_query_insert_anon" ON zustaendigkeit_queries;
CREATE POLICY "zust_query_insert_anon"
  ON zustaendigkeit_queries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "zust_fb_insert_anon" ON zustaendigkeit_feedback;
CREATE POLICY "zust_fb_insert_anon"
  ON zustaendigkeit_feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ── Aggregations-View: häufigste Low-Confidence-Queries ──────────────────
--   Feeds the Phase-2 topic-expansion workflow.
CREATE OR REPLACE VIEW v_zust_low_confidence_gaps AS
SELECT
  lower(query_text) AS query_normalized,
  COUNT(*)           AS count,
  AVG(confidence)    AS avg_confidence,
  MIN(created_at)    AS first_seen,
  MAX(created_at)    AS last_seen,
  array_agg(DISTINCT primary_level) AS levels_returned
FROM zustaendigkeit_queries
WHERE confidence < 0.45
GROUP BY lower(query_text)
HAVING COUNT(*) >= 2
ORDER BY COUNT(*) DESC, MAX(created_at) DESC;

-- ── Comments ─────────────────────────────────────────────────────────────
COMMENT ON TABLE  zustaendigkeit_queries   IS 'Log of Zustaendigkeits-Engine queries. Anonymized. Used to build Phase-2 benchmark set.';
COMMENT ON TABLE  zustaendigkeit_feedback  IS 'User-supplied corrections for engine output. Fuel for gold-labeling.';
COMMENT ON VIEW   v_zust_low_confidence_gaps IS 'Recurring low-confidence queries that should be added to topics.js.';
