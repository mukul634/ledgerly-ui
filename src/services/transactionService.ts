
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Database } from '@/lib/database.types';

export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];

// Fallback to localStorage if Supabase is not configured
const useLocalStorage = !import.meta.env.VITE_SUPABASE_URL;

export const getTransactions = async (): Promise<Transaction[]> => {
  if (useLocalStorage) {
    // Fallback to localStorage
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  }
  
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      toast.error('Failed to load transactions');
      console.error(error);
      return [];
    }
    
    return data;
  } catch (err) {
    console.error('Error fetching transactions:', err);
    toast.error('Failed to load transactions');
    return [];
  }
};

export const addTransaction = async (transaction: TransactionInsert): Promise<Transaction | null> => {
  if (useLocalStorage) {
    // Fallback to localStorage
    const storedTransactions = localStorage.getItem('transactions');
    const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
    const newTransaction = {
      ...transaction,
      created_at: new Date().toISOString()
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    return newTransaction as Transaction;
  }
  
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single();

    if (error) {
      toast.error('Failed to add transaction');
      console.error(error);
      return null;
    }
    
    toast.success('Transaction added successfully');
    return data;
  } catch (err) {
    console.error('Error adding transaction:', err);
    toast.error('Failed to add transaction');
    return null;
  }
};

export const updateTransactionForClient = async (clientId: string, updates: { dueAmount: number }): Promise<boolean> => {
  if (useLocalStorage) {
    // Fallback to localStorage
    const storedClients = localStorage.getItem('clients');
    const clients = storedClients ? JSON.parse(storedClients) : [];
    const updatedClients = clients.map((client: any) => 
      client.id === clientId ? { ...client, dueAmount: updates.dueAmount } : client
    );
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    return true;
  }
  
  try {
    const { error } = await supabase
      .from('clients')
      .update({ dueAmount: updates.dueAmount })
      .eq('id', clientId);

    if (error) {
      console.error(error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error updating client due amount:', err);
    return false;
  }
};
