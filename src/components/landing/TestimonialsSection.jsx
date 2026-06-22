import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/images";

const reviews = [
  { name: "Марина Петрова", role: "Владелица квартиры 120 кв.м", text: "Невероятное качество работы! Каждая деталь продумана до мелочей. Ремонт был сделан точно в срок, а результат превзошёл все ожидания.", rating: 5, project: "Квартира в центре Москвы" },
  { name: "Алексей Иванов", role: "Владелец коттеджа", text: "Профессиональная команда, которая реально знает своё дело. Дизайн получился роскошным, а качество отделки на высшем уровне.", rating: 5, project: "Коттедж 300 кв.м" },
  { name: "Елена Козлова", role: "Бизнес-леди", text: "Работали с А СТРОЙ уже дважды — и для квартиры, и для дачи. Оба раза результат был безупречным. Рекомендую всем!", rating: 5, project: "Дачный дом" },
  { name: "Дмитрий Соколов", role: "IT-предприниматель", text: "Качество работ и материалов на уровне премиум-класса. Менеджер был на связи 24/7. Превосходный сервис от начала до конца.", rating: 5, project: "Студия 80 кв.м" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#1A1F2E]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase">Отзывы</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
            Что говорят <span className="text-gold-gradient">клиенты</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-[#0F1419] border border-[#D4AF37]/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={TESTIMONIALS[i % TESTIMONIALS.length]}
                    alt={r.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/30"
                  />
                  <div>
                    <p className="text-[#F5F5F5] font-medium text-sm">{r.name}</p>
                    <p className="text-[#A0A0A0] text-xs">{r.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-3">{r.text}</p>
                <p className="text-xs text-[#D4AF37]/60">{r.project}</p>
              </motion.div>
            ))}
          </div>

          {/* Rating block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1A1F2E] to-[#252C3D] rounded-xl p-8 flex flex-col items-center justify-center text-center border border-[#D4AF37]/10"
          >
            <div className="text-7xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-heading)" }}>4.9</div>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-[#A0A0A0] text-sm mb-6">312 отзывов от реальных клиентов</p>
            <div className="space-y-2 w-full">
              {["Яндекс.Карты", "Google", "2GIS"].map(p => (
                <div key={p} className="flex items-center justify-between px-4 py-2 bg-[#0F1419]/50 rounded-lg">
                  <span className="text-sm text-[#F5F5F5]">{p}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={10} className="text-[#D4AF37] fill-[#D4AF37]" />)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}