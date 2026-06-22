import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { PORTFOLIO_FEATURED, PORTFOLIO } from "@/lib/images";

const FILTERS = [
  { id: "all", label: "Все" },
  { id: "Квартира", label: "Квартиры" },
  { id: "Дом", label: "Дома" },
  { id: "Арт-деко", label: "Арт-деко" },
  { id: "Минимализм", label: "Минимализм" },
  { id: "Лофт", label: "Лофт" },
  { id: "Классика", label: "Классика" },
];

const ALL_PROJECTS = [
  ...PORTFOLIO.map((p, i) => ({ ...p, image: p.images?.[0] || PORTFOLIO_FEATURED[i % PORTFOLIO_FEATURED.length], id: `p${i}` })),
];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === filter || p.style === filter);

  return (
    <PublicLayout>
      {/* Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <img src={PORTFOLIO_FEATURED[0]} alt="Портфолио" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/80 to-[#0F1419]" />
        <div className="relative text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-3">
            Портфолио
          </motion.h1>
          <p className="text-base md:text-lg text-[#A0A0A0]">500+ завершённых проектов премиум-класса</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filter === f.id
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold"
                  : "bg-[#1A1F2E] text-[#A0A0A0] hover:text-[#D4AF37] border border-[#D4AF37]/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:-translate-y-1 transition-transform">
                <span className="inline-block px-2.5 py-1 text-xs bg-[#D4AF37]/20 text-[#D4AF37] rounded-full border border-[#D4AF37]/30 mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-heading font-semibold text-white mb-1">{project.name}</h3>
                <p className="text-sm text-[#A0A0A0]">{project.style} · {project.area}</p>
                <p className="text-sm text-[#D4AF37] mt-1">{project.budget}</p>
                <div className="flex items-center gap-1 mt-3 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Смотреть кейс <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}