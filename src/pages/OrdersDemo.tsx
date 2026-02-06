import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Wrench,
  Phone,
  User,
  Calendar,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  client: string;
  phone: string;
  device: string;
  issue: string;
  status: "pending" | "in_progress" | "completed" | "delivered";
  priority: "low" | "medium" | "high";
  technician: string;
  createdAt: string;
  estimatedDelivery: string;
  price: number;
}

const initialOrders: Order[] = [
  { id: "ORD-001", client: "Juan Pérez", phone: "11-2345-6789", device: "iPhone 14 Pro", issue: "Pantalla rota", status: "in_progress", priority: "high", technician: "Carlos M.", createdAt: "2024-01-15", estimatedDelivery: "2024-01-17", price: 45000 },
  { id: "ORD-002", client: "María García", phone: "11-3456-7890", device: "Samsung S23", issue: "Batería agotada", status: "pending", priority: "medium", technician: "Ana L.", createdAt: "2024-01-15", estimatedDelivery: "2024-01-18", price: 25000 },
  { id: "ORD-003", client: "Pedro López", phone: "11-4567-8901", device: "Xiaomi 13", issue: "No carga", status: "completed", priority: "low", technician: "Carlos M.", createdAt: "2024-01-14", estimatedDelivery: "2024-01-16", price: 15000 },
  { id: "ORD-004", client: "Laura Martínez", phone: "11-5678-9012", device: "iPhone 13", issue: "Cámara dañada", status: "in_progress", priority: "high", technician: "Roberto S.", createdAt: "2024-01-14", estimatedDelivery: "2024-01-17", price: 35000 },
  { id: "ORD-005", client: "Diego Fernández", phone: "11-6789-0123", device: "Motorola Edge", issue: "Pantalla táctil", status: "delivered", priority: "medium", technician: "Ana L.", createdAt: "2024-01-13", estimatedDelivery: "2024-01-15", price: 28000 },
];

const OrdersDemo = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const [newOrder, setNewOrder] = useState({
    client: "",
    phone: "",
    device: "",
    issue: "",
    priority: "medium" as "low" | "medium" | "high",
    technician: "",
    estimatedDelivery: "",
    price: 0,
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: "Pendiente", variant: "secondary" as const, icon: Clock },
      in_progress: { label: "En Proceso", variant: "default" as const, icon: Wrench },
      completed: { label: "Completado", variant: "outline" as const, icon: CheckCircle2 },
      delivered: { label: "Entregado", variant: "secondary" as const, icon: CheckCircle2 },
    };
    const { label, variant, icon: Icon } = config[status as keyof typeof config];
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const config = {
      low: { label: "Baja", className: "bg-muted text-muted-foreground" },
      medium: { label: "Media", className: "bg-amber-500/20 text-amber-400" },
      high: { label: "Alta", className: "bg-destructive/20 text-destructive" },
    };
    const { label, className } = config[priority as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const handleCreateOrder = () => {
    const newId = `ORD-${String(orders.length + 1).padStart(3, '0')}`;
    const order: Order = {
      id: newId,
      ...newOrder,
      status: "pending",
      createdAt: new Date().toISOString().split('T')[0],
    };
    setOrders([order, ...orders]);
    setIsCreateOpen(false);
    setNewOrder({ client: "", phone: "", device: "", issue: "", priority: "medium", technician: "", estimatedDelivery: "", price: 0 });
    toast.success("Orden creada exitosamente", { description: `La orden ${newId} ha sido registrada.` });
  };

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success("Estado actualizado", { description: `La orden ${orderId} ahora está ${newStatus === "pending" ? "pendiente" : newStatus === "in_progress" ? "en proceso" : newStatus === "completed" ? "completada" : "entregada"}.` });
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
    toast.success("Orden eliminada", { description: `La orden ${orderId} ha sido eliminada.` });
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    inProgress: orders.filter(o => o.status === "in_progress").length,
    completed: orders.filter(o => o.status === "completed" || o.status === "delivered").length,
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
            <h1 className="text-2xl font-bold text-foreground">Gestión de Órdenes</h1>
            <p className="text-sm text-muted-foreground">Administra todas las reparaciones de tu taller</p>
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
                  <p className="text-sm text-muted-foreground">Total Órdenes</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En Proceso</p>
                  <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completadas</p>
                  <p className="text-2xl font-bold text-accent">{stats.completed}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
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
              placeholder="Buscar por cliente, dispositivo o ID..." 
              className="pl-10 bg-card border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 bg-card border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="in_progress">En Proceso</SelectItem>
              <SelectItem value="completed">Completado</SelectItem>
              <SelectItem value="delivered">Entregado</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="primary-gradient border-0">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Orden
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-card border-border">
              <DialogHeader>
                <DialogTitle>Crear Nueva Orden</DialogTitle>
                <DialogDescription>Completa los datos de la nueva reparación</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cliente</Label>
                    <Input 
                      placeholder="Nombre del cliente" 
                      value={newOrder.client}
                      onChange={(e) => setNewOrder({...newOrder, client: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input 
                      placeholder="11-XXXX-XXXX" 
                      value={newOrder.phone}
                      onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Dispositivo</Label>
                  <Input 
                    placeholder="Ej: iPhone 14 Pro" 
                    value={newOrder.device}
                    onChange={(e) => setNewOrder({...newOrder, device: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Problema</Label>
                  <Textarea 
                    placeholder="Describe el problema..." 
                    value={newOrder.issue}
                    onChange={(e) => setNewOrder({...newOrder, issue: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prioridad</Label>
                    <Select value={newOrder.priority} onValueChange={(v) => setNewOrder({...newOrder, priority: v as any})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baja</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Técnico</Label>
                    <Select value={newOrder.technician} onValueChange={(v) => setNewOrder({...newOrder, technician: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Asignar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Carlos M.">Carlos M.</SelectItem>
                        <SelectItem value="Ana L.">Ana L.</SelectItem>
                        <SelectItem value="Roberto S.">Roberto S.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Entrega Estimada</Label>
                    <Input 
                      type="date" 
                      value={newOrder.estimatedDelivery}
                      onChange={(e) => setNewOrder({...newOrder, estimatedDelivery: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Precio (ARS)</Label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      value={newOrder.price || ""}
                      onChange={(e) => setNewOrder({...newOrder, price: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
                <Button onClick={handleCreateOrder} className="primary-gradient border-0">Crear Orden</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Orders Table */}
        <Card className="bg-card border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">Cliente</TableHead>
                <TableHead className="text-muted-foreground">Dispositivo</TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
                <TableHead className="text-muted-foreground">Prioridad</TableHead>
                <TableHead className="text-muted-foreground">Técnico</TableHead>
                <TableHead className="text-muted-foreground text-right">Precio</TableHead>
                <TableHead className="text-muted-foreground text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-border hover:bg-muted/50">
                  <TableCell className="font-mono text-primary">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{order.client}</p>
                      <p className="text-xs text-muted-foreground">{order.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-foreground">{order.device}</p>
                      <p className="text-xs text-muted-foreground">{order.issue}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell className="text-muted-foreground">{order.technician}</TableCell>
                  <TableCell className="text-right font-medium text-accent">
                    ${order.price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => { setSelectedOrder(order); setIsViewOpen(true); }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Select value={order.status} onValueChange={(v) => handleStatusChange(order.id, v as Order["status"])}>
                        <SelectTrigger className="w-8 h-8 p-0 border-0">
                          <Edit className="w-4 h-4" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="in_progress">En Proceso</SelectItem>
                          <SelectItem value="completed">Completado</SelectItem>
                          <SelectItem value="delivered">Entregado</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteOrder(order.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* View Order Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-lg bg-card border-border">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <span className="text-primary font-mono">{selectedOrder.id}</span>
                    {getStatusBadge(selectedOrder.status)}
                  </DialogTitle>
                  <DialogDescription>Detalles completos de la orden</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><User className="w-3 h-3" /> Cliente</p>
                      <p className="font-medium text-foreground">{selectedOrder.client}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> Teléfono</p>
                      <p className="font-medium text-foreground">{selectedOrder.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Dispositivo</p>
                    <p className="font-medium text-foreground">{selectedOrder.device}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Problema</p>
                    <p className="text-foreground">{selectedOrder.issue}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Prioridad</p>
                      {getPriorityBadge(selectedOrder.priority)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Técnico</p>
                      <p className="font-medium text-foreground">{selectedOrder.technician}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Precio</p>
                      <p className="font-bold text-accent">${selectedOrder.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Fecha Creación</p>
                      <p className="text-foreground">{selectedOrder.createdAt}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Entrega Estimada</p>
                      <p className="text-foreground">{selectedOrder.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default OrdersDemo;
