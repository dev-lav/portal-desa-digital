import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Tautan lama berformat /#/kegiatan/9 (dari masa HashRouter) dialihkan ke /kegiatan/9
const alihkanTautanLama = () => {
  if (!window.location.hash.startsWith("#/")) return false;
  window.history.replaceState(null, "", window.location.hash.slice(1) || "/");
  return true;
};

alihkanTautanLama();
// Kalau tautan lama dibuka saat situs sudah terbuka, beri tahu router lewat popstate
window.addEventListener("hashchange", () => {
  if (alihkanTautanLama()) window.dispatchEvent(new PopStateEvent("popstate"));
});

// Konten hasil prerender di #root diganti versi interaktif
createRoot(document.getElementById("root")!).render(<App />);
