
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import useTransactions from "@/hooks/useTransactions";

const Transactions = () => {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const { clients, transactions, refreshData } = useTransactions();

  const handleTransactionAdded = () => {
    refreshData();
    setIsAddingTransaction(false); // Optionally hide the form after successful submission
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Transactions</CardTitle>
            <Button onClick={() => setIsAddingTransaction(!isAddingTransaction)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {isAddingTransaction ? "Cancel" : "Add Transaction"}
            </Button>
          </CardHeader>
          <CardContent>
            {isAddingTransaction && (
              <TransactionForm 
                clients={clients} 
                onTransactionAdded={handleTransactionAdded} 
              />
            )}

            <TransactionsTable 
              transactions={transactions}
              clients={clients}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Transactions;
