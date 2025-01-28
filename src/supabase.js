import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://bzfcrikrctwhhocdbukt.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZmNyaWtyY3R3aGhvY2RidWt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMjYxMTUsImV4cCI6MjA1MDgwMjExNX0.bKXBvtl0P-wUH_cAv7ZD4xX1se2QsB00um_CNzeyPtQ';
export const supabase = createClient(supabaseUrl, supabaseKey);
