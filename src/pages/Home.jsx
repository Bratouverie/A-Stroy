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
import ChatBotWidget from "@/components/chatbot/ChatBotWidget";
import VisitorCounter from "@/components/VisitorCounter";
import MetaHead from "@/components/MetaHead";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";

export default function Home() {
  const [splashDone, setSplashDone] = useState(
    localStorage.getItem("a-stroy-splash-seen") === "true"
  );

  return (
    <div className="min-h-screen bg-[#0F1419]">
      <MetaHead
        title="А СТРОЙ — премиум ремонт в Москве"
        description="Премиум ремонт и отделка квартир, домов и коттеджей под ключ в Москве и МО. 500+ проектов, гарантия 5-7 лет. Площадь 40-900 кв.м, бюджет от 1 млн ₽."
        keywords="ремонт квартир Москва, ремонт под ключ, дизайн интерьера, премиум ремонт, отделка"
        canonical="/"
        schema={[organizationSchema, localBusinessSchema]}
      />
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
          <ChatBotWidget />
          <VisitorCounter />
        </>
      )}
    </div>
  );
}