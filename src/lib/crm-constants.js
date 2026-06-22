export const LEAD_STATUSES = [
  { id: "received", label: "Поступила", color: "#22c55e", bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400" },
  { id: "consultation", label: "Консультация", color: "#eab308", bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400" },
  { id: "design", label: "Дизайн", color: "#3b82f6", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
  { id: "approval", label: "Согласование", color: "#f97316", bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" },
  { id: "ready", label: "Готов к запуску", color: "#a855f7", bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
  { id: "in_progress", label: "В работе", color: "#ef4444", bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400" },
  { id: "finishing", label: "На финише", color: "#6b7280", bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-400" },
  { id: "completed", label: "Завершено", color: "#14b8a6", bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-400" },
];

export const LEAD_PRIORITIES = {
  low: { label: "Низкий", color: "#6b7280" },
  medium: { label: "Средний", color: "#3b82f6" },
  high: { label: "Высокий", color: "#f97316" },
  urgent: { label: "Срочный", color: "#ef4444" },
};

export const PROJECT_TYPES = {
  apartment: "Квартира",
  house: "Дом",
  cottage: "Коттедж",
  dacha: "Дача",
};

export const WORK_STAGES = [
  { id: "consultation", name: "Первичная консультация", order: 1 },
  { id: "design", name: "Разработка дизайна", order: 2 },
  { id: "estimation", name: "Расчёт сметы", order: 3 },
  { id: "contract", name: "Подписание договора", order: 4 },
  { id: "demolition", name: "Демонтажные работы", order: 5 },
  { id: "engineering", name: "Электрика и сантехника", order: 6 },
  { id: "finishing", name: "Отделочные работы", order: 7 },
  { id: "final", name: "Финальные работы", order: 8 },
  { id: "delivery", name: "Сдача проекта", order: 9 },
];

export function getStatusById(id) {
  return LEAD_STATUSES.find(s => s.id === id) || LEAD_STATUSES[0];
}

export function formatBudget(amount) {
  if (!amount) return "—";
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)} млн ₽`;
  return `${(amount / 1000).toFixed(0)} тыс ₽`;
}