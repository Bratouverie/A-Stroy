import React, { useState, useEffect } from "react";
import { Plus, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const COLUMNS = [
  { id: "todo", label: "К выполнению", color: "#6b7280", bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-400" },
  { id: "in_progress", label: "В работе", color: "#3b82f6", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
  { id: "done", label: "Готово", color: "#22c55e", bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400" },
];

const PRIORITY_COLORS = { low: "#6b7280", medium: "#3b82f6", high: "#ef4444" };

export default function TasksBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium", dueDate: "" });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await base44.entities.Task.list("-created_date", 200);
      setTasks(data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const moveTask = async (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    try { await base44.entities.Task.update(taskId, { status: newStatus }); }
    catch (e) { load(); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    try {
      await base44.entities.Task.create({ ...newTask, status: "todo" });
      setShowForm(false);
      setNewTask({ title: "", description: "", priority: "medium", dueDate: "" });
      load();
    } catch (e) { console.error(e); }
  };

  if (loading) return <div className="flex items-center justify-center h-96"><div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#F5F5F5]">Задачи</h1>
          <p className="text-sm text-[#A0A0A0] mt-1">Доска задач команды</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
          <Plus size={16} /> Новая задача
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className={`rounded-lg border ${col.border} ${col.bg}`}>
              <div className="px-3 py-2 flex items-center justify-between">
                <span className={`text-sm font-medium ${col.text}`}>{col.label}</span>
                <span className="text-xs text-[#A0A0A0]">{colTasks.length}</span>
              </div>
              <div className="p-2 space-y-2 min-h-[300px]">
                {colTasks.map(t => (
                  <div key={t.id} className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-[#F5F5F5]">{t.title}</h4>
                      <span className="w-2 h-2 rounded-full mt-1.5" style={{ background: PRIORITY_COLORS[t.priority] }} />
                    </div>
                    {t.description && <p className="text-xs text-[#A0A0A0] mb-2">{t.description}</p>}
                    {t.dueDate && <p className="text-xs text-[#A0A0A0] flex items-center gap-1"><Calendar size={12} /> {new Date(t.dueDate).toLocaleDateString("ru-RU")}</p>}
                    <div className="flex gap-1 mt-2">
                      {COLUMNS.filter(c => c.id !== col.id).map(c => (
                        <button key={c.id} onClick={() => moveTask(t.id, c.id)} className="text-xs px-2 py-1 bg-[#0F1419] text-[#A0A0A0] rounded hover:text-[#D4AF37] transition-colors">
                          → {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#1A1F2E] border border-[#D4AF37]/20 rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-heading font-semibold text-[#F5F5F5]">Новая задача</h3>
                <button onClick={() => setShowForm(false)} className="text-[#A0A0A0]"><X size={20} /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-3">
                <input required value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} placeholder="Название задачи"
                  className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40" />
                <textarea value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} placeholder="Описание" rows={3}
                  className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40 resize-none" />
                <div className="grid grid-cols-2 gap-3">
                  <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} className="px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5]">
                    <option value="low">Низкий</option><option value="medium">Средний</option><option value="high">Высокий</option>
                  </select>
                  <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5]" />
                </div>
                <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg">Создать</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}