import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import QuickViewModal from "./modals/QuickViewModal";
import AddedToCartModal from "./modals/AddedToCartModal";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import CartPage from "./pages/CartPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import InquirySuccessPage from "./pages/InquirySuccessPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./components/ScrollToTop";
import AppErrorBoundary from "./components/AppErrorBoundary";
import type { Painting } from "./types/painting";

const CART_STORAGE_KEY = "nadart-cart";

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

      <Routes>
        <Route path="/" element={<MainLayout cartCount={cart.length} />}>
          <Route
            index
            element={
              <HomePage onQuickView={setQuickView} onAddToCart={addToCart} />
            }
          />
          <Route
            path="collection"
            element={
              <CollectionPage
                onQuickView={setQuickView}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="cart"
            element={<CartPage cart={cart} onRemove={removeFromCart} />}
          />
          <Route
            path="checkout/success"
            element={<CheckoutSuccessPage clearCart={clearCart} />}
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
