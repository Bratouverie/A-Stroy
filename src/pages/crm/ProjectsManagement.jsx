import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Building2, Calendar, DollarSign } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { formatBudget, LEAD_STATUSES } from "@/lib/crm-constants";

const PROJECT_STATUS = {
  in_progress: { label: "В работе", color: "#3b82f6" },
  paused: { label: "Пауза", color: "#f97316" },
  completed: { label: "Завершён", color: "#22c55e" },
  delayed: { label: "Задержка", color: "#ef4444" },
};

export default function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await base44.entities.Project.list("-created_date", 100);
      setProjects(data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-96"><div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#F5F5F5]">Проекты</h1>
          <p className="text-sm text-[#A0A0A0] mt-1">Управление проектами</p>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => {
            const st = PROJECT_STATUS[p.status] || PROJECT_STATUS.in_progress;
            return (
              <Link key={p.id} to={`/crm/projects/${p.id}`} className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-5 hover:border-[#D4AF37]/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                    <Building2 size={18} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded" style={{ background: `${st.color}15`, color: st.color }}>{st.label}</span>
                </div>
                <h3 className="text-sm font-medium text-[#F5F5F5] mb-2 truncate">{p.name}</h3>
                <div className="space-y-1 text-xs text-[#A0A0A0]">
                  {p.area && <p>Площадь: {p.area} кв.м</p>}
                  {p.budget && <p className="flex items-center gap-1"><DollarSign size={12} /> {formatBudget(p.budget)}</p>}
                  {p.startDate && <p className="flex items-center gap-1"><Calendar size={12} /> {new Date(p.startDate).toLocaleDateString("ru-RU")}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-12 text-center">
          <p className="text-[#A0A0A0] mb-4">Проектов пока нет</p>
          <p className="text-sm text-[#A0A0A0]">Проекты создаются автоматически при переходе заявки в статус «В работе»</p>
        </div>
      )}
    </div>
  );
}