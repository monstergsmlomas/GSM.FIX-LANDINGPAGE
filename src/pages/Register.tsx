import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock API call simulation
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Cuenta creada exitosamente");
            // Redirect to paywall or dashboard
            navigate("/paywall");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md">
                <div className="mb-6">
                    <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al inicio
                    </Link>
                </div>

                <Card className="border-border bg-card/60 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-4">
                            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-1.5 text-sm font-medium border-0 shadow-lg animate-pulse">
                                7 Días de Prueba Gratis
                            </Badge>
                        </div>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Crea tu cuenta GSM Fix
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                            Únete a cientos de talleres que ya gestionan su negocio de forma profesional.
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleRegister}>
                        <CardContent className="space-y-4 pt-4">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Nombre</Label>
                                        <Input id="firstName" placeholder="Juan" required className="bg-background/50 border-input/50 focus:bg-background transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Apellido</Label>
                                        <Input id="lastName" placeholder="Pérez" required className="bg-background/50 border-input/50 focus:bg-background transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">Nombre del Taller</Label>
                                    <Input id="company" placeholder="Ej: TecnoFix" required className="bg-background/50 border-input/50 focus:bg-background transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Profesional</Label>
                                    <Input id="email" type="email" placeholder="hola@tecnofix.com" required className="bg-background/50 border-input/50 focus:bg-background transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password" type="password" required className="bg-background/50 border-input/50 focus:bg-background transition-all" />
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Acceso completo a todas las funciones premium</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Sin tarjeta de crédito requerida para empezar</span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4 pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-900/20 transform transition-all hover:scale-[1.02]"
                            >
                                {isLoading ? "Creando cuenta..." : "Comenzar Prueba Gratuita"}
                            </Button>

                            <Separator className="bg-border/50" />

                            <p className="text-center text-sm text-muted-foreground">
                                ¿Ya tienes una cuenta?{" "}
                                <Link to="/login" className="text-primary hover:underline font-medium">
                                    Iniciar Sesión
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Register;
