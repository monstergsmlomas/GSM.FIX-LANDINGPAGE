import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Package,
  Users,
  BarChart3,
  Wallet,
  Settings,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesGrid = () => {
  const features = [
    {
      icon: ClipboardList,
      title: "Órdenes",
      description: "Crea, rastrea y administra todas las reparaciones con un flujo de trabajo intuitivo.",
      benefits: ["Seguimiento en tiempo real", "Checklist de recepción", "Historial completo"],
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      link: "/ordenes",
    },
    {
      icon: Users,
      title: "Clientes",
      description: "Base de datos completa con historial de reparaciones y comunicación centralizada.",
      benefits: ["Historial de equipos", "Datos de contacto", "Notas personalizadas"],
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      link: "/clientes",
    },
    {
      icon: Wallet,
      title: "Cobros",
      description: "Gestiona ventas, pagos y caja con múltiples métodos de pago y facturación.",
      benefits: ["Efectivo y tarjeta", "Recargos automáticos", "Historial de transacciones"],
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      link: "/finanzas",
    },
    {
      icon: Package,
      title: "Stock",
      description: "Control total de inventario con alertas de stock bajo y gestión de proveedores.",
      benefits: ["Alertas automáticas", "Categorías", "Costos y precios"],
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
      link: "/inventario",
    },
    {
      icon: BarChart3,
      title: "Reportes",
      description: "Análisis detallado de ingresos, gastos y rentabilidad con gráficos interactivos.",
      benefits: ["Métricas en tiempo real", "Exportar CSV", "Filtros por fecha"],
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
      link: "/finanzas",
    },
    {
      icon: Settings,
      title: "Configuración",
      description: "Personaliza el sistema según las necesidades de tu taller.",
      benefits: ["Usuarios y permisos", "Datos del negocio", "Preferencias"],
      iconBg: "bg-gray-500/20",
      iconColor: "text-gray-400",
      link: "/",
    },
  ];

  return (
    <section id="features" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-secondary text-foreground border-border">
            Funcionalidades
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Todo lo que necesitas para crecer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Herramientas poderosas diseñadas específicamente para talleres de reparación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${feature.iconBg} flex items-center justify-center`}>
                    <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1.5 mb-4">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;