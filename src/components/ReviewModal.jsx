import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ReviewModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [project, setProject] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !text) return;
    setSubmitting(true);
    try {
      await base44.entities.Review.create({ name, text, rating, project, status: "pending" });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setRating(5);
        setName("");
        setText("");
        setProject("");
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Review submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1A1F2E] rounded-2xl p-6 max-w-lg w-full border border-[#D4AF37]/20"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#F5F5F5]" style={{ fontFamily: "var(--font-heading)" }}>Напишите отзыв</h2>
          <button onClick={onClose} className="text-[#A0A0A0] hover:text-[#D4AF37]">
            <X size={24} />
          </button>
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <p className="text-[#D4AF37] font-semibold mb-2 text-lg">✓ Спасибо за отзыв!</p>
            <p className="text-[#A0A0A0] text-sm">Ваш отзыв отправлен на модерацию. Он появится на сайте после проверки.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ваше имя *"
              className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40"
            />
            <input
              value={project}
              onChange={e => setProject(e.target.value)}
              placeholder="Проект (необязательно)"
              className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40"
            />
            <textarea
              required
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Ваш отзыв (минимум 20 символов) *"
              minLength={20}
              className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-[#F5F5F5] placeholder-[#A0A0A0] resize-none h-28 focus:outline-none focus:border-[#D4AF37]/40"
            />
            <div className="flex items-center gap-2">
              <p className="text-sm text-[#A0A0A0]">Оценка:</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(r => (
                  <button key={r} type="button" onClick={() => setRating(r)} className="p-1">
                    <Star size={20} className={r <= rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#A0A0A0]"} />
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50"
            >
              {submitting ? "Отправка..." : "Отправить отзыв"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}