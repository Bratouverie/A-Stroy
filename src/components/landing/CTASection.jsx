import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { HERO } from "@/lib/images";

export default function CTASection() {
  const openChatBot = () => window.dispatchEvent(new Event("open-chatbot"));

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO[1]} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F1419]/85" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Готовы начать <span className="text-gold-gradient">свой проект?</span>
          </h2>
          <p className="text-lg text-[#A0A0A0] mb-10 max-w-xl mx-auto">
            Консультация бесплатна. Дизайн-проект вам понравится.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openChatBot}
              className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} /> Начать консультацию
            </button>
            <a href="tel:+79912959125" className="px-10 py-4 border border-[#D4AF37]/40 text-[#F5F5F5] font-medium rounded-lg flex items-center justify-center gap-2 hover:border-[#D4AF37] transition-all">
              <Phone size={18} />
              Позвонить нам
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}