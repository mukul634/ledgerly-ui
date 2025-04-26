import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useNumberInput } from "@/hooks/useNumberInput";
import { convertToBikramSambat } from "@/utils/dateConverter";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const AVAILABLE_PRODUCTS = [
  "Co-operative Software",
  "Tradesoft",
  "Schoolpro",
  "Nepalgenetics"
];

interface AddClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClient: (client: any) => void;
}

const formatDateDisplay = (date: string) => {
  if (!date) return '';
  return convertToBikramSambat(date);
};

const RenewalDateButton = ({ selectedDate, onSelect }: { selectedDate: string, onSelect: (date: string) => void }) => {
  const options = [
    { label: "6 Months", months: 6 },
    { label: "1 Year", months: 12 },
    { label: "2 Years", months: 24 }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          {selectedDate ? (
            formatDateDisplay(selectedDate)
          ) : (
            <span>Pick a renewal date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Quick Select</DropdownMenuLabel>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.months}
            onClick={() => {
              const date = new Date();
              date.setMonth(date.getMonth() + option.months);
              onSelect(format(date, 'yyyy-MM-dd'));
            }}
          >
            Add {option.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Custom Date
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate ? new Date(selectedDate) : undefined}
              onSelect={(date) => {
                if (date) {
                  onSelect(format(date, 'yyyy-MM-dd'));
                }
              }}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AddClientForm = ({ open, onOpenChange, onAddClient }: AddClientFormProps) => {
  const { handleNumberInput } = useNumberInput();
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
    remarks: "",
    productsUsed: "",
    clientStatus: "Active",
    startDate: "",
    closeDate: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if ((name === 'phoneNo' || name === 'mobileNo' || name === 'panNo') && 
        e.target instanceof HTMLInputElement && 
        !handleNumberInput(e as React.ChangeEvent<HTMLInputElement>)) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: name === "dueAmount" ? 
        Math.floor(parseFloat(value || "0") / 100) * 100 : // Round to nearest 100
        value
    }));
  };

  const handleProductChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      productsUsed: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.renewalDate) {
      toast.error("Please select a renewal date");
      return;
    }

    if (formData.dueAmount <= 0) {
      toast.error("Please enter a valid due amount");
      return;
    }
    
    const newClient = {
      ...formData,
      id: `CL${Math.floor(100 + Math.random() * 900)}`,
    };
    
    onAddClient(newClient);
    toast.success("Client added successfully!");
    onOpenChange(false);
    
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
      remarks: "",
      productsUsed: "",
      clientStatus: "Active",
      startDate: "",
      closeDate: ""
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
                pattern="\d*"
                inputMode="numeric"
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
                pattern="\d*"
                inputMode="numeric"
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
              <Label htmlFor="panNo">PAN Number</Label>
              <Input 
                id="panNo" 
                name="panNo" 
                value={formData.panNo} 
                onChange={handleChange}
                pattern="\d*"
                inputMode="numeric"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="installDate">Install Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !formData.installDate && "text-muted-foreground"
                    )}
                  >
                    {formData.installDate ? (
                      formatDateDisplay(formData.installDate)
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.installDate ? new Date(formData.installDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setFormData(prev => ({
                          ...prev,
                          installDate: format(date, 'yyyy-MM-dd')
                        }));
                      }
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              {formData.installDate && (
                <p className="text-sm text-muted-foreground">
                  {formatDateDisplay(formData.installDate)}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="renewalDate">Renewal Date*</Label>
              <RenewalDateButton
                selectedDate={formData.renewalDate}
                onSelect={(date) => {
                  setFormData(prev => ({
                    ...prev,
                    renewalDate: date
                  }));
                }}
              />
              {formData.renewalDate && (
                <p className="text-sm text-muted-foreground">
                  {formatDateDisplay(formData.renewalDate)}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    {formData.startDate ? (
                      formatDateDisplay(formData.startDate)
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate ? new Date(formData.startDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setFormData(prev => ({
                          ...prev,
                          startDate: format(date, 'yyyy-MM-dd')
                        }));
                      }
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              {formData.startDate && (
                <p className="text-sm text-muted-foreground">
                  {formatDateDisplay(formData.startDate)}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueAmount">Due Amount*</Label>
              <Input 
                id="dueAmount" 
                name="dueAmount" 
                type="number" 
                step="100"
                min="0"
                value={formData.dueAmount} 
                onChange={handleChange}
                required 
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
              <Select onValueChange={handleProductChange} value={formData.productsUsed}>
                <SelectTrigger id="productsUsed">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_PRODUCTS.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
