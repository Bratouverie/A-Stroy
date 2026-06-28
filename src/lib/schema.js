// JSON-LD Schema.org structured data for SEO
const BASE_URL = "https://a-stroy.ru";
const LOGO_URL = "https://media.base44.com/images/public/user_69f4a60c5f6a1719d380566c/e381dbb0d_IMG_1953.PNG";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "А СТРОЙ",
  url: BASE_URL,
  logo: LOGO_URL,
  description: "Премиум ремонт и дизайн интерьера в Москве и Московской области. Полный цикл ремонтно-отделочных работ под ключ.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Нахимовский проспект, 24с1",
    addressLocality: "Москва",
    addressRegion: "Московская область",
    postalCode: "117418",
    addressCountry: "RU",
  },
  telephone: "+79912959125",
  email: "remont@a-stroy.ru",
  foundingDate: "2018",
  sameAs: [
    "https://t.me/pfoffalex",
    "https://wa.me/79912959125",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "А СТРОЙ",
  image: LOGO_URL,
  url: BASE_URL,
  telephone: "+79912959125",
  priceRange: "₽₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Нахимовский проспект, 24с1",
    addressLocality: "Москва",
    addressRegion: "Московская область",
    postalCode: "117418",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 55.671764,
    longitude: 37.584506,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Москва и Московская область",
  },
};

export const serviceSchema = (name, description) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: {
    "@type": "Organization",
    name: "А СТРОЙ",
    telephone: "+79912959125",
  },
  serviceType: "Ремонт и отделка премиум-класса",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Москва и Московская область",
  },
});

export const faqSchema = (faqItems) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(item => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url ? `${BASE_URL}${item.url}` : undefined,
  })),
});

export const articleSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt || "",
  image: post.coverImage || LOGO_URL,
  author: {
    "@type": "Organization",
    name: post.author || "А СТРОЙ",
  },
  publisher: {
    "@type": "Organization",
    name: "А СТРОЙ",
    logo: { "@type": "ImageObject", url: LOGO_URL },
  },
  datePublished: post.publishedDate || post.created_date,
  dateModified: post.updated_date || post.publishedDate || post.created_date,
  keywords: (post.tags || []).join(", "),
});

export const productSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: project.name,
  description: project.description || `${project.style} проект, ${project.area}`,
  image: project.images?.[0],
  brand: { "@type": "Brand", name: "А СТРОЙ" },
  review: project.clientReview ? {
    "@type": "Review",
    reviewBody: project.clientReview,
    author: { "@type": "Person", name: project.clientName || "Клиент" },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  } : undefined,
});