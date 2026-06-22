import { useEffect } from "react";
import { getRandomSocialBanner } from "@/lib/social-templates";

/**
 * MetaHead — manages document head meta tags for SEO, OpenGraph, Twitter Cards, and JSON-LD schema.
 * No external dependency; directly manipulates document.head.
 *
 * @param {object} props
 * @param {string} props.title — page <title> (will be appended with " | А СТРОЙ" unless full)
 * @param {string} [props.description] — meta description (150-160 chars ideal)
 * @param {string} [props.keywords] — comma-separated keywords
 * @param {string} [props.ogImage] — OpenGraph image URL
 * @param {string} [props.canonical] — canonical URL path (e.g. "/services")
 * @param {object|object[]} [props.schema] — JSON-LD schema object(s) to inject
 */
const SITE_NAME = "А СТРОЙ";
const DEFAULT_DESC = "Премиум ремонт и отделка квартир, домов и коттеджей под ключ в Москве и МО. Площадь 40-900 кв.м, бюджет от 1 млн ₽. Гарантия 5-7 лет.";
const DEFAULT_OG = getRandomSocialBanner();
const BASE_URL = "https://a-stroy.ru";

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function MetaHead({
  title,
  description = DEFAULT_DESC,
  keywords,
  ogImage = DEFAULT_OG,
  canonical,
  schema,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — премиум ремонт в Москве`;
    document.title = fullTitle;

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);

    // OpenGraph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:type", "website");
    if (canonical) setMeta("property", "og:url", `${BASE_URL}${canonical}`);

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Canonical
    if (canonical) setLink("canonical", `${BASE_URL}${canonical}`);

    // JSON-LD Schema
    const existing = document.getElementById("page-schema");
    if (existing) existing.remove();

    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-schema";
      const schemas = Array.isArray(schema) ? schema : [schema];
      script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById("page-schema");
      if (s) s.remove();
    };
  }, [title, description, keywords, ogImage, canonical, JSON.stringify(schema)]);

  return null;
}