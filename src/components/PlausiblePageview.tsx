import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../lib/plausible";

export default function PlausiblePageview() {
  const location = useLocation();

  useEffect(() => {
    trackEvent("pageview");
  }, [location.pathname, location.search]);

  return null;
}
