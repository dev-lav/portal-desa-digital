# Portal RW 05 - Desa Digital

Portal digital untuk warga RW 05, Desa Sukamaju. Website statis yang menyediakan informasi, layanan, dan akses mudah untuk warga.

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

## 🌐 Deploy ke GitHub Pages

### Opsi 1: Manual

1. Build project:
   ```bash
   npm run build
   ```

2. Deploy folder `dist/` ke branch `gh-pages`:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

3. Aktifkan GitHub Pages di repository settings, pilih branch `gh-pages`

### Opsi 2: GitHub Actions (Otomatis)

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

Setiap push ke branch `main` akan otomatis build dan deploy.

## 📝 Catatan Penting

- **Data Dummy**: Semua data di portal ini adalah contoh (dummy data) untuk demonstrasi
- **No Backend**: Aplikasi ini sepenuhnya statis, tidak ada backend atau database
- **HashRouter**: Menggunakan HashRouter untuk kompatibilitas dengan GitHub Pages
- **WhatsApp Integration**: Komunikasi dengan pengurus RW melalui link WhatsApp
- **Privacy**: Tidak ada data pribadi yang dikumpulkan atau disimpan

## 🎨 Customisasi

### Mengubah Data

Edit file di folder `src/data/`:
- `mockData.ts` - Data dummy untuk semua konten
- `types.ts` - Tipe data TypeScript

### Mengubah Warna/Theme

Edit file `src/index.css` untuk mengubah color variables dan theme.

### Menambah Halaman

1. Buat component baru di `src/pages/`
2. Import dan tambahkan route di `src/App.tsx`
3. Update navigation di `src/components/Navbar.tsx`

## 📄 Lisensi

Portal ini dibuat untuk keperluan RW 05, Desa Sukamaju.

## 📞 Kontak

Untuk pertanyaan atau masukan, hubungi pengurus RW 05 melalui:
- WhatsApp: 081234567890
- Email: rw05sukamaju@gmail.com

---

Dibuat dengan ❤️ untuk warga RW 05
