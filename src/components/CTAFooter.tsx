import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const CTAFooter = () => {
  return (
    <>
      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Comienza tu prueba gratuita de 7 días
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sin tarjeta de crédito. Sin compromiso. Acceso completo a todas las funciones.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-64 h-auto py-6 text-lg font-semibold rounded-full"
                asChild
              >
                <Link to="/register">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-64 h-auto py-6 text-lg rounded-full border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/60 hover:shadow-[0_0_30px_-5px_hsl(142_70%_45%/0.3)] transition-all duration-300"
                asChild
              >
                <a href="http://wa.me/+5491124949533" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Contactar Soporte
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                  {/* Increased size from w-10 h-10 to w-16 h-16 to prevent cutting off */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-background border border-border flex items-center justify-center">
                    <img src={logo} alt="GSM FIX Logo" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold text-foreground">GSM FIX</span>
                  <span className="block text-xs text-muted-foreground">Sistema de Gestión</span>
                </div>
              </div>
              <p className="text-muted-foreground max-w-sm mb-4 text-sm">
                El sistema de gestión más completo para talleres de reparación de dispositivos móviles.
              </p>
              <div className="flex items-center gap-4">
                <a href="mailto:info@gsmfix.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  info@gsmfix.com
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Producto</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm">Funciones</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">Precios</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Integraciones</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Actualizaciones</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Soporte</h4>
              <ul className="space-y-2">
                <li><a href="http://wa.me/+5491124949533" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Centro de Ayuda</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Documentación</a></li>
                <li><a href="http://wa.me/+5491124949533" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contacto</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Estado del Sistema</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">
                © 2026 GSM FIX. Todos los derechos reservados.
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Desarrollado por <span className="text-primary font-medium">Rodrigo Roselli</span> y <span className="text-primary font-medium">Tomas Morelli</span></span>
                <div className="h-4 w-[1px] bg-border mx-1"></div>
                <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
                  <img src="/conarte-logo.png" alt="CONARTE" className="h-24 w-auto" />
                  <span className="font-bold tracking-wider text-xs">CONARTE</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span>Web Development by <a href="https://www.linkedin.com/in/mateocalvar/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Mateo Calvar</a></span>
              </div>
              <div className="flex items-center gap-6">
                <Link to="/legal#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Términos</Link>
                <Link to="/legal#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacidad</Link>
                <Link to="/legal#cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CTAFooter;