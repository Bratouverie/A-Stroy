export const SOCIAL_VARIANTS = [
  {
    title: "Прямой призыв",
    text: "Хотите превратить свой дом в мечту? 🏠✨\n\nПремиум ремонт от А СТРОЙ — это:\n✓ 500+ успешных проектов\n✓ Гарантия 5-7 лет\n✓ Только премиальные материалы\n✓ Авторский дизайн\n\nБюджет от 1 млн ₽ | Сроки от 2 месяцев\n\nПолучите консультацию: a-stroy.ru",
    hashtags: "#ремонтМосква #премиумремонт #дизайнинтерьера #астрой",
    image: "https://media.base44.com/images/public/6a3932933a1d1c3db9682aa7/3292265b0_Luxury_interior_design_scene_showing_an_elegant_we-1782142241629.png"
  },
  {
    title: "Социальное доказательство",
    text: "Клиенты выбирают А СТРОЙ за качество! 🏆\n\nРейтинг: 4.9 ⭐ (312 отзывов)\n\n«Дизайн получился роскошным, качество отделки на высшем уровне»\n— Мария П., владелица пентхауса\n\nПолный цикл ремонта под ключ\nМосква и МО\n\nНачните свой проект: a-stroy.ru",
    hashtags: "#отзывыклиентов #качестворабот #ремонтквартир #астрой",
    image: "https://media.base44.com/images/public/6a3932933a1d1c3db9682aa7/a1b4819cf_Wealthy_business_professional_client_gazing_in_del-1782142246171.png"
  },
  {
    title: "Образовательный контент",
    text: "Тренды ремонта 2026: минимализм в деталях 🎨\n\n5 главных трендов дизайна:\n1️⃣ Натуральные материалы\n2️⃣ Нейтральные палитры\n3️⃣ Умное освещение\n4️⃣ Встроенные шкафы\n5️⃣ Биофильный дизайн\n\nВоплотим тренды в вашем доме!\n\nБольше советов в блоге: a-stroy.ru/blog",
    hashtags: "#дизайнтренды2026 #интерьертренды #дизайнинтерьера #вдохновение",
    image: "https://media.base44.com/images/public/6a3932933a1d1c3db9682aa7/951215bcb_Remove_all_text_phone_numbers_and_any_written_co-1782142206310.png"
  }
];

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