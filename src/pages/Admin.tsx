import { useState } from "react";
import { usePricing, Plan } from "@/context/PricingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Admin = () => {
    const { plans, updatePlan, resetToDefaults } = usePricing();

    const handleSave = (id: string, field: string, value: any) => {
        // Basic deep merge for prices object
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            const plan = plans.find(p => p.id === id);
            if (plan) {
                updatePlan(id, {
                    [parent]: {
                        ...plan[parent as keyof Plan] as object,
                        [child]: value
                    }
                });
            }
        } else {
            updatePlan(id, { [field]: value });
        }
        toast.success("Cambios guardados");
    };

    const handleFeatureChange = (id: string, index: number, value: string) => {
        const plan = plans.find(p => p.id === id);
        if (!plan) return;
        const newFeatures = [...plan.features];
        newFeatures[index] = value;
        updatePlan(id, { features: newFeatures });
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Panel de Administración</h1>
                            <p className="text-muted-foreground">Gestiona los planes de precios y características</p>
                        </div>
                    </div>
                    <Button variant="destructive" onClick={() => {
                        if (confirm("¿Estás seguro de restablecer todos los valores por defecto?")) {
                            resetToDefaults();
                            toast.info("Valores restablecidos");
                        }
                    }}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Restaurar Valores
                    </Button>
                </div>

                <Tabs defaultValue={plans[0]?.id} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        {plans.map(plan => (
                            <TabsTrigger key={plan.id} value={plan.id}>{plan.name}</TabsTrigger>
                        ))}
                    </TabsList>

                    {plans.map((plan) => (
                        <TabsContent key={plan.id} value={plan.id}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Editar Plan: {plan.name}</CardTitle>
                                    <CardDescription>Modifica los detalles visibles en la landing page</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">

                                    {/* Basic Info */}
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Nombre del Plan</Label>
                                            <Input
                                                value={plan.name}
                                                onChange={(e) => updatePlan(plan.id, { name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Descripción Corta</Label>
                                            <Input
                                                value={plan.description}
                                                onChange={(e) => updatePlan(plan.id, { description: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Prices */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Precios</h3>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label>Precio Mensual</Label>
                                                <Input
                                                    value={plan.prices.monthly}
                                                    onChange={(e) => handleSave(plan.id, 'prices.monthly', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Precio Semestral</Label>
                                                <Input
                                                    value={plan.prices.semester}
                                                    onChange={(e) => handleSave(plan.id, 'prices.semester', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Precio Anual</Label>
                                                <Input
                                                    value={plan.prices.annual}
                                                    onChange={(e) => handleSave(plan.id, 'prices.annual', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mt-6">
                                        <h3 className="text-lg font-medium mb-4">Precios Originales (para tachar)</h3>
                                        <p className="text-sm text-muted-foreground mb-4">Deja en blanco si no quieres mostrar un precio anterior tachado.</p>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label>Original Mensual</Label>
                                                <Input
                                                    value={plan.originalPrices?.monthly || ''}
                                                    onChange={(e) => handleSave(plan.id, 'originalPrices.monthly', e.target.value)}
                                                    placeholder="$0"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Original Semestral</Label>
                                                <Input
                                                    value={plan.originalPrices?.semester || ''}
                                                    onChange={(e) => handleSave(plan.id, 'originalPrices.semester', e.target.value)}
                                                    placeholder="$0"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Original Anual</Label>
                                                <Input
                                                    value={plan.originalPrices?.annual || ''}
                                                    onChange={(e) => handleSave(plan.id, 'originalPrices.annual', e.target.value)}
                                                    placeholder="$0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Settings */}
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                checked={plan.popular}
                                                onCheckedChange={(checked) => updatePlan(plan.id, { popular: checked })}
                                                id="popular-mode"
                                            />
                                            <Label htmlFor="popular-mode">Destacar como Popular</Label>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Features */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Características (Features)</h3>
                                        <div className="space-y-3">
                                            {plan.features.map((feature, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <Input
                                                        value={feature}
                                                        onChange={(e) => handleFeatureChange(plan.id, index, e.target.value)}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            const newFeatures = plan.features.filter((_, i) => i !== index);
                                                            updatePlan(plan.id, { features: newFeatures });
                                                        }}
                                                    >
                                                        ×
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updatePlan(plan.id, { features: [...plan.features, "Nueva característica"] })}
                                            >
                                                + Agregar característica
                                            </Button>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div >
    );
};

export default Admin;
