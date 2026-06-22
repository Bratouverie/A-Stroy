import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { base44 } from "@/api/base44Client";
import { LEAD_STATUSES, formatBudget } from "@/lib/crm-constants";

export default function Reports() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await base44.entities.Lead.list("-created_date", 200);
      setLeads(data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-96"><div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div></div>;

  const completed = leads.filter(l => l.status === "completed");
  const totalRevenue = completed.reduce((s, l) => s + (l.estimatedBudget || 0), 0);
  const avgCheck = completed.length > 0 ? totalRevenue / completed.length : 0;
  const conversion = leads.length > 0 ? Math.round((completed.length / leads.length) * 100) : 0;

  const byStatus = LEAD_STATUSES.map(s => ({ name: s.label, value: leads.filter(l => l.status === s.id).length, color: s.color })).filter(s => s.value > 0);
  const bySource = Object.entries(
    leads.reduce((acc, l) => { const src = l.source || "unknown"; acc[src] = (acc[src] || 0) + 1; return acc; }, {})
  ).map(([k, v]) => ({ name: k, value: v }));
  const sourceColors = ["#D4AF37", "#3b82f6", "#22c55e", "#f97316", "#a855f7"];

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - (5 - i));
    const monthLeads = leads.filter(l => { const c = new Date(l.created_date); return c.getMonth() === d.getMonth() && c.getFullYear() === d.getFullYear(); });
    return { month: d.toLocaleDateString("ru-RU", { month: "short" }), leads: monthLeads.length, revenue: monthLeads.reduce((s, l) => s + (l.estimatedBudget || 0), 0) };
  });

  const metrics = [
    { label: "Получено заявок", value: leads.length, color: "#3b82f6" },
    { label: "Закрыто сделок", value: completed.length, color: "#22c55e" },
    { label: "Конверсия", value: `${conversion}%`, color: "#D4AF37" },
    { label: "Средний чек", value: formatBudget(avgCheck), color: "#f97316" },
    { label: "Общая выручка", value: formatBudget(totalRevenue), color: "#a855f7" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[#F5F5F5]">Отчёты</h1>
        <p className="text-sm text-[#A0A0A0] mt-1">Аналитика продаж и проектов</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-4">
            <p className="text-2xl font-bold mb-1" style={{ color: m.color }}>{m.value}</p>
            <p className="text-xs text-[#A0A0A0]">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-5">
          <h3 className="text-sm font-medium text-[#F5F5F5] mb-4">Заявки по месяцам</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1F2E" />
              <XAxis dataKey="month" stroke="#A0A0A0" fontSize={12} />
              <YAxis stroke="#A0A0A0" fontSize={12} />
              <Tooltip contentStyle={{ background: "#0F1419", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px" }} />
              <Bar dataKey="leads" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-5">
          <h3 className="text-sm font-medium text-[#F5F5F5] mb-4">Источники заявок</h3>
          {bySource.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={bySource} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90}>
                  {bySource.map((_, i) => <Cell key={i} fill={sourceColors[i % sourceColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0F1419", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className="h-[250px] flex items-center justify-center text-[#A0A0A0] text-sm">Нет данных</div>}
        </div>
      </div>

      <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-5">
        <h3 className="text-sm font-medium text-[#F5F5F5] mb-4">Выручка по месяцам</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1F2E" />
            <XAxis dataKey="month" stroke="#A0A0A0" fontSize={12} />
            <YAxis stroke="#A0A0A0" fontSize={12} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
            <Tooltip contentStyle={{ background: "#0F1419", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px" }} formatter={v => formatBudget(v)} />
            <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} dot={{ fill: "#D4AF37" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}