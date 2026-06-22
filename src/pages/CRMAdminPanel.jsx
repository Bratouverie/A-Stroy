import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Copy, RotateCw, UserX, Check, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { crm_auth } from "@/lib/crm-auth";
import { base44 } from "@/api/base44Client";

const ROLE_LABELS = {
  admin: "Администратор",
  manager: "Менеджер",
  designer: "Дизайнер",
  contractor: "Прораб",
  operator: "Оператор"
};

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function CRMAdminPanel() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("manager");
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const currentUser = crm_auth.getCurrentUser();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/crm-login");
      return;
    }
    loadUsers();
  }, [navigate, currentUser]);

  const loadUsers = async () => {
    try {
      const data = await base44.entities.CRMUser.list("-created_date", 100);
      setUsers(data || []);
    } catch (error) {
      console.error("Load users error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    setCreating(true);
    try {
      const code = generateCode();
      const newUser = await base44.entities.CRMUser.create({
        name: newUserName,
        role: newUserRole,
        secretCode: code,
        isActive: true
      });
      setUsers(prev => [newUser, ...prev]);
      setNewUserName("");
      setNewUserRole("manager");
    } catch (error) {
      console.error("Create user error:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleRegenerateCode = async (userId) => {
    try {
      const newCode = generateCode();
      await base44.entities.CRMUser.update(userId, { secretCode: newCode });
      setUsers(users.map(u => u.id === userId ? { ...u, secretCode: newCode } : u));
    } catch (error) {
      console.error("Regenerate code error:", error);
    }
  };

  const handleDeactivateUser = async (userId) => {
    try {
      await base44.entities.CRMUser.update(userId, { isActive: false });
      setUsers(users.map(u => u.id === userId ? { ...u, isActive: false } : u));
    } catch (error) {
      console.error("Deactivate user error:", error);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1419] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/crm" className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-[#D4AF37] mb-6 transition-colors">
          <ArrowLeft size={16} /> В CRM
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-2" style={{ fontFamily: "var(--font-heading)" }}>Управление сотрудниками</h1>
        <p className="text-[#A0A0A0] mb-8">Создание и управление кодами доступа</p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1F2E] border border-[#D4AF37]/20 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Добавить сотрудника</h2>
          <form onSubmit={handleCreateUser} className="flex flex-col sm:flex-row gap-3">
            <input type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)}
              placeholder="Имя сотрудника" required
              className="flex-1 px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-[#F5F5F5] placeholder-[#A0A0A0] focus:border-[#D4AF37]/40 focus:outline-none" />
            <select value={newUserRole} onChange={e => setNewUserRole(e.target.value)}
              className="px-4 py-2.5 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-[#F5F5F5] focus:border-[#D4AF37]/40 focus:outline-none">
              {Object.entries(ROLE_LABELS).map(([key, label]) => (
                key !== 'admin' && <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <motion.button type="submit" disabled={creating} whileHover={{ scale: 1.05 }}
              className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-bold rounded-lg flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50">
              <Plus size={18} /> {creating ? "..." : "Добавить"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1F2E] border border-[#D4AF37]/20 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D4AF37]/10 bg-[#0F1419]/50">
                  <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium text-[#A0A0A0]">Имя</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium text-[#A0A0A0]">Роль</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium text-[#A0A0A0]">Код</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium text-[#A0A0A0]">Статус</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-sm font-medium text-[#A0A0A0]">Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-[#D4AF37]/5 hover:bg-[#0F1419]/30 transition-colors">
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#F5F5F5] font-medium">{u.name}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-[#A0A0A0]">{ROLE_LABELS[u.role] || u.role}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <code className="bg-[#0F1419] px-3 py-1 rounded text-[#D4AF37] font-mono">{u.secretCode}</code>
                        <button onClick={() => handleCopyCode(u.secretCode)} className="p-1 text-[#A0A0A0] hover:text-[#D4AF37] transition-colors" title="Копировать">
                          {copiedCode === u.secretCode ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${u.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {u.isActive ? "Активен" : "Отключён"}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleRegenerateCode(u.id)} className="p-1 text-[#A0A0A0] hover:text-[#D4AF37] transition-colors" title="Новый код">
                          <RotateCw size={16} />
                        </button>
                        {u.isActive && (
                          <button onClick={() => handleDeactivateUser(u.id)} className="p-1 text-[#A0A0A0] hover:text-red-400 transition-colors" title="Отключить">
                            <UserX size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <div className="text-center py-12 text-[#A0A0A0]">Сотрудников пока нет. Добавьте первого!</div>
          )}
        </motion.div>
      </div>
    </div>
  );
}