
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Create a type for our transaction data
type Transaction = {
  id: string;
  date: string;
  companyName: string;
  softwareName: string;
  paymentMode: string;
  amount: number;
  type: 'income' | 'expense';
};

// Function to get transactions from localStorage
const getTransactions = (): Transaction[] => {
  const storedTransactions = localStorage.getItem('transactions');
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};

const Daybook = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>(getTransactions());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  
  // Update transactions when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setTransactions(getTransactions());
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check for updates every 5 seconds
    const interval = setInterval(handleStorageChange, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  
  // Filter transactions based on selected date and view mode
  const filteredTransactions = transactions.filter(transaction => {
    if (!date || !transaction.date) return false;
    
    const transactionDate = parseISO(transaction.date);
    
    if (viewMode === 'day') {
      return isSameDay(transactionDate, date);
    } else if (viewMode === 'week') {
      // Get start and end of week
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
    } else if (viewMode === 'month') {
      return (
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getFullYear() === date.getFullYear()
      );
    }
    
    return false;
  });
  
  const totalIncome = filteredTransactions
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);
    
  const totalExpense = filteredTransactions
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const handleViewModeChange = (mode: 'day' | 'week' | 'month') => {
    setViewMode(mode);
    toast.success(`Viewing ${mode} transactions`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Daybook</h1>
          <p className="text-muted-foreground">View daily transactions and financial summaries</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <Button 
              variant={viewMode === 'day' ? "default" : "outline"} 
              size="sm"
              onClick={() => handleViewModeChange('day')}
            >
              Today
            </Button>
            <Button 
              variant={viewMode === 'week' ? "default" : "outline"} 
              size="sm"
              onClick={() => handleViewModeChange('week')}
            >
              This Week
            </Button>
            <Button 
              variant={viewMode === 'month' ? "default" : "outline"} 
              size="sm"
              onClick={() => handleViewModeChange('month')}
            >
              This Month
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-finblue-50 to-finblue-100 dark:from-finblue-900 dark:to-finblue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalIncome.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalExpense.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(totalIncome - totalExpense).toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction History {viewMode === 'day' ? 'for Today' : viewMode === 'week' ? 'for This Week' : 'for This Month'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Software Name</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No transactions found for the selected {viewMode}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((entry) => (
                    <TableRow 
                      key={entry.id} 
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.companyName}</TableCell>
                      <TableCell>{entry.softwareName}</TableCell>
                      <TableCell>{entry.paymentMode}</TableCell>
                      <TableCell className="text-right">₹{entry.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          entry.type === 'income' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {entry.type === 'income' ? 'Income' : 'Expense'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Daybook;
