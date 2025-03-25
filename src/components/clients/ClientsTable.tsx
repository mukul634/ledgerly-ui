
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download, Trash2, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import ClientDetail from "./ClientDetail";

// Mock data for clients
const mockClients = [
  {
    id: "CL001",
    companyName: "Tech Solutions Inc.",
    district: "Central",
    phoneNo: "123-456-7890",
    fullName: "John Doe",
    address: "123 Main St, City",
    mobileNo: "987-654-3210",
    renewalDate: "2023-10-15",
    installDate: "2022-10-15",
    agentName: "Sarah Johnson",
    panNo: "ABCPD1234E",
    dueAmount: 1250.00,
    representative: "Michael Brown",
    remarks: "Premium client",
    productsUsed: "Financial Suite, Tax Manager",
    clientStatus: "Active",
    startDate: "2022-10-01",
    closeDate: "",
    smsRate: 0.50
  },
  {
    id: "CL002",
    companyName: "Global Enterprises",
    district: "North",
    phoneNo: "111-222-3333",
    fullName: "Emma Wilson",
    address: "456 Oak St, Town",
    mobileNo: "444-555-6666",
    renewalDate: "2023-11-20",
    installDate: "2022-11-20",
    agentName: "David Clark",
    panNo: "XYZPD5678F",
    dueAmount: 0.00,
    representative: "Jennifer White",
    remarks: "New client",
    productsUsed: "Ledger Pro",
    clientStatus: "Active",
    startDate: "2022-11-01",
    closeDate: "",
    smsRate: 0.45
  },
  {
    id: "CL003",
    companyName: "Innovative Systems",
    district: "East",
    phoneNo: "777-888-9999",
    fullName: "Robert Green",
    address: "789 Pine St, Village",
    mobileNo: "123-987-6543",
    renewalDate: "2023-09-05",
    installDate: "2022-09-05",
    agentName: "Linda Martinez",
    panNo: "LMNPD9101G",
    dueAmount: 750.00,
    representative: "Thomas Lee",
    remarks: "Requires follow-up",
    productsUsed: "Financial Suite, Invoice Manager",
    clientStatus: "Pending",
    startDate: "2022-09-01",
    closeDate: "",
    smsRate: 0.55
  },
  {
    id: "CL004",
    companyName: "Premier Solutions",
    district: "West",
    phoneNo: "444-333-2222",
    fullName: "Alice Cooper",
    address: "101 Maple St, County",
    mobileNo: "555-666-7777",
    renewalDate: "2023-12-10",
    installDate: "2022-12-10",
    agentName: "Mark Wilson",
    panNo: "PQRPD1213H",
    dueAmount: 500.00,
    representative: "Patricia Brown",
    remarks: "High-value client",
    productsUsed: "Complete Suite",
    clientStatus: "Active",
    startDate: "2022-12-01",
    closeDate: "",
    smsRate: 0.60
  },
  {
    id: "CL005",
    companyName: "Future Tech Inc.",
    district: "South",
    phoneNo: "999-888-7777",
    fullName: "Daniel Smith",
    address: "202 Cedar St, Metro",
    mobileNo: "111-222-3333",
    renewalDate: "2023-08-25",
    installDate: "2022-08-25",
    agentName: "Jessica Adams",
    panNo: "STUVD1415I",
    dueAmount: 1000.00,
    representative: "Richard Taylor",
    remarks: "Technical support priority",
    productsUsed: "Tax Manager, Invoice System",
    clientStatus: "Active",
    startDate: "2022-08-01",
    closeDate: "",
    smsRate: 0.50
  }
];

const ClientsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);

  const filteredClients = mockClients.filter((client) => 
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (client: any) => {
    setSelectedClient(client);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClientToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real application, handle the actual deletion here
    console.log("Deleting client:", clientToDelete);
    setIsDeleteDialogOpen(false);
    setClientToDelete(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client ID</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Phone No</TableHead>
              <TableHead>Renewal Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow 
                key={client.id} 
                onClick={() => handleRowClick(client)}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.companyName}</TableCell>
                <TableCell>{client.district}</TableCell>
                <TableCell>{client.phoneNo}</TableCell>
                <TableCell>{client.renewalDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    client.clientStatus === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {client.clientStatus}
                  </span>
                </TableCell>
                <TableCell>${client.dueAmount.toFixed(2)}</TableCell>
                <TableCell className="space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => handleDelete(client.id, e)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Client Detail Dialog */}
      {selectedClient && (
        <Dialog open={Boolean(selectedClient)} onOpenChange={(open) => !open && setSelectedClient(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Client Details</DialogTitle>
            </DialogHeader>
            <ClientDetail client={selectedClient} />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this client? This action cannot be undone.</p>
          </div>
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsTable;
