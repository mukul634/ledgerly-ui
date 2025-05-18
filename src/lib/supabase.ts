
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Use environment variables or fallback to valid placeholder URL/key for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create a single supabase client for interacting with the database
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Flag to check if the app is using a real Supabase instance or falling back to localStorage
export const useLocalStorage = !import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder-project.supabase.co';

