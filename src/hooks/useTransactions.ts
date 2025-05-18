
import { useState, useEffect, useMemo } from "react";
import { getClients } from "@/services/clientService";
import { getTransactions } from "@/services/transactionService";
import { toast } from "sonner";

const useTransactions = () => {
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load clients and transactions from the service
  const loadData = async () => {
    setIsLoading(true);
    try {
      const clientsData = await getClients();
      setClients(clientsData);
      
      const transactionsData = await getTransactions();
      setTransactions(transactionsData);
    } catch (err) {
      console.error("Error loading data:", err);
      toast.error("Failed to load data. Check Supabase configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    loadData();
  }, []);

  // Sort transactions by date (newest first)
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions]);

  return {
    clients,
    transactions: sortedTransactions,
    isLoading,
    setClients,
    setTransactions,
    refreshData: loadData
  };
};

export default useTransactions;
