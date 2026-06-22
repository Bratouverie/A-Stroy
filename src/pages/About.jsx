import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import MetaHead from "@/components/MetaHead";
import { ABOUT, TEAM } from "@/lib/images";

const TEAM_MEMBERS = [
  { name: "Александр С.", role: "Главный дизайнер", exp: "12 лет", spec: "Арт-деко, минимализм, авторский дизайн" },
  { name: "Мария К.", role: "Дизайнер интерьеров", exp: "8 лет", spec: "Скандинавский стиль, эклектика" },
  { name: "Дмитрий В.", role: "Прораб", exp: "15 лет", spec: "Капитальный ремонт, инженерные системы" },
  { name: "Елена П.", role: "Менеджер проектов", exp: "10 лет", spec: "Контроль сроков и бюджета" },
];

const VALUES = [
  "Качество без компромиссов",
  "Уважение к каждому клиенту",
  "Постоянное развитие и инновации",
  "Честность и открытость",
];

export default function About() {
  return (
    <PublicLayout>
      <MetaHead
        title="О компании | А СТРОЙ"
        description="А СТРОЙ — премиум ремонтная компания с 8+ летним опытом. 500+ завершённых проектов, 99.8% довольных клиентов. Москва и МО."
        keywords="о компании, А СТРОЙ, ремонтная компания Москва, история компании"
        canonical="/about"
      />
      {/* Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <img src={ABOUT.history} alt="О компании" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/80 to-[#0F1419]" />
        <div className="relative text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-3">
            О компании А СТРОЙ
          </motion.h1>
          <p className="text-base md:text-lg text-[#A0A0A0]">Создаём пространства, которые вдохновляют</p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src={ABOUT.studio} alt="Студия А СТРОЙ" className="rounded-2xl w-full h-[400px] object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-heading font-bold text-[#F5F5F5] mb-6">Наша история</h2>
            <div className="space-y-4 text-[#A0A0A0] leading-relaxed">
              <p>Компания А СТРОЙ была основана более 8 лет назад с простой идеей: делать премиальный ремонт доступным и прозрачным для каждого клиента.</p>
              <p>За эти годы мы выросли из небольшой команды в полноценную студию с собственным дизайн-отделом, инженерами и бригадами мастеров. Мы завершили более 500 проектов — от уютных квартир до роскошных коттеджей.</p>
              <p>Среди наших клиентов — звёзды шоу-бизнеса, бизнесмены и все, кто ценит качество и индивидуальный подход. Мы гордимся тем, что 99.8% клиентов рекомендуют нас друзьям.</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {VALUES.map(v => (
                <div key={v} className="flex items-center gap-2 text-sm text-[#F5F5F5]">
                  <Check size={16} className="text-[#D4AF37] flex-shrink-0" /> {v}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#1A1F2E]/50 border-y border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { v: "8+", l: "Лет на рынке" },
            { v: "500+", l: "Завершённых проектов" },
            { v: "99.8%", l: "Довольных клиентов" },
            { v: "2.5млн", l: "Кв.м отремонтировано" },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className="text-3xl lg:text-4xl font-heading font-bold text-gold-gradient mb-1">{s.v}</div>
              <p className="text-xs lg:text-sm text-[#A0A0A0]">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-[#F5F5F5] mb-3">Наша команда</h2>
          <p className="text-[#A0A0A0]">Профессионалы, которые делают ваш ремонт идеальным</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img src={TEAM[i]} alt={member.name} className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#F5F5F5]">{member.name}</h3>
              <p className="text-sm text-[#D4AF37] mt-1">{member.role}</p>
              <p className="text-xs text-[#A0A0A0] mt-1">Опыт: {member.exp}</p>
              <p className="text-xs text-[#A0A0A0] mt-2">{member.spec}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}