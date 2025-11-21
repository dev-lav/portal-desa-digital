// Data types untuk Portal RW 05

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

export interface Kegiatan {
  id: string;
  nama: string;
  tanggal: Date;
  waktu: string;
  lokasi: string;
  tag: "Rutin" | "Kerja Bakti" | "Posyandu" | "Rapat" | "Sosial";
  deskripsi?: string;
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
}
