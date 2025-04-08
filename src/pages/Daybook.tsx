
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock daybook data
const mockDaybook = [
  {
    id: "DB001",
    date: "2023-09-15",
    companyName: "Tech Solutions Inc.",
    softwareName: "Financial Suite",
    paymentMode: "Bank Transfer",
    amount: 1500.00,
    type: "income"
  },
  {
    id: "DB002",
    date: "2023-09-15",
    companyName: "Global Enterprises",
    softwareName: "Ledger Pro",
    paymentMode: "Credit Card",
    amount: 1200.00,
    type: "income"
  },
  {
    id: "DB003",
    date: "2023-09-16",
    companyName: "Innovative Systems",
    softwareName: "Invoice Manager",
    paymentMode: "Cash",
    amount: 950.00,
    type: "income"
  },
  {
    id: "DB004",
    date: "2023-09-16",
    companyName: "Office Supplies",
    softwareName: "N/A",
    paymentMode: "Bank Transfer",
    amount: 350.00,
    type: "expense"
  },
  {
    id: "DB005",
    date: "2023-09-17",
    companyName: "Premier Solutions",
    softwareName: "Complete Suite",
    paymentMode: "Check",
    amount: 2200.00,
    type: "income"
  }
];

const Daybook = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const totalIncome = mockDaybook
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);
    
  const totalExpense = mockDaybook
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

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
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="outline" size="sm">This Week</Button>
            <Button variant="outline" size="sm">This Month</Button>
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
            <CardTitle>Transaction History</CardTitle>
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
                {mockDaybook.map((entry) => (
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Daybook;
