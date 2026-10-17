import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Router tidak mengembalikan posisi scroll ke atas saat pindah halaman
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
