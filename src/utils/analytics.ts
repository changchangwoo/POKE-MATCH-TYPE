declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

import { GA_ID } from "@const/apiConfig";
export { GA_ID };

export const pageview = (url: string) => {
  if (!window.gtag) return;

  window.gtag('config', GA_ID, {
    page_path: url,
  });
};