import {
  PengurusRW,
  RTInfo,
  StatistikPenduduk,
  JenisSurat,
  Kegiatan,
  KegiatanRutin,
  LaporanKas,
  RincianPengeluaran,
  UMKM,
  Berita,
  Lembaga,
  Pengumuman,
  FotoHero,
  LaporanPosyandu,
} from "./types";
import { umkmTambahan } from "./umkm-tambahan";
import laporanPosyanduImg from "@/images/laporan-revitalisasi-posyandu.webp";
import sertifikatSalimahImg from "@/images/sertifikat-anak-hebat-salimah.webp";
import lansiaTangguhImg from "@/images/lansia-tangguh.jpeg";
import tabunganAmalImg from "@/images/tabungan-amal-sosial.jpeg";
import voliRW12Img from "@/images/voli-rw-12.jpeg";
import masjidAnNurImg from "@/images/masjid-an-nur.jpeg";
import rollasProductionsImg from "@/images/rollas-productions.webp";
import taekwondoRolasImg from "@/images/taekwondo-rolas.webp";
import sanggarSeniGendesrolasImg from "@/images/sanggar-seni-gendesrolas.webp";
import pembukaanLansiaTangguhImg from "@/images/pembukaan-lansia-tangguh.jpeg";
import voliAnakRutinImg from "@/images/voli-anak-rutin.jpeg";
import rt02SquareImg from "@/images/rt-02-square.jpeg";
import rt03SquareImg from "@/images/rt-03-square.jpeg";
import rt04SquareImg from "@/images/rt-04-square.jpeg";
import rt05SquareImg from "@/images/rt-05-square.jpeg";
import rt06SquareImg from "@/images/rt-06-square.jpeg";
import rt07SquareImg from "@/images/rt-07-square.jpeg";
import rt08SquareImg from "@/images/rt-08-square.jpeg";
import kerjaBaktiLingkunganRt3Img from "@/images/kerjaBaktiLingkunganRt3Img.jpeg";
import kerjaBaktiLingkunganRt8Img from "@/images/kerjaBaktiLingkunganRt8Img.jpeg";
import kerjaBaktiLingkunganRt5Img from "@/images/kerjaBaktiLingkunganRt5Img.jpeg";
import sekolahLansiaImg from "@/images/lansia-tangguh-02-2026.jpeg";
import gotongRoyongRt2Img from "@/images/gotong-royong-rt-02.jpeg";
import karnavalWargaImg from "@/images/karnaval-warga.jpeg";
import lombaMewarnaiImg from "@/images/lomba-mewarnai-anak.jpeg";
import lombaBakiakRemajaImg from "@/images/lomba-bakiak-remaja.jpeg";
import lombaBakiakIbuImg from "@/images/lomba-bakiak-ibu.jpeg";
import lombaEngklek1Img from "@/images/lomba-engklek-1.jpeg";
import lombaEngklek2Img from "@/images/lomba-engklek-2.jpeg";
import posterJalanSehatImg from "@/images/poster-jalan-sehat.jpeg";
import posterTariTradisionalImg from "@/images/poster-tari-tradisional.jpeg";
import latihanTaekwondoImg from "@/images/latihan-taekwondo.jpeg";
import posterLatihanTaekwondoImg from "@/images/poster-latihan-taekwondo.jpeg";

export const pengurusRW: PengurusRW[] = [
  { id: "1", jabatan: "Ketua RW", nama: "Ahmad Fadillah, SE., M.M.B.", kontak: "..." },
  { id: "2", jabatan: "Wakil Ketua", nama: "Sutomo", kontak: "..." },
  { id: "3", jabatan: "Sekretaris", nama: "Khanif Ilmiyawan", kontak: "..." },
  { id: "4", jabatan: "Bendahara", nama: "Khairul Saleh", kontak: "..." },
];

// Nomor ketua RT tidak disimpan di repo: diisi saat build dari VITE_KONTAK_RT
// (format "1:+62812...,2:+62813..."; lokal lewat .env.local, di GitHub lewat Secrets)
const nomorRT = Object.fromEntries(
  (import.meta.env.VITE_KONTAK_RT ?? "")
    .split(",")
    .map((p: string) => p.trim().split(":"))
    .filter((p: string[]) => p.length === 2),
) as Record<string, string>;
const kontakRT = (nomor: number) => nomorRT[nomor] ?? "-";

export const dataRT: RTInfo[] = [
  { nomor: 1, ketua: "Febri Tunggal", kontak: kontakRT(1), jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 2, ketua: "Fathur Rohim", kontak: kontakRT(2), jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt02SquareImg },
  { nomor: 3, ketua: "Farris Adi Putra", kontak: kontakRT(3), jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt03SquareImg },
  { nomor: 4, ketua: "Rudy Widiarto(Pak Ghocir)", kontak: kontakRT(4), jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt04SquareImg },
  { nomor: 5, ketua: "Eko Suyono", kontak: kontakRT(5), jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt05SquareImg },
  { nomor: 6, ketua: "Akhmad Mawardi", kontak: kontakRT(6), jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt06SquareImg },
  { nomor: 7, ketua: "Hadi Nurwanto", kontak: kontakRT(7), jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt07SquareImg },
  { nomor: 8, ketua: "Eko Mudjiono", kontak: kontakRT(8), jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt08SquareImg },
];

export const statistikPenduduk: StatistikPenduduk = {
  totalKK: 470,
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

// Kegiatan sekali jalan (rapat, kerja bakti, dll.)
export const kegiatanList: Kegiatan[] = [];

// Kegiatan berulang: tanggal terdekatnya muncul otomatis di agenda sampai tanggal `sampai`
export const kegiatanRutin: KegiatanRutin[] = [
  {
    id: "rutin-taekwondo",
    nama: "Latihan Beladiri Taekwondo",
    pola: { jenis: "mingguan", hari: [0] },
    mulai: new Date("2026-11-01"),
    sampai: new Date("2026-12-31"),
    waktu: "07.00 WIB - selesai",
    lokasi: "Lapangan Voli RW 12",
    tag: "Rutin",
    kategori: "Olahraga",
  },
  {
    id: "rutin-khodmil",
    nama: "Rutinan Khodmil Qur'an",
    // 7 Des 2025 jatuh pada Ahad Pon; Ahad Pon berulang tiap 35 hari (7 hari x 5 pasaran)
    pola: { jenis: "selang", tiapHari: 35, keterangan: "Tiap Ahad Pon" },
    mulai: new Date("2025-12-07"),
    sampai: new Date("2026-12-31"),
    waktu: "04.00 - 10.00 WIB",
    lokasi: "Masjid An Nur RW 12",
    tag: "Rutin",
    kategori: "Keagamaan",
  },
];

export const laporanKasBulanan: LaporanKas[] = [
  { bulan: "November 2025", saldoAwal: 23839917, pemasukan: 16166000, pengeluaran: 18008000, saldoAkhir: 21997917 },
  { bulan: "Januari 2026", saldoAwal: 12708000, pemasukan: 19945000, pengeluaran: 14005000, saldoAkhir: 18648000 },
  { bulan: "Februari 2026", saldoAwal: 18648000, pemasukan: 14438500, pengeluaran: 15607000, saldoAkhir: 17479500 },
  { bulan: "Maret 2026", saldoAwal: 17479500, pemasukan: 15636000, pengeluaran: 22608000, saldoAkhir: 10507500 },
  { bulan: "April 2026", saldoAwal: 10507500, pemasukan: 20219000, pengeluaran: 19444000, saldoAkhir: 11282500 },
  { bulan: "Mei 2026", saldoAwal: 11282500, pemasukan: 13978000, pengeluaran: 15162500, saldoAkhir: 10098000 },
  { bulan: "Juni 2026", saldoAwal: 10098000, pemasukan: 14088500, pengeluaran: 16456000, saldoAkhir: 7730500 },
  { bulan: "Juli 2026", saldoAwal: 7730500, pemasukan: 20140000, pengeluaran: 16013000, saldoAkhir: 11857500 },
  { bulan: "Agustus 2026", saldoAwal: 11857500, pemasukan: 16938500, pengeluaran: 16926500, saldoAkhir: 11869500 },
  { bulan: "September 2026", saldoAwal: 11869500, pemasukan: 13899000, pengeluaran: 19629000, saldoAkhir: 6139500 },
  { bulan: "Oktober 2026", saldoAwal: 6139500, pemasukan: 20763500, pengeluaran: 17209000, saldoAkhir: 9694000 },
];

export const rincianPengeluaran: RincianPengeluaran[] = [
  {
    id: "1",
    namaKegiatan: "KAS RW",
    tanggal: new Date("2026-10-31"),
    keterangan: "Bulanan",
    nominal: 2800000,
  },
  {
    id: "2",
    namaKegiatan: "Keamanan",
    tanggal: new Date("2026-10-31"),
    keterangan: "Bulanan",
    nominal: 3726000,
  },
  {
    id: "3",
    namaKegiatan: "Pengambilan Sampah",
    tanggal: new Date("2026-10-31"),
    keterangan: "Bulanan",
    nominal: 3354000,
  },
  {
    id: "4",
    namaKegiatan: "TPS ‐ GPA",
    tanggal: new Date("2026-10-31"),
    keterangan: "Bulanan",
    nominal: 6075000,
  },
  {
    id: "5",
    namaKegiatan: "Iuran Makam",
    tanggal: new Date("2026-10-31"),
    keterangan: "Bulanan",
    nominal: 1254000,
  },
];

export const umkmList: UMKM[] = [
  ...umkmTambahan,
];

// "Warung Yú Min" -> "warung-yu-min"; dipakai sebagai alamat halaman /umkm/<slug>
export const slugUmkm = (u: UMKM) =>
  u.namaUsaha
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const beritaList: Berita[] = [
  {
    id: "1",
    judul: "Acara pembukaan sekolah sahabat lansia tangguh RW 12",
    tanggal: new Date("2025-11-17"),
    ringkasan:
      "Acara pembukaan sekolah sahabat lansia tangguh RW 12 berhasil dilaksanakan dengan lancar dan penuh semangat oleh warga lansia RW 12.",
    gambar: pembukaanLansiaTangguhImg,
  },
  {
    id: "2",
    judul: "Latihan rutin voli anak RW 12",
    tanggal: new Date("2025-11-30"),
    ringkasan:
      "Latihan rutin voli anak RW 12 berhasil dilaksanakan dengan lancar dan penuh semangat oleh anak-anak RW 12.",
    gambar: voliAnakRutinImg,
  },
  {
    id: "3",
    judul: "Kerja bakti lingkungan RT 3 RW 12",
    tanggal: new Date("2026-02-08"),
    ringkasan:
      "Kegiatan pemangkasan pohon sebagai antisipasi cuaca ektrim di lingkungan RT 3 RW 12 ",
    gambar: kerjaBaktiLingkunganRt3Img,
  },
  {
    id: "4",
    judul: "Kerja bakti lingkungan RT 8 RW 12",
    tanggal: new Date("2026-02-08"),
    ringkasan:
      "Kegiatan pemangkasan pohon sebagai antisipasi cuaca ektrim di lingkungan RT 8 RW 12 ",
    gambar: kerjaBaktiLingkunganRt8Img,
  },
  {
    id: "5",
    judul: "Kerja bakti lingkungan RT 5 RW 12",
    tanggal: new Date("2026-02-08"),
    ringkasan:
      "Kegiatan pemangkasan pohon sebagai antisipasi cuaca ektrim di lingkungan RT 5 RW 12 ",
    gambar: kerjaBaktiLingkunganRt5Img,
  },
  {
    id: "6",
    judul: "Sekolah lansia tangguh",
    tanggal: new Date("2026-02-08"),
    ringkasan:
      "kegiatan sekolah lansia tangguh ( Selantang) RW 12 hari ini. Jumlah peserta 29 lansia. ",
    gambar: sekolahLansiaImg,
  },
  {
    id: "7",
    judul: "Kerja bakti lingkungan RT 2 RW 12",
    tanggal: new Date("2026-02-08"),
    ringkasan:
      "Gotong royong benahi lingkungan dalam memyambut Ramadhan di RT 2 RW 12 ",
    gambar: gotongRoyongRt2Img,
  },
  // Rangkaian lomba Agustusan (HUT RI ke-81). Tanggal perkiraan, sesuaikan bila perlu.
  {
    id: "8",
    judul: "Lomba mewarnai anak-anak",
    tanggal: new Date("2026-08-16"),
    ringkasan:
      "Anak-anak RW 12 mengikuti lomba mewarnai dalam rangka memeriahkan HUT Kemerdekaan RI ke-81.",
    gambar: lombaMewarnaiImg,
  },
  {
    id: "9",
    judul: "Lomba engklek",
    tanggal: new Date("2026-08-17"),
    ringkasan:
      "Permainan tradisional engklek kembali dimainkan warga RW 12, disaksikan dan disemangati warga yang berkumpul di sepanjang jalan.",
    gambar: lombaEngklek1Img,
    galeri: [lombaEngklek2Img],
  },
  {
    id: "10",
    judul: "Lomba bakiak",
    tanggal: new Date("2026-08-23"),
    ringkasan:
      "Lomba bakiak beregu yang diikuti remaja hingga ibu-ibu RW 12. Kekompakan langkah jadi kunci, tawa penonton jadi bonus.",
    gambar: lombaBakiakRemajaImg,
    galeri: [lombaBakiakIbuImg],
  },
  {
    id: "11",
    judul: "Karnaval warga RW 12",
    tanggal: new Date("2026-08-24"),
    ringkasan:
      "Warga RW 12 dari anak-anak hingga dewasa mengikuti karnaval dengan busana adat dan nuansa merah putih untuk memeriahkan HUT Kemerdekaan RI ke-81.",
    gambar: karnavalWargaImg,
  },
  {
    id: "12",
    judul: "Jalan sehat warga",
    tanggal: new Date("2026-08-17"),
    ringkasan:
      "Warga RW 12 mengikuti jalan sehat bersama, banyak yang tampil dengan kebaya, caping, dan selempang merah putih dalam suasana peringatan HUT Kemerdekaan RI ke-81.",
    gambar: posterJalanSehatImg,
    video: { src: "/videos/jalan-sehat.mp4", durasi: "0:41" },
  },
  {
    id: "13",
    judul: "Penampilan tari tradisional dan reog",
    tanggal: new Date("2026-08-24"),
    ringkasan:
      "Penampilan tari tradisional dan reog menjadi bagian dari rangkaian peringatan HUT Kemerdekaan RI ke-81 di RW 12, disaksikan warga dari anak-anak hingga orang tua.",
    gambar: posterTariTradisionalImg,
    video: { src: "/videos/tari-tradisional-dan-reog.mp4", durasi: "0:51" },
  },
  {
    id: "revitalisasi-posyandu-permata-12",
    judul: "Laporan Pendanaan & Rencana Revitalisasi Posyandu Permata 12",
    tanggal: new Date("2026-11-02"),
    ringkasan:
      "Transparansi dana revitalisasi Posyandu Permata 12 RW 12 Desa Ngijo: total pemasukan Rp11.875.000, pengeluaran Rp1.500.000, saldo dana saat ini Rp10.375.000, serta rekap penawaran barang amal Rp4.390.000 untuk pelaksanaan revitalisasi tahap pertama.",
    gambar: laporanPosyanduImg,
    posisiGambar: "top",
  },
  {
    id: "anak-hebat-salimah",
    judul: "Anak Hebat RW 12: Salimah dari RT 5 berdonasi untuk Posyandu Permata 12",
    tanggal: new Date("2026-11-08"),
    ringkasan:
      "Salimah Nurfaizah Ramadhani dari RT 5 menerima sertifikat Anak Hebat RW 12 kategori Pendonasi Barang atas donasinya di Lapak Amal RW 12 untuk revitalisasi Posyandu Permata 12.",
    gambar: sertifikatSalimahImg,
  },
  {
    id: "latihan-taekwondo-foto",
    judul: "Latihan taekwondo anak-anak RW 12",
    tanggal: new Date("2026-11-08"),
    ringkasan:
      "Anak-anak Club Taekwondo Rolas berfoto bersama dua pelatih setelah latihan rutin tiap Ahad pagi di Lapangan Voli RW 12 Desa Ngijo, Karangploso, Malang.",
    gambar: latihanTaekwondoImg,
  },
  {
    id: "latihan-taekwondo-video",
    judul: "Video latihan taekwondo RW 12",
    tanggal: new Date("2026-11-08"),
    ringkasan:
      "Video semangat anak-anak dan pelatih Club Taekwondo Rolas saat latihan rutin di Lapangan Voli RW 12 Desa Ngijo, Karangploso, Malang.",
    gambar: posterLatihanTaekwondoImg,
    video: { src: "/videos/latihan-taekwondo.mp4", durasi: "0:09" },
  },
];

export const laporanPosyandu: LaporanPosyandu = {
  idBerita: "revitalisasi-posyandu-permata-12",
  namaPosyandu: "Posyandu Permata 12",
  tanggalUpdate: new Date("2026-11-02"),
  poster: laporanPosyanduImg,
  ringkasanDana: {
    totalPemasukan: 11875000,
    totalPengeluaran: 1500000,
    saldoDana: 10375000,
  },
  rincianPemasukan: [
    { keterangan: "Penjualan mobil sampah donasi RT 1–5", nominal: 5000000 },
    { keterangan: "Hadiah lomba kebersihan antar-RW", nominal: 750000 },
    { keterangan: "Sumbangan panitia Ngijo Haritege", nominal: 1000000 },
    { keterangan: "Iuran PKK RT 5", nominal: 195000 },
    { keterangan: "Pendapatan penjualan barang bekas", nominal: 4930000 },
  ],
  rincianPengeluaran: [
    { keterangan: "Reparasi perabot sumbangan warga untuk dijual ulang", nominal: 1200000 },
    { keterangan: "Perbaikan mesin pompa air sumbangan warga", nominal: 300000 },
  ],
  rekapPenawaran: {
    jumlahBarang: 16,
    totalPenawaran: 4390000,
    contohBarang: [
      { nama: "Sepeda Listrik U-WINFLY", nominal: 1500000 },
      { nama: "Lemari kaca hias", nominal: 500000 },
      { nama: "Dipan kayu ukir", nominal: 500000 },
      { nama: "Lemari kayu sudut", nominal: 500000 },
      { nama: "Meja rias kayu", nominal: 500000 },
      { nama: "Pompa air listrik", nominal: 300000 },
    ],
    catatan: "Data lengkap tersimpan dalam rekap panitia.",
  },
  rencanaTahapPertama: [
    "Membongkar pos satpam",
    "Meratakan semua lantai agar sama tinggi",
    "Menyambung atap pada bagian pos satpam yang dibongkar",
    "Memasang pagar kawat sementara dengan menggunakan pagar besi yang sudah ada",
  ],
  catatanPelaksanaan: "Pelaksanaan revitalisasi dilakukan secara bertahap sesuai dana yang tersedia.",
  ucapanTerimaKasih: "Dari warga, oleh warga, untuk Posyandu Permata 12 yang lebih aman, nyaman, dan layak.",
};

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
  },
  {
    id: "4",
    nama: "Masjid An-Nur",
    logo: masjidAnNurImg,
  },
  {
    id: "5",
    nama: "Rollas Productions",
    logo: rollasProductionsImg,
  },
  {
    id: "6",
    nama: "Club Taekwondo Rolas",
    logo: taekwondoRolasImg,
  },
  {
    id: "7",
    nama: "Sanggar Seni Gendesrolas",
    logo: sanggarSeniGendesrolasImg,
  },
];

// Pengumuman penting yang tampil di atas beranda. Isi dengan `null` kalau sedang tidak ada.
// Contoh:
// export const pengumuman: Pengumuman | null = {
//   judul: "Kerja bakti serentak menyambut musim hujan",
//   tanggal: new Date("2026-10-26"),
//   waktu: "06.30 WIB",
//   lokasi: "Kumpul di Balai RW",
//   isi: "Seluruh warga diharapkan hadir membawa alat kebersihan.",
// };
export const pengumuman: Pengumuman | null = null;

// Foto kolase di beranda: `utama` berganti otomatis, `samping` tetap.
export const fotoHero: { utama: FotoHero[]; samping: [FotoHero, FotoHero] } = {
  utama: [
    { src: karnavalWargaImg, caption: "Karnaval warga" },
    { src: lombaBakiakRemajaImg, caption: "Lomba bakiak" },
    { src: sekolahLansiaImg, caption: "Sekolah Lansia Tangguh" },
    { src: gotongRoyongRt2Img, caption: "Gotong royong RT 02" },
  ],
  samping: [
    { src: lombaMewarnaiImg, caption: "Mewarnai" },
    { src: lombaBakiakIbuImg, caption: "Bakiak ibu-ibu" },
  ],
};

export const rwInfo = {
  nomor: "12",
  desa: "Desa Ngijo",
  kecamatan: "Kecamatan Karangploso",
  kabupaten: "Kabupaten Malang",
  provinsi: "Provinsi Jawa Timur",
  alamatPosko: "Balai RW 12",
  jamLayanan: "Senin - Jumat, 08.00 - 16.00 WIB",
  whatsapp: "+6281255556991",
  email: "rolasunited@gmail.com",
};

// wa.me hanya menerima angka (tanpa "+" atau spasi)
export const waLink = (text?: string, nomor: string = rwInfo.whatsapp) =>
  `https://wa.me/${nomor.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
