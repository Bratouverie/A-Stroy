import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { LOGO } from "@/lib/images";

export default function Footer() {
  return (
    <footer id="contacts" className="bg-[#0A0E27] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={LOGO} alt="А СТРОЙ" className="h-14 w-auto mb-4" />
            <p className="text-sm text-[#A0A0A0] leading-relaxed">
              Премиум компания по ремонту и отделке квартир, домов и коттеджей в Москве и Московской области. 8+ лет создаём пространства, которые вдохновляют.
            </p>
          </div>

          <div>
            <h4 className="text-[#D4AF37] font-semibold mb-4 text-sm tracking-wider uppercase">Услуги</h4>
            <ul className="space-y-2.5">
              <li><Link to="/services" className="text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">Полный ремонт</Link></li>
              <li><Link to="/services" className="text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">Отделка</Link></li>
              <li><Link to="/services" className="text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">Дизайн интерьера</Link></li>
              <li><Link to="/services" className="text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">Управление проектом</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] font-semibold mb-4 text-sm tracking-wider uppercase">Компания</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">О компании</Link></li>
              <li><Link to="/portfolio" className="text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">Портфолио</Link></li>
              <li><Link to="/blog" className="text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">Блог</Link></li>
              <li><Link to="/crm-info" className="text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">CRM</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] font-semibold mb-4 text-sm tracking-wider uppercase">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#A0A0A0]">Москва</span>
              </li>
              <li>
                <a href="tel:+79912959125" className="flex items-center gap-3 text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">
                  <Phone size={16} className="text-[#D4AF37] flex-shrink-0" />
                  +7 (991) 295-91-25
                </a>
              </li>
              <li>
                <a href="mailto:remont@a-stroy.ru" className="flex items-center gap-3 text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors">
                  <Mail size={16} className="text-[#D4AF37] flex-shrink-0" />
                  remont@a-stroy.ru
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-sm text-[#A0A0A0]">Пн-Пт 9:00-20:00</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a href="https://wa.me/79912959125" target="_blank" rel="noopener" className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors">
                <MessageCircle size={16} />
              </a>
              <a href="https://t.me/pfoffalex" target="_blank" rel="noopener" className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors">
                <Send size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#A0A0A0]/60">© 2026 А СТРОЙ. Все права защищены.</p>
          <Link to="/privacy-policy" className="text-xs text-[#A0A0A0]/60 hover:text-[#D4AF37] transition-colors">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}