import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Star, Mail, Lock, User, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Mock Data for Reviews (Shared with Login)
const reviews = [
    { name: "Carlos R.", stars: 5, text: "Desde que usamos GSM FIX, los tiempos de entrega bajaron un 40%. ¡Imprescindible para el taller!" },
    { name: "TecnoSolutions MDQ", stars: 5, text: "El control de stock y las órdenes de reparación son una maravilla. Muy intuitivo." },
    { name: "Julián M.", stars: 4, text: "Excelente soporte y actualizaciones constantes. Se nota que escuchan a los técnicos." },
    { name: "FixIt Lab", stars: 5, text: "La mejor inversión para organizar el caos del día a día. Súper recomendado." },
];

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [currentReview, setCurrentReview] = useState(0);

    // Auto-rotate reviews
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

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
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background">
            {/* LEFT SECTION (Visuals) */}
            <div className="w-full lg:w-1/2 relative overflow-hidden bg-zinc-950 flex flex-col justify-between p-12 hidden lg:flex">
                {/* Background Image - Fixed Visibility & Source */}
                <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
                    alt="Fondo electrónica"
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 transition-transform duration-10000 hover:scale-110"
                />

                {/* Dark Overlays */}
                <div className="absolute inset-0 bg-zinc-950/60 bg-gradient-to-br from-purple-900/40 to-blue-900/40 mix-blend-multiply z-1"></div>

                {/* Diagonal Glow Divider (SVG) */}
                <div className="absolute top-0 right-0 h-full w-24 pointer-events-none z-20 translate-x-[1px]">
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="h-full w-full absolute right-0"
                        style={{ filter: "drop-shadow(-5px 0 15px rgba(168,85,247,0.5))" }}
                    >
                        <path d="M100 0 L0 0 L100 100 Z" fill="hsl(var(--background))" className="visible lg:hidden" />
                        <path d="M100 0 L30 100 L100 100 Z" fill="hsl(var(--background))" />
                        <line x1="30" y1="100" x2="100" y2="0" stroke="rgba(168,85,247,0.8)" strokeWidth="0.5" />
                    </svg>
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-2xl px-12 flex flex-col h-full justify-between py-16">
                    {/* Top Content */}
                    <div className="space-y-8 mt-12">
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold tracking-widest uppercase bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                GSM FIX
                            </h2>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-xl">
                            Únete a la <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                                Revolución Técnica
                            </span>
                        </h1>
                        <p className="text-lg text-gray-200 max-w-lg leading-relaxed font-medium drop-shadow-md">
                            Más de 500 talleres ya optimizaron sus procesos con nuestra plataforma. Empieza gratis hoy.
                        </p>
                    </div>

                    {/* Review Carousel */}
                    <div className="relative group">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500"></div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < reviews[currentReview].stars ? "fill-yellow-400 text-yellow-400" : "fill-zinc-600 text-zinc-600"}`}
                                    />
                                ))}
                            </div>

                            <div className="min-h-[50px] mb-4">
                                <p className="text-zinc-200 text-lg italic leading-snug">
                                    "{reviews[currentReview].text}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                    {reviews[currentReview].name.charAt(0)}
                                </div>
                                <p className="text-sm font-bold text-white">{reviews[currentReview].name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SECTION (Register Form) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10 bg-background overflow-y-auto">
                {/* Mobile Header (Visible only on small screens) */}
                <div className="lg:hidden absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-purple-500/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="w-full max-w-md my-auto">
                    <div className="mb-8 pl-1">
                        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Volver al inicio
                        </Link>
                    </div>

                    <div className="text-center mb-6">
                        <div className="mx-auto mb-6 inline-block">
                            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-1.5 text-sm font-medium border-0 shadow-lg animate-pulse whitespace-nowrap">
                                7 Días de Prueba Gratis
                            </Badge>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Crea tu cuenta GSM Fix
                        </h1>
                        <p className="text-muted-foreground mt-2 text-base">
                            Completa tus datos para comenzar.
                        </p>
                    </div>

                    <Card className="border-0 shadow-none bg-transparent">
                        <form onSubmit={handleRegister}>
                            <CardContent className="space-y-5 px-0">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Nombre</Label>
                                        <div className="relative group">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                                            <Input id="firstName" placeholder="Juan" required className="pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 group-focus-within:border-purple-500/50 group-focus-within:ring-2 group-focus-within:ring-purple-500/20 transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Apellido</Label>
                                        <div className="relative group">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                                            <Input id="lastName" placeholder="Pérez" required className="pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 group-focus-within:border-purple-500/50 group-focus-within:ring-2 group-focus-within:ring-purple-500/20 transition-all" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">Nombre del Taller</Label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                                        <Input id="company" placeholder="Ej: TecnoFix" required className="pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 group-focus-within:border-purple-500/50 group-focus-within:ring-2 group-focus-within:ring-purple-500/20 transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Profesional</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                                        <Input id="email" type="email" placeholder="hola@tecnofix.com" required className="pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 group-focus-within:border-purple-500/50 group-focus-within:ring-2 group-focus-within:ring-purple-500/20 transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                                        <Input id="password" type="password" required className="pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 group-focus-within:border-purple-500/50 group-focus-within:ring-2 group-focus-within:ring-purple-500/20 transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex items-start gap-2 text-sm text-muted-foreground/80">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>Acceso completo a todas las funciones premium</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-muted-foreground/80">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>Sin tarjeta de crédito requerida para empezar</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-5 pt-2 px-0">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 text-base font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                                >
                                    {isLoading ? "Creando cuenta..." : "Comenzar Prueba Gratuita"}
                                </Button>

                                <Separator className="bg-border/50" />

                                <p className="text-center text-sm text-muted-foreground">
                                    ¿Ya tienes una cuenta?{" "}
                                    <Link to="/login" className="text-purple-500 hover:text-purple-400 hover:underline font-semibold transition-colors">
                                        Iniciar Sesión
                                    </Link>
                                </p>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Register;
