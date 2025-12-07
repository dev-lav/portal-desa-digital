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
  Lembaga,
} from "./types";
import lansiaTangguhImg from "@/images/lansia-tangguh.jpeg";
import tabunganAmalImg from "@/images/tabungan-amal-sosial.jpeg";
import voliRW12Img from "@/images/voli-rw-12.jpeg";

export const pengurusRW: PengurusRW[] = [
  { id: "1", jabatan: "Ketua RW", nama: "Ahmad Fadillah, SE., M.M.B.", kontak: "..." },
  { id: "2", jabatan: "Sekretaris", nama: "...", kontak: "..." },
  { id: "3", jabatan: "Bendahara", nama: "...", kontak: "..." },
];

export const dataRT: RTInfo[] = [
  { nomor: 1, ketua: "-", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 2, ketua: "Fathur Rohim", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 3, ketua: "Farris Adi Putra", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 4, ketua: "Rudy Widiarto(Pak Ghocir)", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 5, ketua: "Eko Suyono", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 6, ketua: "Akhmad Mawardi", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 7, ketua: "-", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 8, ketua: "Eko Mudjiono", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
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
    deskripsi: "Surat keterangan untuk membuktikan tempat tinggal warga di wilayah RW 12.",
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
    deskripsi: "Surat keterangan untuk membuktikan keberadaan usaha di wilayah RW 12.",
    dokumenDiperlukan: ["KTP pemilik usaha", "Kartu Keluarga", "Foto lokasi usaha", "Surat pernyataan bermeterai"],
    estimasiProses: "2-3 hari kerja",
  },
];

export const kegiatanList: Kegiatan[] = [
  {
    id: "1",
    nama: "Latihan Voli Anak",
    tanggal: new Date("2025-12-14"),
    waktu: "07.00 - 09.00 WIB",
    lokasi: "Lapangan Voli RW 12",
    tag: "Rutin",
    deskripsi: "Latihan rutin voli khusus anak-anak",
  },
  {
    id: "2",
    nama: "Latihan Voli Dewasa",
    tanggal: new Date("2025-12-13"),
    waktu: "15.00 - 17.00 WIB",
    lokasi: "Lapangan Voli RW 12",
    tag: "Rutin",
    deskripsi: "Latihan rutin voli khusus dewasa",
  },
  {
    id: "3",
    nama: "Rutinan Khodmil Qur'an",
    tanggal: new Date("2025-12-07"),
    waktu: "04.00 - 10.00 WIB",
    lokasi: "Masjid An Nur RW 12",
    tag: "Rutin",
    deskripsi: "Rutinan khodmil Qur'an Ahad Pon",
  }
];

export const laporanKasBulanan: LaporanKas[] = [
  { bulan: "November 2025", saldoAwal: 23839917, pemasukan: 16166000, pengeluaran: 18008000, saldoAkhir: 21997917 },
];

export const rincianPengeluaran: RincianPengeluaran[] = [
  {
    id: "1",
    namaKegiatan: "KAS RW",
    tanggal: new Date("2025-11-30"),
    keterangan: "Bulanan",
    nominal: 165000,
  },
  {
    id: "2",
    namaKegiatan: "Keamanan",
    tanggal: new Date("2025-11-30"),
    keterangan: "Bulanan",
    nominal: 6850000,
  },
  {
    id: "3",
    namaKegiatan: "Pengambilan Sampah",
    tanggal: new Date("2025-11-30"),
    keterangan: "Bulanan",
    nominal: 3550000,
  },
  {
    id: "4",
    namaKegiatan: "TPS ‐ GPA",
    tanggal: new Date("2025-11-30"),
    keterangan: "Bulanan",
    nominal: 6075000,
  },
  {
    id: "5",
    namaKegiatan: "Iuran Makam",
    tanggal: new Date("2025-11-30"),
    keterangan: "Bulanan",
    nominal: 418000,
  },
  {
    id: "6",
    namaKegiatan: "Pemuda dan Olahraga",
    tanggal: new Date("2025-11-30"),
    keterangan: "Bulanan",
    nominal: 650000,
  }
];

export const umkmList: UMKM[] = [
  {
    id: "1",
    namaUsaha: "Nasdo Ayaje",
    jenisUsaha: "Makanan & Minuman",
    pemilik: "-",
    rt: 0,
    nomorWA: "082257869294",
    deskripsi: "Ayam Geprek, Ayam Katsu. Buka jam 8 pagi - 8 malam. Free delivery minimal 2 porsi",
  },
  {
    id: "2",
    namaUsaha: "Hadhila Laundry",
    jenisUsaha: "Jasa Laundry",
    pemilik: "Hadhila",
    rt: 3,
    nomorWA: "085282365820",
    deskripsi: "Solusi tumpukan cucian Anda. Free ambil antar untuk daerah Karangploso",
  },
  // {
  //   id: "3",
  //   namaUsaha: "Bengkel Motor Maju",
  //   jenisUsaha: "Bengkel",
  //   pemilik: "Bapak Andi",
  //   rt: 3,
  //   nomorWA: "081234560003",
  //   deskripsi: "Service motor, ganti oli, ban, dan spare part",
  // },
  // {
  //   id: "4",
  //   namaUsaha: "Les Privat Cerdas",
  //   jenisUsaha: "Jasa Les",
  //   pemilik: "Ibu Dina",
  //   rt: 4,
  //   nomorWA: "081234560004",
  //   deskripsi: "Les matematika, bahasa Inggris, dan IPA untuk SD-SMP",
  // },
  // {
  //   id: "5",
  //   namaUsaha: "Toko Kelontong Berkah",
  //   jenisUsaha: "Toko Kelontong",
  //   pemilik: "Bapak Hasan",
  //   rt: 5,
  //   nomorWA: "081234560005",
  //   deskripsi: "Kebutuhan sehari-hari, pulsa, dan gas LPG",
  // },
  // {
  //   id: "6",
  //   namaUsaha: "Catering Ibu Yuni",
  //   jenisUsaha: "Makanan & Minuman",
  //   pemilik: "Ibu Yuni",
  //   rt: 2,
  //   nomorWA: "081234560006",
  //   deskripsi: "Nasi kotak, tumpeng, dan snack untuk acara",
  // },
  // {
  //   id: "7",
  //   namaUsaha: "Sablon Kaos Express",
  //   jenisUsaha: "Jasa Sablon",
  //   pemilik: "Bapak Rudi",
  //   rt: 3,
  //   nomorWA: "081234560007",
  //   deskripsi: "Sablon kaos, mug, dan totebag untuk event",
  // },
  // {
  //   id: "8",
  //   namaUsaha: "Salon Cantik Jelita",
  //   jenisUsaha: "Salon",
  //   pemilik: "Ibu Fitri",
  //   rt: 1,
  //   nomorWA: "081234560008",
  //   deskripsi: "Potong rambut, creambath, dan treatment wajah",
  // },
];

export const beritaList: Berita[] = [
  {
    id: "1",
    judul: "Acara pembukaan sekolah sahabat lansia tangguh RW 12",
    tanggal: new Date("2025-11-17"),
    ringkasan:
      "Acara pembukaan sekolah sahabat lansia tangguh RW 12 berhasil dilaksanakan dengan lancar dan penuh semangat oleh warga lansia RW 12.",
  },
  {
    id: "2",
    judul: "Latihan rutin voli anak RW 12",
    tanggal: new Date("2025-11-30"),
    ringkasan:
      "Latihan rutin voli anak RW 12 berhasil dilaksanakan dengan lancar dan penuh semangat oleh anak-anak RW 12.",
  }
];

export const lembagaList: Lembaga[] = [
  {
    id: "1",
    nama: "Tabungan Amal Sosial",
    logo: tabunganAmalImg,
  },
  {
    id: "2",
    nama: "Lansia Tangguh",
    logo: lansiaTangguhImg,
  },
  {
    id: "3",
    nama: "Voli RW 12",
    logo: voliRW12Img,
  }
];

export const rwInfo = {
  nomor: "12",
  desa: "Desa Ngijo",
  kecamatan: "Kecamatan Karangploso",
  kabupaten: "Kabupaten Malang",
  alamatPosko: "Balai RW 12",
  jamLayanan: "Senin - Jumat, 08.00 - 16.00 WIB",
  whatsapp: "081255556991",
  email: "rolasunited@gmail.com",
};
