import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, Send } from "lucide-react";
import { LOGO } from "@/lib/images";
import { Link } from "react-router-dom";

const NAV = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-[#0F1419]/90 backdrop-blur-xl border-b border-[#D4AF37]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO} alt="А СТРОЙ" className="h-10 md:h-12 w-auto" />
            <div className="hidden sm:block">
              <span className="text-xs tracking-[3px] text-[#D4AF37]/70 uppercase font-body">Premium</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(n => (
              <button
                key={n.label}
                onClick={() => scrollTo(n.href)}
                className="text-sm font-medium text-[#A0A0A0] hover:text-[#D4AF37] transition-colors tracking-wide"
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a href="https://wa.me/" target="_blank" rel="noopener" className="hidden md:flex w-9 h-9 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors">
              <MessageCircle size={16} />
            </a>
            <a href="https://t.me/" target="_blank" rel="noopener" className="hidden md:flex w-9 h-9 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors">
              <Send size={16} />
            </a>
            <a href="tel:+74951234567" className="hidden md:flex items-center gap-2 text-sm text-[#F5F5F5] hover:text-[#D4AF37] transition-colors">
              <Phone size={14} />
              <span>8(495)123-45-67</span>
            </a>
            <button
              onClick={() => scrollTo("#contacts")}
              className="hidden sm:block px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
            >
              Консультация
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-[#F5F5F5] p-2">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0F1419]/95 backdrop-blur-xl border-t border-[#D4AF37]/20 pb-6">
          <div className="px-6 pt-4 space-y-4">
            {NAV.map(n => (
              <button key={n.label} onClick={() => scrollTo(n.href)} className="block w-full text-left text-lg text-[#F5F5F5] hover:text-[#D4AF37]">{n.label}</button>
            ))}
            <div className="flex gap-3 pt-4">
              <a href="https://wa.me/" className="flex w-10 h-10 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37]">
                <MessageCircle size={18} />
              </a>
              <a href="https://t.me/" className="flex w-10 h-10 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37]">
                <Send size={18} />
              </a>
              <a href="tel:+74951234567" className="flex w-10 h-10 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37]">
                <Phone size={18} />
              </a>
            </div>
            <button onClick={() => scrollTo("#contacts")} className="w-full px-5 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg">Консультация</button>
          </div>
        </div>
      )}
    </header>
  );
}