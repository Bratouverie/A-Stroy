import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Paintbrush, TreePine, Building2, Palette, ClipboardCheck } from "lucide-react";
import { SERVICES_LANDING } from "@/lib/images";

const items = [
  { title: "Полный ремонт под ключ", desc: "Комплексный ремонт квартир и домов от демонтажа до финишной отделки", icon: Home },
  { title: "Отделка и дизайн", desc: "Премиум отделочные работы с использованием лучших материалов", icon: Paintbrush },
  { title: "Ремонт дачного дома", desc: "Сочетание деревенского уюта с современным комфортом", icon: TreePine },
  { title: "Ремонт коттеджа", desc: "Работа с многоуровневыми пространствами и интеграция умного дома", icon: Building2 },
  { title: "Дизайн интерьера", desc: "Авторский дизайн от лучшего дизайнера Москвы с 3D визуализацией", icon: Palette },
  { title: "Управление проектом", desc: "Один менеджер — вся ответственность. Контроль на каждом этапе", icon: ClipboardCheck },
];

export default function ServicesGrid() {
  return (
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
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to="/services"
                className="block group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative overflow-hidden rounded-xl cursor-pointer h-full"
                  style={{ backgroundColor: i % 2 === 0 ? "#1A1F2E" : "#252C3D" }}
                >
                  <div className="aspect-[5/4] overflow-hidden">
                    <img
                      src={SERVICES_LANDING[i]}
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
          })}
        </div>
      </div>
    </section>
  );
}