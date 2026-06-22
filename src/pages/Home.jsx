import React, { useState } from "react";
import SplashScreen from "@/components/landing/SplashScreen";
import Header from "@/components/landing/Header";
import HeroBanner from "@/components/landing/HeroBanner";
import ServicesGrid from "@/components/landing/ServicesGrid";
import PortfolioSection from "@/components/landing/PortfolioSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import StatsSection from "@/components/landing/StatsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const [splashDone, setSplashDone] = useState(
    localStorage.getItem("a-stroy-splash-seen") === "true"
  );

  return (
    <div className="min-h-screen bg-[#0F1419]">
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      {splashDone && (
        <>
          <Header />
          <HeroBanner />
          <ServicesGrid />
          <PortfolioSection />
          <WhyUsSection />
          <StatsSection />
          <ProcessSection />
          <TestimonialsSection />
          <CalculatorSection />
          <CTASection />
          <Footer />
        </>
      )}
    </div>
  );
}