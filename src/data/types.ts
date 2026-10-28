// Data types untuk Portal RW 12

export interface PengurusRW {
  id: string;
  jabatan: string;
  nama: string;
  kontak?: string;
}

export interface RTInfo {
  nomor: number;
  ketua: string;
  kontak: string;
  jumlahKK: number;
  jumlahJiwa: number;
  jumlahLansia: number;
  foto?: string;
}

export interface StatistikPenduduk {
  totalKK: number;
  totalJiwa: number;
  komposisiUsia: {
    balita: number;
    usiaSekolah: number;
    produktif: number;
    lansia: number;
  };
  pekerjaan: {
    karyawan: number;
    pedagang: number;
    petani: number;
    lainnya: number;
  };
}

export interface JenisSurat {
  id: string;
  nama: string;
  deskripsi: string;
  dokumenDiperlukan: string[];
  estimasiProses: string;
}

export const kategoriKegiatan = ["Olahraga", "Keagamaan", "Sosial", "Lainnya"] as const;
export type KategoriKegiatan = (typeof kategoriKegiatan)[number];

export interface Kegiatan {
  id: string;
  nama: string;
  tanggal: Date;
  waktu: string;
  lokasi: string;
  tag: "Rutin" | "Kerja Bakti" | "Posyandu" | "Rapat" | "Sosial";
  kategori: KategoriKegiatan; // untuk filter di halaman Kegiatan
  ilustrasi?: string; // gambar siluet di kartu agenda utama; kalau kosong dipakai ikon kategori
  deskripsi?: string;
  // Diisi otomatis untuk jadwal yang berasal dari KegiatanRutin, mis. "Setiap Sabtu"
  ulang?: string;
  aturan?: { rrule: string; libur: Date[] }; // untuk "Simpan ke kalender"
}

// Kegiatan berulang: cukup tulis polanya, tanggal terdekat dihitung otomatis (lihat src/lib/jadwal.ts)
export interface KegiatanRutin extends Omit<Kegiatan, "tanggal" | "ulang" | "aturan"> {
  pola:
    | { jenis: "mingguan"; hari: number[] } // 0 = Minggu, 1 = Senin, ... 6 = Sabtu
    | { jenis: "selang"; tiapHari: number; keterangan: string }; // mis. Ahad Pon = tiap 35 hari sejak `mulai`
  mulai: Date;
  sampai: Date;
  libur?: Date[]; // tanggal yang dilewati
}

export interface LaporanKas {
  bulan: string;
  saldoAwal: number;
  pemasukan: number;
  pengeluaran: number;
  saldoAkhir: number;
}

export interface RincianPengeluaran {
  id: string;
  namaKegiatan: string;
  tanggal: Date;
  keterangan: string;
  nominal: number;
}

export interface UMKM {
  id: string;
  namaUsaha: string;
  jenisUsaha: string;
  pemilik: string;
  rt: number;
  nomorWA: string;
  deskripsi?: string;
}

export interface Berita {
  id: string;
  judul: string;
  tanggal: Date;
  ringkasan: string;
  gambar?: string;
  // Foto tambahan yang tampil di halaman detail
  galeri?: string[];
  // Video kegiatan (file di public/videos). `gambar` dipakai sebagai sampulnya.
  video?: {
    src: string;
    durasi?: string;
  };
}

export interface Lembaga {
  id: string;
  nama: string;
  logo: string;
}

export interface Pengumuman {
  judul: string;
  tanggal: Date;
  waktu?: string;
  lokasi?: string;
  isi?: string;
}

export interface FotoHero {
  src: string;
  caption: string;
}
