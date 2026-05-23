import { useEffect } from "react";

export function useCleanupAbandonedCheckout() {
  useEffect(() => {
    const sessionId = localStorage.getItem("checkout_session_id");

    if (!sessionId) {
      return;
    }

    const hasJustCompletedPayment =
      window.location.pathname.includes("/checkout/success");

    const hasJustCancelledPayment =
      window.location.search.includes("cancelled=true");

    if (hasJustCompletedPayment) {
      localStorage.removeItem("checkout_session_id");
      return;
    }

    if (hasJustCancelledPayment) {
      return;
    }

    fetch("/api/expire-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    })
      .then(() => {
        localStorage.removeItem("checkout_session_id");
      })
      .catch((error) => {
        console.error("Failed to cleanup abandoned checkout", error);
      });
  }, []);
}
