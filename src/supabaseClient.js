import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rronrhzwjullupaesgzc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BOg3YdydbXQwnkLOuqA9YQ_cE8GRM0Gz';

export const supabase = createClient(supabaseUrl, supabaseKey);
