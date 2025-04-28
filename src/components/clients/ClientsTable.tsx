import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download, Trash2, ChevronDown, PlusCircle, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import ClientDetail from "./ClientDetail";
import AddClientForm from "./AddClientForm";
import { format } from 'date-fns';

interface ClientsTableProps {
  clients: any[];
  setClients: (clients: any[]) => void;
}

const ClientsTable = ({ clients, setClients }: ClientsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  const filteredClients = clients.filter((client) => 
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
    setClients(clients.filter(client => client.id !== clientToDelete));
    toast.success(`Client ${clientToDelete} has been deleted`);
    setIsDeleteDialogOpen(false);
    setClientToDelete(null);
    
    if (selectedClient && selectedClient.id === clientToDelete) {
      setSelectedClient(null);
    }
  };
  
  const handleAddClient = (newClient: any) => {
    setClients([...clients, newClient]);
    toast.success("Client added successfully");
    setIsAddClientOpen(false);
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
          <Button 
            onClick={() => setIsAddClientOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
          
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
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow 
                  key={client.id} 
                  onClick={() => handleRowClick(client)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.companyName}</TableCell>
                  <TableCell>{client.district}</TableCell>
                  <TableCell>{client.phoneNo}</TableCell>
                  <TableCell>{format(new Date(client.renewalDate), 'PPP')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      client.clientStatus === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {client.clientStatus}
                    </span>
                  </TableCell>
                  <TableCell>₹{client.dueAmount.toFixed(2)}</TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle download
                        toast.info("Downloading client statement...");
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No clients found. Try adjusting your search or add a new client.
                </TableCell>
              </TableRow>
            )}
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
      
      {/* Add Client Form */}
      <AddClientForm 
        open={isAddClientOpen} 
        onOpenChange={setIsAddClientOpen} 
        onAddClient={handleAddClient} 
      />
    </div>
  );
};

export default ClientsTable;
