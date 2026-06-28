import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Clock, Shield, ArrowRight, ArrowLeft, ChevronDown, Star, Zap, Droplets, Volume2, Thermometer } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import MetaHead from "@/components/MetaHead";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { ENGINEERING_SERVICES_DATA, COMPARISON_TABLES } from "@/lib/engineering-services";

const ICON_MAP = { Zap, Droplets, Volume2, Thermometer };

function FaqItem({ item }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-[#D4AF37]/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-base text-[#F5F5F5] font-medium pr-4">{item.q}</span>
        <ChevronDown size={20} className={`text-[#D4AF37] flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
          <p className="pb-5 text-[#A0A0A0] leading-relaxed text-sm">{item.a}</p>
        </motion.div>
      )}
    </div>
  );
}

function ComparisonTable({ title, rows }) {
  return (
    <div className="bg-[#1A1F2E] rounded-2xl border border-[#D4AF37]/10 overflow-hidden">
      <div className="px-6 py-4 bg-[#0F1419] border-b border-[#D4AF37]/10">
        <h3 className="text-lg font-heading font-bold text-[#D4AF37]">{title}</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#D4AF37]/10">
            <th className="text-left px-6 py-3 text-xs text-[#A0A0A0] uppercase tracking-wider">Параметр</th>
            <th className="text-left px-6 py-3 text-xs text-[#A0A0A0] uppercase tracking-wider">Стандарт</th>
            <th className="text-left px-6 py-3 text-xs text-[#D4AF37] uppercase tracking-wider">Премиум</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#D4AF37]/5 last:border-0">
              <td className="px-6 py-3 text-sm text-[#A0A0A0]">{row.param}</td>
              <td className="px-6 py-3 text-sm text-[#F5F5F5]">{row.basic}</td>
              <td className="px-6 py-3 text-sm text-[#D4AF37] font-medium">{row.premium}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EngineeringServiceDetail() {
  const { slug } = useParams();
  const service = ENGINEERING_SERVICES_DATA.find(s => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = ICON_MAP[service.icon] || Zap;
  const relatedServices = ENGINEERING_SERVICES_DATA.filter(s => s.slug !== slug).slice(0, 3);
  const isPlumbing = slug.includes("santehnika");
  const isElectric = slug.includes("elektrik");
  const comparisonType = isPlumbing ? "plumbing" : isElectric ? "electric" : null;
  const comparisonData = comparisonType ? COMPARISON_TABLES[comparisonType] : null;

  return (
    <PublicLayout>
      <MetaHead
        title={service.seoTitle}
        description={service.seoDescription}
        canonical={`/services/${service.slug}`}
        schema={[
          serviceSchema(service.title, service.shortDesc),
          faqSchema(service.faq),
        ]}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center">
        <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/70 via-[#0F1419]/80 to-[#0F1419]" />
        <div className="relative text-center px-4 max-w-3xl">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors mb-6">
            <ArrowLeft size={16} /> Все услуги
          </Link>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 items-center justify-center mb-6 mx-auto"
          >
            <Icon size={32} className="text-[#D4AF37]" />
          </motion.div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#D4AF37] text-[#0F1419] mb-4 inline-block">
            {service.badge}
          </span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-heading font-bold text-gold-gradient mb-4">
            {service.title}
          </motion.h1>
          <p className="text-base md:text-lg text-[#A0A0A0] leading-relaxed max-w-2xl mx-auto">{service.shortDesc}</p>
        </div>
      </section>

      {/* Quick info bar */}
      <section className="border-b border-[#D4AF37]/10 bg-[#1A1F2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#D4AF37]">{service.price}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
              <Clock size={18} className="text-[#D4AF37]" /> {service.duration}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
              <Shield size={18} className="text-[#D4AF37]" /> {service.warranty}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: description + includes */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-[#F5F5F5] mb-6">Описание услуги</h2>
              <div className="space-y-4">
                {service.fullDesc.map((p, i) => (
                  <p key={i} className="text-[#A0A0A0] leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-[#F5F5F5] mb-6">Что входит в услугу</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[#1A1F2E] rounded-xl border border-[#D4AF37]/10">
                    <Check size={18} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#F5F5F5]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-[#F5F5F5] mb-6">Почему это важно</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.advantages.map((adv, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-[#1A1F2E] rounded-2xl border border-[#D4AF37]/10"
                  >
                    <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">{adv.title}</h3>
                    <p className="text-sm text-[#A0A0A0] leading-relaxed">{adv.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            {comparisonData && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-[#F5F5F5] mb-6">Сравнение: Стандарт vs Премиум</h2>
                <ComparisonTable title={service.title} rows={comparisonData} />
              </div>
            )}

            {/* Client story */}
            <div className="p-8 bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] rounded-2xl border border-[#D4AF37]/20">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />)}
              </div>
              <p className="text-lg text-[#F5F5F5] italic leading-relaxed mb-6">«{service.clientStory.quote}»</p>
              <div className="border-t border-[#D4AF37]/10 pt-4">
                <p className="text-sm font-semibold text-[#D4AF37]">{service.clientStory.name}</p>
                <p className="text-xs text-[#A0A0A0] mt-2"><span className="text-[#F5F5F5]">Проблема:</span> {service.clientStory.problem}</p>
                <p className="text-xs text-[#A0A0A0] mt-1"><span className="text-[#F5F5F5]">Решение:</span> {service.clientStory.solution}</p>
              </div>
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#1A1F2E] rounded-2xl border border-[#D4AF37]/20 p-8">
              <h3 className="text-xl font-heading font-bold text-[#F5F5F5] mb-2">Заказать услугу</h3>
              <p className="text-sm text-[#A0A0A0] mb-6">Получите бесплатную смету и консультацию специалиста</p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm border-b border-[#D4AF37]/10 pb-3">
                  <span className="text-[#A0A0A0]">Стоимость</span>
                  <span className="text-[#D4AF37] font-bold">{service.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm border-b border-[#D4AF37]/10 pb-3">
                  <span className="text-[#A0A0A0]">Сроки</span>
                  <span className="text-[#F5F5F5]">{service.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#A0A0A0]">Гарантия</span>
                  <span className="text-[#F5F5F5]">{service.warranty}</span>
                </div>
              </div>
              <button
                onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all text-sm mb-3"
              >
                Получить консультацию <ArrowRight size={16} />
              </button>
              <a href="tel:+79912959125" className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-[#D4AF37]/30 text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37]/10 transition-all text-sm">
                +7 (991) 295-91-25
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-[#F5F5F5] text-center mb-12">
          Часто задаваемые <span className="text-gold-gradient">вопросы</span>
        </h2>
        <div className="bg-[#1A1F2E] rounded-2xl border border-[#D4AF37]/10 px-6">
          {service.faq.map((item, i) => <FaqItem key={i} item={item} />)}
        </div>
      </section>

      {/* Related services */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-[#F5F5F5] text-center mb-12">
          Другие <span className="text-gold-gradient">инженерные услуги</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((s, i) => {
            const RelIcon = ICON_MAP[s.icon] || Zap;
            return (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative overflow-hidden rounded-xl bg-[#1A1F2E] group h-full"
                >
                  <div className="aspect-[5/3] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/40 to-transparent" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#D4AF37] text-[#0F1419]">{s.badge}</span>
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-3">
                      <RelIcon size={20} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-[#F5F5F5] mb-2">{s.title}</h3>
                    <p className="text-sm text-[#A0A0A0] leading-relaxed mb-3 line-clamp-2">{s.shortDesc}</p>
                    <span className="text-[#D4AF37] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Подробнее <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}