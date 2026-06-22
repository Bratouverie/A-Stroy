import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

/**
 * VisitorCounter — displays a live "online now" counter on the Home page.
 * Starts at a base value and randomly increments every few seconds.
 */
export default function VisitorCounter() {
  const [count, setCount] = useState(247);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 6) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-5 left-5 z-[80] hidden md:flex items-center gap-3 bg-[#1A1F2E]/90 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl px-4 py-2.5 shadow-lg"
    >
      <div className="relative">
        <Users size={18} className="text-[#D4AF37]" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
      </div>
      <div>
        <p className="text-[10px] text-[#A0A0A0] leading-none mb-0.5">Онлайн сейчас</p>
        <p className="text-base font-bold text-[#D4AF37] leading-none">{count.toLocaleString("ru-RU")}</p>
      </div>
    </motion.div>
  );
}