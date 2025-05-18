
import { supabase } from '@/lib/supabase';

// Simplified authentication service that works both with Supabase and without it
export const loginUser = async (email: string, password: string) => {
  // Check if Supabase is configured
  if (!import.meta.env.VITE_SUPABASE_URL) {
    // Use mock authentication for development without Supabase
    if (email === 'admin@example.com' && password === 'password') {
      const userData = {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
      };
      localStorage.setItem('auth_user', JSON.stringify(userData));
      return { user: userData, error: null };
    }
    return { user: null, error: 'Invalid credentials' };
  }
  
  // Use real Supabase authentication
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  return { 
    user: data?.user ? { 
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || 'User',
      role: data.user.user_metadata?.role || 'user'
    } : null, 
    error: error?.message 
  };
};

export const logoutUser = async () => {
  // Check if Supabase is configured
  if (!import.meta.env.VITE_SUPABASE_URL) {
    localStorage.removeItem('auth_user');
    return { error: null };
  }
  
  // Use real Supabase authentication
  const { error } = await supabase.auth.signOut();
  return { error: error?.message };
};

export const getCurrentUser = async () => {
  // Check if Supabase is configured
  if (!import.meta.env.VITE_SUPABASE_URL) {
    const userData = localStorage.getItem('auth_user');
    return userData ? JSON.parse(userData) : null;
  }
  
  // Use real Supabase authentication
  const { data } = await supabase.auth.getUser();
  return data?.user ? { 
    id: data.user.id,
    email: data.user.email,
    name: data.user.user_metadata?.name || 'User',
    role: data.user.user_metadata?.role || 'user'
  } : null;
};
