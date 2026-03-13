import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import QuickViewModal from "./modals/QuickViewModal";
import AddedToCartModal from "./modals/AddedToCartModal";
import ScrollToTop from "./components/ScrollToTop";
import AppErrorBoundary from "./components/AppErrorBoundary";
import type { Painting } from "./types/painting";

import HomePage from "./pages/HomePage";
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(
  () => import("./pages/TermsAndConditionsPage"),
);
const CheckoutSuccessPage = lazy(() => import("./pages/CheckoutSuccessPage"));
const InquirySuccessPage = lazy(() => import("./pages/InquirySuccessPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const CART_STORAGE_KEY = "nadart-cart";

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/textures/content-bg.webp')] px-4">
      <div className="border border-[#d8c4a1] bg-white/80 px-8 py-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-[#b99a64]">
          Nadart
        </p>
        <p className="mt-3 text-lg font-medium text-stone-800">Loading...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<Painting[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    try {
      return JSON.parse(savedCart) as Painting[];
    } catch {
      return [];
    }
  });

  const [quickView, setQuickView] = useState<Painting | null>(null);
  const [addedToCartItem, setAddedToCartItem] = useState<Painting | null>(null);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [paintingsLoading, setPaintingsLoading] = useState(true);

  const fetchPaintings = useCallback(async () => {
    try {
      setPaintingsLoading(true);

      const res = await fetch("/api/paintings");
      const data = await res.json();

      setPaintings(data);
    } catch (error) {
      console.error("Failed to fetch paintings:", error);
    } finally {
      setPaintingsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaintings();
  }, [fetchPaintings]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (painting: Painting) => {
    if (painting.sold) {
      return;
    }

    setCart((prev) => {
      const alreadyInCart = prev.some((item) => item.id === painting.id);
      if (alreadyInCart) {
        return prev;
      }
      return [...prev, painting];
    });

    setQuickView(null);
    setAddedToCartItem(painting);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.id === id);

      if (index === -1) {
        return prev;
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<MainLayout cartCount={cart.length} />}>
            <Route
              index
              element={
                <HomePage
                  onQuickView={setQuickView}
                  onAddToCart={addToCart}
                  paintings={paintings}
                  paintingsLoading={paintingsLoading}
                />
              }
            />
            <Route
              path="collection"
              element={
                <CollectionPage
                  onQuickView={setQuickView}
                  onAddToCart={addToCart}
                  paintings={paintings}
                  paintingsLoading={paintingsLoading}
                />
              }
            />
            <Route
              path="cart"
              element={
                <CartPage
                  cart={cart}
                  onRemove={removeFromCart}
                  refetchPaintings={fetchPaintings}
                />
              }
            />
            <Route
              path="checkout/success"
              element={
                <CheckoutSuccessPage
                  clearCart={clearCart}
                  refetchPaintings={fetchPaintings}
                />
              }
            />
            <Route path="inquiry-success" element={<InquirySuccessPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditionsPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>

      {quickView ? (
        <QuickViewModal
          painting={quickView}
          onClose={() => setQuickView(null)}
          onAddToCart={addToCart}
        />
      ) : null}

      {addedToCartItem ? (
        <AddedToCartModal
          painting={addedToCartItem}
          onClose={() => setAddedToCartItem(null)}
          onContinue={() => setAddedToCartItem(null)}
          onGoCart={() => {
            setAddedToCartItem(null);
            navigate("/cart");
          }}
        />
      ) : null}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppErrorBoundary>
        <AppContent />
      </AppErrorBoundary>
    </BrowserRouter>
  );
}
