declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const GA_ID = import.meta.env.VITE_GA_ID || "G-CTYBWT7FV7";

export const pageview = (url: string) => {
  if (!window.gtag) return;

  window.gtag('config', GA_ID, {
    page_path: url,
  });
};