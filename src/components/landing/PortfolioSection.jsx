import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_FEATURED } from "@/lib/images";

const projects = [
  { title: "Роскошная квартира", category: "Квартира", budget: "от 2.5 млн ₽" },
  { title: "Студия Modern", category: "Квартира", budget: "от 1.5 млн ₽" },
  { title: "Семейный дом", category: "Дом", budget: "от 3 млн ₽" },
  { title: "Люкс коттедж", category: "Коттедж", budget: "от 8 млн ₽" },
  { title: "Премиум кухня", category: "Квартира", budget: "от 2 млн ₽" },
  { title: "Spa-ванная", category: "Квартира", budget: "от 1.8 млн ₽" },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#1A1F2E]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase">Портфолио</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
            Лучшие <span className="text-gold-gradient">проекты</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
            >
              <img
                src={PORTFOLIO_FEATURED[i]}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded text-[#D4AF37] text-xs">{p.category}</span>
                  <span className="text-[#A0A0A0] text-xs">{p.budget}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#F5F5F5]" style={{ fontFamily: "var(--font-heading)" }}>{p.title}</h3>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#D4AF37] text-sm font-medium flex items-center gap-1">
                    Смотреть кейс <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#portfolio" className="inline-flex items-center gap-2 text-[#D4AF37] font-medium hover:gap-3 transition-all">
            Смотреть все проекты <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}