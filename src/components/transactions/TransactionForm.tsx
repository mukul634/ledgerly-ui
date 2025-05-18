
import { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { Database } from "@/lib/database.types";
import { addTransaction, updateTransactionForClient } from "@/services/transactionService";

// Define types
type TransactionType = Database['public']['Tables']['transactions']['Row']['transactionType'];
type Client = any; // Using any for simplicity, but ideally you'd define a proper type

interface TransactionFormProps {
  clients: Client[];
  onTransactionAdded: () => void;
}

const TransactionForm = ({ clients, onTransactionAdded }: TransactionFormProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [agentName, setAgentName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [newRecordNo, setNewRecordNo] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionType>("Payment");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate transaction ID and record number on component mount
  useState(() => {
    generateNewTransactionId();
    generateNewRecordNumber();
  });

  const generateNewTransactionId = () => {
    const newId = 'T-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setTransactionId(newId);
  };

  const generateNewRecordNumber = () => {
    const newRecord = 'R-' + Math.floor(1000 + Math.random() * 9000);
    setNewRecordNo(newRecord);
  };

  const transactionTypeOptions = [
    { value: "Payment", label: "Payment" },
    { value: "Renewal", label: "Renewal" },
    { value: "New Registration", label: "New Registration" },
  ];

  const paymentMethodOptions = [
    { value: "cash", label: "Cash" },
    { value: "check", label: "Check" },
    { value: "online", label: "Online" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedClientId || !amount || !selectedTransactionType || !selectedPaymentMethod) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Find the client
      const client = clients.find(c => c.id === selectedClientId);
      if (!client) {
        toast.error("Client not found");
        return;
      }
      
      // Ensure transactionType is of the correct type
      const transactionType: TransactionType = selectedTransactionType as TransactionType;
      
      // Prepare transaction data with proper types
      const transactionData = {
        id: transactionId,
        recordNo: newRecordNo,
        clientId: selectedClientId,
        transactionType,
        amount: parseFloat(amount),
        details: description || `${transactionType} for ${client.companyName}`,
        paymentMethod: selectedPaymentMethod,
        agentName: agentName || "Not specified",
        date: date ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
      };
      
      // Add the transaction
      const newTransaction = await addTransaction(transactionData);
      
      if (newTransaction) {
        // Update client's due amount if needed
        let newDueAmount = client.dueAmount || 0;
        
        if (transactionType === "Payment") {
          newDueAmount -= parseFloat(amount);
        } else if (transactionType === "Renewal") {
          // For renewals, you might want to handle differently
          newDueAmount = parseFloat(amount); // Set as the new due amount
        }
        
        await updateTransactionForClient(client.id, { dueAmount: newDueAmount });
        
        // Clear form fields
        setAmount("");
        setDescription("");
        setDate(new Date());
        setSelectedClientId("");
        setSelectedProduct("");
        setSelectedPaymentMethod("");
        setAgentName("");
        
        // Generate new transaction ID and record number for the next transaction
        generateNewTransactionId();
        generateNewRecordNumber();
        
        toast.success(`${transactionType} recorded successfully`);
        
        // Notify parent component that a new transaction was added
        onTransactionAdded();
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <Label htmlFor="transactionId">Transaction ID</Label>
        <Input type="text" id="transactionId" value={transactionId} readOnly />
      </div>
      <div>
        <Label htmlFor="recordNo">Record No</Label>
        <Input type="text" id="recordNo" value={newRecordNo} readOnly />
      </div>
      <div>
        <Label htmlFor="clientId">Client</Label>
        <Select onValueChange={(value) => setSelectedClientId(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>{client.companyName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="product">Product</Label>
        <Input type="text" id="product" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="transactionType">Transaction Type</Label>
        <Select 
          onValueChange={(value) => setSelectedTransactionType(value as TransactionType)}
          defaultValue="Payment"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            {transactionTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select onValueChange={(value) => setSelectedPaymentMethod(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethodOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="agentName">Agent Name</Label>
        <Input
          type="text"
          id="agentName"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          placeholder="Enter agent name"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center" side="bottom">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                date > new Date()
              }
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" className="mt-6" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
};

export default TransactionForm;
