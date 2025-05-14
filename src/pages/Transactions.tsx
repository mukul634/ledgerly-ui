import { useState, useMemo, useEffect } from "react";
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNumberInput } from "@/lib/hooks";

// Generate transactions based on client data
const generateTransactionsFromClients = (clients) => {
  if (!clients || clients.length === 0) return [];
  
  const agents = ["Sarah Johnson", "David Clark", "Linda Martinez", "Mark Wilson", "Jessica Adams"];
  
  const transactions = [];
  
  clients.forEach((client, index) => {
    // Only create transactions for clients with products
    if (client.productsUsed) {
      const products = [client.productsUsed]; // Make it an array to work with the forEach
      
      products.forEach((productName, productIndex) => {
        const renewalAmount = client.dueAmount || 0;
        const agentIndex = (index + productIndex) % agents.length;
        
        transactions.push({
          id: `TR${String(transactions.length + 1).padStart(3, '0')}`,
          productName: productName,
          clientId: client.id,
          clientName: client.companyName,
          address: client.address || 'N/A',
          renewalDate: client.renewalDate || 'N/A',
          renewalAmount: renewalAmount,
          agentName: agents[agentIndex]
        });
      });
    }
  });
  
  return transactions;
};

const Transactions = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  // Load clients from localStorage on component mount
  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  // Update transactions when clients change
  useEffect(() => {
    if (clients.length > 0) {
      const generatedTransactions = generateTransactionsFromClients(clients);
      setTransactions(generatedTransactions);
    }
  }, [clients]);
  
  // Generate a new transaction ID
  const generateTransactionId = () => {
    return `TR${String(transactions.length + 1).padStart(3, '0')}`;
  };
  
  // Auto-generated values
  const newTransactionId = generateTransactionId();
  const newRecordNo = `REC${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  const { handleNumberInput } = useNumberInput();

  const filteredTransactions = transactions.filter((transaction) => 
    (transaction.clientName && transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (transaction.clientId && transaction.clientId.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const selectedClient = clients.find(client => client.id === selectedClientId);
  
  // Get available products for the selected client
  const availableProducts = selectedClient ? [selectedClient.productsUsed].filter(Boolean) : [];
  
  // Calculate amount based on selected product
  const calculateAmount = () => {
    if (!selectedClient) return 0;
    return selectedClient.dueAmount || 0;
  };
  
  const [manualAmount, setManualAmount] = useState<number>(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleNumberInput(e)) {
      const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
      setManualAmount(value);
    }
  };

  const handleIncrementAmount = () => {
    setManualAmount(prev => prev + 100);
  };

  const handleDecrementAmount = () => {
    setManualAmount(prev => Math.max(0, prev - 100));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClientId) {
      toast.error("Please select a client");
      return;
    }
    
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }
    
    const client = clients.find(c => c.id === selectedClientId);
    
    if (!client) {
      toast.error("Invalid client selected");
      return;
    }
    
    const amount = calculateAmount();
    
    const newTransaction = {
      id: newTransactionId,
      productName: selectedProduct,
      clientId: client.id,
      clientName: client.companyName,
      address: client.address || 'N/A',
      renewalDate: client.renewalDate || 'N/A', 
      renewalAmount: amount,
      agentName: "Agent", // Could be selected or assigned
      date: date ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
    };
    
    setTransactions([...transactions, newTransaction]);
    toast.success("Transaction created successfully");
    
    // Reset form
    setSelectedClientId("");
    setSelectedProduct("");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Create and manage client transactions</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Create New Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Transaction ID</Label>
                  <p className="font-medium">{newTransactionId}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Record No</Label>
                  <p className="font-medium">{newRecordNo}</p>
                </div>
              </div>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="clientSelect">Select Client</Label>
                <select 
                  id="clientSelect" 
                  className="w-full p-2 border rounded-md bg-background"
                  value={selectedClientId}
                  onChange={(e) => {
                    setSelectedClientId(e.target.value);
                    setSelectedProduct(""); // Reset selected product when client changes
                  }}
                >
                  <option value="">Select a client...</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.id} - {client.companyName}
                    </option>
                  ))}
                </select>
                {clients.length === 0 && (
                  <p className="text-sm text-orange-500 mt-1">
                    No clients added yet. Please add clients from the Clients page first.
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productSelect">Select Product</Label>
                <Select 
                  value={selectedProduct} 
                  onValueChange={setSelectedProduct}
                  disabled={!selectedClientId || availableProducts.length === 0}
                >
                  <SelectTrigger id="productSelect">
                    <SelectValue placeholder="Select product..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.length > 0 ? (
                      availableProducts.map(product => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>No products available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
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
                <Input 
                  id="amount" 
                  type="text" 
                  placeholder="0.00" 
                  value={selectedClient ? calculateAmount().toString() : manualAmount.toString()}
                  onChange={handleAmountChange}
                  isAmount={true}
                  onIncrement={handleIncrementAmount}
                  onDecrement={handleDecrementAmount}
                  readOnly={!!selectedClient}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentFor">Payment For</Label>
                <Input 
                  id="paymentFor" 
                  placeholder="Purpose of payment..." 
                  value={selectedClient && selectedProduct ? 
                    `Renewal for ${selectedProduct}` : 
                    ""
                  }
                  readOnly={!!(selectedClient && selectedProduct)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <select id="paymentMethod" className="w-full p-2 border rounded-md bg-background">
                  <option value="">Select payment method...</option>
                  <option value="cash">Cash</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="cheque">Cheque</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>
              
              <div className="md:col-span-3 flex justify-end">
                <Button 
                  type="submit"
                  disabled={!selectedClientId || !selectedProduct}
                >
                  Create New Transaction
                </Button>
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
                  <TableHead>Agent Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
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
                      <TableCell>{transaction.agentName}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      {clients.length === 0 ? (
                        <div className="flex flex-col items-center">
                          <p className="mb-2">No clients added yet.</p>
                          <p className="text-sm text-muted-foreground">Add clients first to create transactions.</p>
                        </div>
                      ) : (
                        <div>No transactions found.</div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Transactions;
