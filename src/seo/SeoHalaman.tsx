import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useKatalog } from "@/hooks/use-katalog";
import { META_TIDAK_DITEMUKAN, metaHalaman } from "./meta";

const setMeta = (selector: string, attr: "content" | "href", nilai: string) => {
  document.head.querySelector(selector)?.setAttribute(attr, nilai);
};

// Samakan <title> & meta dengan halaman aktif saat pindah halaman di browser.
// Versi awal tiap halaman sudah ditulis saat build oleh scripts/prerender.mjs.
export const SeoHalaman = () => {
  const { pathname } = useLocation();
  // Judul halaman barang baru diketahui setelah data spreadsheet termuat
  const { data: katalog } = useKatalog(pathname.startsWith("/katalog/"));

  useEffect(() => {
    const meta = metaHalaman(pathname, katalog);
    if (!meta) {
      document.title = META_TIDAK_DITEMUKAN.judul;
      return;
    }
    document.title = meta.judul;
    setMeta('meta[name="description"]', "content", meta.deskripsi);
    setMeta('link[rel="canonical"]', "href", meta.kanonik);
    setMeta('meta[property="og:url"]', "content", meta.kanonik);
    setMeta('meta[property="og:title"]', "content", meta.judul);
    setMeta('meta[property="og:description"]', "content", meta.deskripsi);
    setMeta('meta[property="og:image"]', "content", meta.gambar);
    setMeta('meta[property="og:type"]', "content", meta.tipe);
  }, [pathname, katalog]);

  return null;
};
