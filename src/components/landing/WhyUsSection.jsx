import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Gem, Zap } from "lucide-react";
import InteractiveTooltip from "@/components/InteractiveTooltip";

const items = [
  { num: "01", icon: Award, title: "Лучший дизайнер Москвы", desc: "Работаем с самым талантливым дизайнером, который создаёт пространства, в которые влюбляются с первого взгляда", tooltip: "Более 500 успешно завершённых проектов в Москве и МО. Работали с элитными клиентами и знаменитостями. Дизайнер — лауреат премии «Дизайн года 2024»." },
  { num: "02", icon: ShieldCheck, title: "Гарантия результата", desc: "Если дизайн не понравится — не берём деньги. Мы настолько уверены в качестве, что даём эту гарантию всем клиентам", tooltip: "Письменная гарантия 5 лет на все виды работ и 7 лет на люкс-проекты. Возможна расширенная гарантия до 10 лет. Гарантийный сервис в течение 48 часов." },
  { num: "03", icon: Gem, title: "Премиум качество", desc: "Только лучшие материалы, только лучшие мастера. Нет компромиссов в качестве. Экономия не в нашем словаре", tooltip: "Работаем только с премиум-материалами: мрамор Calacatta, массив дуба, микроцемент, декоративная штукатурка. Партнёры: Villeroy & Boch, Grohe, Bora, Gaggenau." },
  { num: "04", icon: Zap, title: "Скорость работы", desc: "Быстрее, чем конкуренты, но без потери качества. Организованный процесс = минимум проблем", tooltip: "Собственный штат из 40+ мастеров. Параллельное выполнение этапов работ. В среднем на 30% быстрее рынка. Онлайн-контроль через WhatsApp-чат проекта." },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm tracking-[3px] uppercase">Преимущества</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
            Почему <span className="text-gold-gradient">выбирают нас</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <InteractiveTooltip
                key={item.title}
                title={item.title}
                description={item.tooltip}
                icon={item.icon}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative p-6 rounded-xl bg-[#1A1F2E] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all group h-full"
                >
                  <span className="absolute top-4 right-4 text-5xl font-bold text-[#D4AF37]/5 group-hover:text-[#D4AF37]/10 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>{item.num}</span>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center mb-5">
                    <Icon size={28} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#F5F5F5] mb-3" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">{item.desc}</p>
                </motion.div>
              </InteractiveTooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
}