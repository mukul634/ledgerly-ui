
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface AddClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClient: (client: any) => void;
}

const AddClientForm = ({ open, onOpenChange, onAddClient }: AddClientFormProps) => {
  const [formData, setFormData] = useState({
    companyName: "",
    district: "",
    phoneNo: "",
    fullName: "",
    address: "",
    mobileNo: "",
    renewalDate: "",
    installDate: "",
    agentName: "",
    panNo: "",
    dueAmount: 0,
    representative: "",
    remarks: "",
    productsUsed: "",
    clientStatus: "Active",
    startDate: "",
    closeDate: "",
    smsRate: 0.5
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "dueAmount" || name === "smsRate" 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a unique client ID (in a real app, this would be done server-side)
    const newClient = {
      ...formData,
      id: `CL${Math.floor(100 + Math.random() * 900)}`, // Simple ID generation for demo purposes
    };
    
    onAddClient(newClient);
    toast.success("Client added successfully!");
    onOpenChange(false); // Close dialog after successful submission
    
    // Reset form
    setFormData({
      companyName: "",
      district: "",
      phoneNo: "",
      fullName: "",
      address: "",
      mobileNo: "",
      renewalDate: "",
      installDate: "",
      agentName: "",
      panNo: "",
      dueAmount: 0,
      representative: "",
      remarks: "",
      productsUsed: "",
      clientStatus: "Active",
      startDate: "",
      closeDate: "",
      smsRate: 0.5
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name*</Label>
              <Input 
                id="companyName" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input 
                id="district" 
                name="district" 
                value={formData.district} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Contact Person*</Label>
              <Input 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNo">Phone Number*</Label>
              <Input 
                id="phoneNo" 
                name="phoneNo" 
                value={formData.phoneNo} 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobileNo">Mobile Number</Label>
              <Input 
                id="mobileNo" 
                name="mobileNo" 
                value={formData.mobileNo} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="agentName">Agent Name</Label>
              <Input 
                id="agentName" 
                name="agentName" 
                value={formData.agentName} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="panNo">PAN No</Label>
              <Input 
                id="panNo" 
                name="panNo" 
                value={formData.panNo} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="representative">Representative</Label>
              <Input 
                id="representative" 
                name="representative" 
                value={formData.representative} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="installDate">Install Date</Label>
              <Input 
                id="installDate" 
                name="installDate" 
                type="date" 
                value={formData.installDate} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="renewalDate">Renewal Date</Label>
              <Input 
                id="renewalDate" 
                name="renewalDate" 
                type="date" 
                value={formData.renewalDate} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate" 
                name="startDate" 
                type="date" 
                value={formData.startDate} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueAmount">Due Amount</Label>
              <Input 
                id="dueAmount" 
                name="dueAmount" 
                type="number" 
                step="0.01" 
                value={formData.dueAmount} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smsRate">SMS Rate</Label>
              <Input 
                id="smsRate" 
                name="smsRate" 
                type="number" 
                step="0.01" 
                value={formData.smsRate} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientStatus">Client Status</Label>
              <select 
                id="clientStatus" 
                name="clientStatus" 
                value={formData.clientStatus} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="productsUsed">Products Used</Label>
              <Input 
                id="productsUsed" 
                name="productsUsed" 
                value={formData.productsUsed} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea 
              id="address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea 
              id="remarks" 
              name="remarks" 
              value={formData.remarks} 
              onChange={handleChange} 
              rows={2}
            />
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Client</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientForm;
