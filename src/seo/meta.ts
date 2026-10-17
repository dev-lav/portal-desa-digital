import { beritaList } from "@/data/mockData";

export const SITE_URL = "https://rolasunited.com";
const NAMA_SITUS = "RW 12 Desa Ngijo";
const JUDUL_BERANDA = "RW 12 Desa Ngijo, Karangploso, Malang | Portal Warga";
const DESKRIPSI_BAWAAN =
  "Portal warga RW 12 Desa Ngijo, Kecamatan Karangploso, Kabupaten Malang. Info kegiatan, dokumentasi, laporan kas RW, kontak ketua RT, dan UMKM warga Ngijo.";
const GAMBAR_BAWAAN = "/og-image.jpg";

export interface MetaHalaman {
  judul: string;
  deskripsi: string;
  gambar: string; // URL absolut
  tipe: "website" | "article";
  kanonik: string; // URL absolut
}

// "/kegiatan/9/" -> "/kegiatan/9"
export const rapikanPath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : "/");

// GitHub Pages menyajikan /kegiatan/9/index.html di alamat berakhiran "/", jadi kanonik ikut memakai "/"
export const urlKanonik = (path: string) => {
  const p = rapikanPath(path);
  return p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}/`;
};

const absolut = (url: string) => (url.startsWith("http") || url.startsWith("data:") ? url : `${SITE_URL}${url}`);

const halamanTetap: Record<string, { judul: string; deskripsi: string }> = {
  "/kegiatan": {
    judul: "Kegiatan Warga",
    deskripsi:
      "Agenda, pengumuman, serta foto dan video dokumentasi kegiatan warga RW 12 Desa Ngijo, Karangploso, Malang.",
  },
  "/keuangan": {
    judul: "Kas RW",
    deskripsi: "Laporan kas RW 12 Desa Ngijo: saldo, pemasukan, pengeluaran, dan rinciannya, terbuka untuk seluruh warga.",
  },
  "/kontak": {
    judul: "Kontak Pengurus & Ketua RT",
    deskripsi: "Hubungi pengurus RW 12 dan ketua RT di Desa Ngijo, Karangploso, Malang lewat WhatsApp atau email.",
  },
  "/profil": {
    judul: "Profil RW 12",
    deskripsi: "Profil RW 12 Desa Ngijo, Karangploso, Malang: pengurus RW, daftar RT, serta lembaga dan komunitas warga.",
  },
  "/umkm": {
    judul: "UMKM Warga",
    deskripsi: "Daftar UMKM dan jasa milik warga RW 12 Desa Ngijo, Karangploso, Malang. Belanja di tetangga sendiri.",
  },
  "/pengaduan": {
    judul: "Sampaikan Aduan",
    deskripsi: "Sampaikan keluhan, usulan, atau aspirasi untuk pengurus RW 12 Desa Ngijo lewat WhatsApp.",
  },
  "/kebijakan-privasi": {
    judul: "Kebijakan Privasi",
    deskripsi: "Kebijakan privasi portal warga RW 12 Desa Ngijo, Karangploso, Malang.",
  },
};

// Meta untuk sebuah path; null kalau halamannya tidak ada (404)
export const metaHalaman = (path: string): MetaHalaman | null => {
  const p = rapikanPath(path);
  const kanonik = urlKanonik(p);

  if (p === "/") {
    return { judul: JUDUL_BERANDA, deskripsi: DESKRIPSI_BAWAAN, gambar: absolut(GAMBAR_BAWAAN), tipe: "website", kanonik };
  }

  const tetap = halamanTetap[p];
  if (tetap) {
    return {
      judul: `${tetap.judul} | ${NAMA_SITUS}`,
      deskripsi: tetap.deskripsi,
      gambar: absolut(GAMBAR_BAWAAN),
      tipe: "website",
      kanonik,
    };
  }

  const cocok = p.match(/^\/kegiatan\/([^/]+)$/);
  const berita = cocok && beritaList.find((b) => b.id === cocok[1]);
  if (berita) {
    return {
      judul: `${berita.judul} | ${NAMA_SITUS}`,
      deskripsi: berita.ringkasan.trim(),
      gambar: absolut(berita.gambar ?? GAMBAR_BAWAAN),
      tipe: "article",
      kanonik,
    };
  }

  return null;
};

export const META_TIDAK_DITEMUKAN = {
  judul: `Halaman tidak ditemukan | ${NAMA_SITUS}`,
  deskripsi: DESKRIPSI_BAWAAN,
};

// Semua halaman publik yang di-prerender dan masuk sitemap
export const daftarRute = () => ["/", ...Object.keys(halamanTetap), ...beritaList.map((b) => `/kegiatan/${b.id}`)];
