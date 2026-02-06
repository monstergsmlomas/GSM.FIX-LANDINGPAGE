import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[90vh] bg-background overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(0 0% 50%) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo with premium glow effect */}
          <div className="flex justify-center mb-10 animate-fade-in">
            <div className="relative group">
              {/* Soft glow behind logo */}
              <div className="absolute inset-2 bg-gradient-to-br from-primary/60 via-accent/40 to-primary/60 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

              {/* Logo - circular crop to hide square background */}
              <div className="relative w-40 h-40 rounded-full overflow-hidden">
                <img
                  src={logo}
                  alt="GSM FIX Logo"
                  className="w-full h-full object-cover scale-[1.15] drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Sistema de gestión #1 para técnicos
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6 animate-slide-up">
            Control total de tu{" "}
            <span className="text-transparent bg-clip-text accent-gradient">
              taller de reparación
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Gestiona órdenes, inventario, clientes y finanzas desde un solo lugar.
            Aumenta tu eficiencia y maximiza tus ganancias con GSM FIX.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
              onClick={() => navigate('/register')}
            >
              Comenzar Prueba Gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;