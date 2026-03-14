declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>,
    ) => void;
  }
}

type GAItem = {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity?: number;
};

export function trackPageView(path: string, title?: string) {
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
) {
  window.gtag?.("event", eventName, params);
}

export function paintingToGAItem(painting: {
  id: string;
  title: string;
  category?: string;
  price: number;
}): GAItem {
  return {
    item_id: painting.id,
    item_name: painting.title,
    item_category: painting.category || "Acrylic on canvas",
    price: painting.price,
    quantity: 1,
  };
}
