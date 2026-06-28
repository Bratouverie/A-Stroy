import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import MetaHead from "@/components/MetaHead";
import { base44 } from "@/api/base44Client";
import ReviewModal from "@/components/ReviewModal";

const STATIC_REVIEWS = [
  { name: "Марина Петрова", role: "Клиент", text: "Невероятное качество работы! Каждая деталь продумана до мелочей. Ремонт был сделан точно в срок, а результат превзошёл все ожидания.", rating: 5, project: "Квартира в центре Москвы", objectType: "Квартира", reviewType: "Клиент" },
  { name: "Алексей Иванов", role: "Клиент", text: "Профессиональная команда, которая реально знает своё дело. Дизайн получился роскошным, а качество отделки на высшем уровне.", rating: 5, project: "Коттедж 300 кв.м", objectType: "Коттедж", reviewType: "Клиент" },
  { name: "Елена Козлова", role: "Клиент", text: "Работали с А СТРОЙ уже дважды — и для квартиры, и для дачи. Оба раза результат был безупречным. Рекомендую всем!", rating: 5, project: "Дачный дом", objectType: "Дом", reviewType: "Клиент" },
  { name: "Дмитрий Соколов", role: "Клиент", text: "Качество работ и материалов на уровне премиум-класса. Менеджер был на связи 24/7. Превосходный сервис от начала до конца.", rating: 5, project: "Студия 80 кв.м", objectType: "Студия", reviewType: "Клиент" },
];

export default function Reviews() {
  const [dbReviews, setDbReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await base44.entities.Review.filter({ status: "published" }, "-created_date", 1000);
      setDbReviews(data || []);
    } catch (e) {
      console.error("Load reviews error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = (newReview) => {
    setDbReviews(prev => [newReview, ...prev]);
  };

  const allReviews = [...dbReviews, ...STATIC_REVIEWS];

  return (
    <PublicLayout>
      <MetaHead
        title="Отзывы клиентов | А СТРОЙ"
        description="Реальные отзывы клиентов А СТРОЙ о премиум ремонте и отделке. 312 довольных клиентов, рейтинг 4.9."
        canonical="/reviews"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-[#D4AF37] mb-8 transition-colors">
          <ArrowLeft size={16} /> На главную
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Отзывы <span className="text-gold-gradient">клиентов</span>
            </h1>
            <p className="text-[#A0A0A0]">Всего {allReviews.length} отзывов от довольных клиентов</p>
          </div>
          <button onClick={() => setReviewModalOpen(true)}
            className="px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-all text-sm font-medium flex items-center gap-2 self-start">
            <Plus size={16} /> Написать отзыв
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allReviews.map((review, i) => (
              <motion.div
                key={review.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-all"
              >
                {review.photo && (
                  <img src={review.photo} alt={review.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[#F5F5F5] font-semibold">{review.name}</p>
                    <p className="text-xs text-[#A0A0A0]">{review.reviewType || review.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating || 5 }).map((_, j) => (
                      <Star key={j} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#A0A0A0] mb-3 leading-relaxed">{review.text}</p>
                <div className="flex gap-2 flex-wrap">
                  {review.objectType && (
                    <span className="px-2 py-1 text-xs bg-[#D4AF37]/10 text-[#D4AF37] rounded">{review.objectType}</span>
                  )}
                  {review.project && (
                    <span className="px-2 py-1 text-xs bg-[#0F1419] text-[#A0A0A0] rounded">{review.project}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <ReviewModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} onReviewAdded={handleReviewAdded} />
    </PublicLayout>
  );
}