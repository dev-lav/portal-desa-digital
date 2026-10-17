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
- **React Router (HashRouter)** - Routing untuk GitHub Pages

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
- **HashRouter**: Menggunakan HashRouter (URL berbentuk `/#/halaman`) untuk kompatibilitas dengan GitHub Pages
- **WhatsApp Integration**: Komunikasi dengan pengurus RW melalui link WhatsApp
- **Privacy**: Tidak ada data pribadi yang dikumpulkan atau disimpan

## 🎨 Customisasi

### Mengubah Data

Hampir semua konten ada di `src/data/mockData.ts`:
- `pengumuman` - pengumuman penting di atas beranda (isi `null` kalau tidak ada)
- `kegiatanList` - agenda kegiatan
- `beritaList` - berita & dokumentasi (tiap berita punya halaman `/#/kegiatan/<id>`)
- `laporanKasBulanan`, `rincianPengeluaran` - laporan kas
- `fotoHero` - foto kolase di beranda
- `dataRT`, `pengurusRW`, `umkmList`, `lembagaList`, `rwInfo`

Gambar disimpan di `src/images/` lalu di-import di `mockData.ts`.

### Mengubah Warna/Theme

Warna diambil dari logo RW 12 dan diatur sebagai variabel di `src/index.css`.

### Menambah Halaman

1. Buat component baru di `src/pages/`
2. Import dan tambahkan route di `src/App.tsx`
3. Kalau perlu masuk menu utama, tambahkan di `src/components/navigasi.ts`

## 📄 Lisensi

Portal ini dibuat untuk keperluan RW 12, Desa Ngijo.

## 📞 Kontak

Untuk pertanyaan atau masukan, hubungi pengurus RW 12 melalui: rolasunited@gmail.com

---

Dibuat dengan ❤️ untuk warga RW 12
