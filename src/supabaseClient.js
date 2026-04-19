import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client = null;

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn(
    '[deinestimme] Supabase env vars missing — running in offline mode. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local for full functionality.'
  );
}

// No-op stub for offline mode — keeps callers safe even without explicit null checks.
const noop = () => {};
const stubBuilder = () => {
  const b = {
    select: () => b,
    insert: async () => ({ data: null, error: { message: 'offline' } }),
    update: async () => ({ data: null, error: { message: 'offline' } }),
    delete: async () => ({ data: null, error: { message: 'offline' } }),
    eq: () => b,
    single: async () => ({ data: null, error: { message: 'offline' } }),
    order: () => b,
    limit: () => b,
  };
  return b;
};
const stubChannel = {
  on: () => stubChannel,
  subscribe: () => stubChannel,
};
const stub = {
  from: stubBuilder,
  channel: () => stubChannel,
  removeChannel: noop,
  auth: { getUser: async () => ({ data: { user: null }, error: null }) },
};

export const supabase = client || stub;
export const isOnline = client !== null;
