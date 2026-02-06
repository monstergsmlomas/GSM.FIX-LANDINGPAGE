import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InteractiveDemo from "@/components/InteractiveDemo";
import FeaturesGrid from "@/components/FeaturesGrid";
import FreeTrialSection from "@/components/FreeTrialSection";
import PricingSection from "@/components/PricingSection";
import CTAFooter from "@/components/CTAFooter";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <InteractiveDemo />
      <FeaturesGrid />
      <FreeTrialSection />
      <FAQSection />
      <PricingSection />
      <CTAFooter />
    </div>
  );
};

export default Index;
