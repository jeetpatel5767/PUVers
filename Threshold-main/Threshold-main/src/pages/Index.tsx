import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HorizontalBrandSection from "@/components/sections/HorizontalBrandSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TabsSection from "@/components/sections/TabsSection";
import StepsSection from "@/components/sections/StepsSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TaglineMarqueeSection from "@/components/sections/TaglineMarqueeSection";

const Index = () => {
  useEffect(() => {
    document.body.classList.add("threshold-body");
    return () => document.body.classList.remove("threshold-body");
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="global-blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <Navbar />
      <HeroSection />
      <HorizontalBrandSection />
      <TaglineMarqueeSection />
      <div className="relative z-10">
        <TabsSection />
        <FeaturesSection />
        <StepsSection />
        <BenefitsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
