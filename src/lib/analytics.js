// Analytics configuration — GA4 + Yandex Metrica
// Set VITE_GA_ID and VITE_YM_ID in your environment variables to enable tracking.
// This file provides a unified trackEvent function for both platforms.

export const GA_ID = import.meta.env.VITE_GA_ID || null;
export const YM_ID = import.meta.env.VITE_YM_ID || null;

export const trackEvent = (eventName, params = {}) => {
  if (typeof window === "undefined") return;
  if (window.gtag && GA_ID) {
    window.gtag("event", eventName, params);
  }
  if (window.ym && YM_ID) {
    window.ym(YM_ID, "reachGoal", eventName, params);
  }
};

export const trackPageView = (path) => {
  if (typeof window === "undefined") return;
  if (window.gtag && GA_ID) {
    window.gtag("config", GA_ID, { page_path: path });
  }
  if (window.ym && YM_ID) {
    window.ym(YM_ID, "hit", path);
  }
};