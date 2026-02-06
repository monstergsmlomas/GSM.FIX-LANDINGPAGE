import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Shield, ClipboardList, BarChart3, Users, Package } from "lucide-react";
import { Link } from "react-router-dom";

const FreeTrialSection = () => {
  const features = [
    {
      icon: ClipboardList,
      title: "Gestión de Órdenes",
      description: "Control completo de reparaciones con checklist de recepción"
    },
    {
      icon: Package,
      title: "Control de Stock",
      description: "Inventario en tiempo real con alertas de stock bajo"
    },
    {
      icon: Users,
      title: "CRM de Clientes",
      description: "Base de datos completa con historial de equipos"
    },
    {
      icon: BarChart3,
      title: "Reportes Financieros",
      description: "Métricas de ingresos, gastos y balance en tiempo real"
    },
  ];

  const trialBenefits = [
    "Acceso completo a todas las funciones",
    "Sin tarjeta de crédito requerida",
    "Soporte prioritario incluido",
    "Datos de prueba precargados",
    "Exportación de datos al finalizar",
    "Capacitación gratuita incluida",
  ];

  return (
    <section id="prueba-gratis" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500 font-medium">Sin compromiso</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Prueba GSM FIX{" "}
            <span className="text-green-500">
              7 días gratis
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experimenta todas las funcionalidades de nuestro sistema sin ningún costo.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left: Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Lo que incluye tu prueba gratuita
            </h3>
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border border-border"
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right: Trial Card */}
          <div>
            <Card className="bg-card border border-border">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-sm text-muted-foreground mb-2">Prueba gratuita</div>
                  <div className="text-5xl font-bold text-foreground mb-2">7 días</div>
                  <div className="text-muted-foreground">acceso completo</div>
                </div>

                <div className="space-y-3 mb-8">
                  {trialBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full h-auto py-6 text-lg font-semibold rounded-full border border-primary/50 bg-primary/20 text-primary-foreground shadow-[0_0_25px_-5px_hsl(var(--primary)/0.4)] hover:bg-primary/50 hover:border-primary hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.8)] hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
                  asChild
                >
                  <Link to="/register">
                    Comenzar Ahora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Sin tarjeta de crédito • Cancela cuando quieras
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;