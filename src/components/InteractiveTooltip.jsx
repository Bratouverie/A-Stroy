import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveTooltip({ title, description, icon: Icon, className, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative ${className || ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-[#1A1F2E] border border-[#D4AF37]/30 rounded-xl shadow-xl pointer-events-none"
          >
            {Icon && (
              <div className="flex items-start gap-3 mb-2">
                <Icon size={20} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <h4 className="font-semibold text-[#F5F5F5] text-sm">{title}</h4>
              </div>
            )}
            {!Icon && <h4 className="font-semibold text-[#F5F5F5] text-sm mb-2">{title}</h4>}
            <p className="text-xs text-[#A0A0A0] leading-relaxed">{description}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-[#1A1F2E] border-r border-b border-[#D4AF37]/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}