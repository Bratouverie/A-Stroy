import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function CalculatorContactForm({ estimatedBudget, area, calcSummary, onBack }) {
  const [contactData, setContactData] = useState({ clientName: "", clientPhone: "", clientEmail: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.clientName.trim() || !contactData.clientPhone.trim()) {
      setError("Заполните имя и телефон");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await base44.entities.Lead.create({
        clientName: contactData.clientName.trim(),
        clientPhone: contactData.clientPhone.trim(),
        clientEmail: contactData.clientEmail.trim() || undefined,
        objectType: "apartment",
        area: area,
        estimatedBudget: Math.round(estimatedBudget),
        status: "received",
        source: "calculator",
        priority: "medium",
        notes: calcSummary,
        tags: ["калькулятор"],
      });
      setSubmitted(true);
    } catch (err) {
      setError("Ошибка отправки. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1A1F2E] rounded-xl p-8 border-2 border-[#D4AF37]/30 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
          <Check size={32} className="text-green-400" />
        </div>
        <h3 className="text-xl font-heading font-bold text-[#F5F5F5] mb-2">Заявка отправлена!</h3>
        <p className="text-[#A0A0A0] text-sm mb-1">Менеджер свяжется с вами в течение 30 минут.</p>
        <p className="text-[#A0A0A0]/60 text-xs">Расчёт сохранён в CRM, мы уже готовим персональное предложение.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#1A1F2E] rounded-xl p-6 border border-[#D4AF37]/10"
    >
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-[#A0A0A0] hover:text-[#D4AF37] transition-colors mb-4">
        <ArrowLeft size={14} /> Вернуться к расчёту
      </button>

      <h3 className="text-lg font-heading font-bold text-[#F5F5F5] mb-1">Получить точную смету</h3>
      <p className="text-sm text-[#A0A0A0] mb-4">Заполните контакты — менеджер подготовит детальную смету и свяжется с вами в течение 30 минут.</p>

      <div className="bg-[#0F1419]/50 rounded-lg p-3 mb-4 border border-[#D4AF37]/10">
        <p className="text-xs text-[#A0A0A0]">Ваш расчёт отправлен в CRM:</p>
        <p className="text-lg font-semibold text-[#D4AF37] mt-1">
          {Math.round(estimatedBudget).toLocaleString("ru-RU")} ₽
        </p>
        <p className="text-xs text-[#A0A0A0]/60">Площадь: {area} м²</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={contactData.clientName}
          onChange={e => setContactData({ ...contactData, clientName: e.target.value })}
          placeholder="Ваше имя *"
          className="w-full px-4 py-3 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/60 focus:outline-none focus:border-[#D4AF37]/40 transition-colors"
        />
        <input
          value={contactData.clientPhone}
          onChange={e => setContactData({ ...contactData, clientPhone: e.target.value })}
          placeholder="Телефон *"
          type="tel"
          className="w-full px-4 py-3 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/60 focus:outline-none focus:border-[#D4AF37]/40 transition-colors"
        />
        <input
          value={contactData.clientEmail}
          onChange={e => setContactData({ ...contactData, clientEmail: e.target.value })}
          placeholder="Email (необязательно)"
          type="email"
          className="w-full px-4 py-3 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/60 focus:outline-none focus:border-[#D4AF37]/40 transition-colors"
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all text-base flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            <><Loader2 size={18} className="animate-spin" /> Отправка...</>
          ) : (
            "Отправить заявку"
          )}
        </button>

        <p className="text-center text-[11px] text-[#A0A0A0]/50">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
      </form>
    </motion.div>
  );
}