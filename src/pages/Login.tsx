import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock API call simulation
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Bienvenido de nuevo");
            // Redirect to the actual application
            window.location.href = "https://gsm-proyect.vercel.app/";
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="mb-6">
                    <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al inicio
                    </Link>
                </div>

                <Card className="border-border bg-card/60 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                            Iniciar Sesión
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                            Ingresa a tu panel de control
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4 pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" type="email" placeholder="hola@tecnofix.com" required className="pl-9 bg-background/50 border-input/50 focus:bg-background transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="password" type="password" required className="pl-9 bg-background/50 border-input/50 focus:bg-background transition-all" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4 pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                            >
                                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            </Button>

                            <Separator className="bg-border/50" />

                            <p className="text-center text-sm text-muted-foreground">
                                ¿Aún no tienes cuenta?{" "}
                                <Link to="/register" className="text-primary hover:underline font-medium">
                                    Regístrate gratis
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
