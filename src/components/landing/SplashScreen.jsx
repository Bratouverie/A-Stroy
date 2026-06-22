import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPLASH_VIDEO, LOGO } from "@/lib/images";

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(8);
  const videoRef = useRef(null);

  useEffect(() => {
    const seen = localStorage.getItem("a-stroy-splash-seen");
    if (seen) { setVisible(false); onComplete(); return; }
    const timer = setInterval(() => setCountdown(p => p > 0 ? p - 1 : 0), 1000);
    const autoClose = setTimeout(() => handleClose(), 9000);
    return () => { clearInterval(timer); clearTimeout(autoClose); };
  }, []);

  const handleClose = () => {
    localStorage.setItem("a-stroy-splash-seen", "true");
    setVisible(false);
    setTimeout(onComplete, 600);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
          style={{ background: "linear-gradient(135deg, #0A0E27 0%, #1a1a2e 100%)" }}
          onClick={handleClose}
        >
          <video
            ref={videoRef}
            src={SPLASH_VIDEO}
            autoPlay
            playsInline
            className="w-[min(80vw,480px)] h-auto"
            onEnded={handleClose}
          />
          <button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="absolute bottom-8 right-8 text-white/50 hover:text-white text-sm font-body transition-colors"
          >
            Пропустить {countdown > 0 ? `(${countdown})` : ""}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}