import { Link } from "react-router-dom";
import { Flame, ImageOff, MapPin } from "lucide-react";
import { Barang, hargaDariTawaran, labelHarga, persenDiskon } from "@/data/katalog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRupiah, formatRupiahRingkas } from "@/lib/format";
import { cn } from "@/lib/utils";

// Kartu produk dengan bingkai dalam (inset frame), badge kaca buram, dan harga kontras
export const BarangCard = ({ barang, className }: { barang: Barang; className?: string }) => {
  const terjual = barang.status === "terjual";
  const diskon = persenDiskon(barang);
  // "Bekas - sudah direparasi" -> "Bekas"; keterangan lengkapnya di halaman detail
  const kondisi = barang.kondisi?.split(" - ")[0];
  const dariTawaran = hargaDariTawaran(barang);

  return (
    <Link
      to={`/katalog/${barang.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        {barang.foto[0] ? (
          <img
            src={barang.foto[0]}
            alt={barang.nama}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
              terjual && "opacity-60 grayscale",
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-9 w-9" />
          </div>
        )}
        {terjual && (
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-sm font-extrabold text-white backdrop-blur-sm">
            Terjual
          </span>
        )}
        {barang.status === "dipesan" && (
          <span className="absolute left-2 top-2 rounded-full bg-accent px-2.5 py-0.5 text-xs font-extrabold text-accent-foreground shadow-sm">
            Dipesan
          </span>
        )}
        {barang.penawaran && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-destructive/90 px-2.5 py-0.5 text-xs font-extrabold text-destructive-foreground shadow-sm backdrop-blur-md">
            <Flame className="h-3 w-3" />
            {barang.penawaran.jumlah} penawar
          </span>
        )}
        {kondisi && (
          <span
            className={cn(
              "absolute bottom-2 left-2 rounded-full px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-md",
              /^baru/i.test(kondisi) ? "bg-primary/90" : /^koleksi/i.test(kondisi) ? "bg-accent text-accent-foreground" : "bg-black/60",
            )}
          >
            {kondisi}
          </span>
        )}
        {diskon > 0 && !terjual && (
          <span className="absolute right-2 top-2 rounded-full bg-destructive px-2 py-0.5 text-xs font-extrabold text-destructive-foreground shadow-sm">
            -{diskon}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-1.5 p-2 pt-2">
        <div>
          {barang.kategori && (
            <p className="text-xs font-semibold text-muted-foreground">{barang.kategori}</p>
          )}
          <h3 className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug group-hover:text-primary">
            {barang.nama}
          </h3>
        </div>

        <div className="mt-1 border-t border-border/60 pt-1.5">
          {/* Tanpa harga patokan: tawaran tertinggi tampil merah dengan label, supaya tidak dikira harga jual */}
          {dariTawaran && (
            <p className="text-xs font-bold uppercase tracking-wide text-destructive">Tawaran tertinggi</p>
          )}
          {barang.hargaCoret && (
            <p className="text-xs text-muted-foreground line-through">{formatRupiah(barang.hargaCoret)}</p>
          )}
          <p
            className={cn(
              "font-extrabold text-primary",
              terjual && "text-muted-foreground",
              dariTawaran && "text-destructive",
            )}
          >
            {labelHarga(barang)}
          </p>
          {barang.penawaran && !dariTawaran && (
            <p className="mt-1 inline-block whitespace-nowrap rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-bold text-destructive">
              Tawaran {formatRupiahRingkas(barang.penawaran.tertinggi)}
            </p>
          )}
          {barang.hargaPas && (
            <p className="mt-1 inline-block whitespace-nowrap rounded bg-secondary px-1.5 py-0.5 text-xs font-bold text-primary">
              Harga pas
            </p>
          )}
          {barang.lokasi && (
            <p className="mt-1 flex min-w-0 items-center gap-0.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{barang.lokasi}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export const BarangCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("overflow-hidden rounded-2xl border border-border bg-card p-1.5", className)}>
    <Skeleton className="aspect-square rounded-xl" />
    <div className="space-y-2 p-2">
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);
