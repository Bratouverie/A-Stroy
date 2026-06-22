import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, RefreshCw } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { AVATAR_MARIA, AVATAR_ARTEM } from "@/lib/images";

const QUICK_REPLIES = [
  "Сколько стоит ремонт?",
  "Какие сроки?",
  "Какая гарантия?",
  "Хочу консультацию",
];

const SYSTEM_PROMPT_MARIA = `Ты — Дизайнер Мария, помощница компании "А СТРОЙ", премиум-ремонтной и дизайн-студии в Москве.

ПРАВИЛА:
1. Будь дружелюбной и уважительной, используй эмодзи, обращайся на "вы"
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

const SYSTEM_PROMPT_ARTEM = `Ты — Мастер Артем, прораб компании "А СТРОЙ", премиум-ремонтной компании в Москве.

ПРАВИЛА:
1. Будь профессиональным и надёжным, используй эмодзи, обращайся на "вы"
2. Отвечай только на вопросы о ремонте, сроках, материалах, технологии работ
3. НИКОГДА не предлагай эконом-варианты — только премиум
4. Сообщения должны быть краткими (до 300 символов)
5. Если не знаешь ответ — предложи консультацию с менеджером

ИНФО О КОМПАНИИ:
- Специализация: премиум ремонт и отделка
- Регион: Москва и МО
- Площадь: от 40 до 900 кв.м
- Бюджет: от 1 млн ₽
- Гарантия: 5 лет на работы, 7 лет на люкс
- Премиум: 30-40 тыс ₽/кв.м, Люкс: 45-60 тыс ₽/кв.м, Эксклюзив: 70+ тыс ₽/кв.м
- Сроки: 80-100 кв.м = 2-3 месяца, 100+ кв.м = 3-4 месяца, коттедж 200+ = 4-6 мес`;

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [botPersona, setBotPersona] = useState("maria");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Привет! 👋 Я Дизайнер Мария, помогу с вопросами про ремонт и дизайн. Что вас интересует?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ clientName: "", clientPhone: "", clientEmail: "" });
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef(null);

  const botName = botPersona === "maria" ? "Дизайнер Мария" : "Мастер Артем";
  const botAvatar = botPersona === "maria" ? AVATAR_MARIA : AVATAR_ARTEM;
  const systemPrompt = botPersona === "maria" ? SYSTEM_PROMPT_MARIA : SYSTEM_PROMPT_ARTEM;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    const handleOpenChatBot = (e) => {
      setOpen(true);
      if (e.detail?.message) {
        setTimeout(() => setInput(e.detail.message), 200);
      }
    };
    window.addEventListener("open-chatbot", handleOpenChatBot);
    return () => window.removeEventListener("open-chatbot", handleOpenChatBot);
  }, []);

  const togglePersona = () => {
    const newPersona = botPersona === "maria" ? "artem" : "maria";
    setBotPersona(newPersona);
    const newName = newPersona === "maria" ? "Дизайнер Мария" : "Мастер Артем";
    setMessages(prev => [...prev, {
      role: "assistant",
      content: `👋 Теперь с вами общается ${newName}. Чем могу помочь?`
    }]);
  };

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

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `${systemPrompt}\n\nИстория диалога:\n${conversationHistory.map(m => `${m.role}: ${m.content}`).join("\n")}\n\nПользователь: ${text}\n\nОтвет:`,
        model: "gemini_3_flash",
      });

      const reply = typeof response === "string" ? response : (response?.response || response?.text || JSON.stringify(response));
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);

      if (newCount >= 1 && !showContactForm) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "😊 Чтобы дать точный расчёт, оставьте контакты ниже — я продолжу консультацию сразу после заполнения формы! Менеджер также свяжется с вами в течение 30 минут."
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
        notes: `Заявка из ИИ-чата (${botName}). Вопросы: ${chatSummary}`,
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-5 z-[90] w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[70vh] bg-[#0F1419] border border-[#D4AF37]/20 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#1A1F2E] to-[#0F1419] border-b border-[#D4AF37]/10">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF37] flex-shrink-0">
                <img src={botAvatar} alt={botName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#F5F5F5]">{botName}</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Онлайн
                </p>
              </div>
              <button
                onClick={togglePersona}
                title={`Переключить на ${botPersona === "maria" ? "Мастер Артем" : "Дизайнер Мария"}`}
                className="w-8 h-8 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors flex items-center justify-center"
              >
                <RefreshCw size={14} />
              </button>
            </div>

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

            {(!showContactForm || submitted) && (
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}