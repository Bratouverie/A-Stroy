import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Thermometer, Droplets, Home, Check, ArrowRight, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import CalculatorContactForm from "@/components/landing/CalculatorContactForm";

const TIERS = {
  standard: {
    label: "Стандарт",
    short: "Базовый капитальный",
    min: 12000,
    max: 18000,
    mid: 15000,
    worksShare: 0.45,
    reserve: 0.12,
    months: [1, 2],
    features: ["Ламинат 33 класс", "Обои под покраску", "Натяжные потолки", "Сантехника эконом", "Двери из экошпона"],
  },
  premium: {
    label: "Премиум",
    short: "Качественные материалы",
    min: 25000,
    max: 35000,
    mid: 30000,
    worksShare: 0.40,
    reserve: 0.12,
    months: [2, 3],
    features: ["Малярные стены (краска)", "Инж. доска / кварцвинил", "Крупноформатный керамогранит", "Двери скрытого монтажа", "Теневые плинтусы"],
  },
  lux: {
    label: "Люкс",
    short: "Авторский ремонт",
    min: 45000,
    max: 65000,
    mid: 55000,
    worksShare: 0.30,
    reserve: 0.17,
    months: [3, 4],
    features: ["Натуральный мрамор", "Дерево ценных пород", "Сложные потолки, световые линии", "Сантехника премиум-брендов", "Художественная отделка"],
  },
};

const PREMIUM_OPTIONS = [
  { id: "heated-floor", label: "Тёплый пол", price: 150000, icon: Thermometer, tiers: ["standard", "premium", "lux"] },
  { id: "electric", label: "Электрика премиум", price: 70000, icon: Zap, tiers: ["standard", "premium", "lux"] },
  { id: "rihao", label: "Сантехника REHAY", price: 35000, icon: Droplets, tiers: ["standard", "premium", "lux"] },
  { id: "flooring", label: "Премиум покрытия", price: 45000, icon: Home, tiers: ["premium", "lux"] },
  { id: "smart-home", label: "Умный дом", price: 150000, icon: Zap, tiers: ["premium", "lux"] },
  { id: "spa", label: "Spa-ванная", price: 150000, icon: Droplets, tiers: ["premium", "lux"] },
];

const DESIGN_OPTIONS = [
  { id: "design-basic", label: "Базовый проект", perSqm: 2500, tiers: ["premium", "lux"] },
  { id: "design-extended", label: "Расширенный + авторский надзор", perSqm: 5000, tiers: ["premium", "lux"] },
];

const fmtFull = (n) => Math.round(n).toLocaleString("ru-RU") + " ₽";
const fmtShort = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + " млн ₽";
  return Math.round(n / 1000) + " тыс ₽";
};

export default function CalculatorSection() {
  const [area, setArea] = useState(100);
  const [objectType, setObjectType] = useState("secondary");
  const [region, setRegion] = useState("moscow");
  const [level, setLevel] = useState("premium");
  const [timeline, setTimeline] = useState("normal");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const estimate = useMemo(() => {
    const tier = TIERS[level];
    const perSqm = tier.mid;
    const baseCost = perSqm * area;

    // Новостройка +15%
    const newBuildMarkup = objectType === "new" ? baseCost * 0.15 : 0;
    const adjustedBase = baseCost + newBuildMarkup;

    // Работы / материалы
    let worksCost = adjustedBase * tier.worksShare;
    const materialsCost = adjustedBase * (1 - tier.worksShare);

    // Скидка за масштаб
    let scaleDiscount = 0;
    if (area >= 300) scaleDiscount = worksCost * 0.07;
    else if (area >= 100) scaleDiscount = worksCost * 0.05;
    worksCost -= scaleDiscount;

    // Ускоренный график +15% к работам
    const expeditedMarkup = timeline === "expedited" ? worksCost * 0.15 : 0;

    // Премиум опции
    const extraPrice = selectedOptions.reduce((sum, id) => {
      const opt = PREMIUM_OPTIONS.find(o => o.id === id);
      return sum + (opt?.price || 0);
    }, 0);

    // Дизайн-проект
    const designOpt = DESIGN_OPTIONS.find(d => d.id === selectedDesign);
    const designCost = designOpt ? designOpt.perSqm * area : 0;

    // Региональная скидка (МО -10%)
    const preRegionTotal = worksCost + materialsCost + expeditedMarkup;
    const regionDiscount = region === "mo" ? preRegionTotal * 0.10 : 0;

    const subtotal = preRegionTotal + extraPrice + designCost - regionDiscount;
    const reserve = subtotal * tier.reserve;
    const total = subtotal + reserve;

    return {
      perSqm, baseCost, newBuildMarkup, worksCost, materialsCost,
      scaleDiscount, expeditedMarkup, extraPrice, designCost,
      regionDiscount, subtotal, reserve, total,
      reservePercent: Math.round(tier.reserve * 100),
    };
  }, [area, objectType, region, level, timeline, selectedOptions, selectedDesign]);

  const timelineMonths = useMemo(() => {
    let [min, max] = [...TIERS[level].months];
    if (area >= 100 && area < 300) { min += 1; max += 1; }
    else if (area >= 300 && area < 500) { min += 2; max += 2; }
    else if (area >= 500) { min += 3; max += 4; }
    if (timeline === "expedited") { min = Math.max(1, Math.round(min * 0.7)); max = Math.max(2, Math.round(max * 0.7)); }
    return `${min}–${max} мес`;
  }, [level, area, timeline]);

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    setSelectedOptions(prev => prev.filter(id => {
      const opt = PREMIUM_OPTIONS.find(o => o.id === id);
      return opt?.tiers.includes(newLevel);
    }));
    const designOpt = DESIGN_OPTIONS.find(d => d.id === selectedDesign);
    if (selectedDesign && !designOpt?.tiers.includes(newLevel)) setSelectedDesign(null);
  };

  const toggleOption = (id) => {
    setSelectedOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const availableOptions = PREMIUM_OPTIONS.filter(o => o.tiers.includes(level));
  const availableDesigns = DESIGN_OPTIONS.filter(d => d.tiers.includes(level));

  const handleGetQuote = () => {
    setShowContactForm(true);
  };

  const calcSummary = useMemo(() => {
    const optLabels = selectedOptions.map(id => PREMIUM_OPTIONS.find(o => o.id === id)?.label).filter(Boolean);
    const designLabel = DESIGN_OPTIONS.find(d => d.id === selectedDesign)?.label;
    const lines = [
      `Уровень: ${TIERS[level].label}`,
      `Площадь: ${area} кв.м`,
      `Тип объекта: ${objectType === "new" ? "Новостройка" : "Вторичка"}`,
      `Регион: ${region === "moscow" ? "Москва" : "Московская обл."}`,
      `График: ${timeline === "expedited" ? "Ускоренный (+15% работ)" : "Обычный"}`,
      `Опции: ${optLabels.length ? optLabels.join(", ") : "нет"}`,
      `Дизайн-проект: ${designLabel || "нет"}`,
      `Подытог (без резерва): ${fmtFull(estimate.subtotal)}`,
      `Резерв (${estimate.reservePercent}%): ${fmtFull(estimate.reserve)}`,
      `Итого: ${fmtFull(estimate.total)}`,
    ];
    return lines.join("\n");
  }, [area, objectType, region, level, timeline, selectedOptions, selectedDesign, estimate, timelineMonths]);

  return (
    <section id="calculator" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase">Интерактивный калькулятор</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] font-heading">
            Рассчитайте <span className="text-gold-gradient">стоимость ремонта</span>
          </h2>
          <p className="mt-4 text-[#A0A0A0] max-w-2xl mx-auto">Прозрачная смета с разбивкой по статьям. Точный расчёт — после консультации с менеджером.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: Controls */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            {/* Area */}
            <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm text-[#A0A0A0]">Площадь объекта</span>
                <motion.span key={area} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-2xl font-semibold text-[#D4AF37] font-heading">{area} <span className="text-sm text-[#A0A0A0]">кв.м</span></motion.span>
              </div>
              <Slider value={[area]} onValueChange={([v]) => setArea(v)} min={30} max={900} step={5} className="[&_[role=slider]]:bg-[#D4AF37] [&_[role=slider]]:border-[#D4AF37] [&_.relative>.absolute]:bg-[#D4AF37]" />
              <div className="flex gap-2 mt-3 text-xs">
                {[50, 100, 200, 500].map(v => (
                  <button key={v} onClick={() => setArea(v)} className="px-3 py-1 bg-[#252C3D] rounded text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">{v} м²</button>
                ))}
              </div>
            </div>

            {/* Object type + Region */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1F2E] rounded-xl p-5 border border-[#D4AF37]/10">
                <p className="text-sm text-[#A0A0A0] mb-3">Тип объекта</p>
                <div className="flex flex-col gap-2">
                  {[{ k: "secondary", l: "Вторичка" }, { k: "new", l: "Новостройка (+15%)" }].map(o => (
                    <button key={o.k} onClick={() => setObjectType(o.k)} className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${objectType === o.k ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0] hover:text-[#F5F5F5]"}`}>{o.l}</button>
                  ))}
                </div>
              </div>
              <div className="bg-[#1A1F2E] rounded-xl p-5 border border-[#D4AF37]/10">
                <p className="text-sm text-[#A0A0A0] mb-3">Регион</p>
                <div className="flex flex-col gap-2">
                  {[{ k: "moscow", l: "Москва" }, { k: "mo", l: "Моск. обл. (−10%)" }].map(o => (
                    <button key={o.k} onClick={() => setRegion(o.k)} className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${region === o.k ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0] hover:text-[#F5F5F5]"}`}>{o.l}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Level */}
            <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
              <p className="text-sm text-[#A0A0A0] mb-3">Уровень отделки</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(TIERS).map(([k, t]) => (
                  <button key={k} onClick={() => handleLevelChange(k)} className={`py-3 px-2 rounded-lg text-center transition-all ${level === k ? "bg-[#D4AF37] text-[#0F1419] shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "bg-[#252C3D] text-[#A0A0A0] hover:text-[#F5F5F5]"}`}>
                    <div className="text-sm font-semibold">{t.label}</div>
                    <div className={`text-[10px] mt-1 ${level === k ? "text-[#0F1419]/70" : "text-[#A0A0A0]/60"}`}>{(t.min / 1000).toFixed(0)}–{(t.max / 1000).toFixed(0)} тыс/м²</div>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {TIERS[level].features.map(f => (
                  <span key={f} className="text-[10px] px-2 py-1 bg-[#0F1419]/50 rounded text-[#A0A0A0] border border-[#D4AF37]/5">{f}</span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
              <p className="text-sm text-[#A0A0A0] mb-3">График работ</p>
              <div className="flex gap-2">
                <button onClick={() => setTimeline("normal")} className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${timeline === "normal" ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0]"}`}>Обычный</button>
                <button onClick={() => setTimeline("expedited")} className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${timeline === "expedited" ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0]"}`}>Ускоренный +15%</button>
              </div>
            </div>

            {/* Premium options */}
            <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
              <p className="text-sm text-[#A0A0A0] mb-3 font-medium">Дополнительные опции</p>
              <div className="grid grid-cols-2 gap-2">
                {availableOptions.map(opt => {
                  const Icon = opt.icon;
                  const isSelected = selectedOptions.includes(opt.id);
                  return (
                    <button key={opt.id} onClick={() => toggleOption(opt.id)} className={`p-3 rounded-lg transition-all flex items-center gap-2 text-xs ${isSelected ? "bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37]" : "bg-[#0F1419] border border-[#D4AF37]/10 text-[#A0A0A0] hover:text-[#D4AF37] hover:border-[#D4AF37]/30"}`}>
                      <Icon size={14} className="flex-shrink-0" />
                      <div className="text-left">
                        <div className="font-medium leading-tight">{opt.label}</div>
                        <div className="text-[10px] opacity-70">+{fmtShort(opt.price)}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Design project */}
            {availableDesigns.length > 0 && (
              <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10">
                <p className="text-sm text-[#A0A0A0] mb-3 font-medium">Дизайн-проект</p>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setSelectedDesign(null)} className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${!selectedDesign ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0]"}`}>Не нужен</button>
                  {availableDesigns.map(d => (
                    <button key={d.id} onClick={() => setSelectedDesign(d.id)} className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${selectedDesign === d.id ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#A0A0A0]"}`}>
                      <span>{d.label}</span>
                      <span className={selectedDesign === d.id ? "text-[#0F1419]/70" : "text-[#A0A0A0]/60"}>{(d.perSqm / 1000).toFixed(1)} тыс/м²</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT: Results / Contact form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <AnimatePresence mode="wait">
              {showContactForm ? (
                <CalculatorContactForm
                  key="form"
                  estimatedBudget={estimate.total}
                  area={area}
                  calcSummary={calcSummary}
                  onBack={() => setShowContactForm(false)}
                />
              ) : (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#252C3D] rounded-xl p-6 border-2 border-[#D4AF37]/30">
                    <p className="text-sm text-[#A0A0A0] mb-1">Примерная стоимость ремонта</p>
                    <motion.p key={Math.round(estimate.total)} initial={{ scale: 0.97 }} animate={{ scale: 1 }} className="text-4xl font-bold text-gold-gradient mb-1 font-heading">
                      {fmtShort(estimate.total)}
                    </motion.p>
                    <p className="text-xs text-[#A0A0A0]">{fmtFull(estimate.total)}</p>
                    <p className="text-xs text-[#A0A0A0] mt-1">~{fmtShort(estimate.perSqm)}/м²</p>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-[#1A1F2E] rounded-xl p-5 border border-[#D4AF37]/10 space-y-2.5 text-sm">
                    <p className="text-xs text-[#A0A0A0] font-medium mb-2">Детализация сметы:</p>
                    <BreakdownRow label={`Базовая стоимость (${area} м² × ${fmtShort(estimate.perSqm)})`} value={estimate.baseCost} />
                    {estimate.newBuildMarkup > 0 && <BreakdownRow label="Наценка за новостройку (+15%)" value={estimate.newBuildMarkup} />}
                    {estimate.scaleDiscount > 0 && <BreakdownRow label="Скидка за масштаб" value={-estimate.scaleDiscount} />}
                    {estimate.expeditedMarkup > 0 && <BreakdownRow label="Ускоренный график (+15% работ)" value={estimate.expeditedMarkup} />}
                    {estimate.extraPrice > 0 && <BreakdownRow label="Дополнительные опции" value={estimate.extraPrice} />}
                    {estimate.designCost > 0 && <BreakdownRow label="Дизайн-проект" value={estimate.designCost} />}
                    {estimate.regionDiscount > 0 && <BreakdownRow label="Региональная скидка (МО −10%)" value={-estimate.regionDiscount} />}
                    <div className="border-t border-[#D4AF37]/10 pt-2.5 mt-2">
                      <BreakdownRow label="Подытог" value={estimate.subtotal} bold />
                    </div>
                    <BreakdownRow label={`Резерв на непредвиденное (${estimate.reservePercent}%)`} value={estimate.reserve} muted />
                    <div className="flex items-start gap-1.5 text-[11px] text-[#A0A0A0]/60">
                      <Info size={12} className="flex-shrink-0 mt-0.5" />
                      <span>Резерв может не понадобиться — показан для прозрачности. Фактическая стоимость зависит от состояния объекта.</span>
                    </div>
                    <div className="border-t border-[#D4AF37]/10 pt-2.5 mt-2">
                      <BreakdownRow label="Итого" value={estimate.total} bold large />
                    </div>
                  </div>

                  <button onClick={handleGetQuote} className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all text-base flex items-center justify-center gap-2">
                    Получить точную смету <ArrowRight size={18} />
                  </button>
                  <p className="text-center text-xs text-[#A0A0A0]/60">Расчёт носит предварительный характер. Точная смета — после выезда замерщика.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BreakdownRow({ label, value, bold, muted, large }) {
  const isNeg = value < 0;
  return (
    <div className="flex justify-between items-baseline">
      <span className={`${muted ? "text-[#A0A0A0]/70" : "text-[#A0A0A0]"} ${bold ? "font-medium text-[#F5F5F5]" : ""}`}>{label}</span>
      <span className={`${isNeg ? "text-green-400" : (bold ? "text-[#D4AF37]" : "text-[#F5F5F5]")} ${bold ? "font-semibold" : "font-medium"} ${large ? "text-base" : ""}`}>
        {isNeg ? "−" : ""}{fmtFull(Math.abs(value))}
      </span>
    </div>
  );
}