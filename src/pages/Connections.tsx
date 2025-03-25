
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Mail, Phone, Building } from "lucide-react";

// Mock connections data
const mockConnections = [
  {
    id: "CN001",
    companyName: "Tech Solutions Inc.",
    contactPerson: "John Doe",
    email: "john.doe@techsolutions.com",
    phoneNumber: "123-456-7890",
    location: "New York, NY",
    status: "Active",
    softwareUsage: "Financial Suite, Tax Manager"
  },
  {
    id: "CN002",
    companyName: "Global Enterprises",
    contactPerson: "Emma Wilson",
    email: "emma.wilson@globalent.com",
    phoneNumber: "111-222-3333",
    location: "Los Angeles, CA",
    status: "Active",
    softwareUsage: "Ledger Pro"
  },
  {
    id: "CN003",
    companyName: "Innovative Systems",
    contactPerson: "Robert Green",
    email: "robert.green@innosys.com",
    phoneNumber: "777-888-9999",
    location: "Chicago, IL",
    status: "Inactive",
    softwareUsage: "Financial Suite, Invoice Manager"
  },
  {
    id: "CN004",
    companyName: "Premier Solutions",
    contactPerson: "Alice Cooper",
    email: "alice.cooper@premier.com",
    phoneNumber: "444-333-2222",
    location: "Houston, TX",
    status: "Active",
    softwareUsage: "Complete Suite"
  },
  {
    id: "CN005",
    companyName: "Future Tech Inc.",
    contactPerson: "Daniel Smith",
    email: "daniel.smith@futuretech.com",
    phoneNumber: "999-888-7777",
    location: "Boston, MA",
    status: "Active",
    softwareUsage: "Tax Manager, Invoice System"
  },
  {
    id: "CN006",
    companyName: "Smart Consulting Group",
    contactPerson: "Jennifer Brown",
    email: "jennifer.brown@smartconsulting.com",
    phoneNumber: "555-666-7777",
    location: "Seattle, WA",
    status: "Inactive",
    softwareUsage: "Financial Reporting Tool"
  }
];

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredConnections = mockConnections
    .filter((connection) => 
      (connection.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (locationFilter === "" || connection.location.includes(locationFilter)) &&
      (statusFilter === "" || connection.status === statusFilter)
    );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Connections</h1>
          <p className="text-muted-foreground">Manage your client connections and contact information</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search connections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              className="px-3 py-2 rounded-md border border-input bg-background"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Houston">Houston</option>
              <option value="Boston">Boston</option>
              <option value="Seattle">Seattle</option>
            </select>
            
            <select 
              className="px-3 py-2 rounded-md border border-input bg-background"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((connection) => (
            <Card key={connection.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{connection.companyName}</h3>
                    <p className="text-sm text-muted-foreground">{connection.contactPerson}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    connection.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {connection.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{connection.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{connection.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{connection.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-muted-foreground mt-1" />
                    <span className="text-sm">{connection.softwareUsage}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 py-4 bg-muted/50">
                <div className="flex justify-between w-full">
                  <Button variant="ghost" size="sm">View Profile</Button>
                  <Button variant="outline" size="sm">Contact</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredConnections.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No connections found matching your search criteria.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Connections;
