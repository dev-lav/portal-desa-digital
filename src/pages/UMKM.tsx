import { useMemo, useState } from "react";
import { Search, X, Store, MessageCircle } from "lucide-react";
import { UmkmCard, isBukaSekarang } from "@/components/konten/UmkmCard";
import { umkmList, waLink } from "@/data/konten";
import { cn } from "@/lib/utils";

const UMKM = () => {
  const [cari, setCari] = useState("");
  const [kategoriTerpilih, setKategoriTerpilih] = useState("Semua");
  const [hanyaBuka, setHanyaBuka] = useState(false);
  const [hanyaAdaWA, setHanyaAdaWA] = useState(false);

  // Daftar kategori unik
  const daftarKategori = useMemo(() => {
    return ["Semua", ...Array.from(new Set(umkmList.map((u) => u.jenisUsaha)))];
  }, []);

  // Filter daftar UMKM berdasarkan search & filter chip
  const hasilFilter = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return umkmList.filter((u) => {
      // Filter kategori
      if (kategoriTerpilih !== "Semua" && u.jenisUsaha !== kategoriTerpilih) return false;

      // Filter buka sekarang
      if (hanyaBuka && !isBukaSekarang(u.jamBuka)) return false;

      // Filter punya nomor WA
      if (hanyaAdaWA && !u.nomorWA) return false;

      // Search query (nama, deskripsi, alamat, jenisUsaha)
      if (q) {
        const haystack = `${u.namaUsaha} ${u.deskripsi || ""} ${u.alamat || ""} ${u.jenisUsaha}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [cari, kategoriTerpilih, hanyaBuka, hanyaAdaWA]);

  const resetSemuaFilter = () => {
    setCari("");
    setKategoriTerpilih("Semua");
    setHanyaBuka(false);
    setHanyaAdaWA(false);
  };

  return (
    <div className="pb-12">
      {/* Heading H1 Semantik untuk Google Search (Visually Hidden) */}
      <h1 className="sr-only">
        Direktori UMKM, Kuliner, dan Layanan Warga Permata Regency 1 RW 12 Desa Ngijo, Karangploso
      </h1>

      {/* FLOATING SEARCH & FILTER BAR (Sticky di bawah navbar saat di-scroll) */}
      <section className="sticky top-[var(--tinggi-header)] z-30 border-b border-border bg-background/95 py-2.5 backdrop-blur-md shadow-xs">
        <div className="container space-y-2">
          {/* Kotak Pencarian */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari makanan, laundry, kue, jasa, atau blok..."
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
            />
            {cari && (
              <button
                onClick={() => setCari("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Hapus pencarian"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Bar Kategori & Filter Cepat (Scroll Horizontal di Mobile) */}
          <div className="no-scrollbar -mx-4 flex items-center gap-1.5 overflow-x-auto px-4 pb-0.5 text-xs">
            {daftarKategori.map((k) => (
              <button
                key={k}
                onClick={() => setKategoriTerpilih(k)}
                className={cn(
                  "flex-shrink-0 whitespace-nowrap rounded-lg border px-3 py-1.5 font-bold transition-all",
                  kategoriTerpilih === k
                    ? "border-brand bg-brand text-accent shadow-xs"
                    : "border-border bg-card text-muted-foreground hover:border-brand/50 hover:text-foreground",
                )}
              >
                {k}
              </button>
            ))}

            <span className="h-4 w-px bg-border flex-shrink-0 mx-1" />

            {/* Quick Toggle: Buka Sekarang */}
            <button
              onClick={() => setHanyaBuka((prev) => !prev)}
              className={cn(
                "flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-bold transition-all",
                hanyaBuka
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-xs"
                  : "border-border bg-card text-muted-foreground hover:border-emerald-600",
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", hanyaBuka ? "bg-white" : "bg-emerald-500")} />
              Buka
            </button>

            {/* Quick Toggle: WA Aktif */}
            <button
              onClick={() => setHanyaAdaWA((prev) => !prev)}
              className={cn(
                "flex-shrink-0 inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-bold transition-all",
                hanyaAdaWA
                  ? "border-primary bg-primary text-primary-foreground shadow-xs"
                  : "border-border bg-card text-muted-foreground hover:border-primary",
              )}
            >
              <MessageCircle className="h-3 w-3" />
              WA
            </button>
          </div>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <div className="container mt-4">
        {/* Info Ringkas Hasil */}
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground px-0.5 mb-3">
          <span>Menampilkan {hasilFilter.length} usaha</span>
          <span className="text-primary">📍 Permata Regency 1 (RW 12)</span>
        </div>

        {/* Grid Kartu UMKM */}
        {hasilFilter.length > 0 ? (
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {hasilFilter.map((u) => (
              <UmkmCard key={u.id} umkm={u} />
            ))}
          </div>
        ) : (
          /* Empty State jika filter tidak cocok */
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-3xl">🔍</p>
            <h3 className="mt-2 text-base font-extrabold text-foreground">Tidak ada usaha yang sesuai</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Coba gunakan kata kunci lain atau reset filter untuk melihat semua usaha warga.
            </p>
            <button
              onClick={resetSemuaFilter}
              className="mt-3 rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              Tampilkan Semua Usaha
            </button>
          </div>
        )}

        {/* Banner Daftarkan Usaha Warga */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-xl border border-primary/20 bg-secondary p-4 sm:flex-row sm:items-center md:p-5">
          <div className="flex items-center gap-3">
            <Store className="h-7 w-7 flex-shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold text-foreground">Punya usaha di Permata Regency 1?</p>
              <p className="text-xs text-muted-foreground">
                Daftarkan usaha Anda gratis agar warga dapat menemukan dan berbelanja langsung.
              </p>
            </div>
          </div>
          <a
            href={waLink("Halo Pengurus RW 12, saya ingin mendaftarkan usaha saya di halaman UMKM Permata Regency 1")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs transition hover:bg-primary/90"
          >
            Daftarkan Usaha →
          </a>
        </div>
      </div>
    </div>
  );
};

export default UMKM;
