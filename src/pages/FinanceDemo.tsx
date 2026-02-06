import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  PieChart,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, Legend } from 'recharts';

const monthlyData = [
  { month: 'Ago', ingresos: 480000, gastos: 280000, ganancia: 200000 },
  { month: 'Sep', ingresos: 520000, gastos: 310000, ganancia: 210000 },
  { month: 'Oct', ingresos: 610000, gastos: 340000, ganancia: 270000 },
  { month: 'Nov', ingresos: 580000, gastos: 320000, ganancia: 260000 },
  { month: 'Dic', ingresos: 720000, gastos: 380000, ganancia: 340000 },
  { month: 'Ene', ingresos: 650000, gastos: 350000, ganancia: 300000 },
];

const categoryData = [
  { name: 'Pantallas', value: 45, color: '#3b82f6' },
  { name: 'Baterías', value: 25, color: '#10b981' },
  { name: 'Conectores', value: 15, color: '#f59e0b' },
  { name: 'Otros', value: 15, color: '#6366f1' },
];

const expenseBreakdown = [
  { category: 'Repuestos', amount: 180000, percentage: 51 },
  { category: 'Salarios', amount: 100000, percentage: 29 },
  { category: 'Alquiler', amount: 45000, percentage: 13 },
  { category: 'Servicios', amount: 15000, percentage: 4 },
  { category: 'Marketing', amount: 10000, percentage: 3 },
];

const recentTransactions = [
  { id: 'TRX-001', description: 'Reparación iPhone 14 Pro - Pantalla', type: 'income', amount: 85000, date: '2024-01-15', method: 'Efectivo' },
  { id: 'TRX-002', description: 'Compra repuestos - TechParts SA', type: 'expense', amount: 45000, date: '2024-01-15', method: 'Transferencia' },
  { id: 'TRX-003', description: 'Reparación Samsung S23 - Batería', type: 'income', amount: 25000, date: '2024-01-15', method: 'Tarjeta' },
  { id: 'TRX-004', description: 'Servicio de internet', type: 'expense', amount: 8500, date: '2024-01-14', method: 'Débito Auto' },
  { id: 'TRX-005', description: 'Reparación Xiaomi - Carga', type: 'income', amount: 15000, date: '2024-01-14', method: 'Efectivo' },
  { id: 'TRX-006', description: 'Reparación iPhone 13 - Cámara', type: 'income', amount: 45000, date: '2024-01-14', method: 'Tarjeta' },
  { id: 'TRX-007', description: 'Salarios - Enero', type: 'expense', amount: 100000, date: '2024-01-10', method: 'Transferencia' },
];

const FinanceDemo = () => {
  const [period, setPeriod] = useState("month");

  const currentStats = {
    ingresos: 650000,
    gastos: 350000,
    ganancia: 300000,
    caja: 485000,
    ingresosChange: 12.5,
    gastosChange: 8.2,
    gananciaChange: 15.8,
  };

  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}K`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reportes Financieros</h1>
              <p className="text-sm text-muted-foreground">Análisis completo de tu negocio</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40 bg-card border-border">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mes</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Este Año</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ingresos</p>
                  <p className="text-3xl font-bold text-foreground">${(currentStats.ingresos / 1000).toFixed(0)}K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-accent" />
                    <span className="text-sm text-accent">+{currentStats.ingresosChange}%</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Gastos</p>
                  <p className="text-3xl font-bold text-foreground">${(currentStats.gastos / 1000).toFixed(0)}K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowDownRight className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive">+{currentStats.gastosChange}%</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <TrendingDown className="w-7 h-7 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ganancia Neta</p>
                  <p className="text-3xl font-bold text-accent">${(currentStats.ganancia / 1000).toFixed(0)}K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-accent" />
                    <span className="text-sm text-accent">+{currentStats.gananciaChange}%</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Caja Actual</p>
                  <p className="text-3xl font-bold text-foreground">${(currentStats.caja / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-muted-foreground mt-1">Disponible</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                  <Wallet className="w-7 h-7 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Evolución Mensual
              </CardTitle>
              <CardDescription>Comparativa de ingresos, gastos y ganancias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={formatCurrency} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Bar dataKey="ingresos" name="Ingresos" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="gastos" name="Gastos" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ganancia" name="Ganancia" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Ingresos por Categoría
              </CardTitle>
              <CardDescription>Distribución de reparaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, '']}
                    />
                    <Legend />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
            <TabsTrigger value="expenses">Desglose Gastos</TabsTrigger>
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Últimas Transacciones</CardTitle>
                <CardDescription>Movimientos recientes de ingresos y gastos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">ID</TableHead>
                      <TableHead className="text-muted-foreground">Descripción</TableHead>
                      <TableHead className="text-muted-foreground">Fecha</TableHead>
                      <TableHead className="text-muted-foreground">Método</TableHead>
                      <TableHead className="text-muted-foreground text-right">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((tx) => (
                      <TableRow key={tx.id} className="border-border">
                        <TableCell className="font-mono text-primary">{tx.id}</TableCell>
                        <TableCell className="text-foreground">{tx.description}</TableCell>
                        <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tx.method}</Badge>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${tx.type === 'income' ? 'text-accent' : 'text-destructive'}`}>
                          {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Desglose de Gastos</CardTitle>
                <CardDescription>Análisis detallado de gastos por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseBreakdown.map((expense, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-foreground font-medium">{expense.category}</span>
                        <span className="text-muted-foreground">${expense.amount.toLocaleString()} ({expense.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${expense.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Tendencia de Ganancias</CardTitle>
                <CardDescription>Evolución de la ganancia neta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={formatCurrency} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ganancia" 
                        name="Ganancia"
                        stroke="hsl(var(--accent))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FinanceDemo;
