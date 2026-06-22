import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

const QUICK_REPLIES = [
  "Сколько стоит ремонт?",
  "Какие сроки?",
  "Какая гарантия?",
  "Хочу консультацию",
];

const SYSTEM_PROMPT = `Ты — помощник компании "А СТРОЙ", премиум-ремонтной и дизайн-студии в Москве.

ПРАВИЛА:
1. Будь дружелюбным и уважительным, используй эмодзи
2. Отвечай только на вопросы о ремонте, дизайне, сроках, стоимости
3. НИКОГДА не предлагай эконом-варианты — только премиум
4. Сообщения должны быть краткими (до 300 символов)
5. Если не знаешь ответ — предложи консультацию с менеджером

ИНФО О КОМПАНИИ:
- Специализация: премиум ремонт и дизайн интерьера
- Регион: Москва и МО
- Площадь: от 40 до 900 кв.м
- Бюджет: от 1 млн ₽
- Гарантия: 5 лет на работы, 7 лет на люкс
- Премиум: 30-40 тыс ₽/кв.м, Люкс: 45-60 тыс ₽/кв.м, Эксклюзив: 70+ тыс ₽/кв.м
- Сроки: 80-100 кв.м = 2-3 месяца, 100+ кв.м = 3-4 месяца, коттедж 200+ = 4-6 мес
- Известные клиенты: Анна Бузова, Валя Карнавал, Олег Газманов`;

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Привет! 👋 Я ИИ-помощник А СТРОЙ. Отвечу на вопросы про ремонт и дизайн. Что вас интересует?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ clientName: "", clientPhone: "", clientEmail: "" });
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);

    try {
      const conversationHistory = messages.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      }));

      const res = await base44.integrations.Core.InvokeLLM({
        prompt: SYSTEM_PROMPT,
        model: "gemini_3_flash",
        response_json_schema: null,
      });

      // Actually use proper chat completion
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Ты помощник компании А СТРОЙ (премиум ремонт в Москве). ${SYSTEM_PROMPT}\n\nИстория диалога:\n${conversationHistory.map(m => `${m.role}: ${m.content}`).join("\n")}\n\nПользователь: ${text}\n\nОтвет:`,
        model: "gemini_3_flash",
      });

      const reply = typeof response === "string" ? response : (response?.response || response?.text || JSON.stringify(response));
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);

      if (newCount >= 3 && !showContactForm) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "😊 Чтобы дать точный расчёт и консультацию с дизайнером, оставьте контакты — менеджер позвонит за 30 минут!"
          }]);
          setShowContactForm(true);
        }, 800);
      }
    } catch (e) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Извините, произошла ошибка. Позвоните нам: 8(495)123-45-67"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (!contactData.clientName || !contactData.clientPhone) return;
    try {
      const chatSummary = messages.filter(m => m.role === "user").map(m => m.content).join("; ");
      await base44.entities.Lead.create({
        ...contactData,
        status: "received",
        source: "ai_chatbot",
        priority: "medium",
        notes: `Заявка из ИИ-чата. Вопросы: ${chatSummary}`,
      });
      setSubmitted(true);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "✅ Спасибо! Заявка отправлена. Менеджер свяжется с вами в течение 30 минут."
      }]);
    } catch (e) {
      console.error("Lead creation error:", e);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 hover:scale-105 transition-transform"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} className="text-[#0F1419]" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} className="text-[#0F1419]" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-[#0F1419]"></span>}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-5 z-[90] w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[70vh] bg-[#0F1419] border border-[#D4AF37]/20 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#1A1F2E] to-[#0F1419] border-b border-[#D4AF37]/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                <Sparkles size={18} className="text-[#0F1419]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F5F5F5]">ИИ-консультант</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Онлайн
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#D4AF37] to-[#FFD700] text-[#0F1419] rounded-br-sm"
                      : "bg-[#1A1F2E] text-[#F5F5F5] border border-[#D4AF37]/10 rounded-bl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick replies */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_REPLIES.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 text-xs bg-[#1A1F2E] border border-[#D4AF37]/20 text-[#D4AF37] rounded-full hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Contact form */}
              {showContactForm && !submitted && (
                <div className="bg-[#1A1F2E] border border-[#D4AF37]/20 rounded-xl p-3 space-y-2 mt-2">
                  <input
                    value={contactData.clientName}
                    onChange={e => setContactData({ ...contactData, clientName: e.target.value })}
                    placeholder="Ваше имя"
                    className="w-full px-3 py-2 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40"
                  />
                  <input
                    value={contactData.clientPhone}
                    onChange={e => setContactData({ ...contactData, clientPhone: e.target.value })}
                    placeholder="Телефон"
                    className="w-full px-3 py-2 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40"
                  />
                  <input
                    value={contactData.clientEmail}
                    onChange={e => setContactData({ ...contactData, clientEmail: e.target.value })}
                    placeholder="Email"
                    className="w-full px-3 py-2 bg-[#0F1419] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40"
                  />
                  <button
                    onClick={handleSubmitContact}
                    className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] text-sm font-semibold rounded-lg"
                  >
                    Отправить
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            {!showContactForm || submitted ? (
              <div className="p-3 border-t border-[#D4AF37]/10 flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                  placeholder="Напишите сообщение..."
                  className="flex-1 px-3 py-2 bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-lg text-sm text-[#F5F5F5] placeholder-[#A0A0A0] focus:outline-none focus:border-[#D4AF37]/40"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading}
                  className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send size={16} className="text-[#0F1419]" />
                </button>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}