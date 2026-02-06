import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OrdersDemo from "./pages/OrdersDemo";
import InventoryDemo from "./pages/InventoryDemo";
import ClientsDemo from "./pages/ClientsDemo";
import FinanceDemo from "./pages/FinanceDemo";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Legal from "./pages/Legal";
import Paywall from "./pages/Paywall";
import { PricingProvider } from "./context/PricingContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PricingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ordenes" element={<OrdersDemo />} />
            <Route path="/inventario" element={<InventoryDemo />} />
            <Route path="/clientes" element={<ClientsDemo />} />
            <Route path="/finanzas" element={<FinanceDemo />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/paywall" element={<Paywall />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/legal" element={<Legal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PricingProvider>
  </QueryClientProvider>
);

export default App;
