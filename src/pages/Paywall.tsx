import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck, CreditCard, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type BillingPeriod = 'monthly' | 'semester' | 'annual';

const Paywall = () => {
    const [period, setPeriod] = useState<BillingPeriod>('monthly');

    const pricing = {
        monthly: { price: "$30.000", label: "/mes", total: "$30.000" },
        semester: { price: "$162.000", label: "/semestre", total: "$162.000" },
        annual: { price: "$300.000", label: "/año", total: "$300.000" }
    };

    const currentPricing = pricing[period];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-lg space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Configura tu Suscripción</h1>
                    <p className="text-muted-foreground">Estás a un paso de profesionalizar tu taller.</p>
                </div>

                <Card className="border-primary/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500" />

                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Resumen del Pedido</span>
                            <span className="text-sm font-normal bg-secondary px-3 py-1 rounded-full">Plan Prime</span>
                        </CardTitle>
                        <CardDescription>
                            Elige la duración de tu suscripción
                        </CardDescription>

                        <div className="mt-4">
                            <Tabs defaultValue="monthly" className="w-full" onValueChange={(val) => setPeriod(val as BillingPeriod)}>
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="monthly">Mensual</TabsTrigger>
                                    <TabsTrigger value="semester">Semestral</TabsTrigger>
                                    <TabsTrigger value="annual">Anual</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex justify-between items-end border-b border-border pb-4">
                            <span className="text-lg">Total a pagar</span>
                            <div className="text-right">
                                {period === 'monthly' && <div className="text-sm text-muted-foreground line-through">$40.000</div>}
                                <div className="text-3xl font-bold text-primary">
                                    {currentPricing.total}
                                    <span className="text-sm font-normal text-muted-foreground ml-1">{period === 'monthly' ? '/mes' : ''}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-secondary/30 p-4 rounded-lg space-y-3">
                            <div className="flex gap-2">
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm">7 días de prueba gratis incluidos</span>
                            </div>
                            <div className="flex gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm">Pagos procesados de forma segura por Mercado Pago</span>
                            </div>
                        </div>

                        {/* Placeholder for Mercado Pago Brick/Button */}
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-secondary/10">
                            <CreditCard className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                            <p className="text-sm text-muted-foreground mb-4">
                                Componente de pago seguro
                            </p>
                            <Button className="w-full bg-[#009EE3] hover:bg-[#008ED0] text-white font-bold h-12">
                                Pagar con Mercado Pago
                            </Button>
                        </div>

                    </CardContent>

                    <CardFooter className="flex-col gap-4">

                        <Button
                            variant="outline"
                            className="w-full h-12 border-primary/20 hover:bg-primary/5 text-primary gap-2"
                            onClick={() => window.location.href = "https://gsm-proyect.vercel.app/"}
                        >
                            Empezar prueba gratuita
                            <ExternalLink className="w-4 h-4" />
                        </Button>

                        <Link to="/" className="text-sm text-muted-foreground hover:underline">
                            Cancelar y volver
                        </Link>
                    </CardFooter>
                </Card>

                <p className="text-center text-xs text-muted-foreground max-w-sm mx-auto">
                    Al continuar, aceptas nuestros términos de servicio y política de privacidad. La suscripción se renovará automáticamente al menos que la canceles.
                </p>
            </div>
        </div>
    );
};

export default Paywall;
