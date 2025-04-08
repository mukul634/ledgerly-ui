import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, FileDown, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock transactions data
const mockTransactions = [
  {
    id: "TR001",
    productName: "Financial Suite",
    clientId: "CL001",
    clientName: "Tech Solutions Inc.",
    address: "123 Main St, City",
    renewalDate: "2023-10-15",
    renewalAmount: 1500.00,
    vat: 195.00,
    agentName: "Sarah Johnson",
  },
  {
    id: "TR002",
    productName: "Ledger Pro",
    clientId: "CL002",
    clientName: "Global Enterprises",
    address: "456 Oak St, Town",
    renewalDate: "2023-11-20",
    renewalAmount: 1200.00,
    vat: 156.00,
    agentName: "David Clark",
  },
  {
    id: "TR003",
    productName: "Invoice Manager",
    clientId: "CL003",
    clientName: "Innovative Systems",
    address: "789 Pine St, Village",
    renewalDate: "2023-09-05",
    renewalAmount: 950.00,
    vat: 123.50,
    agentName: "Linda Martinez",
  },
  {
    id: "TR004",
    productName: "Complete Suite",
    clientId: "CL004",
    clientName: "Premier Solutions",
    address: "101 Maple St, County",
    renewalDate: "2023-12-10",
    renewalAmount: 2200.00,
    vat: 286.00,
    agentName: "Mark Wilson",
  },
  {
    id: "TR005",
    productName: "Tax Manager",
    clientId: "CL005",
    clientName: "Future Tech Inc.",
    address: "202 Cedar St, Metro",
    renewalDate: "2023-08-25",
    renewalAmount: 850.00,
    vat: 110.50,
    agentName: "Jessica Adams",
  }
];

const Transactions = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = mockTransactions.filter((transaction) => 
    transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.clientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Create and manage client transactions</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Create Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input id="clientId" placeholder="Select client..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transactionDate">Transaction Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vatBillNo">VAT Bill No</Label>
                <Input id="vatBillNo" placeholder="Enter VAT bill number..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentFor">Payment For</Label>
                <Input id="paymentFor" placeholder="Purpose of payment..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recordNo">Record No</Label>
                <Input id="recordNo" placeholder="Enter record number..." />
              </div>
              
              <div className="md:col-span-3 flex justify-end">
                <Button type="submit">Create Transaction</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead>Renewal Amount</TableHead>
                  <TableHead>VAT</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Agent Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>{transaction.productName}</TableCell>
                    <TableCell>{transaction.clientId}</TableCell>
                    <TableCell>{transaction.clientName}</TableCell>
                    <TableCell>{transaction.address}</TableCell>
                    <TableCell>{transaction.renewalDate}</TableCell>
                    <TableCell>Rs. {transaction.renewalAmount.toFixed(2)}</TableCell>
                    <TableCell>Rs. {transaction.vat.toFixed(2)}</TableCell>
                    <TableCell>Rs. {(transaction.renewalAmount + transaction.vat).toFixed(2)}</TableCell>
                    <TableCell>{transaction.agentName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Transactions;
