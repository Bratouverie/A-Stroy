import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BeforeAfterSlider({ beforeUrl, afterUrl, className }) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const handleMove = (clientX, rect) => {
    setPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden h-[300px] md:h-[450px] cursor-ew-resize select-none ${className || ""}`}
      onMouseDown={(e) => { setDragging(true); handleMove(e.clientX, e.currentTarget.getBoundingClientRect()); }}
      onMouseMove={(e) => { if (dragging) handleMove(e.clientX, e.currentTarget.getBoundingClientRect()); }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchStart={(e) => { setDragging(true); handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect()); }}
      onTouchMove={(e) => { if (dragging) handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect()); }}
      onTouchEnd={() => setDragging(false)}
    >
      <img src={afterUrl} alt="После" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${position}%` }}>
        <img src={beforeUrl} alt="До" className="absolute inset-0 h-full object-cover" style={{ width: `${position > 0 ? 100 / (position / 100) : 100}%` }} />
      </div>

      <div className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] pointer-events-none" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg">
          <ChevronLeft size={16} className="text-[#0F1419]" />
          <ChevronRight size={16} className="text-[#0F1419]" />
        </div>
      </div>

      <span className="absolute top-3 left-3 px-2 py-1 text-xs bg-black/60 text-white rounded pointer-events-none">ДО</span>
      <span className="absolute top-3 right-3 px-2 py-1 text-xs bg-black/60 text-white rounded pointer-events-none">ПОСЛЕ</span>
    </div>
  );
}