import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import MetaHead from "@/components/MetaHead";

export default function PrivacyPolicy() {
  return (
    <PublicLayout>
      <MetaHead
        title="Политика конфиденциальности"
        description="Политика обработки персональных данных компании А СТРОЙ. Сбор, использование и защита данных клиентов."
        canonical="/privacy-policy"
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
          Политика <span className="text-gold-gradient">конфиденциальности</span>
        </h1>

        <div className="space-y-8 text-[#A0A0A0] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-3" style={{ fontFamily: "var(--font-heading)" }}>1. Сбор данных</h2>
            <p>Компания «А СТРОЙ» собирает следующие персональные данные при отправке форм консультации и расчёта на сайте:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Имя (фамилия по желанию)</li>
              <li>Номер телефона</li>
              <li>Email-адрес</li>
              <li>Информация об объекте (площадь, тип, адрес) — по желанию</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-3" style={{ fontFamily: "var(--font-heading)" }}>2. Использование данных</h2>
            <p>Мы используем ваши данные исключительно для:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Обработки заявок на консультацию и расчёт стоимости</li>
              <li>Связи с вами по вопросам ремонта и дизайна</li>
              <li>Отправки смет, дизайн-проектов и коммерческих предложений</li>
              <li>Информирования о статусе проекта</li>
            </ul>
            <p className="mt-2 text-sm">Мы не передаём ваши данные третьим лицам для маркетинговых целей.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-3" style={{ fontFamily: "var(--font-heading)" }}>3. Защита данных</h2>
            <p>Мы используем SSL-шифрование для передачи данных. Доступ к персональным данным имеют только уполномоченные сотрудники компании «А СТРОЙ». Все данные хранятся на защищённых серверах.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-3" style={{ fontFamily: "var(--font-heading)" }}>4. Удаление данных</h2>
            <p>Вы можете запросить удаление ваших персональных данных в любой момент, написав на <a href="mailto:contact@a-stroy.ru" className="text-[#D4AF37] hover:underline">contact@a-stroy.ru</a>. Мы удалим ваши данные в течение 30 дней.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-3" style={{ fontFamily: "var(--font-heading)" }}>5. Cookies</h2>
            <p>Сайт использует cookies для улучшения пользовательского опыта и аналитики. Вы можете отключить cookies в настройках браузера.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#F5F5F5] mb-3" style={{ fontFamily: "var(--font-heading)" }}>6. Контакты</h2>
            <p>По вопросам обработки персональных данных: <a href="mailto:contact@a-stroy.ru" className="text-[#D4AF37] hover:underline">contact@a-stroy.ru</a></p>
            <p className="text-sm mt-2">Телефон: <a href="tel:+74951234567" className="text-[#D4AF37]">+7 (495) 123-45-67</a></p>
          </section>
        </div>

        <div className="mt-12">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0F1419] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
            На главную
          </Link>
        </div>
      </article>
    </PublicLayout>
  );
}