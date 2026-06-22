import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Ruler, Wallet, Clock, MapPin, Palette,
  Check, Star, X, ChevronLeft, ChevronRight, Quote,
} from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import MetaHead from "@/components/MetaHead";
import { PORTFOLIO, PORTFOLIO_FEATURED } from "@/lib/images";

const PROJECT_DETAILS = [
  {
    name: "Роскошная квартира Москва",
    description: "Полный ремонт премиум-класса в современном жилом комплексе в центре Москвы. Проект выполнен в стиле минимализм с использованием натуральных материалов — мрамора, дубового паркета и декоративной штукатурки.\n\nКвартира площадью 120 кв.м включает просторную гостиную-кухню, три спальни, две ванные комнаты и кабинет. Особое внимание уделено многоуровневому освещению и акустическому комфорту.\n\nВсе инженерные системы заменены полностью: электрика, водоснабжение, вентиляция. Установлена система умного дома с управлением освещением, климатом и безопасностью.",
    technologies: ["Паркет дуб натуральный", "Мрамор Calacatta", "Декоративная штукатурка", "Натяжные потолки", "Система умного дома", "Светодиодное освещение"],
    duration: "3 месяца",
    location: "Москва, ЦАО",
    clientName: "Мария И.",
    clientReview: "Отличная работа! Точно в срок, качество на высоте. Дизайнер учёл все пожелания, а прораб контролировал каждый этап. Результат превзошёл ожидания.",
  },
  {
    name: "Студия в современном стиле",
    description: "Стильная квартира-студия в духе лофт с элементами индустриального дизайна. Открытая планировка с минимальным количеством перегородок создаёт ощущение простора и свободы.\n\nПлощадь 65 кв.м трансформирована в функциональное пространство: зона кухни-гостиной, спальня-кабинет и ванная комната. Кирпичная кладка, бетонные поверхности и металлические акценты задают характер интерьеру.",
    technologies: ["Кирпичная кладка", "Микроцемент", "Металлические конструкции", "LED-подсветка", "Паркетная доска"],
    duration: "2 месяца",
    location: "Москва, Хамовники",
    clientName: "Алексей Д.",
    clientReview: "Профессиональная команда, внимательная к деталям. Лофт получился именно таким, как я представлял. Спасибо за креативный подход!",
  },
  {
    name: "Семейный дом в Подмосковье",
    description: "Полная реконструкция семейного дома в классическом стиле с современными элементами. Площадь 180 кв.м включает гостиную, кухню-столовую, четыре спальни, три ванные комнаты и комнату отдыха.\n\nОсобенность проекта — объединение классической эстетики с современными технологиями. Установлены энергосберегающие окна, система тёплого пола во всех помещениях, приточная вентиляция с рекуперацией тепла.\n\nЛандшафтный дизайн территории включает террасу, зону барбекю и детский игровой комплекс.",
    technologies: ["Энергосберегающие окна", "Тёплый пол", "Приточная вентиляция", "Паркет массив", "Керамогранит", "Ландшафтный дизайн"],
    duration: "5 месяцев",
    location: "Московская область, Истра",
    clientName: "Семья Петровых",
    clientReview: "Дом стал настоящим домом мечты. Качество, сроки, подход — всё на высшем уровне. Рекомендуем А СТРОЙ всем друзьям.",
  },
  {
    name: "Люкс пентхаус 250 кв.м",
    description: "Эксклюзивный пентхаус в стиле арт-деко с панорамным видом на Москву. Проект премиум-класса с использованием редких материалов и авторских элементов декора.\n\nПространство 250 кв.м включает гостиную с камином, столовую, кухню премиум-класса, три спальни с гардеробными, кабинет-библиотеку и три ванные комнаты. На террасе 80 кв.м обустроена зона отдыха с джакузи.\n\nОсобое внимание уделено освещению: хрустальные люстры, дизайнерские бра и система световых сценариев создают неповторимую атмосферу.",
    technologies: ["Хрустальные люстры", "Мрамор Nero Marquina", "Шёлковые обои", "Система световых сценариев", "Брендовая сантехника", "Панорамное остекление"],
    duration: "6 месяцев",
    location: "Москва, Пресня",
    clientName: "Игорь М.",
    clientReview: "Это произведение искусства, а не ремонт. Каждая деталь продумана. А СТРОЙ — лучшая команда, с которой я работал.",
  },
];

export default function PortfolioDetail() {
  const { projectId } = useParams();
  const idx = parseInt((projectId || "").replace("p", "")) || 0;
  const project = PORTFOLIO[idx] || PORTFOLIO[0];
  const details = PROJECT_DETAILS[idx] || PROJECT_DETAILS[0];
  const images = project.images || [];
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [beforeAfterPos, setBeforeAfterPos] = useState(50);

  const relatedProjects = useMemo(() => {
    return PORTFOLIO.filter((_, i) => i !== idx).slice(0, 3).map((p, i) => ({
      ...p,
      id: `p${PORTFOLIO.indexOf(p)}`,
    }));
  }, [idx]);

  const openLightbox = (i) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const nextImg = () => setLightboxIdx(prev => (prev === null ? null : (prev + 1) % images.length));
  const prevImg = () => setLightboxIdx(prev => (prev === null ? null : (prev - 1 + images.length) % images.length));

  return (
    <PublicLayout>
      <MetaHead
        title={project.name}
        description={`${project.style} проект, ${project.area}, ${project.budget}. ${details.location}. Премиум ремонт от А СТРОЙ.`}
        canonical={`/portfolio/${projectId}`}
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <Link to="/portfolio" className="inline-flex items-center gap-1 text-sm text-[#A0A0A0] hover:text-[#D4AF37] transition-colors mb-6">
          <ArrowLeft size={16} /> Все проекты
        </Link>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-8 h-[300px] md:h-[500px]"
        >
          <img src={images[0]} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block px-3 py-1 text-xs bg-[#D4AF37]/20 text-[#D4AF37] rounded-full border border-[#D4AF37]/30 mb-3">
              {project.category} · {project.style}
            </span>
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-white">{project.name}</h1>
          </div>
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
          {[
            { icon: Ruler, label: "Площадь", value: project.area },
            { icon: Wallet, label: "Бюджет", value: project.budget },
            { icon: Clock, label: "Срок", value: details.duration },
            { icon: MapPin, label: "Локация", value: details.location },
          ].map(item => (
            <div key={item.label} className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-xl p-4 md:p-5">
              <item.icon size={18} className="text-[#D4AF37] mb-2" />
              <p className="text-xs text-[#A0A0A0] mb-1">{item.label}</p>
              <p className="text-sm md:text-base font-semibold text-[#F5F5F5]">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Before / After slider */}
        {images[1] && (
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-[#F5F5F5] mb-4 flex items-center gap-2">
              <Palette size={20} className="text-[#D4AF37]" /> До и После
            </h2>
            <div
              className="relative rounded-2xl overflow-hidden h-[250px] md:h-[450px] cursor-ew-resize select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setBeforeAfterPos(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
              }}
            >
              <img src={images[1]} alt="После" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${beforeAfterPos}%` }}>
                <img src={images[0]} alt="До" className="absolute inset-0 h-full w-auto max-w-none object-cover" style={{ width: `${100 / (beforeAfterPos / 100)}%` }} draggable={false} />
              </div>
              <div className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] pointer-events-none" style={{ left: `${beforeAfterPos}%` }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                  <ChevronLeft size={14} className="text-[#0F1419]" />
                  <ChevronRight size={14} className="text-[#0F1419]" />
                </div>
              </div>
              <span className="absolute top-3 left-3 px-2 py-1 text-xs bg-black/60 text-white rounded">До</span>
              <span className="absolute top-3 right-3 px-2 py-1 text-xs bg-black/60 text-white rounded">После</span>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-8 mb-12">
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-[#F5F5F5] mb-4">О проекте</h2>
            <div className="space-y-4 text-[#A0A0A0] leading-relaxed">
              {details.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <aside>
            <div className="bg-[#1A1F2E] border border-[#D4AF37]/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#F5F5F5] mb-3">Материалы и технологии</h3>
              <ul className="space-y-2">
                {details.technologies.map(tech => (
                  <li key={tech} className="flex items-start gap-2 text-sm text-[#A0A0A0]">
                    <Check size={14} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Gallery */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-[#F5F5F5] mb-4">Галерея</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => openLightbox(i)}
                className="relative cursor-pointer overflow-hidden rounded-xl group aspect-square"
              >
                <img src={img} alt={`${project.name} фото ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-[#D4AF37] text-xs transition-opacity">Увеличить</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Client review */}
        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0F1419] border border-[#D4AF37]/20 rounded-2xl p-6 md:p-8 mb-12">
          <Quote size={32} className="text-[#D4AF37]/30 mb-4" />
          <p className="text-lg md:text-xl text-[#F5F5F5] italic leading-relaxed mb-4">«{details.clientReview}»</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center text-[#0F1419] font-bold">
              {details.clientName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-[#F5F5F5]">{details.clientName}</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="text-[#D4AF37] fill-[#D4AF37]" />)}
              </div>
            </div>
          </div>
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-[#F5F5F5] mb-6">Похожие проекты</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedProjects.map(rp => (
                <Link
                  key={rp.id}
                  to={`/portfolio/${rp.id}`}
                  className="group relative overflow-hidden rounded-xl h-[200px]"
                >
                  <img src={rp.images?.[0]} alt={rp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <p className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">{rp.name}</p>
                    <p className="text-xs text-[#A0A0A0]">{rp.style}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1A1F2E] to-[#0F1419] border border-[#D4AF37]/20 rounded-2xl p-6 md:p-10 text-center">
          <h3 className="text-xl md:text-2xl font-heading font-bold text-[#F5F5F5] mb-3">Хотите похожий проект?</h3>
          <p className="text-sm text-[#A0A0A0] mb-5 max-w-lg mx-auto">Получите бесплатную консультацию и индивидуальный расчёт стоимости вашего ремонта</p>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all text-sm"
          >
            Получить консультацию <ArrowRight size={16} />
          </Link>
        </div>
      </article>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white p-2 hover:text-[#D4AF37]" onClick={closeLightbox}>
            <X size={28} />
          </button>
          <button className="absolute left-4 text-white p-2 hover:text-[#D4AF37]" onClick={(e) => { e.stopPropagation(); prevImg(); }}>
            <ChevronLeft size={32} />
          </button>
          <img src={images[lightboxIdx]} alt="" className="max-w-[90%] max-h-[85vh] object-contain" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 text-white p-2 hover:text-[#D4AF37]" onClick={(e) => { e.stopPropagation(); nextImg(); }}>
            <ChevronRight size={32} />
          </button>
          <span className="absolute bottom-4 text-sm text-[#A0A0A0]">{lightboxIdx + 1} / {images.length}</span>
        </div>
      )}
    </PublicLayout>
  );
}