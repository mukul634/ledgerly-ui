
import { useEffect, useState, useMemo } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Bell, RefreshCw, AlertCircle } from "lucide-react";
import { format, addDays } from "date-fns";

const Renewal = () => {
  const [clients, setClients] = useState([]);
  
  // Load clients from localStorage on component mount
  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);
  
  // Generate renewals from actual client data
  const generateRenewals = (clients) => {
    if (!clients.length) return [];
    
    const agents = ["Sarah Johnson", "David Clark", "Linda Martinez", "Mark Wilson", "Jessica Adams"];
    const today = new Date();
    
    return clients.map((client, index) => {
      const renewalDate = new Date(client.renewalDate);
      const daysLeft = Math.floor((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const agentIndex = index % agents.length;
      
      return {
        id: `RN${String(index + 1).padStart(3, '0')}`,
        clientName: client.companyName,
        clientId: client.id,
        renewalDate: client.renewalDate,
        renewalAmount: client.dueAmount || 0,
        agentName: agents[agentIndex],
        daysLeft: daysLeft
      };
    });
  };
  
  // Calculate renewals based on real client data
  const renewals = useMemo(() => generateRenewals(clients), [clients]);
  
  const urgentRenewals = renewals.filter(renewal => renewal.daysLeft <= 7);
  const upcomingRenewals = renewals.filter(renewal => renewal.daysLeft > 7 && renewal.daysLeft <= 30);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Renewals</h1>
          <p className="text-muted-foreground">Manage client renewals and send timely reminders</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                  Urgent Renewals
                </CardTitle>
                <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-sm font-medium">
                  {urgentRenewals.length}
                </span>
              </div>
              <CardDescription>Due within 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              {urgentRenewals.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No urgent renewals</p>
              ) : (
                <div className="space-y-4">
                  {urgentRenewals.map(renewal => (
                    <div 
                      key={renewal.id} 
                      className="p-4 rounded-md border border-red-100 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{renewal.clientName}</h4>
                          <p className="text-sm text-muted-foreground">Client ID: {renewal.clientId}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Renewal Date</p>
                          <p>{format(new Date(renewal.renewalDate), 'PP')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p>Rs.{renewal.renewalAmount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Days Left</p>
                          <p className="font-bold text-red-600 dark:text-red-400">{renewal.daysLeft}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 dark:border-yellow-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center">
                  <RefreshCw className="mr-2 h-5 w-5 text-yellow-500" />
                  Upcoming Renewals
                </CardTitle>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium">
                  {upcomingRenewals.length}
                </span>
              </div>
              <CardDescription>Due within 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingRenewals.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No upcoming renewals</p>
              ) : (
                <div className="space-y-4">
                  {upcomingRenewals.map(renewal => (
                    <div 
                      key={renewal.id} 
                      className="p-4 rounded-md border border-yellow-100 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{renewal.clientName}</h4>
                          <p className="text-sm text-muted-foreground">Client ID: {renewal.clientId}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Renewal Date</p>
                          <p>{format(new Date(renewal.renewalDate), 'PP')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p>Rs.{renewal.renewalAmount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Days Left</p>
                          <p className="font-medium text-yellow-600 dark:text-yellow-400">{renewal.daysLeft}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Renewals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renewals.length > 0 ? (
                  renewals.map((renewal) => (
                    <TableRow 
                      key={renewal.id} 
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>{renewal.clientName}</TableCell>
                      <TableCell>{renewal.clientId}</TableCell>
                      <TableCell>{format(new Date(renewal.renewalDate), 'PP')}</TableCell>
                      <TableCell>Rs.{renewal.renewalAmount.toFixed(2)}</TableCell>
                      <TableCell>{renewal.agentName}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          renewal.daysLeft <= 7 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : renewal.daysLeft <= 30
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {renewal.daysLeft <= 7 
                            ? 'Urgent' 
                            : renewal.daysLeft <= 30 
                              ? 'Upcoming'
                              : 'On Track'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" className="flex items-center">
                          <Bell className="mr-2 h-4 w-4" />
                          Send Reminder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <p>No clients with renewal dates found.</p>
                      <p className="text-sm text-muted-foreground mt-2">Add clients with renewal dates to see them here.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Renewal;
