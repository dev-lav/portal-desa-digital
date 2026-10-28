# Portal RW 12 - Desa Digital

Portal digital untuk warga RW 12, Desa Ngijo. Website statis yang menyediakan informasi, layanan, dan akses mudah untuk warga.

## 🌟 Fitur

- **Beranda**: Ringkasan statistik warga dan agenda terdekat
- **Profil RW**: Struktur pengurus dan kontak RT
- **Data Warga**: Statistik agregat penduduk (tanpa data pribadi)
- **Layanan Surat**: Informasi pengajuan berbagai surat pengantar
- **Kegiatan & Berita**: Agenda kegiatan dan dokumentasi
- **Keuangan**: Transparansi laporan kas dan pengeluaran RW
- **UMKM Warga**: Direktori usaha dan jasa lokal
- **Pengaduan**: Form pengaduan dan aspirasi warga

## 🚀 Teknologi

- **React** - Library UI
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Komponen UI
- **React Router** - Routing dengan URL bersih, di-prerender saat build

## 📦 Instalasi

```bash
# Clone repository
git clone <YOUR_GIT_URL>

# Masuk ke direktori project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Server akan berjalan di `http://localhost:8080`

## 🔨 Build

```bash
# Build untuk production
npm run build
```

File hasil build akan ada di folder `dist/`

## 🌐 Deploy

Situs live di **https://rolasunited.com**, di-deploy otomatis oleh GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) setiap ada push ke `main`.
Tidak perlu menjalankan perintah deploy dari laptop.

Pengaturan yang dibutuhkan di GitHub (cukup sekali):

- **Settings → Pages → Source**: `GitHub Actions`
- **Settings → Pages → Custom domain**: `rolasunited.com` (centang *Enforce HTTPS*)

Domain disimpan di pengaturan Pages, jadi repo ini tidak memerlukan file `CNAME`.
Progres dan hasil deploy bisa dilihat di tab **Actions**.

## 📝 Catatan Penting

- **No Backend**: Aplikasi ini sepenuhnya statis, tidak ada backend atau database
- **URL bersih + prerender**: `npm run build` menjalankan `scripts/prerender.mjs` yang menulis
  `dist/<halaman>/index.html` lengkap dengan konten dan meta SEO tiap halaman/berita, serta
  `sitemap.xml` dan `404.html`. Daftar halaman dan meta-nya ada di `src/seo/meta.ts`.
  Tautan lama berformat `/#/halaman` otomatis dialihkan ke `/halaman`.
- **WhatsApp Integration**: Komunikasi dengan pengurus RW melalui link WhatsApp
- **Privacy**: Tidak ada data pribadi yang dikumpulkan atau disimpan

## 🎨 Customisasi

### Mengubah Data

Hampir semua konten ada di `src/data/konten.ts`:
- `pengumuman` - pengumuman penting di atas beranda (isi `null` kalau tidak ada)
- `kegiatanList` - agenda kegiatan sekali jalan
- `kegiatanRutin` - kegiatan berulang (mingguan atau tiap N hari, mis. Ahad Pon), jadwal terdekatnya muncul otomatis sampai tanggal `sampai`
- `beritaList` - berita & dokumentasi, bisa berisi `galeri` foto atau `video` (tiap berita punya halaman `/kegiatan/<id>`)
- `laporanKasBulanan`, `rincianPengeluaran` - laporan kas
- `fotoHero` - foto kolase di beranda
- `dataRT`, `pengurusRW`, `umkmList`, `lembagaList`, `rwInfo`

Gambar disimpan di `src/images/` lalu di-import di `konten.ts`.

### Mengubah Warna/Theme

Warna diambil dari logo RW 12 dan diatur sebagai variabel di `src/index.css`.

### Menambah Halaman

1. Buat component baru di `src/pages/`
2. Import dan tambahkan route di `src/AppShell.tsx`
3. Kalau perlu masuk menu utama, tambahkan di `src/components/navigasi.ts`
4. Tambahkan judul & deskripsinya di `halamanTetap` pada `src/seo/meta.ts` agar ikut di-prerender dan masuk sitemap

## Katalog barang (`/katalog`)

Data barang (nama, harga, foto, deskripsi) ada di `src/data/katalog-awal.csv`, foto di `src/images/katalog/`.
Hanya **status** yang dibaca langsung dari Google Sheets monitoring pengurus, jadi perubahan status tampil
dalam ±5 menit tanpa deploy ulang.

| kolom CSV | isi |
| --- | --- |
| `id` | alamat halaman barang, mis. `kursi-rotan` (huruf kecil, tanpa spasi). Jangan diubah setelah dibagikan |
| `kode` | ID di file monitoring pengurus, mis. `RW12-01`; penghubung status dari spreadsheet |
| `nama` | nama barang (wajib) |
| `harga` | angka atau `Rp150.000`; kosong = tampil "Tanya harga" |
| `harga_coret` | opsional, harga sebelum diskon |
| `status` | status cadangan saat spreadsheet belum terhubung/gagal dimuat |
| `kategori`, `kondisi`, `deskripsi`, `lokasi` | opsional |
| `foto` | nama file di `src/images/katalog`, pisahkan dengan koma untuk beberapa foto |
| `penjual`, `wa` | opsional; kosong = pengurus RW dan nomor WA RW |

Urutan baris = urutan di website (barang unggulan taruh paling atas; 8 teratas yang belum terjual juga tampil
di beranda). Barang yang sudah terjual otomatis pindah ke paling bawah.

**Menghubungkan status dari spreadsheet pengurus**

1. Di spreadsheet monitoring, tab **Status Publik** berisi `kode`, `status`, `penawaran` (penawaran tertinggi) dan
   `jumlah_penawaran` yang diambil otomatis dari tab Daftar Barang & Riwayat Penawaran, tanpa nomor WA atau nama
   penawar/pembeli. Selama barang masih tersedia, penawaran tertinggi & jumlah penawar tampil di website.
2. File → Bagikan → **Publikasikan ke web** → pilih **hanya tab Status Publik**, format **CSV** → salin tautannya.
   Jangan publikasikan tab lain atau seluruh dokumen: tab lain berisi data pribadi warga.
3. Tempel tautan itu ke `STATUS_CSV_URL` di `src/data/katalog.ts`.

Status pengurus dikenali begini: Sold Out / Sudah Diambil → terjual; Menunggu Pembayaran → dipesan;
Tersedia / Penawaran Masuk / Dibatalkan → tersedia. Kalau spreadsheet gagal dimuat, website memakai kolom
`status` di CSV repo. Barang baru tetap ditambahkan lewat CSV repo dengan kode yang sama seperti di spreadsheet.

### Menambah foto barang

Simpan foto asli dari HP di `foto-asli/<nama-folder>/` (tidak ikut git), lalu jalankan:

```bash
python3 scripts/optimasi-foto.py foto-asli/barang-bekas
```

Foto dikecilkan ke WebP 1200px (±3 MB → ±80 KB), diputar sesuai orientasi kamera, metadatanya dibuang,
dan disimpan ke `src/images/katalog/` dengan nama huruf kecil tanpa spasi (`Dipan b.jpg` → `dipan-b.webp`).
Nama itulah yang ditulis di kolom `foto`. Butuh Python dengan Pillow (`pip install pillow`).

## 📄 Lisensi

Portal ini dibuat untuk keperluan RW 12, Desa Ngijo.

## 📞 Kontak

Untuk pertanyaan atau masukan, hubungi pengurus RW 12 melalui: rolasunited@gmail.com

---

Dibuat dengan ❤️ untuk warga RW 12
