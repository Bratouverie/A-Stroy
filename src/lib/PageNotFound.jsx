import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowRight } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-[#0F1419] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <p className="text-9xl font-bold text-gold-gradient" style={{ fontFamily: "var(--font-heading)" }}>
            404
          </p>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Страница не найдена
        </h1>
        <p className="text-[#A0A0A0] mb-8">
          Похоже, вы попали в «ремонтируемое» помещение. Давайте вернёмся на главную и подберём идеальный проект!
        </p>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-[#1A1F2E] rounded-2xl border-2 border-[#D4AF37]/30 flex items-center justify-center">
            <Home size={64} className="text-[#D4AF37]/40" />
          </div>
        </motion.div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
        >
          На главную <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}