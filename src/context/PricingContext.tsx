import React, { createContext, useContext, useEffect, useState } from 'react';

export type BillingPeriod = 'monthly' | 'semester' | 'annual';

export interface PlanPrices {
    monthly: string;
    semester: string;
    annual: string;
}

export interface Plan {
    id: string;
    name: string;
    description: string;
    prices: PlanPrices;
    originalPrices?: PlanPrices;
    features: string[];
    popular: boolean;
    savings?: string;
    cta: string;
}

interface PricingContextType {
    plans: Plan[];
    updatePlan: (id: string, updatedPlan: Partial<Plan>) => void;
    resetToDefaults: () => void;
    billingPeriod: BillingPeriod;
    setBillingPeriod: (period: BillingPeriod) => void;
}

const defaultPlans: Plan[] = [
    {
        id: 'basic',
        name: "Mensual",
        description: "Perfecto para empezar sin compromiso",
        prices: {
            monthly: "$30.000",
            semester: "$171.000",
            annual: "$300.000"
        },
        features: [
            "Gestión de órdenes ilimitadas",
            "Control de inventario",
            "CRM de clientes",
            "Reportes básicos",
            "1 usuario incluido",
            "Soporte por email",
        ],
        popular: false,
        cta: "Comenzar Ahora"
    },
    {
        id: 'pro',
        name: "Anual",
        description: "Ahorra 2 meses con el plan anual",
        savings: "Ahorrás $60.000",
        prices: {
            monthly: "$320.000", // Not really used in this logic but good for structure
            semester: "$1.710.000",
            annual: "$3.000.000" // Example logic, but let's stick to the visual
        },
        // Reworking default structure to match meaningful tiers rather than just "Monthly" vs "Annual" as separate plans
        // promoting the "Standard" vs "Pro" naming might be better, but sticking to existing content for now
        // Wait, the user wants "Mensual, Semestral, Anual" as *toggles*, not as separate cards.
        // So the cards should be Tiers (e.g. Starter, Pro, Elite).
        // Let's refactor the default data to be Tier-based.

        // REFACTORING TO TIERS as per request for "High Tier Plan"
        features: [
            "Todo del plan mensual",
            "Reportes avanzados",
            "Hasta 5 usuarios",
            "Integraciones premium",
            "Soporte prioritario 24/7",
            "Backup automático",
            "API access",
        ],
        popular: true,
        cta: "Elegir Plan Anual"
    },
    {
        id: 'elite',
        name: "Elite", // New High Tier
        description: "Para cadenas y grandes operaciones",
        prices: {
            monthly: "$90.000",
            semester: "$513.000",
            annual: "$900.000"
        },
        features: [
            "Todo del plan Pro",
            "Usuarios ilimitados",
            "Múltiples sucursales",
            "Reportes personalizados",
            "Account manager dedicado",
            "SLA garantizado",
            "Onboarding personalizado",
        ],
        popular: false,
        cta: "Contactar Ventas"
    }
];

// Let's fix the data structure to catch up with the requirement. 
// The current 'PricingSection' has cards named "Mensual", "Anual", "Enterprise". 
// The user wants "diferenciacion por precios del mensual, semestral y anual".
// This implies the CARDS should be plans (e.g. "Startup", "Business", "Enterprise") and the TOGGLE changes the displayed price.
// I will rename the default plans to be more logical Tiers.

const initialTiers: Plan[] = [
    {
        id: 'prime', // Formerly Starter
        name: "Prime",
        description: "Todo lo que necesitas para tu taller",
        prices: {
            monthly: "$30.000",
            semester: "$162.000", // 10% off
            annual: "$360.000"   // Adjusted as per user request
        },
        originalPrices: {
            monthly: "$40.000",
            semester: "$180.000",
            annual: "$480.000"
        },
        features: [
            "Gestión de órdenes ilimitadas",
            "Control de inventario",
            "CRM de clientes",
            "Reportes avanzados",
            "Hasta 3 usuarios",
            "Soporte prioritario",
            "Backup automático"
        ],
        popular: true,
        savings: "El más elegido",
        cta: "Comenzar Ahora"
    },
    {
        id: 'enterprise',
        name: "Enterprise",
        description: "Para cadenas con múltiples sucursales",
        prices: {
            monthly: "Consultar",
            semester: "Consultar",
            annual: "Consultar"
        },
        features: [
            "Todas las funciones Prime",
            "Múltiples sucursales",
            "Usuarios ilimitados",
            "Panel de administración central",
            "Reportes consolidados",
            "API personalizada",
            "Account Manager dedicado"
        ],
        popular: false,
        cta: "Contactar Ventas"
    }
];

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [plans, setPlans] = useState<Plan[]>(() => {
        // Changed key to force refresh of default plans with discounts
        const savedPlans = localStorage.getItem('pricingPlans_v1.7');
        return savedPlans ? JSON.parse(savedPlans) : initialTiers;
    });

    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

    useEffect(() => {
        localStorage.setItem('gsm_pricing_v3', JSON.stringify(plans));
    }, [plans]);

    const updatePlan = (id: string, updatedPlan: Partial<Plan>) => {
        setPlans(prev => prev.map(plan => plan.id === id ? { ...plan, ...updatedPlan } : plan));
    };

    const resetToDefaults = () => {
        setPlans(initialTiers);
    };

    return (
        <PricingContext.Provider value={{ plans, updatePlan, resetToDefaults, billingPeriod, setBillingPeriod }}>
            {children}
        </PricingContext.Provider>
    );
};

export const usePricing = () => {
    const context = useContext(PricingContext);
    if (context === undefined) {
        throw new Error('usePricing must be used within a PricingProvider');
    }
    return context;
};
