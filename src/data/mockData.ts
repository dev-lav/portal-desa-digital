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
import masjidAnNurImg from "@/images/masjid-an-nur.jpeg";
import pembukaanLansiaTangguhImg from "@/images/pembukaan-lansia-tangguh.jpeg";
import voliAnakRutinImg from "@/images/voli-anak-rutin.png";
import rt02SquareImg from "@/images/rt-02-square.jpeg";
import rt03SquareImg from "@/images/rt-03-square.jpeg";
import rt04SquareImg from "@/images/rt-04-square.jpeg";
import rt05SquareImg from "@/images/rt-05-square.jpeg";
import rt06SquareImg from "@/images/rt-06-square.jpeg";
import kerjaBaktiLingkunganRt3Img from "@/images/kerjaBaktiLingkunganRt3Img.jpeg";
import kerjaBaktiLingkunganRt8Img from "@/images/kerjaBaktiLingkunganRt8Img.png";
import kerjaBaktiLingkunganRt5Img from "@/images/kerjaBaktiLingkunganRt5Img.jpeg";
import sekolahLansiaImg from "@/images/lansia-tangguh-02-2026.jpeg";
import gotongRoyongRt2Img from "@/images/gotong-royong-rt-02.jpeg";

export const pengurusRW: PengurusRW[] = [
  { id: "1", jabatan: "Ketua RW", nama: "Ahmad Fadillah, SE., M.M.B.", kontak: "..." },
  { id: "2", jabatan: "Wakil Ketua", nama: "Sutomo", kontak: "..." },
  { id: "3", jabatan: "Sekretaris", nama: "Khanif Ilmiyawan", kontak: "..." },
  { id: "4", jabatan: "Bendahara", nama: "Khairul Saleh", kontak: "..." },
];

export const dataRT: RTInfo[] = [
  { nomor: 1, ketua: "Febri Tunggal", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 2, ketua: "Fathur Rohim", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt02SquareImg },
  { nomor: 3, ketua: "Farris Adi Putra", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt03SquareImg },
  { nomor: 4, ketua: "Rudy Widiarto(Pak Ghocir)", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt04SquareImg },
  { nomor: 5, ketua: "Eko Suyono", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt05SquareImg },
  { nomor: 6, ketua: "Akhmad Mawardi", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0, foto: rt06SquareImg },
  { nomor: 7, ketua: "Hadi Nurwanto", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
  { nomor: 8, ketua: "Eko Mudjiono", kontak: "-", jumlahKK: 0, jumlahJiwa: 0, jumlahLansia: 0 },
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
    nominal: 465000,
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
    nomorWA: "+6282257869294",
    deskripsi: "Ayam Geprek, Ayam Katsu. Buka jam 8 pagi - 8 malam. Free delivery minimal 2 porsi",
  },
  {
    id: "2",
    namaUsaha: "Hadhila Laundry",
    jenisUsaha: "Jasa Laundry",
    pemilik: "Hadhila",
    rt: 3,
    nomorWA: "+6285282365820",
    deskripsi: "Solusi tumpukan cucian Anda. Free ambil antar untuk daerah Karangploso",
  },
  {
    id: "3",
    namaUsaha: "Bakoelan Mama",
    jenisUsaha: "Makanan & Minuman",
    pemilik: "Lailatul Illa F.J",
    rt: 4,
    nomorWA: "+6285649007151",
    deskripsi: "Aneka Olahan Frozen Food Homemade",
  },
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
  },
  {
    id: "4",
    nama: "Masjid An-Nur",
    logo: masjidAnNurImg,
  }
];

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
