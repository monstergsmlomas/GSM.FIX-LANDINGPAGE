import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Shield, FileText, Cookie, Lock } from "lucide-react";
import Header from "@/components/Header";
import CTAFooter from "@/components/CTAFooter";

const Legal = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("terms");

    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.hash) {
            const tab = location.hash.replace("#", "");
            if (["terms", "privacy", "cookies"].includes(tab)) {
                setActiveTab(tab);
            }
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">

                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
                                    Centro Legal
                                </h1>
                                <p className="text-muted-foreground">
                                    Transparencia y seguridad para tu taller.
                                </p>
                            </div>
                            <Button variant="ghost" asChild className="hidden md:flex">
                                <Link to="/">
                                    <ArrowLeft className="mr-2 w-4 h-4" />
                                    Volver al Inicio
                                </Link>
                            </Button>
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                            <TabsList className="grid w-full grid-cols-3 p-1 bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl">
                                <TabsTrigger value="terms" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all duration-300">
                                    <FileText className="w-4 h-4 mr-2" />
                                    <span className="hidden sm:inline">Términos</span>
                                    <span className="sm:hidden">Términos</span>
                                </TabsTrigger>
                                <TabsTrigger value="privacy" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all duration-300">
                                    <Shield className="w-4 h-4 mr-2" />
                                    <span className="hidden sm:inline">Privacidad</span>
                                    <span className="sm:hidden">Privacidad</span>
                                </TabsTrigger>
                                <TabsTrigger value="cookies" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all duration-300">
                                    <Cookie className="w-4 h-4 mr-2" />
                                    <span className="hidden sm:inline">Cookies</span>
                                    <span className="sm:hidden">Cookies</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Content Wrapper with consistent styling */}
                            <div className="relative">
                                {/* Decorative background glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl blur-3xl -z-10" />

                                <TabsContent value="terms" className="mt-0 focus-visible:outline-none">
                                    <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3 text-2xl">
                                                <FileText className="w-6 h-6 text-primary" />
                                                Términos y Condiciones
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="prose prose-sm md:prose-base prose-invert max-w-none text-muted-foreground">
                                            <p>Última actualización: Febrero 2026</p>

                                            <h3>1. Aceptación de los Términos</h3>
                                            <p>
                                                Al acceder y utilizar GSM FIX ("el Servicio"), usted acepta estar legalmente vinculado por estos términos. El Servicio es propiedad y está operado por GSM FIX, desarrollado por Rodrigo Roselli y Tomas Morelli.
                                            </p>

                                            <h3>2. Uso del Servicio</h3>
                                            <p>
                                                Usted se compromete a utilizar el Servicio únicamente para fines legales y relacionados con la gestión de su taller de reparaciones. Está prohibido:
                                            </p>
                                            <ul>
                                                <li>Intentar vulnerar la seguridad del sistema.</li>
                                                <li>Utilizar el servicio para actividades fraudulentas.</li>
                                                <li>Revender el acceso al servicio sin autorización expresa.</li>
                                            </ul>

                                            <h3>3. Planes y Pagos</h3>
                                            <p>
                                                Los precios de los planes (Prime, Enterprise) se facturan por adelantado según el período seleccionado (Mensual, Semestral, Anual). GSM FIX se reserva el derecho de modificar las tarifas con previo aviso.
                                            </p>

                                            <h3>4. Limitación de Responsabilidad</h3>
                                            <p>
                                                GSM FIX proporciona el software "tal cual". No nos hacemos responsables por pérdidas de datos ocasionadas por mal uso de la herramienta, fallas de hardware del usuario o interrupciones de internet ajenas a nuestro servidor.
                                            </p>

                                            <h3>5. Contacto</h3>
                                            <p>
                                                Para soporte técnico o consultas legales, contáctenos vía WhatsApp al +54 9 11 2494-9533.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="privacy" className="mt-0 focus-visible:outline-none">
                                    <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3 text-2xl">
                                                <Lock className="w-6 h-6 text-primary" />
                                                Política de Privacidad
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="prose prose-sm md:prose-base prose-invert max-w-none text-muted-foreground">
                                            <p>
                                                En GSM FIX, la seguridad de los datos de su taller y sus clientes es nuestra prioridad.
                                            </p>

                                            <h3>1. Información que Recopilamos</h3>
                                            <p>
                                                Recopilamos información necesaria para la prestación del servicio:
                                            </p>
                                            <ul>
                                                <li>Datos de registro (Nombre, Email, Teléfono).</li>
                                                <li>Datos operativos (Órdenes de reparación, Inventario, Clientes del taller).</li>
                                                <li>Información técnica (Logs de acceso, tipo de dispositivo).</li>
                                            </ul>

                                            <h3>2. Uso de la Información</h3>
                                            <p>
                                                Sus datos se utilizan exclusivamente para:
                                            </p>
                                            <ul>
                                                <li>Proveer y mantener el servicio GSM FIX.</li>
                                                <li>Notificarle sobre cambios en el servicio o actualizaciones de seguridad.</li>
                                                <li>Proveer soporte técnico al cliente.</li>
                                            </ul>
                                            <p className="font-semibold text-foreground">
                                                No vendemos ni compartimos sus datos con terceros para fines publicitarios.
                                            </p>

                                            <h3>3. Seguridad de los Datos</h3>
                                            <p>
                                                Implementamos medidas de seguridad estándar de la industria (encriptación, backups automáticos) para proteger su información contra acceso no autorizado, alteración o destrucción.
                                            </p>

                                            <h3>4. Sus Derechos</h3>
                                            <p>
                                                Usted tiene derecho a solicitar el acceso, corrección o eliminación de sus datos personales almacenados en nuestros servidores en cualquier momento contactando a soporte.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="cookies" className="mt-0 focus-visible:outline-none">
                                    <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3 text-2xl">
                                                <Cookie className="w-6 h-6 text-primary" />
                                                Política de Cookies
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="prose prose-sm md:prose-base prose-invert max-w-none text-muted-foreground">
                                            <h3>1. ¿Qué son las cookies?</h3>
                                            <p>
                                                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Son esenciales para el funcionamiento correcto de aplicaciones web modernas.
                                            </p>

                                            <h3>2. Cookies que utilizamos</h3>
                                            <div className="grid gap-4 mt-4">
                                                <div className="p-4 rounded-lg bg-background/50 border border-border">
                                                    <h4 className="font-semibold text-foreground m-0">Esenciales</h4>
                                                    <p className="text-sm m-0 mt-1">Necesarias para la autenticación de usuarios y mantener su sesión segura mientras navega por el dashboard.</p>
                                                </div>
                                                <div className="p-4 rounded-lg bg-background/50 border border-border">
                                                    <h4 className="font-semibold text-foreground m-0">Preferencias</h4>
                                                    <p className="text-sm m-0 mt-1">Recuerdan sus ajustes, como el idioma o el tema (claro/oscuro).</p>
                                                </div>
                                            </div>

                                            <h3 className="mt-6">3. Gestión de Cookies</h3>
                                            <p>
                                                Puede configurar su navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo, si no acepta las cookies esenciales, es posible que no pueda utilizar algunas partes de nuestro Servicio (como el inicio de sesión).
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </main>

            <CTAFooter />
        </div>
    );
};

export default Legal;
