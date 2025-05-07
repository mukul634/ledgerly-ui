
import { useState, useMemo } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Mail, Phone, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Software products
const softwareProducts = [
  {
    id: "SW001",
    name: "Co-operative Software",
    description: "Complete financial management software for cooperatives",
    icon: "💼"
  },
  {
    id: "SW002",
    name: "Tradesoft",
    description: "Advanced trading and inventory management system",
    icon: "📊"
  },
  {
    id: "SW003",
    name: "Schoolpro",
    description: "Comprehensive school management system",
    icon: "🏫"
  },
  {
    id: "SW004",
    name: "Nepalgenetics",
    description: "Genetic research and data management software",
    icon: "🧬"
  }
];

// Cities where software is used
const cities = [
  "Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur", "Biratnagar", "Birgunj", "Dharan", "Butwal"
];

// Mock client data (this would typically come from a central store or context)
const mockClients = [
  {
    id: "CL001",
    companyName: "Tech Solutions Inc.",
    contactPerson: "John Doe",
    email: "john.doe@techsolutions.com",
    phoneNumber: "123-456-7890",
    district: "Kathmandu",
    location: "Kathmandu, Nepal",
    clientStatus: "Active",
    dueAmount: 1500.00,
    products: ["Co-operative Software", "Tradesoft"],
    softwareIds: ["SW001", "SW002"]
  },
  {
    id: "CL002",
    companyName: "Global Enterprises",
    contactPerson: "Emma Wilson",
    email: "emma.wilson@globalent.com",
    phoneNumber: "111-222-3333",
    district: "Pokhara",
    location: "Pokhara, Nepal",
    clientStatus: "Active",
    dueAmount: 1200.00,
    products: ["Schoolpro"],
    softwareIds: ["SW003"]
  },
  {
    id: "CL003", 
    companyName: "Innovative Systems",
    contactPerson: "Robert Green",
    email: "robert.green@innosys.com",
    phoneNumber: "777-888-9999",
    district: "Lalitpur",
    location: "Lalitpur, Nepal",
    clientStatus: "Inactive",
    dueAmount: 950.00,
    products: ["Co-operative Software", "Nepalgenetics"],
    softwareIds: ["SW001", "SW004"]
  },
  {
    id: "CL004",
    companyName: "Premier Solutions",
    contactPerson: "Alice Cooper",
    email: "alice.cooper@premier.com",
    phoneNumber: "444-333-2222",
    district: "Kathmandu",
    location: "Kathmandu, Nepal",
    clientStatus: "Active",
    dueAmount: 2200.00,
    products: ["Co-operative Software", "Tradesoft", "Schoolpro", "Nepalgenetics"],
    softwareIds: ["SW001", "SW002", "SW003", "SW004"]
  },
  {
    id: "CL005",
    companyName: "Future Tech Inc.",
    contactPerson: "Daniel Smith",
    email: "daniel.smith@futuretech.com",
    phoneNumber: "999-888-7777",
    district: "Biratnagar",
    location: "Biratnagar, Nepal",
    clientStatus: "Active",
    dueAmount: 850.00,
    products: ["Schoolpro", "Nepalgenetics"],
    softwareIds: ["SW003", "SW004"]
  },
  {
    id: "CL006",
    companyName: "Smart Consulting Group",
    contactPerson: "Jennifer Brown",
    email: "jennifer.brown@smartconsulting.com",
    phoneNumber: "555-666-7777",
    district: "Pokhara",
    location: "Pokhara, Nepal",
    clientStatus: "Inactive",
    dueAmount: 750.00,
    products: ["Co-operative Software"],
    softwareIds: ["SW001"]
  }
];

// Convert client data into connections data
const generateConnectionsFromClients = (clients) => {
  return clients.map(client => ({
    id: `CN${client.id.slice(2)}`,
    companyName: client.companyName,
    contactPerson: client.contactPerson,
    email: client.email,
    phoneNumber: client.phoneNumber,
    location: client.location,
    status: client.clientStatus,
    softwareUsage: client.products.join(", "),
    software: client.softwareIds
  }));
};

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  // Generate connections from client data
  const connections = useMemo(() => generateConnectionsFromClients(mockClients), []);

  // Filter connections based on software, city, and search term
  const filteredConnections = connections.filter((connection) => {
    // Filter by software if selected
    if (selectedSoftware && !connection.software.includes(selectedSoftware)) {
      return false;
    }
    
    // Filter by city if selected
    if (selectedCity && !connection.location.includes(selectedCity)) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && 
        !connection.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !connection.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Connections</h1>
          <p className="text-muted-foreground">Manage your client connections and contact information</p>
        </div>
        
        <Tabs defaultValue="software" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="software">View by Software</TabsTrigger>
            <TabsTrigger value="city">View by City</TabsTrigger>
          </TabsList>
          
          <TabsContent value="software" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {softwareProducts.map(software => (
                <Card 
                  key={software.id}
                  className={`cursor-pointer transition-all ${selectedSoftware === software.id ? 'border-primary ring-1 ring-primary' : ''}`}
                  onClick={() => setSelectedSoftware(selectedSoftware === software.id ? null : software.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="text-4xl">{software.icon}</div>
                      <h3 className="font-semibold text-lg">{software.name}</h3>
                      <p className="text-sm text-muted-foreground">{software.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between border-t p-4">
                    <p className="text-sm text-muted-foreground">
                      {connections.filter(conn => conn.software.includes(software.id)).length} users
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSoftware(software.id);
                      }}
                    >
                      View All
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="city" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {cities.map(city => (
                <Button
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedCity(selectedCity === city ? null : city)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {city}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
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
          
          {(selectedSoftware || selectedCity) && (
            <Button variant="outline" onClick={() => {
              setSelectedSoftware(null);
              setSelectedCity(null);
            }}>
              Clear Filters
            </Button>
          )}
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
