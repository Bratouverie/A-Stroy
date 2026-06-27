import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Paintbrush, TreePine, Building2, Palette, ClipboardCheck, Zap, Droplets, Volume2, Thermometer } from "lucide-react";
import { SERVICES_LANDING, ENGINEERING_SERVICES } from "@/lib/images";

const mainItems = [
  { title: "Полный ремонт под ключ", desc: "Комплексный ремонт квартир и домов от демонтажа до финишной отделки", icon: Home },
  { title: "Отделка и дизайн", desc: "Премиум отделочные работы с использованием лучших материалов", icon: Paintbrush },
  { title: "Ремонт дачного дома", desc: "Сочетание деревенского уюта с современным комфортом", icon: TreePine },
  { title: "Ремонт коттеджа", desc: "Работа с многоуровневыми пространствами и интеграция умного дома", icon: Building2 },
  { title: "Дизайн интерьера", desc: "Авторский дизайн от лучшего дизайнера Москвы с 3D визуализацией", icon: Palette },
  { title: "Управление проектом", desc: "Один менеджер — вся ответственность. Контроль на каждом этапе", icon: ClipboardCheck },
];

const engineeringItems = [
  {
    title: "Электрика и автоматика",
    desc: "Медная проводка европейского стандарта, защита УЗО, умное управление освещением. Гарантия 5 лет.",
    icon: Zap,
    badge: "Премиум",
  },
  {
    title: "Сантехника RIHAO",
    desc: "Трубы RIHAO (Корея) — без ржавчины, без шума, 50 лет гарантии производителя. Чистая вода навсегда.",
    icon: Droplets,
    badge: "RIHAO",
  },
  {
    title: "Звукоизоляция",
    desc: "Защита от шума соседей, виброизоляция труб. Спите спокойно даже в центре Москвы.",
    icon: Volume2,
    badge: "Хит",
  },
  {
    title: "Тёплые полы",
    desc: "Водяные и электрические тёплые полы. Управление со смартфона. Экономия 15–20% на отоплении.",
    icon: Thermometer,
    badge: "Популярно",
  },
];

function ServiceCard({ item, index, image }) {
  const Icon = item.icon;
  return (
    <Link to="/services" className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="relative overflow-hidden rounded-xl cursor-pointer h-full"
        style={{ backgroundColor: index % 2 === 0 ? "#1A1F2E" : "#252C3D" }}
      >
        <div className="aspect-[5/4] overflow-hidden">
          <img
            src={image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
              <Icon size={20} className="text-[#D4AF37]" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
          <p className="text-sm text-[#A0A0A0] leading-relaxed mb-4">{item.desc}</p>
          <span className="text-[#D4AF37] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Подробнее <ArrowRight size={14} />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function EngineeringCard({ item, index, image }) {
  const Icon = item.icon;
  return (
    <Link to="/services" className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="relative overflow-hidden rounded-xl cursor-pointer h-full bg-[#1A1F2E]"
      >
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#D4AF37] text-[#0F1419]">
            {item.badge}
          </span>
        </div>
        <div className="aspect-[5/4] overflow-hidden">
          <img
            src={image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
              <Icon size={20} className="text-[#D4AF37]" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
          <p className="text-sm text-[#A0A0A0] leading-relaxed mb-4">{item.desc}</p>
          <span className="text-[#D4AF37] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Подробнее <ArrowRight size={14} />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ServicesGrid() {
  return (
    <>
      {/* Основные услуги */}
      <section id="services" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase">Наши услуги</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
              Полный спектр <span className="text-gold-gradient">премиум услуг</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainItems.map((item, i) => (
              <ServiceCard key={item.title} item={item} index={i} image={SERVICES_LANDING[i]} />
            ))}
          </div>
        </div>
      </section>

      {/* Инженерные работы */}
      <section id="engineering" className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Разделитель */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-[#D4AF37]/20" />
              <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase whitespace-nowrap">Инженерные системы</span>
              <div className="flex-1 h-px bg-[#D4AF37]/20" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
              Основа любого <span className="text-gold-gradient">качественного ремонта</span>
            </h2>
            <p className="mt-4 text-[#A0A0A0] max-w-2xl mx-auto text-lg leading-relaxed">
              Электрика, сантехника, звукоизоляция и тёплые полы — то, что делает квартиру по-настоящему комфортной. Маржинальные услуги с долгосрочной ценностью для заказчика.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringItems.map((item, i) => (
              <EngineeringCard key={item.title} item={item} index={i} image={ENGINEERING_SERVICES[i]} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
