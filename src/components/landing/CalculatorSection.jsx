import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function CalculatorSection() {
  const [area, setArea] = useState(100);
  const [workType, setWorkType] = useState("full");
  const [level, setLevel] = useState("premium");

  const estimate = useMemo(() => {
    const base = 35000;
    const workMultiplier = { full: 1.0, finishing: 0.7, design: 0.5 };
    const levelMultiplier = { premium: 1.0, lux: 1.5, exclusive: 2.0 };
    const perSqm = base * (workMultiplier[workType] || 1) * (levelMultiplier[level] || 1);
    const min = Math.round(perSqm * area * 0.85 / 100000) * 100000;
    const max = Math.round(perSqm * area * 1.15 / 100000) * 100000;
    return { min, max, perSqm: Math.round(perSqm) };
  }, [area, workType, level]);

  const fmt = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + " млн";
    return (n / 1000).toFixed(0) + " тыс";
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase">Калькулятор</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
            Рассчитайте <span className="text-gold-gradient">стоимость</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#1A1F2E] rounded-2xl p-6 sm:p-10 border border-[#D4AF37]/10">
          {/* Area slider */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-[#A0A0A0]">Площадь</span>
              <span className="text-lg font-semibold text-[#D4AF37]">{area} кв.м</span>
            </div>
            <Slider value={[area]} onValueChange={([v]) => setArea(v)} min={40} max={900} step={10} className="[&_[role=slider]]:bg-[#D4AF37] [&_[role=slider]]:border-[#D4AF37] [&_.relative>.absolute]:bg-[#D4AF37]" />
          </div>

          {/* Work type */}
          <div className="mb-8">
            <p className="text-sm text-[#A0A0A0] mb-3">Тип работ</p>
            <div className="grid grid-cols-3 gap-3">
              {[{ k: "full", l: "Полный ремонт" }, { k: "finishing", l: "Отделка" }, { k: "design", l: "Дизайн" }].map(o => (
                <button key={o.k} onClick={() => setWorkType(o.k)} className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${workType === o.k ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0] hover:text-[#F5F5F5]"}`}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div className="mb-10">
            <p className="text-sm text-[#A0A0A0] mb-3">Уровень</p>
            <div className="grid grid-cols-3 gap-3">
              {[{ k: "premium", l: "Премиум" }, { k: "lux", l: "Люкс" }, { k: "exclusive", l: "Эксклюзив" }].map(o => (
                <button key={o.k} onClick={() => setLevel(o.k)} className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${level === o.k ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0] hover:text-[#F5F5F5]"}`}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="text-center p-6 rounded-xl bg-[#0F1419] border border-[#D4AF37]/20">
            <p className="text-sm text-[#A0A0A0] mb-2">Примерный бюджет</p>
            <p className="text-3xl sm:text-4xl font-bold text-gold-gradient" style={{ fontFamily: "var(--font-heading)" }}>
              {fmt(estimate.min)} – {fmt(estimate.max)} ₽
            </p>
            <p className="text-xs text-[#A0A0A0] mt-2">~{estimate.perSqm.toLocaleString("ru")} ₽ за кв.м</p>
            <p className="text-xs text-[#A0A0A0]/60 mt-4">Это приблизительно. Точный расчёт после консультации</p>
          </div>

          <a href="#contacts" className="mt-6 w-full block text-center px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
            Получить точную смету
          </a>
        </motion.div>
      </div>
    </section>
  );
}