import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ChevronDown, Check } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PublicLayout from "@/components/layout/PublicLayout";
import MetaHead from "@/components/MetaHead";
import { faqSchema } from "@/lib/schema";
import { base44 } from "@/api/base44Client";
import { CONTACTS } from "@/lib/images";

const FAQ = [
  { q: "Как рассчитывается стоимость ремонта?", a: "Стоимость зависит от площади, уровня отделки (премиум/люкс/эксклюзив) и состояния помещения. Точную смету менеджер рассчитает после консультации. Ориентировочно: премиум от 30,000 ₽/кв.м, люкс от 45,000 ₽/кв.м." },
  { q: "Какие сроки выполнения работ?", a: "Для квартиры 80-100 кв.м — 2-3 месяца, для 100+ кв.м — 3-4 месяца, коттедж 200+ кв.м — 4-6 месяцев. Возможен ускоренный темп с доплатой 15-20%." },
  { q: "Какая гарантия на работы?", a: "Мы предоставляем гарантию 5 лет на все виды работ. Для люкс-проектов — расширенная гарантия 7 лет." },
  { q: "Можно ли начать срочно?", a: "Да, мы можем начать в течение недели, но это потребует увеличения бюджета на 15-20% за ускоренный темп работ." },
  { q: "С какими материалами вы работаете?", a: "Только с премиальными материалами от проверенных брендов: мрамор, дизайнерская плитка, паркет, декоративная штукатурка и другие." },
  { q: "Что входит в услугу «под ключ»?", a: "Полный цикл: от демонтажа до финальной уборки. Включает все работы, материалы, установку сантехники и освещения. Вы получаете готовое жильё." },
  { q: "Вы работаете с нежилыми помещениями?", a: "Мы специализируемся на жилых помещениях: квартиры, дома, коттеджи, дачи. Для коммерческих помещений — индивидуальное обсуждение." },
  { q: "Как происходит оплата?", a: "Оплата поэтапная: первый платёж при подписании договора, промежуточные — по завершении этапов, финальный — при сдаче проекта." },
];

export default function Contacts() {
  const [form, setForm] = useState({ clientName: "", clientPhone: "", clientEmail: "", objectType: "apartment", area: 60, notes: "" });
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree || !form.clientName || !form.clientPhone) return;
    setSubmitting(true);
    try {
      await base44.entities.Lead.create({
        ...form,
        status: "received",
        source: "contact_form",
        priority: "medium",
        estimatedBudget: form.area * 35000,
      });
      setSuccess(true);
      setForm({ clientName: "", clientPhone: "", clientEmail: "", objectType: "apartment", area: 60, notes: "" });
    } catch (err) {
      console.error("Form submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <MetaHead
        title="Контакты | А СТРОЙ"
        description="Свяжитесь с А СТРОЙ — премиум ремонт в Москве. Телефон: 8(495)123-45-67, Email: info@a-stroy.ru. Москва, ул. Тверская, 1. Консультация бесплатна."
        keywords="контакты, телефон, адрес, А СТРОЙ, ремонт Москва, консультация"
        canonical="/contacts"
        schema={faqSchema(FAQ)}
      />
      {/* Banner */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center justify-center">
        <img src={CONTACTS} alt="Контакты" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/80 to-[#0F1419]" />
        <div className="relative text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-3">
            Контакты
          </motion.h1>
          <p className="text-base text-[#A0A0A0]">Свяжитесь с нами — консультация бесплатна</p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Phone, label: "Телефон", value: "8(495)123-45-67", href: "tel:+74951234567" },
            { icon: Mail, label: "Email", value: "info@a-stroy.ru", href: "mailto:info@a-stroy.ru" },
            { icon: MapPin, label: "Адрес", value: "Москва, ул. Тверская, 1", href: null },
            { icon: Clock, label: "Часы работы", value: "Пн-Пт 9:00-20:00", href: null },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-5 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3">
                <c.icon size={20} className="text-[#D4AF37]" />
              </div>
              <p className="text-xs text-[#A0A0A0] mb-1">{c.label}</p>
              {c.href ? (
                <a href={c.href} className="text-sm font-medium text-[#F5F5F5] hover:text-[#D4AF37] transition-colors">{c.value}</a>
              ) : (
                <p className="text-sm font-medium text-[#F5F5F5]">{c.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Messengers */}
        <div className="flex justify-center gap-3 mt-8">
          <a href="https://wa.me/" target="_blank" rel="noopener" className="flex items-center gap-2 px-5 py-2.5 bg-[#1A1F2E] border border-[#D4AF37]/20 rounded-lg text-sm text-[#F5F5F5] hover:border-[#D4AF37]/40 transition-colors">
            <MessageCircle size={16} className="text-[#D4AF37]" /> WhatsApp
          </a>
          <a href="https://t.me/" target="_blank" rel="noopener" className="flex items-center gap-2 px-5 py-2.5 bg-[#1A1F2E] border border-[#D4AF37]/20 rounded-lg text-sm text-[#F5F5F5] hover:border-[#D4AF37]/40 transition-colors">
            <Send size={16} className="text-[#D4AF37]" /> Telegram
          </a>
        </div>
      </section>

      {/* Form + Map */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-2xl p-6 lg:p-8">
            <h2 className="text-2xl font-heading font-bold text-[#F5F5F5] mb-2">Оставить заявку</h2>
            <p className="text-sm text-[#A0A0A0] mb-6">Менеджер свяжется с вами в течение 30 минут</p>

            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Check size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-[#F5F5F5] mb-2">Заявка отправлена!</h3>
                <p className="text-sm text-[#A0A0A0]">Мы свяжемся с вами в ближайшее время.</p>
                <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-[#D4AF37] hover:underline">Отправить ещё одну</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input required value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} placeholder="Ваше имя *"
                  className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40" />
                <input required value={form.clientPhone} onChange={e => setForm({ ...form, clientPhone: e.target.value })} placeholder="Телефон *"
                  className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40" />
                <input value={form.clientEmail} onChange={e => setForm({ ...form, clientEmail: e.target.value })} placeholder="Email"
                  className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40" />
                <div className="grid grid-cols-2 gap-3">
                  <select value={form.objectType} onChange={e => setForm({ ...form, objectType: e.target.value })}
                    className="px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]/40">
                    <option value="apartment">Квартира</option>
                    <option value="house">Дом</option>
                    <option value="cottage">Коттедж</option>
                    <option value="dacha">Дача</option>
                  </select>
                  <input type="number" value={form.area || ""} onChange={e => setForm({ ...form, area: parseInt(e.target.value) || 0 })} placeholder="Площадь, кв.м" min={40} max={900}
                    className="px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]/40" />
                </div>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Комментарий" rows={3}
                  className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40 resize-none" />
                <label className="flex items-start gap-2 text-xs text-[#A0A0A0] cursor-pointer">
                  <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-0.5 accent-[#D4AF37]" />
                  <span>Я согласен с обработкой персональных данных и <Link to="/privacy-policy" className="text-[#D4AF37] hover:underline">политикой конфиденциальности</Link></span>
                </label>
                <button type="submit" disabled={!agree || submitting}
                  className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Отправка..." : "Отправить заявку"}
                </button>
              </form>
            )}
          </div>

          {/* Interactive map */}
          <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-2xl overflow-hidden min-h-[400px] relative">
            <MapContainer
              center={[55.7558, 37.6173]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%", minHeight: "400px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              <Marker position={[55.7558, 37.6173]}>
                <Popup>
                  <strong>А СТРОЙ</strong><br />
                  ул. Тверская, 1<br />
                  8(495)123-45-67
                </Popup>
              </Marker>
            </MapContainer>
            <div className="absolute bottom-4 left-4 right-4 bg-[#0F1419]/90 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl p-4 flex items-center justify-between gap-3 z-[1000]">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-[#D4AF37] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#F5F5F5]">Москва, ул. Тверская, 1</p>
                  <p className="text-xs text-[#A0A0A0]">м. Охотный ряд — 5 минут пешком</p>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Москва+Тверская+1" target="_blank" rel="noopener" className="flex-shrink-0 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm rounded-lg hover:bg-[#D4AF37]/20 transition-colors">
                Маршрут
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-[#F5F5F5] mb-8 text-center">Часто задаваемые вопросы</h2>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div key={i} className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium text-[#F5F5F5]">{item.q}</span>
                <ChevronDown size={18} className={`text-[#D4AF37] transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm text-[#A0A0A0] leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}