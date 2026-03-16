import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // useLayoutEffect fires synchronously before the browser paints
  useLayoutEffect(() => {
    // Multiple approaches to ensure scroll works across browsers
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari
  }, [pathname]);

  return null;
};

export default ScrollToTop;
