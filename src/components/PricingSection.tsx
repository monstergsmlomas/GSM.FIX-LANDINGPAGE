import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { usePricing, BillingPeriod } from "@/context/PricingContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingSection = () => {
  const { plans, billingPeriod, setBillingPeriod } = usePricing();

  const handlePeriodChange = (value: string) => {
    setBillingPeriod(value as BillingPeriod);
  };

  const getPriceDisplay = (plan: typeof plans[0]) => {
    return plan.prices[billingPeriod];
  };

  const getOriginalPriceDisplay = (plan: typeof plans[0]) => {
    return plan.originalPrices?.[billingPeriod];
  };

  const getPeriodLabel = () => {
    switch (billingPeriod) {
      case 'monthly': return '/mes';
      case 'semester': return '/semestre';
      case 'annual': return '/año';
      default: return '';
    }
  };

  return (
    <section id="pricing" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-secondary text-foreground border-border">
            Precios Simples
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Elige el plan ideal para tu taller
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Sin costos ocultos. Cancela cuando quieras. Prueba gratis por 7 días.
          </p>

          <div className="relative inline-flex group mt-4">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-blue-500/30 to-purple-600/30 rounded-xl blur opacity-20 transition duration-500"></div>
            <Tabs defaultValue="monthly" className="relative w-[500px] mx-auto" onValueChange={handlePeriodChange}>
              <TabsList className="grid w-full grid-cols-3 bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-1.5 h-auto rounded-xl shadow-lg">
                <TabsTrigger
                  value="monthly"
                  className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:font-semibold py-3 transition-all duration-300 hover:scale-105 hover:bg-purple-600/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] hover:z-10 hover:text-white"
                >
                  Mensual
                </TabsTrigger>
                <TabsTrigger
                  value="semester"
                  className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:font-semibold py-3 transition-all duration-300 hover:scale-105 hover:bg-purple-600/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] hover:z-10 hover:text-white"
                >
                  Semestral
                </TabsTrigger>
                <TabsTrigger
                  value="annual"
                  className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:font-semibold py-3 transition-all duration-300 hover:scale-105 hover:bg-purple-600/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] hover:z-10 hover:text-white"
                >
                  Anual
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto items-stretch py-10">
          {plans.map((plan) => {
            const isEnterprise = plan.id === 'enterprise';
            const shadowColor = isEnterprise ? "rgba(139,92,246,0.7)" : "rgba(34,197,94,0.7)";

            return (
              <Card
                key={plan.id}
                className={`w-full max-w-sm relative flex flex-col transition-all duration-300 ease-out rounded-xl hover:scale-105 hover:z-10 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] ${plan.id === 'prime'
                  ? 'bg-gradient-to-br from-card/80 via-card/90 to-emerald-500/10 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20'
                  : 'bg-card/50 border border-white/5 hover:border-purple-500/50'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 border-0 text-black px-4 py-1 shadow-md shadow-emerald-500/20 font-bold">
                      <Star className="w-3 h-3 mr-1 fill-black" />
                      Más Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4 pt-8">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="mt-2 min-h-[40px]">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-6 flex flex-col items-center justify-center min-h-[80px]">
                    {getOriginalPriceDisplay(plan) && (
                      <span className="text-lg text-muted-foreground line-through mb-1">
                        {getOriginalPriceDisplay(plan)}
                      </span>
                    )}
                    <div>
                      <span className="text-4xl font-extrabold text-foreground tracking-tight">
                        {getPriceDisplay(plan)}
                      </span>
                      <span className="text-muted-foreground ml-1 font-medium">{getPeriodLabel()}</span>
                    </div>
                  </div>

                  {billingPeriod === 'annual' && plan.savings && (
                    <Badge variant="secondary" className="mt-3 bg-green-500/10 text-green-600 border-0">
                      {plan.savings}
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-6">
                  <div className="flex-1">
                    <ul className="space-y-3 mb-8 mt-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <div className="flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-green-500" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className={`w-full text-base py-6 font-bold ${plan.popular ? 'bg-emerald-500 hover:bg-emerald-600 border-0 text-black shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40' : 'bg-primary/5 border border-primary/20 text-foreground hover:bg-primary/10 hover:border-primary/40 transition-all duration-300'}`}
                    size="lg"
                    asChild
                  >
                    {plan.cta === "Contactar Ventas" ? (
                      <a href="http://wa.me/+5491124949533" target="_blank" rel="noopener noreferrer">
                        {plan.cta}
                      </a>
                    ) : (
                      <Link to="/register">
                        {plan.cta}
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12 opacity-70">
          Precios en pesos argentinos. Incluye IVA. Facturación electrónica disponible.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;