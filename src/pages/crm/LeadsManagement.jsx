import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, X, Phone, Mail, Building2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { LEAD_STATUSES, LEAD_PRIORITIES, PROJECT_TYPES, formatBudget, getStatusById } from "@/lib/crm-constants";

export default function LeadsManagement() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newLead, setNewLead] = useState({ clientName: "", clientPhone: "", objectType: "apartment", area: 60, estimatedBudget: 1000000, priority: "medium" });

  useEffect(() => { loadLeads(); }, []);

  const loadLeads = async () => {
    try {
      const data = await base44.entities.Lead.list("-created_date", 200);
      setLeads(data || []);
    } catch (e) {
      console.error("Load leads error:", e);
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;
    setLeads(prev => prev.map(l => l.id === draggableId ? { ...l, status: newStatus } : l));
    try {
      await base44.entities.Lead.update(draggableId, { status: newStatus });
    } catch (e) {
      console.error("Update lead status error:", e);
      loadLeads();
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newLead.clientName || !newLead.clientPhone) return;
    try {
      await base44.entities.Lead.create({ ...newLead, status: "received", source: "manual" });
      setShowForm(false);
      setNewLead({ clientName: "", clientPhone: "", objectType: "apartment", area: 60, estimatedBudget: 1000000, priority: "medium" });
      loadLeads();
    } catch (e) {
      console.error("Create lead error:", e);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#F5F5F5]">Заявки</h1>
          <p className="text-sm text-[#A0A0A0] mt-1">Управление заявками — перетаскивайте карточки между статусами</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
        >
          <Plus size={16} /> Новая заявка
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-3 overflow-x-auto pb-4" style={{ minWidth: "max-content" }}>
          {LEAD_STATUSES.map((status) => {
            const columnLeads = leads.filter(l => l.status === status.id);
            return (
              <div key={status.id} className="w-72 flex-shrink-0">
                <div className={`rounded-t-lg px-3 py-2 border ${status.border} ${status.bg} flex items-center justify-between`}>
                  <span className={`text-sm font-medium ${status.text}`}>{status.label}</span>
                  <span className="text-xs text-[#A0A0A0] bg-[#0F1419]/50 px-2 py-0.5 rounded">{columnLeads.length}</span>
                </div>
                <Droppable droppableId={status.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[200px] p-2 space-y-2 rounded-b-lg border border-t-0 ${status.border} ${snapshot.isDraggingOver ? "bg-[#1A1F2E]" : "bg-[#0F1419]/30"}`}
                      style={{ minHeight: "calc(100vh - 280px)" }}
                    >
                      {columnLeads.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(prov, snap) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                              className={`bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-lg p-3 cursor-grab active:cursor-grabbing transition-shadow ${snap.isDragging ? "shadow-lg shadow-black/30 border-[#D4AF37]/30" : ""}`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-sm font-medium text-[#F5F5F5] truncate">{lead.clientName || "Без имени"}</h4>
                                <span
                                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                                  style={{ background: LEAD_PRIORITIES[lead.priority]?.color || "#6b7280" }}
                                />
                              </div>
                              <div className="space-y-1.5 text-xs text-[#A0A0A0]">
                                {lead.clientPhone && (
                                  <div className="flex items-center gap-1.5">
                                    <Phone size={12} /> <span className="truncate">{lead.clientPhone}</span>
                                  </div>
                                )}
                                {lead.area && (
                                  <div className="flex items-center gap-1.5">
                                    <Building2 size={12} /> <span>{lead.area} кв.м · {PROJECT_TYPES[lead.objectType] || "Квартира"}</span>
                                  </div>
                                )}
                                {lead.estimatedBudget && (
                                  <div className="flex items-center gap-1.5 text-[#D4AF37] font-medium">
                                    <Calendar size={12} /> <span>{formatBudget(lead.estimatedBudget)}</span>
                                  </div>
                                )}
                              </div>
                              <div className="mt-2 pt-2 border-t border-[#D4AF37]/5 text-xs text-[#A0A0A0]">
                                {lead.created_date ? new Date(lead.created_date).toLocaleDateString("ru-RU") : ""}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* New Lead Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1A1F2E] border border-[#D4AF37]/20 rounded-xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-heading font-semibold text-[#F5F5F5]">Новая заявка</h3>
                <button onClick={() => setShowForm(false)} className="text-[#A0A0A0] hover:text-[#F5F5F5]">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleCreate} className="space-y-3">
                <input
                  required
                  value={newLead.clientName}
                  onChange={e => setNewLead({ ...newLead, clientName: e.target.value })}
                  placeholder="Имя клиента"
                  className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40"
                />
                <input
                  required
                  value={newLead.clientPhone}
                  onChange={e => setNewLead({ ...newLead, clientPhone: e.target.value })}
                  placeholder="Телефон"
                  className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40"
                />
                <input
                  value={newLead.clientEmail || ""}
                  onChange={e => setNewLead({ ...newLead, clientEmail: e.target.value })}
                  placeholder="Email (необязательно)"
                  className="w-full px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40"
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={newLead.objectType}
                    onChange={e => setNewLead({ ...newLead, objectType: e.target.value })}
                    className="px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]/40"
                  >
                    {Object.entries(PROJECT_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                  <select
                    value={newLead.priority}
                    onChange={e => setNewLead({ ...newLead, priority: e.target.value })}
                    className="px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]/40"
                  >
                    {Object.entries(LEAD_PRIORITIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={newLead.area}
                    onChange={e => setNewLead({ ...newLead, area: parseInt(e.target.value) })}
                    placeholder="Площадь"
                    className="px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]/40"
                  />
                  <input
                    type="number"
                    value={newLead.estimatedBudget}
                    onChange={e => setNewLead({ ...newLead, estimatedBudget: parseInt(e.target.value) })}
                    placeholder="Бюджет"
                    className="px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]/40"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                >
                  Создать заявку
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}