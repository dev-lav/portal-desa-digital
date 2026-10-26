// Katalog barang dijual. Daftar barang, harga, dan status dibaca dari Google Sheets
// (File → Bagikan → Publikasikan ke web → format CSV), foto dari folder src/images/katalog.
// Format kolom: lihat src/data/katalog-awal.csv (bisa langsung diimpor ke Google Sheets).
import katalogAwalCsv from "./katalog-awal.csv?raw";
import { rwInfo } from "./mockData";
import { formatRupiah } from "@/lib/format";

// Tempel tautan CSV hasil "Publikasikan ke web" di sini.
// Selama kosong, katalog memakai src/data/katalog-awal.csv yang ikut di-build.
export const KATALOG_CSV_URL = "";

export type StatusBarang = "tersedia" | "dipesan" | "terjual";

export interface Barang {
  id: string;
  nama: string;
  // 0 = harga belum ditentukan, ditampilkan "Tanya harga"
  harga: number;
  // Harga sebelum diskon, ditampilkan dicoret
  hargaCoret?: number;
  status: StatusBarang;
  kategori: string;
  kondisi?: string;
  deskripsi: string;
  foto: string[];
  penjual: string;
  nomorWA: string;
  lokasi?: string;
}

// Semua foto di src/images/katalog, dicari berdasarkan nama file (tanpa membedakan huruf besar/kecil)
const fileFoto = import.meta.glob<string>("/src/images/katalog/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const fotoPerNama = new Map(Object.entries(fileFoto).map(([path, url]) => [path.split("/").pop()!.toLowerCase(), url]));

const cariFoto = (nama: string) => (/^https?:\/\//.test(nama) ? nama : fotoPerNama.get(nama.toLowerCase()));

// CSV sederhana: mendukung sel berkutip, koma dan baris baru di dalam kutip, serta "" sebagai kutip
const bacaCsv = (teks: string): string[][] => {
  const baris: string[][] = [];
  let kolom: string[] = [];
  let sel = "";
  let dalamKutip = false;

  for (let i = 0; i < teks.length; i++) {
    const c = teks[i];
    if (dalamKutip) {
      if (c === '"' && teks[i + 1] === '"') {
        sel += '"';
        i++;
      } else if (c === '"') dalamKutip = false;
      else sel += c;
    } else if (c === '"') dalamKutip = true;
    else if (c === ",") {
      kolom.push(sel);
      sel = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && teks[i + 1] === "\n") i++;
      kolom.push(sel);
      baris.push(kolom);
      kolom = [];
      sel = "";
    } else sel += c;
  }
  if (sel || kolom.length) {
    kolom.push(sel);
    baris.push(kolom);
  }
  return baris.filter((b) => b.some((s) => s.trim()));
};

// "Rp150.000", "150000", atau "Rp150.000,00" (format mata uang Sheets) -> 150000
const bacaHarga = (s = "") => Number(s.trim().replace(/[.,]\d{1,2}$/, "").replace(/\D/g, "")) || 0;

const bacaStatus = (s = ""): StatusBarang => {
  const t = s.trim().toLowerCase();
  if (/laku|terjual|sold|habis/.test(t)) return "terjual";
  if (/pesan|booked|hold|keep/.test(t)) return "dipesan";
  return "tersedia";
};

const jadikanSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const bacaKatalog = (csv: string): Barang[] => {
  const [kepala, ...isi] = bacaCsv(csv);
  if (!kepala) return [];
  // "Harga Coret" -> "harga_coret"
  const namaKolom = kepala.map((k) => k.trim().toLowerCase().replace(/\s+/g, "_"));

  return isi
    .map((sel) => {
      const r = Object.fromEntries(namaKolom.map((k, i) => [k, (sel[i] ?? "").trim()]));
      const hargaCoret = bacaHarga(r.harga_coret);
      const harga = bacaHarga(r.harga);
      return {
        id: jadikanSlug(r.id || r.nama || ""),
        nama: r.nama ?? "",
        harga,
        hargaCoret: hargaCoret > harga ? hargaCoret : undefined,
        status: bacaStatus(r.status),
        kategori: r.kategori || "Lainnya",
        kondisi: r.kondisi || undefined,
        deskripsi: r.deskripsi ?? "",
        foto: (r.foto ?? "")
          .split(/[,\n]/)
          .map((f) => cariFoto(f.trim()))
          .filter((f): f is string => Boolean(f)),
        penjual: r.penjual || `Pengurus RW ${rwInfo.nomor}`,
        nomorWA: r.wa || rwInfo.whatsapp,
        lokasi: r.lokasi || undefined,
      };
    })
    .filter((b) => b.id && b.nama);
};

export const labelHarga = (b: Barang) => (b.harga > 0 ? formatRupiah(b.harga) : "Tanya harga");

// Rp450.000 -> Rp350.000 = 22
export const persenDiskon = (b: Barang) => (b.hargaCoret ? Math.round((1 - b.harga / b.hargaCoret) * 100) : 0);

export const ambilKatalog = async (): Promise<Barang[]> => {
  if (!KATALOG_CSV_URL) return bacaKatalog(katalogAwalCsv);
  const res = await fetch(KATALOG_CSV_URL);
  if (!res.ok) throw new Error(`Gagal memuat katalog (${res.status})`);
  return bacaKatalog(await res.text());
};
