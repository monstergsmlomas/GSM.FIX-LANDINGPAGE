import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-white/10 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            {/* Subtle glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
            {/* Logo container - circular crop */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <img src={logo} alt="GSM FIX Logo" className="w-full h-full object-cover scale-[1.15]" />
            </div>
          </div>
          <div>
            <span className="text-lg font-bold text-foreground">GSM FIX</span>
            <span className="hidden sm:block text-xs text-muted-foreground">Sistema de Gestión</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, 'features')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Funciones
          </a>
          <a
            href="#dashboard"
            onClick={(e) => scrollToSection(e, 'dashboard')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Dashboard
          </a>
          <a
            href="#pricing"
            onClick={(e) => scrollToSection(e, 'pricing')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Precios
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:inline-block">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Iniciar Sesión
            </Button>
          </Link>
          <Button className="px-6" asChild>
            <Link to="/register">
              Prueba Gratis
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;