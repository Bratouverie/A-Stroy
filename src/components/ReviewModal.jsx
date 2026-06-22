import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Star, Upload, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";

const REVIEW_TYPES = ["Владелец квартиры", "Владелец коттеджа", "Владелец дома", "Владелец студии", "Бизнесмен", "Бизнес-леди", "Другое"];
const OBJECT_TYPES = ["Квартира", "Дом", "Коттедж", "Студия", "Другое"];

export default function ReviewModal({ isOpen, onClose, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [reviewType, setReviewType] = useState("Владелец квартиры");
  const [objectType, setObjectType] = useState("Квартира");
  const [objectOther, setObjectOther] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !text) return;
    setSubmitting(true);
    try {
      let photoUrl = null;
      if (photo) {
        const uploadRes = await base44.integrations.Core.UploadFile({ file: photo });
        photoUrl = uploadRes.file_url;
      }

      const finalObjectType = objectType === "Другое" ? (objectOther || "Другое") : objectType;

      const review = await base44.entities.Review.create({
        name,
        reviewType,
        objectType: finalObjectType,
        text,
        photo: photoUrl,
        rating,
        status: "published",
      });

      setSubmitted(true);
      onReviewAdded?.(review);

      setTimeout(() => {
        setName(""); setReviewType("Владелец квартиры");
        setObjectType("Квартира"); setObjectOther("");
        setText(""); setPhoto(null); setPhotoPreview(null);
        setRating(5); setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Review submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#1A1F2E] rounded-2xl p-6 max-w-2xl w-full border border-[#D4AF37]/20 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#1A1F2E] z-10 pb-4 border-b border-[#D4AF37]/10">
          <h2 className="text-2xl font-bold text-[#F5F5F5]" style={{ fontFamily: "var(--font-heading)" }}>Поделитесь опытом</h2>
          <button onClick={onClose} className="text-[#A0A0A0] hover:text-[#D4AF37]">
            <X size={24} />
          </button>
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check size={32} className="text-green-400" />
            </motion.div>
            <p className="text-[#D4AF37] font-semibold mb-2 text-lg">Спасибо за отзыв! ✓</p>
            <p className="text-[#A0A0A0] text-sm">Ваш отзыв опубликован и виден всем клиентам</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Ваше имя *</label>
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя"
                className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-[#F5F5F5] placeholder-[#A0A0A0] focus:border-[#D4AF37]/40 focus:outline-none transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Вы *</label>
              <select value={reviewType} onChange={e => setReviewType(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-[#F5F5F5] focus:border-[#D4AF37]/40 focus:outline-none">
                {REVIEW_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Объект ремонта *</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {OBJECT_TYPES.map(type => (
                  <button key={type} type="button" onClick={() => { setObjectType(type); if (type !== "Другое") setObjectOther(""); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${objectType === type ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#0F1419] border border-[#D4AF37]/20 text-[#A0A0A0] hover:text-[#D4AF37]"}`}>
                    {type}
                  </button>
                ))}
              </div>
              {objectType === "Другое" && (
                <input value={objectOther} onChange={e => setObjectOther(e.target.value)} placeholder="Укажите тип объекта"
                  className="w-full px-4 py-2 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-[#F5F5F5] placeholder-[#A0A0A0] focus:border-[#D4AF37]/40 focus:outline-none" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Ваш отзыв *</label>
              <textarea required value={text} onChange={e => setText(e.target.value)}
                placeholder="Напишите о вашем опыте работы с А СТРОЙ (минимум 20 символов)" minLength={20} maxLength={500}
                className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-[#F5F5F5] placeholder-[#A0A0A0] resize-none h-28 focus:border-[#D4AF37]/40 focus:outline-none transition-colors" />
              <p className="text-xs text-[#A0A0A0]/60 mt-1">{text.length}/500</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Фото помещения (опционально)</label>
              <div onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D4AF37]/30 rounded-lg p-6 text-center cursor-pointer hover:border-[#D4AF37]/60 transition-colors">
                {photoPreview ? (
                  <div className="space-y-2">
                    <img src={photoPreview} alt="Предпросмотр" className="max-h-32 mx-auto rounded" />
                    <button type="button" onClick={e => { e.stopPropagation(); setPhoto(null); setPhotoPreview(null); }}
                      className="text-xs text-[#D4AF37] hover:underline">Выбрать другое фото</button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload size={32} className="mx-auto text-[#D4AF37]/60" />
                    <p className="text-sm text-[#A0A0A0]">Выберите фото вашего проекта</p>
                    <p className="text-xs text-[#A0A0A0]/60">JPG, PNG до 5 МБ</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Оценка *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(r => (
                  <button key={r} type="button" onClick={() => setRating(r)} className="p-1 transition-transform hover:scale-110">
                    <Star size={24} className={r <= rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#A0A0A0]"} />
                  </button>
                ))}
              </div>
            </div>

            <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              {submitting ? "Отправка..." : "Опубликовать отзыв"}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}