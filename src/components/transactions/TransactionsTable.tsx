
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transaction {
  id: string;
  recordNo: string;
  clientId: string;
  transactionType: 'Payment' | 'Renewal' | 'New Registration';
  amount: number;
  paymentMethod: string;
  date: string;
  [key: string]: any;
}

interface Client {
  id: string;
  companyName: string;
  [key: string]: any;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  clients: Client[];
}

const TransactionsTable = ({ transactions, clients }: TransactionsTableProps) => {
  return (
    <div className="relative overflow-x-auto mt-6">
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Record No</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const client = clients.find(c => c.id === transaction.clientId);
            return (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.recordNo}</TableCell>
                <TableCell>{client?.companyName || "N/A"}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{transaction.transactionType}</Badge>
                </TableCell>
                <TableCell>₹{transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell>{format(new Date(transaction.date), "PPP")}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
