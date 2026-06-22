import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FolderKanban, CheckSquare, BarChart3, Settings, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { LOGO } from "@/lib/images";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Дашборд", path: "/crm" },
  { icon: Users, label: "Заявки", path: "/crm/leads" },
  { icon: FolderKanban, label: "Проекты", path: "/crm/projects" },
  { icon: CheckSquare, label: "Задачи", path: "/crm/tasks" },
  { icon: BarChart3, label: "Отчёты", path: "/crm/reports" },
  { icon: Settings, label: "Настройки", path: "/crm/settings" },
];

export default function CRMSidebar({ isOpen, onToggle }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
      )}
      <aside
        className={`fixed top-0 left-0 h-full z-50 bg-[#0A0E14] border-r border-[#D4AF37]/10 transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 lg:w-20"
        } overflow-hidden`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#D4AF37]/10">
          <Link to="/" className={`flex items-center gap-2 ${!isOpen && "lg:justify-center"}`}>
            <img src={LOGO} alt="А СТРОЙ" className="h-8 w-auto flex-shrink-0" />
            {isOpen && <span className="text-sm font-semibold text-[#D4AF37]">CRM</span>}
          </Link>
        </div>

        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  active
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-[#A0A0A0] hover:bg-[#1A1F2E] hover:text-[#F5F5F5]"
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={onToggle}
          className="absolute top-20 -right-3 w-6 h-6 bg-[#0F1419] border border-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors hidden lg:flex"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>
    </>
  );
}