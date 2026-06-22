import React from "react";
import { Settings as SettingsIcon, Bell, Shield, Users, Building2 } from "lucide-react";

const SECTIONS = [
  { icon: Building2, title: "Профиль компании", desc: "Название, логотип, контакты" },
  { icon: Users, title: "Команда", desc: "Сотрудники и роли" },
  { icon: Bell, title: "Уведомления", desc: "Email и SMS уведомления" },
  { icon: Shield, title: "Безопасность", desc: "Доступ и пароли" },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[#F5F5F5]">Настройки</h1>
        <p className="text-sm text-[#A0A0A0] mt-1">Конфигурация CRM</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {SECTIONS.map(s => (
          <div key={s.title} className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-5 hover:border-[#D4AF37]/30 transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#F5F5F5]">{s.title}</h3>
                <p className="text-xs text-[#A0A0A0] mt-1">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-6">
        <h3 className="text-sm font-medium text-[#F5F5F5] mb-4">Интеграции</h3>
        <div className="space-y-3">
          {["WhatsApp Business", "Telegram Bot", "Yandex.Метрика", "Google Analytics", "Yookassa"].map(int => (
            <div key={int} className="flex items-center justify-between py-2 border-b border-[#D4AF37]/5 last:border-0">
              <span className="text-sm text-[#A0A0A0]">{int}</span>
              <span className="text-xs px-2 py-1 bg-[#0F1419] text-[#A0A0A0] rounded">Не подключено</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}