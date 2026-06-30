import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, AlertCircle, Loader, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { crm_auth } from "@/lib/crm-auth";

export default function CRMCodeLogin() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (crm_auth.isAuthenticated()) {
      navigate("/crm");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Введите код доступа");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await base44.functions.invoke('crmCodeAuth', { code: code.trim().toUpperCase() });
      if (response?.data?.success) {
        crm_auth.setSession(response.data);
        navigate("/crm");
      } else {
        setError(response?.data?.message || "Неверный код доступа");
        setCode("");
      }
    } catch (err) {
      setError(err.message || "Ошибка подключения");
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] to-[#1A1F2E] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 p-2 rounded-lg hover:bg-[#1A1F2E] transition-colors text-[#A0A0A0] hover:text-[#D4AF37]"
          title="Вернуться на главную"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center mb-4">
            <Lock size={28} className="text-[#D4AF37]" />
          </div>
          <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2" style={{ fontFamily: "var(--font-heading)" }}>А СТРОЙ</h1>
          <p className="text-[#A0A0A0]">Панель управления</p>
        </div>

        <div className="bg-[#1A1F2E] border border-[#D4AF37]/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-[#F5F5F5] text-center mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Вход по коду
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Код доступа</label>
              <motion.input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
                placeholder="Введите код"
                disabled={loading}
                animate={error ? { x: [-5, 5, -5, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="w-full px-4 py-3 bg-[#0F1419] border border-[#D4AF37]/20 rounded-lg text-[#F5F5F5] placeholder-[#A0A0A0]/60 focus:border-[#D4AF37] focus:outline-none transition-all text-center tracking-widest font-mono text-lg disabled:opacity-50"
              />
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading || !code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (<><Loader size={16} className="animate-spin" /> Проверка...</>) : "Войти"}
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-lg">
            <p className="text-xs text-[#A0A0A0] text-center">
              💡 Тестовый код: <span className="font-mono font-bold text-[#D4AF37]">ADMIN26</span>
            </p>
          </div>
        </div>

        <p className="text-xs text-[#A0A0A0]/40 text-center mt-6">v2.0 — надёжный вход</p>
      </motion.div>
    </div>
  );
}