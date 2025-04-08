
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ClientsTable from "@/components/clients/ClientsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Index = () => {
  const [showingClientDetails, setShowingClientDetails] = useState(false);
  const [showingOverdueDetails, setShowingOverdueDetails] = useState(false);
  const [showingRenewalDetails, setShowingRenewalDetails] = useState(false);

  // Mock data for details
  const overdueClients = [
    { id: "CL001", name: "Tech Solutions Inc.", amount: 1250.00, dueDate: "2023-09-15" },
    { id: "CL003", name: "Innovative Systems", amount: 750.00, dueDate: "2023-09-10" },
    { id: "CL005", name: "Future Tech Inc.", amount: 1000.00, dueDate: "2023-08-30" },
  ];

  const pendingRenewals = [
    { id: "CL001", name: "Tech Solutions Inc.", renewalDate: "2023-09-25", amount: 1500.00 },
    { id: "CL003", name: "Innovative Systems", renewalDate: "2023-09-20", amount: 950.00 },
    { id: "CL005", name: "Future Tech Inc.", renewalDate: "2023-09-22", amount: 850.00 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage your client information and financial details</p>
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
              <div className="text-2xl font-bold">254</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
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
              <div className="text-2xl font-bold">Rs. 12,578.35</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
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
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Due within 30 days</p>
            </CardContent>
          </Card>
        </div>
        
        <ClientsTable />
      </div>

      {/* Clients Detail Dialog */}
      <Dialog open={showingClientDetails} onOpenChange={setShowingClientDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Client Statistics</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">214</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Pending Clients</p>
                <p className="text-2xl font-bold">32</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Inactive Clients</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Client acquisition in last 12 months</p>
            <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Client growth chart placeholder</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Overdue Amount Detail Dialog */}
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
                  <TableCell className="font-bold">Rs. 3,000.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pending Renewals Detail Dialog */}
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
                    <TableCell>{renewal.name}</TableCell>
                    <TableCell>{renewal.renewalDate}</TableCell>
                    <TableCell>Rs. {renewal.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold">Total Renewals</TableCell>
                  <TableCell className="font-bold">Rs. 3,300.00</TableCell>
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
