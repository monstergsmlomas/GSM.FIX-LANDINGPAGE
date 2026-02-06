import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Barcode,
  Edit,
  Trash2,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  stock: number;
  minStock: number;
  maxStock: number;
  price: number;
  cost: number;
  supplier: string;
  lastRestock: string;
}

const initialInventory: InventoryItem[] = [
  { id: "1", name: "Pantalla iPhone 14 Pro", category: "Pantallas", sku: "PAN-IP14P-001", stock: 5, minStock: 3, maxStock: 20, price: 85000, cost: 60000, supplier: "TechParts SA", lastRestock: "2024-01-10" },
  { id: "2", name: "Batería iPhone 13", category: "Baterías", sku: "BAT-IP13-001", stock: 12, minStock: 5, maxStock: 30, price: 18000, cost: 12000, supplier: "PowerCell Inc", lastRestock: "2024-01-12" },
  { id: "3", name: "Pantalla Samsung S23", category: "Pantallas", sku: "PAN-SS23-001", stock: 2, minStock: 3, maxStock: 15, price: 75000, cost: 55000, supplier: "TechParts SA", lastRestock: "2024-01-05" },
  { id: "4", name: "Conector de carga Type-C", category: "Conectores", sku: "CON-TC-001", stock: 45, minStock: 20, maxStock: 100, price: 3500, cost: 2000, supplier: "MicroParts Ltd", lastRestock: "2024-01-14" },
  { id: "5", name: "Batería Samsung S22", category: "Baterías", sku: "BAT-SS22-001", stock: 8, minStock: 5, maxStock: 25, price: 15000, cost: 10000, supplier: "PowerCell Inc", lastRestock: "2024-01-11" },
  { id: "6", name: "Cámara trasera iPhone 14", category: "Cámaras", sku: "CAM-IP14-001", stock: 3, minStock: 2, maxStock: 10, price: 45000, cost: 32000, supplier: "TechParts SA", lastRestock: "2024-01-08" },
  { id: "7", name: "Flex de encendido Xiaomi", category: "Flexes", sku: "FLX-XI-001", stock: 15, minStock: 10, maxStock: 50, price: 2500, cost: 1500, supplier: "MicroParts Ltd", lastRestock: "2024-01-13" },
  { id: "8", name: "Tapa trasera iPhone 13", category: "Tapas", sku: "TAP-IP13-001", stock: 1, minStock: 3, maxStock: 15, price: 12000, cost: 8000, supplier: "CaseParts Co", lastRestock: "2024-01-02" },
];

const InventoryDemo = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [restockAmount, setRestockAmount] = useState(0);
  
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    sku: "",
    stock: 0,
    minStock: 0,
    maxStock: 0,
    price: 0,
    cost: 0,
    supplier: "",
  });

  const categories = [...new Set(inventory.map(i => i.category))];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.stock / item.maxStock) * 100;
    if (item.stock <= item.minStock) return { status: "critical", color: "bg-destructive", text: "Stock Crítico" };
    if (percentage <= 30) return { status: "low", color: "bg-amber-500", text: "Stock Bajo" };
    return { status: "ok", color: "bg-accent", text: "En Stock" };
  };

  const handleCreateItem = () => {
    const item: InventoryItem = {
      id: String(inventory.length + 1),
      ...newItem,
      lastRestock: new Date().toISOString().split('T')[0],
    };
    setInventory([...inventory, item]);
    setIsCreateOpen(false);
    setNewItem({ name: "", category: "", sku: "", stock: 0, minStock: 0, maxStock: 0, price: 0, cost: 0, supplier: "" });
    toast.success("Producto agregado", { description: `${item.name} ha sido añadido al inventario.` });
  };

  const handleRestock = () => {
    if (!selectedItem) return;
    const newStock = Math.min(selectedItem.stock + restockAmount, selectedItem.maxStock);
    setInventory(inventory.map(i => i.id === selectedItem.id ? { ...i, stock: newStock, lastRestock: new Date().toISOString().split('T')[0] } : i));
    setIsRestockOpen(false);
    setRestockAmount(0);
    toast.success("Stock actualizado", { description: `${selectedItem.name} ahora tiene ${newStock} unidades.` });
  };

  const handleDeleteItem = (id: string) => {
    const item = inventory.find(i => i.id === id);
    setInventory(inventory.filter(i => i.id !== id));
    toast.success("Producto eliminado", { description: `${item?.name} ha sido eliminado del inventario.` });
  };

  const stats = {
    totalItems: inventory.length,
    totalValue: inventory.reduce((sum, i) => sum + (i.stock * i.cost), 0),
    lowStock: inventory.filter(i => i.stock <= i.minStock).length,
    categories: categories.length,
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
            <h1 className="text-2xl font-bold text-foreground">Inventario en Tiempo Real</h1>
            <p className="text-sm text-muted-foreground">Control total de stock y repuestos</p>
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
                  <p className="text-sm text-muted-foreground">Total Productos</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalItems}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold text-accent">${(stats.totalValue / 1000).toFixed(0)}K</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stock Bajo</p>
                  <p className="text-2xl font-bold text-destructive">{stats.lowStock}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categorías</p>
                  <p className="text-2xl font-bold text-foreground">{stats.categories}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Barcode className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {stats.lowStock > 0 && (
          <Card className="mb-6 border-destructive/50 bg-destructive/5">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-medium text-foreground">Alerta de Stock Bajo</p>
                <p className="text-sm text-muted-foreground">
                  {stats.lowStock} producto(s) necesitan reposición urgente
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nombre o SKU..." 
              className="pl-10 bg-card border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48 bg-card border-border">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="primary-gradient border-0">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-card border-border">
              <DialogHeader>
                <DialogTitle>Agregar Producto</DialogTitle>
                <DialogDescription>Añade un nuevo producto al inventario</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input 
                    placeholder="Nombre del producto" 
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Select value={newItem.category} onValueChange={(v) => setNewItem({...newItem, category: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                        <SelectItem value="Otros">Otros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input 
                      placeholder="XXX-XXX-001" 
                      value={newItem.sku}
                      onChange={(e) => setNewItem({...newItem, sku: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Stock Inicial</Label>
                    <Input 
                      type="number" 
                      value={newItem.stock || ""}
                      onChange={(e) => setNewItem({...newItem, stock: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock Mín</Label>
                    <Input 
                      type="number" 
                      value={newItem.minStock || ""}
                      onChange={(e) => setNewItem({...newItem, minStock: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock Máx</Label>
                    <Input 
                      type="number" 
                      value={newItem.maxStock || ""}
                      onChange={(e) => setNewItem({...newItem, maxStock: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Precio Venta (ARS)</Label>
                    <Input 
                      type="number" 
                      value={newItem.price || ""}
                      onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Costo (ARS)</Label>
                    <Input 
                      type="number" 
                      value={newItem.cost || ""}
                      onChange={(e) => setNewItem({...newItem, cost: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Proveedor</Label>
                  <Input 
                    placeholder="Nombre del proveedor" 
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
                <Button onClick={handleCreateItem} className="primary-gradient border-0">Agregar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInventory.map((item) => {
            const stockStatus = getStockStatus(item);
            const stockPercentage = (item.stock / item.maxStock) * 100;
            const margin = ((item.price - item.cost) / item.price * 100).toFixed(0);
            
            return (
              <Card key={item.id} className={`bg-card border-border ${stockStatus.status === "critical" ? "border-destructive/50" : ""}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base font-semibold text-foreground">{item.name}</CardTitle>
                      <CardDescription className="font-mono text-xs">{item.sku}</CardDescription>
                    </div>
                    <Badge className={stockStatus.status === "critical" ? "bg-destructive" : stockStatus.status === "low" ? "bg-amber-500" : "bg-accent"}>
                      {stockStatus.text}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stock</span>
                      <span className="font-medium text-foreground">{item.stock} / {item.maxStock} unidades</span>
                    </div>
                    <Progress value={stockPercentage} className={`h-2 ${stockStatus.status === "critical" ? "[&>div]:bg-destructive" : stockStatus.status === "low" ? "[&>div]:bg-amber-500" : "[&>div]:bg-accent"}`} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Precio</p>
                      <p className="font-medium text-accent">${item.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Margen</p>
                      <p className="font-medium text-accent flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {margin}%
                      </p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-muted-foreground">Proveedor</p>
                    <p className="text-foreground">{item.supplier}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => { setSelectedItem(item); setIsRestockOpen(true); }}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reponer
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Restock Dialog */}
        <Dialog open={isRestockOpen} onOpenChange={setIsRestockOpen}>
          <DialogContent className="max-w-sm bg-card border-border">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>Reponer Stock</DialogTitle>
                  <DialogDescription>{selectedItem.name}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Stock actual</p>
                    <p className="text-3xl font-bold text-foreground">{selectedItem.stock}</p>
                    <p className="text-xs text-muted-foreground">Máximo: {selectedItem.maxStock}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Cantidad a reponer</Label>
                    <Input 
                      type="number" 
                      value={restockAmount || ""}
                      onChange={(e) => setRestockAmount(Number(e.target.value))}
                      max={selectedItem.maxStock - selectedItem.stock}
                    />
                    <p className="text-xs text-muted-foreground">
                      Nuevo stock: {Math.min(selectedItem.stock + restockAmount, selectedItem.maxStock)} unidades
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsRestockOpen(false)}>Cancelar</Button>
                  <Button onClick={handleRestock} className="primary-gradient border-0">Confirmar</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default InventoryDemo;
