import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, Shield, Zap, Droplets, Volume2, Thermometer } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import MetaHead from "@/components/MetaHead";
import { serviceSchema } from "@/lib/schema";
import { Link } from "react-router-dom";
import { SERVICES_PAGE, PORTFOLIO_FEATURED, DACHA_BEFORE, DACHA_AFTER } from "@/lib/images";

const openChatBot = () => window.dispatchEvent(new Event("open-chatbot"));
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { ENGINEERING_SERVICES_DATA } from "@/lib/engineering-services";

const ICON_MAP = { Zap, Droplets, Volume2, Thermometer };

const SERVICES = [
  {
    title: "Полный ремонт с нуля",
    image: SERVICES_PAGE.fullRenovation,
    description: "Комплексный ремонт квартиры под ключ — от демонтажа до финальной уборки. Вы получаете готовое жильё, где продумана каждая деталь.",
    includes: ["Демонтаж старой отделки", "Возведение перегородок", "Электрика и сантехника", "Черновые и чистовые работы", "Установка сантехники и освещения", "Финальная уборка"],
    duration: "3-4 месяца",
    warranty: "5 лет",
  },
  {
    title: "Отделка и дизайн",
    image: SERVICES_PAGE.finishing,
    description: "Премиальная отделка помещений с использованием лучших материалов. Создаём интерьеры, которые впечатляют с первого взгляда.",
    includes: ["Стены: покраска, обои, декоративная штукатурка", "Полы: паркет, плитка, керамогранит", "Потолки: натяжные, многоуровневые", "Дизайнерская отделка стен", "Установка плинтусов и наличников"],
    duration: "1-2 месяца",
    warranty: "5 лет",
    price: "от 20,000 ₽/кв.м",
  },
  {
    title: "Ремонт дачного дома",
    image: SERVICES_PAGE.dacha,
    description: "Сохраняем характер дачного дома, добавляя современный комфорт. Утепление, перепланировка, новая отделка — в гармонии с природой.",
    includes: ["Утепление и гидроизоляция", "Замена окон и дверей", "Отделка фасада", "Внутренняя отделка", "Ландшафтное оформление"],
    duration: "2-3 месяца",
    warranty: "5 лет",
  },
  {
    title: "Ремонт коттеджа",
    image: SERVICES_PAGE.cottage,
    description: "Многоуровневые пространства, сложная инженерия и координация работ. Управляем проектом от идеи до сдачи под ключ.",
    includes: ["Координация всех этапов", "Многоуровневые планировки", "Сложная инженерия", "Системы умного дома", "Ландшафтный дизайн"],
    duration: "4-6 месяцев",
    warranty: "7 лет",
  },
  {
    title: "Дизайн интерьера",
    image: SERVICES_PAGE.design,
    description: "Авторский дизайн от главного дизайнера студии. Создаём уникальные интерьеры, отражающие вашу индивидуальность.",
    includes: ["Планировочное решение", "3D-визуализация", "Подбор материалов и мебели", "Цветовая схема", "Авторский надзор"],
    duration: "1-2 месяца",
    warranty: "—",
  },
];

export default function Services() {
  return (
    <PublicLayout>
      <MetaHead
        title="Услуги ремонта и дизайна | А СТРОЙ"
        description="Полный спектр премиум ремонтно-отделочных работ: полный ремонт под ключ, отделка, дизайн интерьера, ремонт дач и коттеджей. Гарантия 5-7 лет. Москва и МО."
        keywords="услуги ремонта, ремонт под ключ, отделка, дизайн интерьера, ремонт коттеджа, ремонт дачи"
        canonical="/services"
        schema={SERVICES.map(s => serviceSchema(s.title, s.description))}
      />
      {/* Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <img src={SERVICES_PAGE.banner} alt="Услуги" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/80 to-[#0F1419]" />
        <div className="relative text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-3">
            Наши услуги
          </motion.h1>
          <p className="text-base md:text-lg text-[#A0A0A0]">Полный спектр премиум ремонтно-отделочных работ</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-20 lg:space-y-32">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                {s.title === "Ремонт дачного дома" ? (
                  <div>
                    <p className="text-sm text-[#D4AF37] mb-3 text-center">👈 Потяните для сравнения «до» и «после»</p>
                    <BeforeAfterSlider beforeUrl={DACHA_BEFORE} afterUrl={DACHA_AFTER} />
                  </div>
                ) : (
                  <div className="relative group overflow-hidden rounded-2xl">
                    <img src={s.image} alt={s.title} className="w-full h-[300px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419]/60 to-transparent" />
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-[#F5F5F5] mb-4">{s.title}</h2>
                <p className="text-[#A0A0A0] mb-6 leading-relaxed">{s.description}</p>
                <ul className="space-y-2 mb-6">
                  {s.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#A0A0A0]">
                      <Check size={16} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
                    <Clock size={16} className="text-[#D4AF37]" /> {s.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
                    <Shield size={16} className="text-[#D4AF37]" /> Гарантия: {s.warranty}
                  </div>
                  {s.price && <div className="text-sm text-[#D4AF37] font-medium">{s.price}</div>}
                </div>
                <button onClick={openChatBot} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all text-sm">
                   Получить консультацию <ArrowRight size={16} />
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering services */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0F1419]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#D4AF37]/20" />
            <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase whitespace-nowrap">Инженерные системы</span>
            <div className="flex-1 h-px bg-[#D4AF37]/20" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-[#F5F5F5] mb-4">
            Основа любого <span className="text-gold-gradient">качественного ремонта</span>
          </h2>
          <p className="text-[#A0A0A0] max-w-2xl mx-auto text-lg leading-relaxed">
            Электрика, сантехника, звукоизоляция и тёплые полы — то, что делает квартиру по-настоящему комфортной. От доступных стандартных решений до премиум-сегмента с материалами REHAY.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGINEERING_SERVICES_DATA.map((s, i) => {
            const Icon = ICON_MAP[s.icon] || Zap;
            return (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-xl bg-[#1A1F2E] group h-full"
                >
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${s.segment === "Премиум" ? "bg-[#D4AF37] text-[#0F1419]" : "bg-[#252C3D] text-[#D4AF37] border border-[#D4AF37]/30"}`}>
                      {s.badge}
                    </span>
                  </div>
                  <div className="aspect-[5/3] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-[#F5F5F5] mb-2">{s.title}</h3>
                    <p className="text-sm text-[#A0A0A0] leading-relaxed mb-4 line-clamp-2">{s.shortDesc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#D4AF37] text-sm font-medium">{s.price}</span>
                      <span className="text-[#D4AF37] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Подробнее <ArrowRight size={14} />
                      </span>
                    </div>
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