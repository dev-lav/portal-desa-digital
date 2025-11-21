import {
  PengurusRW,
  RTInfo,
  StatistikPenduduk,
  JenisSurat,
  Kegiatan,
  LaporanKas,
  RincianPengeluaran,
  UMKM,
  Berita,
} from "./types";

export const pengurusRW: PengurusRW[] = [
  { id: "1", jabatan: "Ketua RW", nama: "Bapak Suryanto", kontak: "081234567890" },
  { id: "2", jabatan: "Sekretaris", nama: "Ibu Ratna Sari", kontak: "081234567891" },
  { id: "3", jabatan: "Bendahara", nama: "Bapak Hendra Wijaya", kontak: "081234567892" },
];

export const dataRT: RTInfo[] = [
  { nomor: 1, ketua: "Bapak Ahmad Fauzi", kontak: "081234567801", jumlahKK: 85, jumlahJiwa: 320, jumlahLansia: 28 },
  { nomor: 2, ketua: "Ibu Siti Aminah", kontak: "081234567802", jumlahKK: 92, jumlahJiwa: 348, jumlahLansia: 35 },
  { nomor: 3, ketua: "Bapak Bambang Eko", kontak: "081234567803", jumlahKK: 78, jumlahJiwa: 295, jumlahLansia: 22 },
  { nomor: 4, ketua: "Ibu Desi Kartika", kontak: "081234567804", jumlahKK: 88, jumlahJiwa: 334, jumlahLansia: 30 },
  { nomor: 5, ketua: "Bapak Eko Prasetyo", kontak: "081234567805", jumlahKK: 95, jumlahJiwa: 360, jumlahLansia: 38 },
];

export const statistikPenduduk: StatistikPenduduk = {
  totalKK: 438,
  totalJiwa: 1657,
  komposisiUsia: {
    balita: 145,
    usiaSekolah: 398,
    produktif: 961,
    lansia: 153,
  },
  pekerjaan: {
    karyawan: 487,
    pedagang: 156,
    petani: 89,
    lainnya: 286,
  },
};

export const jenisSurat: JenisSurat[] = [
  {
    id: "1",
    nama: "Surat Pengantar Domisili",
    deskripsi: "Surat keterangan untuk membuktikan tempat tinggal warga di wilayah RW 05.",
    dokumenDiperlukan: ["KTP asli & fotokopi", "Kartu Keluarga asli & fotokopi", "Bukti pembayaran PBB (jika ada)"],
    estimasiProses: "1-2 hari kerja",
  },
  {
    id: "2",
    nama: "Surat Pengantar SKTM",
    deskripsi: "Surat Keterangan Tidak Mampu untuk keperluan beasiswa, keringanan biaya, dll.",
    dokumenDiperlukan: ["KTP asli & fotokopi", "Kartu Keluarga asli & fotokopi", "Surat pernyataan tidak mampu"],
    estimasiProses: "2-3 hari kerja",
  },
  {
    id: "3",
    nama: "Surat Pengantar Pembuatan KTP/KK",
    deskripsi: "Surat pengantar untuk mengurus pembuatan atau perubahan KTP dan Kartu Keluarga.",
    dokumenDiperlukan: ["KTP lama (jika ada)", "Kartu Keluarga asli & fotokopi", "Akta kelahiran (untuk KTP baru)"],
    estimasiProses: "1 hari kerja",
  },
  {
    id: "4",
    nama: "Surat Pengantar Izin Keramaian",
    deskripsi: "Surat izin untuk mengadakan acara yang mengundang keramaian (hajatan, pengajian, dll).",
    dokumenDiperlukan: ["KTP pemohon", "Surat undangan acara", "Persetujuan RT setempat"],
    estimasiProses: "1-2 hari kerja",
  },
  {
    id: "5",
    nama: "Surat Pengantar Keterangan Usaha",
    deskripsi: "Surat keterangan untuk membuktikan keberadaan usaha di wilayah RW 05.",
    dokumenDiperlukan: ["KTP pemilik usaha", "Kartu Keluarga", "Foto lokasi usaha", "Surat pernyataan bermeterai"],
    estimasiProses: "2-3 hari kerja",
  },
];

export const kegiatanList: Kegiatan[] = [
  {
    id: "1",
    nama: "Posyandu Balita & Lansia",
    tanggal: new Date("2025-12-05"),
    waktu: "08.00 - 11.00 WIB",
    lokasi: "Balai RW 05",
    tag: "Posyandu",
    deskripsi: "Pemeriksaan kesehatan rutin untuk balita dan lansia",
  },
  {
    id: "2",
    nama: "Rapat Koordinasi RT & RW",
    tanggal: new Date("2025-12-10"),
    waktu: "19.30 - 21.30 WIB",
    lokasi: "Balai RW 05",
    tag: "Rapat",
    deskripsi: "Evaluasi program bulan November dan rencana Desember",
  },
  {
    id: "3",
    nama: "Kerja Bakti Bersih Lingkungan",
    tanggal: new Date("2025-12-15"),
    waktu: "06.00 - 09.00 WIB",
    lokasi: "Seluruh wilayah RW 05",
    tag: "Kerja Bakti",
    deskripsi: "Gotong royong membersihkan selokan dan area umum",
  },
  {
    id: "4",
    nama: "Senam Sehat Warga",
    tanggal: new Date("2025-12-08"),
    waktu: "06.30 - 07.30 WIB",
    lokasi: "Lapangan RT 03",
    tag: "Rutin",
    deskripsi: "Senam pagi bersama instruktur",
  },
  {
    id: "5",
    nama: "Pengajian Rutin Ibu-Ibu",
    tanggal: new Date("2025-12-12"),
    waktu: "14.00 - 16.00 WIB",
    lokasi: "Balai RW 05",
    tag: "Rutin",
    deskripsi: "Kajian agama dan arisan ibu-ibu",
  },
  {
    id: "6",
    nama: "Bakti Sosial untuk Lansia",
    tanggal: new Date("2025-12-20"),
    waktu: "09.00 - 12.00 WIB",
    lokasi: "Balai RW 05",
    tag: "Sosial",
    deskripsi: "Pembagian sembako dan pemeriksaan kesehatan gratis",
  },
];

export const laporanKasBulanan: LaporanKas[] = [
  { bulan: "Agustus 2025", saldoAwal: 3500000, pemasukan: 2190000, pengeluaran: 1850000, saldoAkhir: 3840000 },
  { bulan: "September 2025", saldoAwal: 3840000, pemasukan: 2190000, pengeluaran: 2100000, saldoAkhir: 3930000 },
  { bulan: "Oktober 2025", saldoAwal: 3930000, pemasukan: 2190000, pengeluaran: 1650000, saldoAkhir: 4470000 },
  { bulan: "November 2025", saldoAwal: 4470000, pemasukan: 2190000, pengeluaran: 1920000, saldoAkhir: 4740000 },
];

export const rincianPengeluaran: RincianPengeluaran[] = [
  {
    id: "1",
    namaKegiatan: "Posyandu Bulanan",
    tanggal: new Date("2025-11-05"),
    keterangan: "Snack, vitamin, dan bahan habis pakai",
    nominal: 450000,
  },
  {
    id: "2",
    namaKegiatan: "Kerja Bakti Lingkungan",
    tanggal: new Date("2025-11-12"),
    keterangan: "Peralatan kebersihan dan konsumsi",
    nominal: 380000,
  },
  {
    id: "3",
    namaKegiatan: "Listrik dan Air Balai RW",
    tanggal: new Date("2025-11-01"),
    keterangan: "Tagihan bulanan",
    nominal: 420000,
  },
  {
    id: "4",
    namaKegiatan: "Perawatan Taman RW",
    tanggal: new Date("2025-11-18"),
    keterangan: "Pupuk, tanaman hias, jasa tukang",
    nominal: 350000,
  },
  {
    id: "5",
    namaKegiatan: "Rapat Koordinasi",
    tanggal: new Date("2025-11-10"),
    keterangan: "Konsumsi rapat RT & RW",
    nominal: 320000,
  },
];

export const umkmList: UMKM[] = [
  {
    id: "1",
    namaUsaha: "Warung Makan Sederhana",
    jenisUsaha: "Makanan & Minuman",
    pemilik: "Ibu Sari",
    rt: 2,
    nomorWA: "081234560001",
    deskripsi: "Nasi uduk, soto ayam, dan aneka gorengan",
  },
  {
    id: "2",
    namaUsaha: "Laundry Bersih Cepat",
    jenisUsaha: "Jasa Laundry",
    pemilik: "Bapak Joko",
    rt: 1,
    nomorWA: "081234560002",
    deskripsi: "Cuci setrika kiloan dan satuan, antar jemput gratis",
  },
  {
    id: "3",
    namaUsaha: "Bengkel Motor Maju",
    jenisUsaha: "Bengkel",
    pemilik: "Bapak Andi",
    rt: 3,
    nomorWA: "081234560003",
    deskripsi: "Service motor, ganti oli, ban, dan spare part",
  },
  {
    id: "4",
    namaUsaha: "Les Privat Cerdas",
    jenisUsaha: "Jasa Les",
    pemilik: "Ibu Dina",
    rt: 4,
    nomorWA: "081234560004",
    deskripsi: "Les matematika, bahasa Inggris, dan IPA untuk SD-SMP",
  },
  {
    id: "5",
    namaUsaha: "Toko Kelontong Berkah",
    jenisUsaha: "Toko Kelontong",
    pemilik: "Bapak Hasan",
    rt: 5,
    nomorWA: "081234560005",
    deskripsi: "Kebutuhan sehari-hari, pulsa, dan gas LPG",
  },
  {
    id: "6",
    namaUsaha: "Catering Ibu Yuni",
    jenisUsaha: "Makanan & Minuman",
    pemilik: "Ibu Yuni",
    rt: 2,
    nomorWA: "081234560006",
    deskripsi: "Nasi kotak, tumpeng, dan snack untuk acara",
  },
  {
    id: "7",
    namaUsaha: "Sablon Kaos Express",
    jenisUsaha: "Jasa Sablon",
    pemilik: "Bapak Rudi",
    rt: 3,
    nomorWA: "081234560007",
    deskripsi: "Sablon kaos, mug, dan totebag untuk event",
  },
  {
    id: "8",
    namaUsaha: "Salon Cantik Jelita",
    jenisUsaha: "Salon",
    pemilik: "Ibu Fitri",
    rt: 1,
    nomorWA: "081234560008",
    deskripsi: "Potong rambut, creambath, dan treatment wajah",
  },
];

export const beritaList: Berita[] = [
  {
    id: "1",
    judul: "Kerja Bakti Membersihkan Selokan Berhasil Dilaksanakan",
    tanggal: new Date("2025-11-15"),
    ringkasan:
      "Warga RW 05 bergotong-royong membersihkan selokan di seluruh wilayah. Kegiatan berjalan lancar dan diikuti lebih dari 100 warga.",
  },
  {
    id: "2",
    judul: "Posyandu Balita Bulan November Dihadiri 45 Balita",
    tanggal: new Date("2025-11-08"),
    ringkasan:
      "Kegiatan posyandu rutin berjalan lancar dengan pelayanan imunisasi, penimbangan, dan pemberian vitamin.",
  },
  {
    id: "3",
    judul: "Penanaman 50 Pohon dalam Rangka Penghijauan",
    tanggal: new Date("2025-11-20"),
    ringkasan:
      "RW 05 bekerja sama dengan dinas lingkungan hidup menanam 50 pohon di area taman dan sepanjang jalan lingkungan.",
  },
];

export const rwInfo = {
  nomor: "05",
  desa: "Desa Sukamaju",
  kecamatan: "Kecamatan Sejahtera",
  kabupaten: "Kabupaten Makmur",
  alamatPosko: "Jl. Mawar No. 12, RT 03 RW 05",
  jamLayanan: "Senin - Jumat, 19.00 - 21.00 WIB",
  whatsapp: "081234567890",
  email: "rw05sukamaju@gmail.com",
};
