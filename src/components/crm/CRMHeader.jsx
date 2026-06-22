import React from "react";
import { Menu, Bell, Search, Phone, LogOut } from "lucide-react";
import { crm_auth } from "@/lib/crm-auth";

export default function CRMHeader({ user, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0F1419]/90 backdrop-blur-xl border-b border-[#D4AF37]/10 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onToggleSidebar} className="lg:hidden text-[#F5F5F5]">
          <Menu size={22} />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" />
          <input
            type="text"
            placeholder="Поиск по заявкам, клиентам..."
            className="w-full pl-9 pr-4 py-2 bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a href="tel:+74951234567" className="flex items-center gap-2 text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors hidden md:flex">
          <Phone size={16} />
          <span>8(495)123-45-67</span>
        </a>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#1A1F2E] text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center text-[#0F1419] font-semibold text-sm">
            {(user?.full_name || user?.email || "A")[0].toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[#F5F5F5]">{user?.full_name || "Администратор"}</p>
            <p className="text-xs text-[#A0A0A0]">{user?.role === "admin" ? "Администратор" : "Сотрудник"}</p>
          </div>
          <button onClick={() => { crm_auth.logout(); window.location.href = "/crm-login"; }} className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1A1F2E] text-[#A0A0A0] hover:text-red-400 transition-colors" title="Выйти">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}