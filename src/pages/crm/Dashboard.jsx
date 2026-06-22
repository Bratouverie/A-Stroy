import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, DollarSign, FolderKanban, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { base44 } from "@/api/base44Client";
import { LEAD_STATUSES, formatBudget } from "@/lib/crm-constants";

const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"];

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [leadData, projectData] = await Promise.all([
        base44.entities.Lead.list("-created_date", 100),
        base44.entities.Project.list("-created_date", 100).catch(() => []),
      ]);
      setLeads(leadData || []);
      setProjects(projectData || []);
    } catch (e) {
      console.error("Dashboard load error:", e);
    } finally {
      setLoading(false);
    }
  };

  const activeProjects = projects.filter(p => p.status === "in_progress").length;
  const completedLeads = leads.filter(l => l.status === "completed").length;
  const totalRevenue = leads
    .filter(l => l.status === "completed")
    .reduce((sum, l) => sum + (l.estimatedBudget || 0), 0);
  const newLeadsThisWeek = leads.filter(l => {
    const created = new Date(l.created_date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created > weekAgo;
  }).length;

  const statusData = LEAD_STATUSES.map(s => ({
    name: s.label,
    value: leads.filter(l => l.status === s.id).length,
    color: s.color,
  })).filter(s => s.value > 0);

  const revenueData = MONTHS.map((m, i) => ({
    month: m,
    revenue: Math.round((totalRevenue / 6) * (0.6 + i * 0.08) * 100) / 100,
  }));

  const metrics = [
    { icon: Users, label: "Всего заявок", value: leads.length, color: "#3b82f6" },
    { icon: DollarSign, label: "Выручка (мес)", value: formatBudget(totalRevenue), color: "#22c55e" },
    { icon: FolderKanban, label: "Активных проектов", value: activeProjects, color: "#f97316" },
    { icon: TrendingUp, label: "Новых заявок (нед)", value: newLeadsThisWeek, color: "#D4AF37" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#F5F5F5]">Дашборд</h1>
          <p className="text-sm text-[#A0A0A0] mt-1">Обзор активности и метрик</p>
        </div>
        <Link
          to="/crm/leads"
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
        >
          <Plus size={16} /> Новая заявка
        </Link>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-4 lg:p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${m.color}15` }}>
                <m.icon size={20} style={{ color: m.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#F5F5F5] mb-1">{m.value}</p>
            <p className="text-xs text-[#A0A0A0]">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-5">
          <h3 className="text-sm font-medium text-[#F5F5F5] mb-4">Динамика выручки</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1F2E" />
              <XAxis dataKey="month" stroke="#A0A0A0" fontSize={12} />
              <YAxis stroke="#A0A0A0" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#0F1419", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px" }}
                labelStyle={{ color: "#F5F5F5" }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} dot={{ fill: "#D4AF37" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-5">
          <h3 className="text-sm font-medium text-[#F5F5F5] mb-4">Статусы заявок</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0F1419", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px" }}
                  labelStyle={{ color: "#F5F5F5" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-[#A0A0A0] text-sm">Нет данных</div>
          )}
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[#D4AF37]/10">
          <h3 className="text-sm font-medium text-[#F5F5F5]">Последние заявки</h3>
          <Link to="/crm/leads" className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1">
            Все заявки <ArrowRight size={14} />
          </Link>
        </div>
        {leads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-[#A0A0A0] border-b border-[#D4AF37]/5">
                  <th className="px-5 py-3 font-medium">Дата</th>
                  <th className="px-5 py-3 font-medium">Клиент</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">Площадь</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Бюджет</th>
                  <th className="px-5 py-3 font-medium">Статус</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 8).map((lead) => {
                  const status = LEAD_STATUSES.find(s => s.id === lead.status) || LEAD_STATUSES[0];
                  return (
                    <tr key={lead.id} className="border-b border-[#D4AF37]/5 hover:bg-[#0F1419]/50 transition-colors">
                      <td className="px-5 py-3 text-sm text-[#A0A0A0]">
                        {lead.created_date ? new Date(lead.created_date).toLocaleDateString("ru-RU") : "—"}
                      </td>
                      <td className="px-5 py-3 text-sm text-[#F5F5F5] font-medium">{lead.clientName || "—"}</td>
                      <td className="px-5 py-3 text-sm text-[#A0A0A0] hidden md:table-cell">{lead.area ? `${lead.area} кв.м` : "—"}</td>
                      <td className="px-5 py-3 text-sm text-[#A0A0A0] hidden sm:table-cell">{formatBudget(lead.estimatedBudget)}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2 py-1 rounded text-xs ${status.bg} ${status.text} ${status.border} border`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-[#A0A0A0] text-sm">
            Заявок пока нет. Создайте первую заявку или откройте сайт — заявки появятся автоматически.
          </div>
        )}
      </div>
    </div>
  );
}