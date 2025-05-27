
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ywbrgarynavrqrhxvfqo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3YnJnYXJ5bmF2cnFyaHh2ZnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMjIxMzQsImV4cCI6MjA2Mzg5ODEzNH0.fLoKCaJ_HTiyGiR1qbhJD0pMv2P0AHgUK4I4sU4kcFE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
