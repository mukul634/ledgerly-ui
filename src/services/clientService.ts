
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Database } from '@/lib/database.types';

export type Client = Database['public']['Tables']['clients']['Row'];
export type ClientInsert = Database['public']['Tables']['clients']['Insert'];
export type ClientUpdate = Database['public']['Tables']['clients']['Update'];

// Fallback to localStorage if Supabase is not configured
const useLocalStorage = !import.meta.env.VITE_SUPABASE_URL;

export const getClients = async (): Promise<Client[]> => {
  if (useLocalStorage) {
    // Fallback to localStorage
    const storedClients = localStorage.getItem('clients');
    return storedClients ? JSON.parse(storedClients) : [];
  }
  
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('companyName');

    if (error) {
      toast.error('Failed to load clients');
      console.error(error);
      return [];
    }
    
    return data;
  } catch (err) {
    console.error('Error fetching clients:', err);
    toast.error('Failed to load clients');
    return [];
  }
};

export const addClient = async (client: ClientInsert): Promise<Client | null> => {
  if (useLocalStorage) {
    // Fallback to localStorage
    const storedClients = localStorage.getItem('clients');
    const clients = storedClients ? JSON.parse(storedClients) : [];
    const newClient = {
      ...client,
      created_at: new Date().toISOString()
    };
    clients.push(newClient);
    localStorage.setItem('clients', JSON.stringify(clients));
    return newClient as Client;
  }
  
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert(client)
      .select()
      .single();

    if (error) {
      toast.error('Failed to add client');
      console.error(error);
      return null;
    }
    
    toast.success('Client added successfully');
    return data;
  } catch (err) {
    console.error('Error adding client:', err);
    toast.error('Failed to add client');
    return null;
  }
};

export const updateClient = async (id: string, updates: ClientUpdate): Promise<Client | null> => {
  if (useLocalStorage) {
    // Fallback to localStorage
    const storedClients = localStorage.getItem('clients');
    const clients = storedClients ? JSON.parse(storedClients) : [];
    const updatedClients = clients.map((client: Client) => 
      client.id === id ? { ...client, ...updates } : client
    );
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    return updatedClients.find((client: Client) => client.id === id) || null;
  }
  
  try {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast.error('Failed to update client');
      console.error(error);
      return null;
    }
    
    toast.success('Client updated successfully');
    return data;
  } catch (err) {
    console.error('Error updating client:', err);
    toast.error('Failed to update client');
    return null;
  }
};

export const deleteClient = async (id: string): Promise<boolean> => {
  if (useLocalStorage) {
    // Fallback to localStorage
    const storedClients = localStorage.getItem('clients');
    const clients = storedClients ? JSON.parse(storedClients) : [];
    const filteredClients = clients.filter((client: Client) => client.id !== id);
    localStorage.setItem('clients', JSON.stringify(filteredClients));
    return true;
  }
  
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete client');
      console.error(error);
      return false;
    }
    
    toast.success('Client deleted successfully');
    return true;
  } catch (err) {
    console.error('Error deleting client:', err);
    toast.error('Failed to delete client');
    return false;
  }
};
