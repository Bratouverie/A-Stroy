import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { HERO } from "@/lib/images";

export default function HeroBanner() {
  const openChatBot = () => window.dispatchEvent(new Event("open-chatbot"));

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO[0]} alt="Премиум интерьер" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1419]/90 via-[#0F1419]/60 to-[#0F1419]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] text-xs tracking-[2px] uppercase mb-6">
                Москва и Московская область
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F5F5F5] leading-tight tracking-wide"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Премиум ремонт
              <br />
              <span className="text-gold-gradient">и отделка под ключ</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-lg sm:text-xl text-[#A0A0A0] leading-relaxed max-w-xl"
            >
              От 40 до 900 кв.м · Самый лучший дизайнер в Москве.
              <br className="hidden sm:block" />
              Качество, которое вдохновляет.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={openChatBot}
                className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg text-center hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all text-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} /> Получить консультацию
              </button>
              <Link to="/portfolio" className="group px-8 py-4 border border-[#D4AF37]/40 text-[#F5F5F5] font-medium rounded-lg text-center hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2">
                Смотреть портфолио
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#D4AF37]/50"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}