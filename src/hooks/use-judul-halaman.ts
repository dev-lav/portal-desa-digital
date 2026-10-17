import { useEffect } from "react";

const JUDUL_BAWAAN = "RW 12 Desa Ngijo, Karangploso, Malang | Portal Warga";

// Judul tab browser per halaman; tanpa argumen = judul beranda
export const useJudulHalaman = (judul?: string) => {
  useEffect(() => {
    document.title = judul ? `${judul} | RW 12 Desa Ngijo` : JUDUL_BAWAAN;
  }, [judul]);
};
