
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Use environment variables or hardcoded values for development
// In a real production app, these would be proper environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Create a single supabase client for interacting with the database
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
