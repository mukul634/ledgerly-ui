
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ClientsTable from "@/components/clients/ClientsTable";
import AddClientForm from "@/components/clients/AddClientForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, AlertCircle, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format, isBefore, addDays } from "date-fns";

const Index = () => {
  const [showingClientDetails, setShowingClientDetails] = useState(false);
  const [showingOverdueDetails, setShowingOverdueDetails] = useState(false);
  const [showingRenewalDetails, setShowingRenewalDetails] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [clients, setClients] = useState([
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
      remarks: "Premium client",
      productsUsed: "Co-operative Software",
      clientStatus: "Active",
      startDate: "2022-10-01",
      closeDate: "",
      smsRate: 0.50
    },
    { 
      id: "CL003", 
      companyName: "Innovative Systems", 
      district: "South",
      phoneNo: "555-123-4567",
      fullName: "Robert Smith",
      address: "456 Tech Ave, Town",
      mobileNo: "777-888-9999",
      renewalDate: "2023-09-10",
      installDate: "2022-09-10",
      agentName: "Linda Martinez",
      panNo: "XYSPZ9876T",
      dueAmount: 750.00,
      remarks: "Regular client",
      productsUsed: "Accounting Software",
      clientStatus: "Active",
      startDate: "2022-09-01",
      closeDate: "",
      smsRate: 0.45
    },
    { 
      id: "CL005", 
      companyName: "Future Tech Inc.", 
      district: "North",
      phoneNo: "222-333-4444",
      fullName: "Emma Johnson",
      address: "789 Innovation Rd, Village",
      mobileNo: "111-222-3333",
      renewalDate: "2023-08-30",
      installDate: "2022-08-30",
      agentName: "Mark Wilson",
      panNo: "LMNOP5432Q",
      dueAmount: 1000.00,
      remarks: "New client",
      productsUsed: "Inventory Management",
      clientStatus: "Pending",
      startDate: "2022-08-15",
      closeDate: "",
      smsRate: 0.55
    },
  ]);

  // Calculate total clients
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.clientStatus === "Active").length;
  const pendingClients = clients.filter(client => client.clientStatus === "Pending").length;
  
  // Calculate total overdue amount 
  const totalOverdueAmount = clients.reduce((sum, client) => sum + client.dueAmount, 0);
  
  // Calculate pending renewals
  const today = new Date();
  const thirtyDaysFromNow = addDays(today, 30);
  
  const pendingRenewals = clients.filter(client => {
    const renewalDate = new Date(client.renewalDate);
    return !isBefore(renewalDate, today) && isBefore(renewalDate, thirtyDaysFromNow);
  });
  
  // Generate real overdue clients data
  const overdueClients = clients.map(client => ({
    id: client.id,
    name: client.companyName,
    amount: client.dueAmount,
    dueDate: client.renewalDate
  }));

  const handleAddClient = (newClient: any) => {
    setClients(prev => [...prev, newClient]);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground">Manage your client information and financial details</p>
          </div>
          <Button 
            onClick={() => setIsAddClientOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users 
                className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" 
                onClick={() => setShowingClientDetails(true)}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClients}</div>
              <p className="text-xs text-muted-foreground">
                {activeClients} active, {pendingClients} pending
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
              <FileText 
                className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" 
                onClick={() => setShowingOverdueDetails(true)}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. {totalOverdueAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From {clients.filter(c => c.dueAmount > 0).length} clients</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Renewals</CardTitle>
              <AlertCircle 
                className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" 
                onClick={() => setShowingRenewalDetails(true)}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRenewals.length}</div>
              <p className="text-xs text-muted-foreground">Due within 30 days</p>
            </CardContent>
          </Card>
        </div>
        
        <ClientsTable clients={clients} setClients={setClients} />
      </div>

      <AddClientForm 
        open={isAddClientOpen} 
        onOpenChange={setIsAddClientOpen} 
        onAddClient={handleAddClient} 
      />

      <Dialog open={showingClientDetails} onOpenChange={setShowingClientDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Client Statistics</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">{activeClients}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Pending Clients</p>
                <p className="text-2xl font-bold">{pendingClients}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Inactive Clients</p>
                <p className="text-2xl font-bold">{clients.filter(c => c.clientStatus !== "Active" && c.clientStatus !== "Pending").length}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Client acquisition in last 12 months</p>
            <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Client growth chart placeholder</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showingOverdueDetails} onOpenChange={setShowingOverdueDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Overdue Payments</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overdueClients.map(client => (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.dueDate}</TableCell>
                    <TableCell>Rs. {client.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold">Total Overdue</TableCell>
                  <TableCell className="font-bold">Rs. {totalOverdueAmount.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showingRenewalDetails} onOpenChange={setShowingRenewalDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Pending Renewals</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRenewals.map(renewal => (
                  <TableRow key={renewal.id}>
                    <TableCell>{renewal.id}</TableCell>
                    <TableCell>{renewal.companyName}</TableCell>
                    <TableCell>{renewal.renewalDate}</TableCell>
                    <TableCell>Rs. {renewal.dueAmount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold">Total Renewals</TableCell>
                  <TableCell className="font-bold">Rs. {pendingRenewals.reduce((sum, client) => sum + client.dueAmount, 0).toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Index;

