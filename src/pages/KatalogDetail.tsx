import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Flame, ImageOff, MapPin, MessageCircle, RefreshCw, Share2 } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { BarangCard } from "@/components/konten/BarangCard";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Barang, StatusBarang, hargaDariTawaran, labelHarga, persenDiskon } from "@/data/katalog";
import { waLink } from "@/data/konten";
import { useKatalog } from "@/hooks/use-katalog";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { urlKanonik } from "@/seo/meta";

const labelStatus: Record<StatusBarang, { teks: string; kelas: string }> = {
  tersedia: { teks: "Tersedia", kelas: "bg-secondary text-primary" },
  dipesan: { teks: "Sedang dipesan", kelas: "bg-accent/25 text-[#8a6a00]" },
  terjual: { teks: "Sudah terjual", kelas: "bg-muted text-muted-foreground" },
};

// "[RW12-01] Sepeda": kode membantu pengurus mencatat penawaran di file monitoring
const namaBerkode = (b: Barang) => (b.kode ? `[${b.kode}] ${b.nama}` : b.nama);

// Pesan WhatsApp yang sudah terisi saat pembeli menekan tombol beli
const pesanBeli = (b: Barang) => {
  const isi = `*${namaBerkode(b)}*\n${b.harga > 0 ? `Harga: ${formatRupiah(b.harga)}\n` : ""}${urlKanonik(`/katalog/${b.id}`)}`;
  if (b.penawaran) {
    return `Halo ${b.penjual}, saya mau menawar barang ini dari Lapak Amal Posyandu RW 12:\n\n${isi}\nTawaran tertinggi saat ini: ${formatRupiah(b.penawaran.tertinggi)}\n\nTawaran saya: Rp`;
  }
  if (b.hargaPas && b.status === "tersedia") {
    return `Halo ${b.penjual}, saya mau beli barang ini dari Lapak Amal Posyandu RW 12:\n\n${isi}\n\nJumlah: `;
  }
  return b.status === "dipesan"
    ? `Halo ${b.penjual}, saya lihat barang ini di Lapak Amal Posyandu RW 12:\n\n${isi}\n\nKatanya sedang dipesan. Kalau batal, saya mau antre ya.`
    : b.harga > 0
      ? `Halo ${b.penjual}, saya mau beli barang ini dari Lapak Amal Posyandu RW 12:\n\n${isi}\n\nApakah masih tersedia?`
      : `Halo ${b.penjual}, saya tertarik dengan barang ini dari Lapak Amal Posyandu RW 12:\n\n${isi}\n\nBerapa harganya dan apakah masih tersedia?`;
};

const bagikan = async (b: Barang) => {
  const url = urlKanonik(`/katalog/${b.id}`);
  const teks = b.harga > 0 ? `${b.nama} - ${formatRupiah(b.harga)}` : b.nama;
  if (navigator.share) {
    // Dibatalkan pengguna juga melempar error; tidak perlu ditangani
    await navigator.share({ title: teks, url }).catch(() => {});
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${teks}\n${url}`)}`, "_blank", "noopener");
  }
};

const TombolGeser = ({ arah, onClick, tampil }: { arah: "sebelumnya" | "berikutnya"; onClick: () => void; tampil: boolean }) => {
  const Ikon = arah === "sebelumnya" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      disabled={!tampil}
      aria-label={`Foto ${arah}`}
      className={cn(
        "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground shadow-md backdrop-blur transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-0",
        arah === "sebelumnya" ? "left-3" : "right-3",
      )}
    >
      <Ikon className="h-5 w-5" />
    </button>
  );
};

const Galeri = ({ barang }: { barang: Barang }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [aktif, setAktif] = useState(0);
  const terjual = barang.status === "terjual";

  useEffect(() => {
    if (!api) return;
    const pilih = () => setAktif(api.selectedScrollSnap());
    pilih();
    api.on("select", pilih);
    return () => {
      api.off("select", pilih);
    };
  }, [api]);

  return (
    <div className="-mx-4 sm:mx-0">
      <div className="relative overflow-hidden bg-muted sm:rounded-2xl sm:border sm:border-border">
        {barang.foto.length > 0 ? (
          <Carousel setApi={setApi}>
            <CarouselContent className="ml-0">
              {barang.foto.map((src, i) => (
                <CarouselItem key={src} className="pl-0">
                  <img
                    src={src}
                    alt={i === 0 ? barang.nama : `${barang.nama} (foto ${i + 1})`}
                    className={cn("aspect-square w-full object-cover", terjual && "opacity-60 grayscale")}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex aspect-square items-center justify-center text-muted-foreground">
            <ImageOff className="h-14 w-14" />
          </div>
        )}
        {terjual && (
          <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-lg font-extrabold text-white">
            Terjual
          </span>
        )}
        {barang.foto.length > 1 && (
          <>
            <TombolGeser arah="sebelumnya" onClick={() => api?.scrollPrev()} tampil={aktif > 0} />
            <TombolGeser arah="berikutnya" onClick={() => api?.scrollNext()} tampil={aktif < barang.foto.length - 1} />
          </>
        )}
        {barang.foto.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-bold text-white">
            {aktif + 1}/{barang.foto.length}
          </span>
        )}
      </div>

      {barang.foto.length > 1 && (
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto px-4 sm:px-0">
          {barang.foto.map((src, i) => (
            <button
              key={src}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Lihat foto ${i + 1}`}
              className={cn(
                "h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 border-transparent",
                aktif === i && "border-primary",
              )}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TombolBeli = ({ barang, className }: { barang: Barang; className?: string }) =>
  barang.status === "terjual" ? (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-muted px-5 py-3 font-bold text-muted-foreground",
        className,
      )}
    >
      Barang sudah terjual
    </span>
  ) : (
    <a
      href={waLink(pesanBeli(barang), barang.nomorWA)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white hover:bg-[#1ebe5b]",
        className,
      )}
    >
      <MessageCircle className="h-5 w-5" />
      {barang.penawaran ? "Tawar lebih tinggi" : barang.status === "dipesan" ? "Tanya ketersediaan" : "Beli via WhatsApp"}
    </a>
  );

const TombolBagikan = ({ barang }: { barang: Barang }) => (
  <button
    onClick={() => bagikan(barang)}
    aria-label="Bagikan"
    className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary"
  >
    <Share2 className="h-5 w-5" />
  </button>
);

const KatalogDetail = () => {
  const { id } = useParams();
  const { data: katalog, isPending, isError, isFetching } = useKatalog(true, true);
  const barang = katalog?.find((b) => b.id === id);

  if (isPending) {
    return (
      <div className="container max-w-5xl py-5">
        <Skeleton className="h-5 w-24" />
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!barang) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-2 text-2xl font-extrabold">{isError ? "Katalog belum bisa dimuat" : "Barang tidak ditemukan"}</h1>
        <p className="mb-6 text-muted-foreground">
          {isError ? "Periksa koneksi internet Anda, lalu muat ulang halaman." : "Mungkin tautannya salah atau barangnya sudah tidak dijual."}
        </p>
        <Link to="/katalog" className="font-bold text-primary hover:underline">
          ← Kembali ke Lapak amal
        </Link>
      </div>
    );
  }

  const diskon = persenDiskon(barang);
  const status = labelStatus[barang.status];
  // Barang sekategori yang masih dijual didahulukan
  const lainnya = katalog
    .filter((b) => b.id !== barang.id && b.status !== "terjual")
    .sort((a, b) => Number(b.kategori === barang.kategori) - Number(a.kategori === barang.kategori))
    .slice(0, 5);

  const rincian = [
    ["Kode", barang.kode],
    ["Kategori", barang.kategori],
    ["Lokasi", barang.lokasi],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  return (
    <div className="container max-w-5xl pb-24 lg:pb-0">
      <Link to="/katalog" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Lapak amal
      </Link>

      <div className="mt-4 grid gap-5 lg:grid-cols-2 lg:gap-8">
        <Galeri barang={barang} />

        <div>
          {/* Tanpa harga patokan: nominalnya cukup tampil di kotak penawaran di bawah */}
          {hargaDariTawaran(barang) ? (
            <p className="text-sm font-bold text-destructive">Tanpa harga patokan · terbuka untuk penawaran</p>
          ) : (
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <p className="text-3xl font-extrabold tracking-tight">{labelHarga(barang)}</p>
              {barang.hargaPas && (
                <span className="rounded bg-secondary px-1.5 py-0.5 text-xs font-bold text-primary">Harga pas</span>
              )}
              {barang.hargaCoret && (
                <>
                  <p className="text-muted-foreground line-through">{formatRupiah(barang.hargaCoret)}</p>
                  <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-extrabold text-destructive">-{diskon}%</span>
                </>
              )}
            </div>
          )}
          <h1 className="mt-1.5 text-xl font-bold leading-snug md:text-2xl">{barang.nama}</h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className={cn("rounded-full px-3 py-1 text-xs font-extrabold", status.kelas)}>{status.teks}</span>
            {isFetching && (
              <span className="inline-flex items-center gap-1 px-1 py-1 text-xs text-muted-foreground">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Mengecek status terbaru…
              </span>
            )}
            {barang.kondisi && (
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-bold">Kondisi: {barang.kondisi}</span>
            )}
          </div>

          {barang.penawaran && (
            <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
              <p className="flex items-center gap-1.5 text-sm font-bold text-destructive">
                <Flame className="h-4 w-4" />
                Penawaran tertinggi saat ini
              </p>
              <p className="mt-0.5 text-2xl font-extrabold">{formatRupiah(barang.penawaran.tertinggi)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Dari {barang.penawaran.jumlah} penawaran. Mau menawar lebih tinggi? Kirim tawaranmu lewat WhatsApp, pengurus
                akan mengonfirmasi penawar yang terpilih.
              </p>
            </div>
          )}

          <div className="mt-5 hidden gap-2 lg:flex">
            <TombolBeli barang={barang} className="flex-1" />
            <TombolBagikan barang={barang} />
          </div>

          {rincian.length > 0 && (
            <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card text-sm">
              {rincian.map(([label, nilai]) => (
                <div key={label} className="flex gap-4 px-4 py-2.5">
                  <dt className="w-24 flex-shrink-0 text-muted-foreground">{label}</dt>
                  <dd className="font-semibold">{nilai}</dd>
                </div>
              ))}
            </dl>
          )}

          {barang.deskripsi && (
            <section className="mt-6">
              <h2 className="font-extrabold">Deskripsi</h2>
              <p className="mt-1.5 whitespace-pre-line leading-relaxed">{barang.deskripsi}</p>
            </section>
          )}

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-extrabold text-primary">
              {barang.penjual.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{barang.penjual}</p>
              {barang.lokasi && (
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {barang.lokasi}, RW 12 Desa Ngijo
                </p>
              )}
            </div>
            <a
              href={waLink(`Halo ${barang.penjual}, saya mau tanya soal ${namaBerkode(barang)} di Lapak Amal Posyandu RW 12`, barang.nomorWA)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-primary px-3.5 py-1.5 text-sm font-bold text-primary"
            >
              Chat
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Seluruh hasil penjualan disumbangkan untuk renovasi Posyandu RW 12. Cek barangnya dulu sebelum membayar.
          </p>
        </div>
      </div>

      {lainnya.length > 0 && (
        <section className="mt-12">
          <SectionTitle title="Barang lainnya" href="/katalog" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-5">
            {lainnya.map((b) => (
              <BarangCard key={b.id} barang={b} />
            ))}
          </div>
        </section>
      )}

      {/* Bilah aksi menempel di atas navigasi bawah, seperti aplikasi marketplace */}
      <div className="fixed inset-x-0 bottom-[var(--tinggi-nav-bawah)] z-30 flex gap-2 border-t border-border bg-card/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <TombolBagikan barang={barang} />
        <TombolBeli barang={barang} className="flex-1" />
      </div>
    </div>
  );
};

export default KatalogDetail;
