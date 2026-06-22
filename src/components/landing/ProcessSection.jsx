import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Lightbulb, FileCheck, Hammer, PartyPopper } from "lucide-react";
import InteractiveTooltip from "@/components/InteractiveTooltip";

const steps = [
  { icon: ClipboardList, title: "Консультация", desc: "Встреча, обсуждение идей и замеры", tooltip: "Бесплатный выезд замерщика. Обсуждаем идеи, бюджет, сроки. Делаем точные замеры помещения и фиксируем все пожелания." },
  { icon: Lightbulb, title: "Концепция", desc: "Несколько вариантов дизайна на выбор", tooltip: "Дизайнер готовит 2-3 варианта планировки и стиля. 3D-визуализация ключевых помещений. Подбор материалов и цветовых решений." },
  { icon: FileCheck, title: "Согласование", desc: "Финальный бюджет и сроки", tooltip: "Финальная смета с фиксированной ценой — никаких доплат. Прозрачный график работ. Подписание договора с гарантиями." },
  { icon: Hammer, title: "Реализация", desc: "Работа команды профессионалов", tooltip: "Собственная команда из 40+ мастеров. Еженедельные фотоотчёты в WhatsApp-чате проекта. Контроль качества на каждом этапе." },
  { icon: PartyPopper, title: "Результат", desc: "Ваше идеальное пространство", tooltip: "Финальная уборка. Приёмка работ с чек-листом. Передача ключей. Гарантийное обслуживание 5-7 лет." },
];

export default function ProcessSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase">Процесс</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
            Как мы <span className="text-gold-gradient">работаем</span>
          </h2>
        </motion.div>

        <div className="hidden lg:flex items-start justify-between relative">
          <div className="absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/40 to-[#D4AF37]/0" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <InteractiveTooltip
                key={s.title}
                title={s.title}
                description={s.tooltip}
                icon={s.icon}
                className="w-1/5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[#1A1F2E] border-2 border-[#D4AF37]/40 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-xs text-[#D4AF37]/60 mb-1">0{i + 1}</span>
                  <h3 className="text-lg font-semibold text-[#F5F5F5] mb-1" style={{ fontFamily: "var(--font-heading)" }}>{s.title}</h3>
                  <p className="text-sm text-[#A0A0A0]">{s.desc}</p>
                </motion.div>
              </InteractiveTooltip>
            );
          })}
        </div>

        <div className="lg:hidden space-y-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <InteractiveTooltip
                key={s.title}
                title={s.title}
                description={s.tooltip}
                icon={s.icon}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#1A1F2E] border-2 border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#D4AF37]" />
                    </div>
                    {i < steps.length - 1 && <div className="w-px flex-1 bg-[#D4AF37]/20 mt-2" />}
                  </div>
                  <div className="pb-4">
                    <span className="text-xs text-[#D4AF37]/60">0{i + 1}</span>
                    <h3 className="text-lg font-semibold text-[#F5F5F5]" style={{ fontFamily: "var(--font-heading)" }}>{s.title}</h3>
                    <p className="text-sm text-[#A0A0A0] mt-1">{s.desc}</p>
                  </div>
                </motion.div>
              </InteractiveTooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
}