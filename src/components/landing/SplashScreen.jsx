import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { SPLASH_VIDEO, LOGO } from "@/lib/images";

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(8);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const seen = localStorage.getItem("a-stroy-splash-seen");
    if (seen) { setVisible(false); onComplete(); return; }
    const timer = setInterval(() => setCountdown(p => p > 0 ? p - 1 : 0), 1000);
    const autoClose = setTimeout(() => handleClose(), 9000);

    // Attempt autoplay with sound; fall back to muted if browser blocks
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play().then(() => {
        setMuted(false);
      }).catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      });
    }

    return () => { clearInterval(timer); clearTimeout(autoClose); };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

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
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer bg-[#0F1419]"
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
            onClick={toggleMute}
            className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-black/60 transition-colors z-10"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
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