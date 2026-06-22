import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Zap, Home, Palette } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const EXTRA_OPTIONS = [
  { id: "smart-home", label: "Умный дом", price: 500000, icon: Zap },
  { id: "marble", label: "Мрамор Calacatta", price: 300000, icon: Palette },
  { id: "panoramic", label: "Панорамные окна", price: 400000, icon: Home },
  { id: "heated-floor", label: "Тёплый пол", price: 200000, icon: Zap },
  { id: "sound-system", label: "Аудиосистема", price: 350000, icon: Zap },
  { id: "spa", label: "Spa-ванная", price: 250000, icon: Home },
];

export default function CalculatorSection() {
  const [area, setArea] = useState(100);
  const [workType, setWorkType] = useState("full");
  const [level, setLevel] = useState("premium");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeline, setTimeline] = useState("normal");

  const estimate = useMemo(() => {
    const base = 35000;
    const workMultiplier = { full: 1.0, finishing: 0.7, design: 0.5 };
    const levelMultiplier = { premium: 1.0, lux: 1.5, exclusive: 2.0 };
    const expeditedMultiplier = timeline === "expedited" ? 1.15 : 1.0;
    const perSqm = base * (workMultiplier[workType] || 1) * (levelMultiplier[level] || 1);
    const basePrice = perSqm * area * expeditedMultiplier;
    const extraPrice = selectedOptions.reduce((sum, opt) => sum + (EXTRA_OPTIONS.find(e => e.id === opt)?.price || 0), 0);
    const total = basePrice + extraPrice;
    return {
      basePrice: Math.round(total * 0.85 / 100000) * 100000,
      maxPrice: Math.round(total * 1.15 / 100000) * 100000,
      perSqm: Math.round(perSqm),
      extraPrice,
      total
    };
  }, [area, workType, level, selectedOptions, timeline]);

  const toggleOption = (id) => {
    setSelectedOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const fmt = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + " млн";
    return (n / 1000).toFixed(0) + " тыс";
  };

  const handleGetQuote = () => {
    const msg = `Здравствуйте! Я рассчитал(а) стоимость в калькуляторе: ${fmt(estimate.basePrice)} – ${fmt(estimate.maxPrice)} ₽ за ${area} кв.м (${level}, ${workType}). Хочу получить точную смету!`;
    window.dispatchEvent(new CustomEvent("open-chatbot", { detail: { message: msg } }));
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase">Интерактивный калькулятор</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
            Спроектируйте свой <span className="text-gold-gradient">идеальный ремонт</span>
          </h2>
          <p className="mt-4 text-[#A0A0A0] max-w-2xl mx-auto">Играйте с опциями и смотрите, как меняется бюджет. Точный расчёт — после консультации.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-[#A0A0A0]">Площадь (кв.м)</span>
                <motion.span className="text-lg font-semibold text-[#D4AF37]" key={area}>{area}</motion.span>
              </div>
              <Slider value={[area]} onValueChange={([v]) => setArea(v)} min={40} max={900} step={10} className="[&_[role=slider]]:bg-[#D4AF37] [&_[role=slider]]:border-[#D4AF37] [&_.relative>.absolute]:bg-[#D4AF37]" />
              <div className="flex gap-2 mt-4 text-xs text-[#A0A0A0]">
                <button onClick={() => setArea(40)} className="px-2 py-1 bg-[#252C3D] rounded hover:text-[#D4AF37]">40 м²</button>
                <button onClick={() => setArea(100)} className="px-2 py-1 bg-[#252C3D] rounded hover:text-[#D4AF37]">100 м²</button>
                <button onClick={() => setArea(300)} className="px-2 py-1 bg-[#252C3D] rounded hover:text-[#D4AF37]">300 м²</button>
                <button onClick={() => setArea(900)} className="px-2 py-1 bg-[#252C3D] rounded hover:text-[#D4AF37]">900 м²</button>
              </div>
            </div>

            <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
              <p className="text-sm text-[#A0A0A0] mb-3">Тип работ</p>
              <div className="grid grid-cols-3 gap-2">
                {[{ k: "full", l: "Полный ремонт" }, { k: "finishing", l: "Отделка" }, { k: "design", l: "Дизайн" }].map(o => (
                  <button key={o.k} onClick={() => setWorkType(o.k)} className={`py-3 px-2 rounded-lg text-xs font-medium transition-all ${workType === o.k ? "bg-[#D4AF37] text-[#0F1419] shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "bg-[#252C3D] text-[#A0A0A0] hover:text-[#F5F5F5]"}`}>{o.l}</button>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
              <p className="text-sm text-[#A0A0A0] mb-3">Уровень отделки</p>
              <div className="grid grid-cols-3 gap-2">
                {[{ k: "premium", l: "Премиум" }, { k: "lux", l: "Люкс" }, { k: "exclusive", l: "Эксклюзив" }].map(o => (
                  <button key={o.k} onClick={() => setLevel(o.k)} className={`py-3 px-2 rounded-lg text-xs font-medium transition-all ${level === o.k ? "bg-[#D4AF37] text-[#0F1419] shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "bg-[#252C3D] text-[#A0A0A0] hover:text-[#F5F5F5]"}`}>{o.l}</button>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
              <p className="text-sm text-[#A0A0A0] mb-3">График работ</p>
              <div className="flex gap-2">
                <button onClick={() => setTimeline("normal")} className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${timeline === "normal" ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0]"}`}>Обычный</button>
                <button onClick={() => setTimeline("expedited")} className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${timeline === "expedited" ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0]"}`}>Ускоренный +15%</button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
              <p className="text-sm text-[#A0A0A0] mb-4 font-medium">✨ Премиум опции</p>
              <div className="grid grid-cols-2 gap-2">
                {EXTRA_OPTIONS.map(opt => {
                  const Icon = opt.icon;
                  const isSelected = selectedOptions.includes(opt.id);
                  return (
                    <button key={opt.id} onClick={() => toggleOption(opt.id)} className={`p-3 rounded-lg transition-all flex items-center gap-2 text-xs ${isSelected ? "bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37]" : "bg-[#0F1419] border border-[#D4AF37]/10 text-[#A0A0A0] hover:text-[#D4AF37]"}`}>
                      <Icon size={14} />
                      <div className="text-left">
                        <div className="font-medium">{opt.label}</div>
                        <div className="text-xs opacity-70">+{fmt(opt.price)}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.div key={JSON.stringify(estimate)} initial={{ scale: 0.97 }} animate={{ scale: 1 }} className="bg-gradient-to-br from-[#D4AF37]/10 to-[#252C3D] rounded-xl p-8 border-2 border-[#D4AF37]/30 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm text-[#A0A0A0] mb-2">💰 Примерный бюджет</p>
                <p className="text-4xl sm:text-5xl font-bold text-gold-gradient mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  {fmt(estimate.basePrice)} – {fmt(estimate.maxPrice)} ₽
                </p>

                {estimate.extraPrice > 0 && (
                  <div className="mb-4 p-3 bg-[#0F1419]/50 rounded-lg border border-[#D4AF37]/20">
                    <p className="text-xs text-[#A0A0A0]">Добавлено опций: <span className="text-[#D4AF37] font-semibold">{fmt(estimate.extraPrice)}</span></p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="p-2 bg-[#0F1419]/50 rounded-lg">
                    <p className="text-[#A0A0A0]">За кв.м</p>
                    <p className="font-semibold text-[#D4AF37]">{fmt(estimate.perSqm)}</p>
                  </div>
                  <div className="p-2 bg-[#0F1419]/50 rounded-lg">
                    <p className="text-[#A0A0A0]">Сроки</p>
                    <p className="font-semibold text-[#D4AF37]">{area < 100 ? "2-3" : area < 300 ? "3-4" : "4-6"} мес</p>
                  </div>
                </div>

                <p className="text-xs text-[#A0A0A0]/60 mb-6">⚠️ Это приблизительно. Точный расчёт после консультации.</p>
              </div>
            </motion.div>

            <button onClick={handleGetQuote} className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all text-lg">
              Получить точную смету
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}