import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Users,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  History,
  Star,
  Send,
  Smartphone,
  Calendar,
  DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  registeredAt: string;
  lastVisit: string;
  devices: { name: string; lastRepair: string; }[];
  notes: string;
}

interface Message {
  id: string;
  clientId: string;
  text: string;
  timestamp: string;
  type: "sent" | "received";
}

const initialClients: Client[] = [
  { 
    id: "1", 
    name: "Juan Pérez", 
    email: "juan.perez@email.com", 
    phone: "11-2345-6789", 
    address: "Av. Corrientes 1234, CABA",
    totalOrders: 8,
    totalSpent: 156000,
    loyaltyPoints: 1560,
    registeredAt: "2023-05-15",
    lastVisit: "2024-01-15",
    devices: [
      { name: "iPhone 14 Pro", lastRepair: "2024-01-15" },
      { name: "iPad Air", lastRepair: "2023-11-20" }
    ],
    notes: "Cliente frecuente, prefiere entregas a domicilio"
  },
  { 
    id: "2", 
    name: "María García", 
    email: "maria.garcia@email.com", 
    phone: "11-3456-7890", 
    address: "Calle Florida 567, CABA",
    totalOrders: 3,
    totalSpent: 48000,
    loyaltyPoints: 480,
    registeredAt: "2023-09-22",
    lastVisit: "2024-01-15",
    devices: [
      { name: "Samsung S23", lastRepair: "2024-01-15" }
    ],
    notes: ""
  },
  { 
    id: "3", 
    name: "Pedro López", 
    email: "pedro.lopez@email.com", 
    phone: "11-4567-8901", 
    address: "Av. Santa Fe 890, CABA",
    totalOrders: 12,
    totalSpent: 235000,
    loyaltyPoints: 2350,
    registeredAt: "2022-11-10",
    lastVisit: "2024-01-14",
    devices: [
      { name: "Xiaomi 13", lastRepair: "2024-01-14" },
      { name: "MacBook Pro", lastRepair: "2023-10-05" },
      { name: "AirPods Pro", lastRepair: "2023-08-15" }
    ],
    notes: "Cliente VIP, ofrecer descuentos especiales"
  },
  { 
    id: "4", 
    name: "Laura Martínez", 
    email: "laura.martinez@email.com", 
    phone: "11-5678-9012", 
    address: "Calle Lavalle 234, CABA",
    totalOrders: 5,
    totalSpent: 89000,
    loyaltyPoints: 890,
    registeredAt: "2023-03-08",
    lastVisit: "2024-01-14",
    devices: [
      { name: "iPhone 13", lastRepair: "2024-01-14" }
    ],
    notes: ""
  },
  { 
    id: "5", 
    name: "Diego Fernández", 
    email: "diego.fernandez@email.com", 
    phone: "11-6789-0123", 
    address: "Av. Callao 456, CABA",
    totalOrders: 2,
    totalSpent: 32000,
    loyaltyPoints: 320,
    registeredAt: "2023-12-01",
    lastVisit: "2024-01-13",
    devices: [
      { name: "Motorola Edge", lastRepair: "2024-01-13" }
    ],
    notes: "Nuevo cliente"
  },
];

const initialMessages: Message[] = [
  { id: "1", clientId: "1", text: "Hola Juan! Tu iPhone 14 Pro está listo para retirar.", timestamp: "2024-01-15 14:30", type: "sent" },
  { id: "2", clientId: "1", text: "Perfecto, paso en una hora. Gracias!", timestamp: "2024-01-15 14:35", type: "received" },
  { id: "3", clientId: "2", text: "María, necesitamos confirmar el presupuesto para tu Samsung. ¿Procedemos?", timestamp: "2024-01-15 10:00", type: "sent" },
];

const ClientsDemo = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const getClientMessages = (clientId: string) => 
    messages.filter(m => m.clientId === clientId);

  const getLoyaltyTier = (points: number) => {
    if (points >= 2000) return { tier: "VIP", color: "bg-amber-500" };
    if (points >= 1000) return { tier: "Gold", color: "bg-yellow-500" };
    if (points >= 500) return { tier: "Silver", color: "bg-slate-400" };
    return { tier: "Bronze", color: "bg-orange-600" };
  };

  const handleCreateClient = () => {
    const client: Client = {
      id: String(clients.length + 1),
      ...newClient,
      totalOrders: 0,
      totalSpent: 0,
      loyaltyPoints: 0,
      registeredAt: new Date().toISOString().split('T')[0],
      lastVisit: new Date().toISOString().split('T')[0],
      devices: [],
    };
    setClients([client, ...clients]);
    setIsCreateOpen(false);
    setNewClient({ name: "", email: "", phone: "", address: "", notes: "" });
    toast.success("Cliente registrado", { description: `${client.name} ha sido añadido.` });
  };

  const handleSendMessage = () => {
    if (!selectedClient || !newMessage.trim()) return;
    const message: Message = {
      id: String(messages.length + 1),
      clientId: selectedClient.id,
      text: newMessage,
      timestamp: new Date().toLocaleString('es-AR'),
      type: "sent",
    };
    setMessages([...messages, message]);
    setNewMessage("");
    toast.success("Mensaje enviado", { description: `Mensaje enviado a ${selectedClient.name}` });
  };

  const stats = {
    totalClients: clients.length,
    vipClients: clients.filter(c => c.loyaltyPoints >= 2000).length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: clients.reduce((sum, c) => sum + c.totalSpent, 0) / clients.reduce((sum, c) => sum + c.totalOrders, 0) || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">CRM de Clientes</h1>
            <p className="text-sm text-muted-foreground">Gestiona tu base de clientes y comunicaciones</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clientes</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalClients}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Clientes VIP</p>
                  <p className="text-2xl font-bold text-amber-400">{stats.vipClients}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                  <p className="text-2xl font-bold text-accent">${(stats.totalRevenue / 1000).toFixed(0)}K</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ticket Promedio</p>
                  <p className="text-2xl font-bold text-foreground">${Math.round(stats.avgOrderValue).toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <History className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nombre, email o teléfono..." 
              className="pl-10 bg-card border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="primary-gradient border-0">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-card border-border">
              <DialogHeader>
                <DialogTitle>Registrar Cliente</DialogTitle>
                <DialogDescription>Añade un nuevo cliente a tu base de datos</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nombre completo</Label>
                  <Input 
                    placeholder="Nombre y apellido" 
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      placeholder="email@ejemplo.com" 
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input 
                      placeholder="11-XXXX-XXXX" 
                      value={newClient.phone}
                      onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Dirección</Label>
                  <Input 
                    placeholder="Calle, número, ciudad" 
                    value={newClient.address}
                    onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Notas</Label>
                  <Textarea 
                    placeholder="Observaciones sobre el cliente..." 
                    value={newClient.notes}
                    onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
                <Button onClick={handleCreateClient} className="primary-gradient border-0">Registrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => {
            const loyalty = getLoyaltyTier(client.loyaltyPoints);
            
            return (
              <Card 
                key={client.id} 
                className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => { setSelectedClient(client); setIsDetailOpen(true); }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">{client.name}</h3>
                        <Badge className={`${loyalty.color} text-white text-xs`}>{loyalty.tier}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Phone className="w-3 h-3" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{client.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{client.totalOrders}</p>
                      <p className="text-xs text-muted-foreground">Órdenes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-accent">${(client.totalSpent / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-muted-foreground">Gastado</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{client.loyaltyPoints}</p>
                      <p className="text-xs text-muted-foreground">Puntos</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); }}>
                      <Phone className="w-4 h-4 mr-1" />
                      Llamar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); }}>
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Mensaje
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Client Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
            {selectedClient && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-14 h-14">
                      <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                        {selectedClient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="flex items-center gap-2">
                        {selectedClient.name}
                        <Badge className={`${getLoyaltyTier(selectedClient.loyaltyPoints).color} text-white`}>
                          {getLoyaltyTier(selectedClient.loyaltyPoints).tier}
                        </Badge>
                      </DialogTitle>
                      <DialogDescription>Cliente desde {selectedClient.registeredAt}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="info" className="mt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Información</TabsTrigger>
                    <TabsTrigger value="devices">Dispositivos</TabsTrigger>
                    <TabsTrigger value="messages">Mensajes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> Email</p>
                        <p className="text-foreground">{selectedClient.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> Teléfono</p>
                        <p className="text-foreground">{selectedClient.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> Dirección</p>
                      <p className="text-foreground">{selectedClient.address}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{selectedClient.totalOrders}</p>
                        <p className="text-xs text-muted-foreground">Total Órdenes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">${selectedClient.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total Gastado</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{selectedClient.loyaltyPoints}</p>
                        <p className="text-xs text-muted-foreground">Puntos Fidelidad</p>
                      </div>
                    </div>
                    {selectedClient.notes && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Notas</p>
                        <p className="text-foreground p-3 bg-muted/50 rounded-lg">{selectedClient.notes}</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="devices" className="mt-4">
                    <div className="space-y-3">
                      {selectedClient.devices.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No hay dispositivos registrados</p>
                      ) : (
                        selectedClient.devices.map((device, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Smartphone className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{device.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Última reparación: {device.lastRepair}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Ver historial</Button>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="messages" className="mt-4">
                    <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                      {getClientMessages(selectedClient.id).length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No hay mensajes</p>
                      ) : (
                        getClientMessages(selectedClient.id).map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`max-w-[80%] p-3 rounded-lg ${msg.type === "sent" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                              <p className="text-sm">{msg.text}</p>
                              <p className={`text-xs mt-1 ${msg.type === "sent" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                {msg.timestamp}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Escribe un mensaje..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} className="primary-gradient border-0">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ClientsDemo;
