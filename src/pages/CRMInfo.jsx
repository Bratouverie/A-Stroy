import React from "react";
import { Link } from "react-router-dom";
import { Lock, Users, Shield } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import MetaHead from "@/components/MetaHead";

export default function CRMInfo() {
  return (
    <PublicLayout>
      <MetaHead
        title="Панель управления"
        description="Закрытая CRM-панель для команды А СТРОЙ. Управление заявками, проектами и задачами."
        canonical="/crm-info"
      />
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
            <Lock size={28} className="text-[#D4AF37]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Панель <span className="text-gold-gradient">управления</span>
          </h1>
          <p className="text-[#A0A0A0]">Закрытая CRM-система для команды А СТРОЙ</p>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1A1F2E] p-6 rounded-xl border border-[#D4AF37]/10">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[#D4AF37] text-lg">📋</span>
              </div>
              <div>
                <h2 className="text-[#F5F5F5] font-semibold mb-1">Что это?</h2>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">Закрытая панель для менеджеров, дизайнеров и других членов команды А СТРОЙ для управления проектами, заявками и задачами.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1F2E] p-6 rounded-xl border border-[#D4AF37]/10">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[#D4AF37] text-lg">🔓</span>
              </div>
              <div>
                <h2 className="text-[#F5F5F5] font-semibold mb-1">Как войти?</h2>
                <ol className="list-decimal list-inside space-y-2 text-[#A0A0A0] text-sm">
                  <li>Нажмите кнопку «Вход» в верхнем меню</li>
                  <li>Введите email и пароль, выданные администратором</li>
                  <li>После входа перейдите на <code className="text-[#D4AF37]">/crm</code> для доступа к панели</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1F2E] p-6 rounded-xl border border-[#D4AF37]/10">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                <Users size={18} className="text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-[#F5F5F5] font-semibold mb-1">Роли в системе</h2>
                <ul className="space-y-1.5 text-[#A0A0A0] text-sm mt-2">
                  <li><strong className="text-[#F5F5F5]">Администратор:</strong> полный доступ ко всему</li>
                  <li><strong className="text-[#F5F5F5]">Менеджер:</strong> управление заявками и проектами</li>
                  <li><strong className="text-[#F5F5F5]">Дизайнер:</strong> работа с дизайн-проектами</li>
                  <li><strong className="text-[#F5F5F5]">Мастер:</strong> управление этапами работ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
            <Lock size={18} /> Войти в панель управления
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}