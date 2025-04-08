
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, AlertTriangle } from "lucide-react";

interface ClientDetailProps {
  client: any;
}

const ClientDetail = ({ client }: ClientDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Company Name</p>
                <p className="font-medium">{client.companyName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Client ID</p>
                <p className="font-medium">{client.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{client.address}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">District</p>
                <p className="font-medium">{client.district}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Phone No</p>
                <p className="font-medium">{client.phoneNo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Mobile No</p>
                <p className="font-medium">{client.mobileNo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">PAN No</p>
                <p className="font-medium">{client.panNo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{client.clientStatus}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Financial Overview</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Due Amount</p>
                <p className="text-xl font-bold">₹{client.dueAmount.toFixed(2)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Renewal Date</p>
                <p className="font-medium">{client.renewalDate}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">SMS Rate</p>
                <p className="font-medium">₹{client.smsRate.toFixed(2)}</p>
              </div>

              {client.dueAmount > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-md flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm">Has outstanding dues</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Contact Person</p>
              <p className="font-medium">{client.fullName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Representative</p>
              <p className="font-medium">{client.representative}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Agent Name</p>
              <p className="font-medium">{client.agentName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Products Used</p>
              <p className="font-medium">{client.productsUsed}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Install Date</p>
              <p className="font-medium">{client.installDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">{client.startDate}</p>
            </div>
            <div className="md:col-span-3 space-y-1">
              <p className="text-sm text-muted-foreground">Remarks</p>
              <p className="font-medium">{client.remarks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Statement
        </Button>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default ClientDetail;
