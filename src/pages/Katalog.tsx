import { useMemo, useState } from "react";
import { HandHeart, HeartHandshake, PackageOpen, RefreshCw, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BarangCard, BarangCardSkeleton } from "@/components/konten/BarangCard";
import { useKatalog } from "@/hooks/use-katalog";
import { waLink } from "@/data/mockData";
import { cn } from "@/lib/utils";

const urutan = {
  pilihan: "Pilihan",
  termurah: "Harga terendah",
  termahal: "Harga tertinggi",
} as const;

const Katalog = () => {
  const { data: katalog = [], isPending, isError, refetch, isFetching } = useKatalog();
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState<keyof typeof urutan>("pilihan");
  const [sembunyikanTerjual, setSembunyikanTerjual] = useState(false);
  const [hanyaDitawar, setHanyaDitawar] = useState(false);

  const jumlahTerjual = katalog.filter((b) => b.status === "terjual").length;
  const jumlahDitawar = katalog.filter((b) => b.penawaran).length;
  const daftarKategori = useMemo(() => ["Semua", ...new Set(katalog.map((b) => b.kategori))], [katalog]);

  const daftar = useMemo(() => {
    const kata = cari.trim().toLowerCase();
    // "Pilihan" = urutan baris di spreadsheet, jadi pengurus bisa menaruh barang unggulan di atas
    const hasil = katalog.filter(
      (b) =>
        (kategori === "Semua" || b.kategori === kategori) &&
        (!sembunyikanTerjual || b.status !== "terjual") &&
        (!hanyaDitawar || b.penawaran) &&
        (!kata || `${b.nama} ${b.deskripsi} ${b.kategori}`.toLowerCase().includes(kata)),
    );
    // Barang tanpa harga ("Tanya harga") ditaruh setelah yang berharga
    if (urut === "termurah") hasil.sort((a, b) => (a.harga || Infinity) - (b.harga || Infinity));
    if (urut === "termahal") hasil.sort((a, b) => b.harga - a.harga);
    // Yang sudah terjual selalu di belakang
    return hasil.sort((a, b) => Number(a.status === "terjual") - Number(b.status === "terjual"));
  }, [katalog, cari, kategori, urut, sembunyikanTerjual, hanyaDitawar]);

  return (
    <>
      <PageHeader
        title="Lapak amal posyandu"
        subtitle="Barang bekas layak pakai dari warga. Seluruh hasil penjualan untuk renovasi Posyandu RW 12."
      >
        <label className="relative mt-5 block max-w-xl">
          <span className="sr-only">Cari barang</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari barang, mis. kursi"
            className="h-12 w-full rounded-full bg-card pl-12 pr-4 text-foreground outline-none ring-accent placeholder:text-muted-foreground focus:ring-2"
          />
        </label>
      </PageHeader>

      <div className="container">
        {katalog.length > 0 && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
            <HeartHandshake className="h-9 w-9 flex-shrink-0 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-bold">
                {jumlahTerjual} dari {katalog.length} barang sudah terjual
              </p>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(jumlahTerjual / katalog.length) * 100}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Setiap pembelian membantu renovasi posyandu.</p>
            </div>
          </div>
        )}

        {/* Chip dibungkus ke baris berikutnya agar semua kategori terlihat tanpa geser */}
        <div className="mt-4 flex flex-wrap gap-1.5 md:gap-2">
          {daftarKategori.map((k) => (
            <button
              key={k}
              onClick={() => setKategori(k)}
              className={cn(
                "rounded-full border border-border bg-card px-3 py-1.5 text-[0.8rem] font-bold text-muted-foreground md:px-4 md:py-2 md:text-sm",
                kategori === k && "border-primary bg-primary text-primary-foreground",
              )}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
          <p className="text-muted-foreground">{isPending ? "Memuat barang…" : `${daftar.length} barang`}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {jumlahDitawar > 0 && (
              <label className="flex cursor-pointer items-center gap-1.5 font-semibold text-destructive">
                <input
                  type="checkbox"
                  checked={hanyaDitawar}
                  onChange={(e) => setHanyaDitawar(e.target.checked)}
                  className="h-4 w-4 accent-[hsl(var(--destructive))]"
                />
                Sedang ditawar ({jumlahDitawar})
              </label>
            )}
            <label className="flex cursor-pointer items-center gap-1.5 font-semibold">
              <input
                type="checkbox"
                checked={sembunyikanTerjual}
                onChange={(e) => setSembunyikanTerjual(e.target.checked)}
                className="h-4 w-4 accent-[hsl(var(--primary))]"
              />
              Tersedia saja
            </label>
            <select
              value={urut}
              onChange={(e) => setUrut(e.target.value as keyof typeof urutan)}
              aria-label="Urutkan"
              className="rounded-full border border-border bg-card px-3 py-1.5 font-semibold"
            >
              {Object.entries(urutan).map(([nilai, label]) => (
                <option key={nilai} value={nilai}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isError ? (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-bold">Katalog belum bisa dimuat</p>
            <p className="text-sm text-muted-foreground">Periksa koneksi internet Anda, lalu coba lagi.</p>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
            >
              <RefreshCw className={cn("h-4 w-4", isFetching && "animate-spin")} />
              Coba lagi
            </button>
          </div>
        ) : isPending ? (
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 8 }, (_, i) => (
              <BarangCardSkeleton key={i} />
            ))}
          </div>
        ) : daftar.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-8 text-center">
            <PackageOpen className="h-10 w-10 text-muted-foreground" />
            <p className="font-bold">{katalog.length === 0 ? "Belum ada barang yang dijual" : "Barang tidak ditemukan"}</p>
            {katalog.length > 0 && <p className="text-sm text-muted-foreground">Coba kata kunci atau kategori lain.</p>}
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4 xl:grid-cols-5">
            {daftar.map((b) => (
              <BarangCard key={b.id} barang={b} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl bg-secondary p-5 md:flex-row md:items-center">
          <HandHeart className="h-8 w-8 flex-shrink-0 text-primary" />
          <div className="flex-1">
            <p className="font-bold">Ingin membantu renovasi posyandu?</p>
            <p className="text-sm text-muted-foreground">Selain membeli barang, Anda juga bisa berdonasi langsung lewat pengurus RW.</p>
          </div>
          <a
            href={waLink("Halo, saya ingin berdonasi untuk renovasi Posyandu RW 12")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Donasi
          </a>
        </div>
      </div>
    </>
  );
};

export default Katalog;
