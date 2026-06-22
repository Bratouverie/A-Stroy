import { SOCIAL_BANNERS } from "@/lib/images";

export const SOCIAL_VARIANTS = [
  {
    title: "Вариант 1: Прямой призыв",
    text: "Хотите превратить свой дом в мечту? 🏠✨\n\nПремиум ремонт от А СТРОЙ — это:\n✓ 500+ успешных проектов\n✓ Гарантия 5-7 лет\n✓ Только премиальные материалы\n✓ Авторский дизайн\n\nБюджет от 1 млн ₽ | Сроки от 2 месяцев\n\nПолучите консультацию: a-stroy.ru",
    hashtags: "#ремонтМосква #премиумремонт #дизайнинтерьера #астрой",
    image: SOCIAL_BANNERS[0],
  },
  {
    title: "Вариант 2: Социальное доказательство",
    text: "Клиенты выбирают А СТРОЙ за качество! 🏆\n\nРейтинг: 4.9 ⭐ (312 отзывов)\n\n«Дизайн получился роскошным, качество отделки на высшем уровне»\n— Мария П., владелица пентхауса\n\nПолный цикл ремонта под ключ\nМосква и МО\n\nНачните свой проект уже сегодня! 💎\na-stroy.ru",
    hashtags: "#отзывыклиентов #качестворабот #ремонтквартир #астрой",
    image: SOCIAL_BANNERS[1],
  },
  {
    title: "Вариант 3: Образовательный контент",
    text: "Тренды ремонта 2026: минимализм в деталях 🎨\n\n5 главных трендов дизайна этого года:\n1️⃣ Натуральные материалы\n2️⃣ Нейтральные палитры\n3️⃣ Умное освещение\n4️⃣ Встроенные шкафы\n5️⃣ Биофильный дизайн\n\nСтруктура дизайн-проекта поможет воплотить тренды в вашем доме!\n\nСмотрите больше советов в нашем блоге 📚\na-stroy.ru/blog",
    hashtags: "#дизайнтренды2026 #интерьертренды #дизайнтипы #вдохновение",
    image: SOCIAL_BANNERS[2],
  },
];

export const getRandomSocialVariant = () => {
  return SOCIAL_VARIANTS[Math.floor(Math.random() * SOCIAL_VARIANTS.length)];
};

export const getRandomSocialBanner = () => {
  return SOCIAL_BANNERS[Math.floor(Math.random() * SOCIAL_BANNERS.length)];
};

export const getTodaysSocialVariant = () => {
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem('social-variant-date');

  if (storedDate !== today) {
    const variant = SOCIAL_VARIANTS[Math.floor(Math.random() * SOCIAL_VARIANTS.length)];
    localStorage.setItem('social-variant-date', today);
    localStorage.setItem('social-variant-index', SOCIAL_VARIANTS.indexOf(variant).toString());
    return variant;
  }

  const index = parseInt(localStorage.getItem('social-variant-index') || '0');
  return SOCIAL_VARIANTS[index] || SOCIAL_VARIANTS[0];
};