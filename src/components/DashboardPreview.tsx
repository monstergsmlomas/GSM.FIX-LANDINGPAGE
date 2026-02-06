import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  ClipboardList,
  Search,
  CheckCircle,
  Plus
} from "lucide-react";

const DashboardPreview = () => {
  const financialCards = [
    {
      title: "Caja Actual (Efectivo)",
      value: "$285.500",
      icon: Wallet,
      borderClass: "stat-card-cyan",
      textColor: "text-cyan-400",
    },
    {
      title: "Ingresos (Hoy)",
      value: "$125.000",
      icon: TrendingUp,
      borderClass: "stat-card-green",
      textColor: "text-green-500",
    },
    {
      title: "Gastos (Hoy)",
      value: "$42.000",
      icon: TrendingDown,
      borderClass: "stat-card-red",
      textColor: "text-red-500",
    },
    {
      title: "Balance Neto (Hoy)",
      value: "$83.000",
      icon: DollarSign,
      borderClass: "stat-card-emerald",
      textColor: "text-emerald-500",
    },
  ];

  const statusCards = [
    { title: "Órdenes Activas", value: "12", icon: ClipboardList, iconBg: "bg-blue-500/20", iconColor: "text-blue-400" },
    { title: "En Diagnóstico", value: "5", icon: Search, iconBg: "bg-yellow-500/20", iconColor: "text-yellow-400" },
    { title: "Para Entregar", value: "7", icon: CheckCircle, iconBg: "bg-green-500/20", iconColor: "text-green-400" },
  ];

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-secondary text-foreground border-border">
            Vista Previa del Dashboard
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Todo tu negocio en una pantalla
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualiza el estado financiero y las órdenes activas en tiempo real
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl border border-border bg-card p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Panel de Control</h3>
                <p className="text-muted-foreground text-sm">Resumen financiero y operativo</p>
              </div>
              <Button className="primary-gradient border-0 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Orden
              </Button>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {financialCards.map((card, index) => (
                <Card key={index} className={`bg-card border border-border ${card.borderClass}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm ${card.textColor}`}>{card.title}</span>
                      <card.icon className={`w-4 h-4 ${card.textColor}`} />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{card.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Active Orders Section */}
            <Card className="border border-border bg-card mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Últimas Órdenes Activas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No hay órdenes activas recientes.
                </div>
              </CardContent>
            </Card>

            {/* Status Cards */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Estado Operativo</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statusCards.map((card, index) => (
                  <Card key={index} className="bg-card border border-border">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${card.iconBg} flex items-center justify-center`}>
                        <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{card.title}</p>
                        <p className="text-2xl font-bold text-foreground">{card.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;