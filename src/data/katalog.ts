// Katalog barang dijual. Data barang ada di src/data/katalog-awal.csv dan foto di src/images/katalog;
// yang dibaca langsung dari Google Sheets pengurus hanya tab "Status Publik" (kode, status, penawaran tertinggi,
// jumlah penawaran; tanpa nama/WA penawar), supaya perubahannya tampil tanpa deploy ulang.
import katalogAwalCsv from "./katalog-awal.csv?raw";
import { rwInfo } from "./mockData";
import { formatRupiah } from "@/lib/format";

// Tautan CSV tab "Status Publik" (File → Bagikan → Publikasikan ke web → pilih tab itu → CSV).
// Selama kosong, atau saat gagal dimuat, status diambil dari src/data/katalog-awal.csv.
export const STATUS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQd-eqbExO11lzCtybYwU8pSe0whTDaf21IkQvjV_WDf347lRaM84-uF4ZNodhtoizNVZvXojfFnG-9/pub?gid=1546791629&single=true&output=csv";

export type StatusBarang = "tersedia" | "dipesan" | "terjual";

export interface Barang {
  id: string;
  // Kode di file monitoring pengurus, mis. "RW12-01"
  kode?: string;
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
  // Hanya ada selama barang masih tersedia dan sudah ada yang menawar
  penawaran?: { tertinggi: number; jumlah: number };
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

// Juga mengenali status di file monitoring pengurus: "Sold Out" dan "Sudah Diambil" -> terjual,
// "Menunggu Pembayaran" -> dipesan; "Penawaran Masuk" dan "Dibatalkan" tetap tersedia (masih bisa dibeli)
const bacaStatus = (s = ""): StatusBarang => {
  const t = s.trim().toLowerCase();
  if (/laku|terjual|sold|habis|diambil/.test(t)) return "terjual";
  if (/pesan|booked|hold|keep|bayar/.test(t)) return "dipesan";
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
        kode: r.kode?.toUpperCase() || undefined,
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

// Barang tanpa harga patokan yang sudah ditawar: tawaran tertinggi menjadi harga yang ditampilkan
export const hargaDariTawaran = (b: Barang) => b.harga === 0 && Boolean(b.penawaran);

export const labelHarga = (b: Barang) =>
  b.harga > 0 ? formatRupiah(b.harga) : b.penawaran ? formatRupiah(b.penawaran.tertinggi) : "Tanya harga";

// Rp450.000 -> Rp350.000 = 22
export const persenDiskon = (b: Barang) => (b.hargaCoret ? Math.round((1 - b.harga / b.hargaCoret) * 100) : 0);

// Tab "Status Publik": kolom kode (judul berisi "kode"/"id"), status, penawaran, jumlah_penawaran
const bacaStatusPublik = (csv: string) => {
  const [kepala = [], ...isi] = bacaCsv(csv);
  const judul = kepala.map((k) => k.trim().toLowerCase());
  const iKode = Math.max(0, judul.findIndex((k) => /kode|id/.test(k)));
  const iStatus = judul.findIndex((k) => k.includes("status"));
  const iPenawaran = judul.findIndex((k) => k.startsWith("penawaran"));
  const iJumlah = judul.findIndex((k) => k.startsWith("jumlah"));
  return new Map(
    isi
      .map((sel) => {
        const tertinggi = iPenawaran < 0 ? 0 : bacaHarga(sel[iPenawaran]);
        const jumlah = iJumlah < 0 ? 0 : bacaHarga(sel[iJumlah]);
        return [
          sel[iKode]?.trim().toUpperCase(),
          {
            status: sel[iStatus < 0 ? 1 : iStatus]?.trim() ?? "",
            penawaran: tertinggi > 0 ? { tertinggi, jumlah: Math.max(jumlah, 1) } : undefined,
          },
        ] as const;
      })
      .filter(([kode, data]) => kode && data.status),
  );
};

export const ambilKatalog = async (): Promise<Barang[]> => {
  const katalog = bacaKatalog(katalogAwalCsv);
  if (!STATUS_CSV_URL) return katalog;
  try {
    // no-store: lewati salinan di browser (Google menandainya boleh disimpan 5 menit)
    const res = await fetch(STATUS_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const statusPublik = bacaStatusPublik(await res.text());
    return katalog.map((b) => {
      const publik = b.kode && statusPublik.get(b.kode);
      if (!publik) return b;
      const status = bacaStatus(publik.status);
      // Penawaran hanya ditampilkan selama barang masih bisa ditawar
      return { ...b, status, penawaran: status === "tersedia" ? publik.penawaran : undefined };
    });
  } catch (e) {
    // Katalog tetap tampil dengan status terakhir dari repo
    console.warn(`Status dari spreadsheet tidak dimuat: ${(e as Error).message}`);
    return katalog;
  }
};
