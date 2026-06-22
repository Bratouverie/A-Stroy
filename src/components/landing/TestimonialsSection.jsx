import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { TESTIMONIALS } from "@/lib/images";
import { base44 } from "@/api/base44Client";
import ReviewModal from "@/components/ReviewModal";

const staticReviews = [
  { name: "Марина Петрова", role: "Владелица квартиры 120 кв.м", text: "Невероятное качество работы! Каждая деталь продумана до мелочей. Ремонт был сделан точно в срок, а результат превзошёл все ожидания.", rating: 5, project: "Квартира в центре Москвы" },
  { name: "Алексей Иванов", role: "Владелец коттеджа", text: "Профессиональная команда, которая реально знает своё дело. Дизайн получился роскошным, а качество отделки на высшем уровне.", rating: 5, project: "Коттедж 300 кв.м" },
  { name: "Елена Козлова", role: "Бизнес-леди", text: "Работали с А СТРОЙ уже дважды — и для квартиры, и для дачи. Оба раза результат был безупречным. Рекомендую всем!", rating: 5, project: "Дачный дом" },
  { name: "Дмитрий Соколов", role: "IT-предприниматель", text: "Качество работ и материалов на уровне премиум-класса. Менеджер был на связи 24/7. Превосходный сервис от начала до конца.", rating: 5, project: "Студия 80 кв.м" },
];

export default function TestimonialsSection() {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [dbReviews, setDbReviews] = useState([]);

  useEffect(() => {
    base44.entities.Review.filter({ status: "approved" }, "-created_date", 10)
      .then(reviews => setDbReviews(reviews))
      .catch(() => {});
  }, []);

  const allReviews = [
    ...dbReviews.map(r => ({
      name: r.name,
      role: "Клиент А СТРОЙ",
      text: r.text,
      rating: r.rating,
      project: r.project || "Проект А СТРОЙ"
    })),
    ...staticReviews
  ];

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
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allReviews.map((r, i) => (
              <motion.div
                key={i}
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
                    <motion.div
                      key={j}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                    >
                      <Star size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-3">{r.text}</p>
                <p className="text-xs text-[#D4AF37]/60">{r.project}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1A1F2E] to-[#252C3D] rounded-xl p-8 flex flex-col items-center justify-center text-center border border-[#D4AF37]/10"
          >
            <div className="text-7xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-heading)" }}>4.9</div>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star size={20} className="text-[#D4AF37] fill-[#D4AF37]" />
                </motion.div>
              ))}
            </div>
            <p className="text-[#A0A0A0] text-sm mb-6">312 отзывов от реальных клиентов</p>
            <div className="space-y-2 w-full">
              {["Яндекс.Карты", "Google", "2GIS"].map((p, idx) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: "auto" }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.3, duration: 0.6 }}
                  className="flex items-center justify-between px-4 py-2 bg-[#0F1419]/50 rounded-lg w-full"
                >
                  <span className="text-sm text-[#F5F5F5]">{p}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.3 + j * 0.1 }}
                      >
                        <Star size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => setReviewModalOpen(true)}
              className="mt-6 px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Plus size={16} /> Написать отзыв
            </button>
          </motion.div>
        </div>
      </div>

      <ReviewModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} />
    </section>
  );
}