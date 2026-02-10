import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Mail, Star, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Mock Data for Reviews
const reviews = [
    { name: "Carlos R.", stars: 5, text: "Desde que usamos GSM FIX, los tiempos de entrega bajaron un 40%. ¡Imprescindible para el taller!" },
    { name: "TecnoSolutions MDQ", stars: 5, text: "El control de stock y las órdenes de reparación son una maravilla. Muy intuitivo." },
    { name: "Julián M.", stars: 4, text: "Excelente soporte y actualizaciones constantes. Se nota que escuchan a los técnicos." },
    { name: "FixIt Lab", stars: 5, text: "La mejor inversión para organizar el caos del día a día. Súper recomendado." },
];

const Login = () => {
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
        <div className="min-h-screen lg:flex bg-background">
            {/* LEFT SECTION (Visuals) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-900 justify-center items-center">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop")' }}
                >
                    {/* Dark Overlays */}
                    <div className="absolute inset-0 bg-neutral-900/80 bg-gradient-to-br from-purple-900/40 to-blue-900/40 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-2xl px-12 flex flex-col h-full justify-between py-16">
                    {/* Top Content */}
                    <div className="space-y-8 mt-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white/90 text-sm font-medium shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Sistema #1 para Servicio Técnico</span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-2xl">
                            Potencia tu Taller con <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-6xl">
                                GSM FIX
                            </span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-lg leading-relaxed drop-shadow-md">
                            La herramienta definitiva para expertos en microsoldadura. Precisión, control y eficiencia en un solo lugar.
                        </p>
                    </div>

                    {/* Review Carousel */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative shadow-2xl transition-all duration-500">
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < reviews[currentReview].stars ? "fill-yellow-400 text-yellow-400" : "fill-gray-600 text-gray-600"}`}
                                    />
                                ))}
                            </div>

                            <div className="min-h-[60px]">
                                <p className="text-gray-100 text-lg italic leading-relaxed animate-fade-in">
                                    "{reviews[currentReview].text}"
                                </p>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                    {reviews[currentReview].name.charAt(0)}
                                </div>
                                <p className="text-sm font-bold text-white/90">{reviews[currentReview].name}</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-2xl transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{ width: `${((currentReview + 1) / reviews.length) * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Diagonal Glow Divider */}
                <div className="absolute top-0 right-0 bottom-0 w-24 h-[120%] bg-background transform -skew-x-6 origin-bottom-right translate-x-1/2 border-l-[3px] border-purple-500/80 shadow-[-10px_0_40px_-5px_rgba(139,92,246,0.6)] z-20"></div>
            </div>

            {/* RIGHT SECTION (Login Form) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12 relative z-10 bg-background">
                {/* Mobile Background Elements (hidden on desktop) */}
                <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="mb-6 lg:mb-8">
                        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Volver al inicio
                        </Link>
                    </div>

                    <div className="text-center mb-6 lg:hidden">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">GSM FIX</h1>
                        <p className="text-muted-foreground">Sistema de Gestión Profesional</p>
                    </div>

                    <Card className="border-border bg-card/40 backdrop-blur-xl shadow-xl lg:shadow-none lg:bg-transparent lg:border-0">
                        <CardHeader className="text-center pb-6 lg:px-0">
                            <CardTitle className="text-3xl font-bold text-foreground">
                                Iniciar Sesión
                            </CardTitle>
                            <CardDescription className="text-base mt-2 text-muted-foreground">
                                Ingresa tus credenciales para acceder al panel
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={handleLogin}>
                            <CardContent className="space-y-5 lg:px-0">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Correo Electrónico</Label>
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <Input id="email" type="email" placeholder="admin@taller.com" required className="pl-10 h-11 bg-background/50 border-input group-focus-within:border-primary/50 group-focus-within:ring-1 group-focus-within:ring-primary/50 transition-all font-medium" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="password">Contraseña</Label>
                                            <Link to="/forgot-password" className="text-xs text-primary hover:text-purple-400 hover:underline transition-colors">
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <Input id="password" type="password" required className="pl-10 h-11 bg-background/50 border-input group-focus-within:border-primary/50 group-focus-within:ring-1 group-focus-within:ring-primary/50 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-5 pt-2 lg:px-0">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
                                >
                                    {isLoading ? "Verificando..." : "Ingresar al Sistema"}
                                </Button>

                                <div className="relative w-full">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-border/50" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            O continúa con
                                        </span>
                                    </div>
                                </div>

                                <Button variant="outline" type="button" className="w-full h-11 border-input hover:border-white/20 hover:bg-white/5 font-medium transition-colors" onClick={() => toast.info("Google login próximamente")}>
                                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                    Google
                                </Button>

                                <p className="text-center text-sm text-muted-foreground mt-2">
                                    ¿Aún no tienes cuenta?{" "}
                                    <Link to="/register" className="text-primary hover:text-purple-400 hover:underline font-semibold transition-colors">
                                        Solicitar Acceso
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

export default Login;
