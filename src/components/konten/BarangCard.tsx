import { Link } from "react-router-dom";
import { Flame, ImageOff, MapPin } from "lucide-react";
import { Barang, labelHarga, persenDiskon } from "@/data/katalog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRupiah, formatRupiahRingkas } from "@/lib/format";
import { cn } from "@/lib/utils";

// Kartu produk ala marketplace: foto persegi, nama 2 baris, harga tebal
export const BarangCard = ({ barang, className }: { barang: Barang; className?: string }) => {
  const terjual = barang.status === "terjual";
  const diskon = persenDiskon(barang);
  // "Bekas - sudah direparasi" -> "Bekas"; keterangan lengkapnya di halaman detail
  const kondisi = barang.kondisi?.split(" - ")[0];

  return (
    <Link
      to={`/katalog/${barang.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {barang.foto[0] ? (
          <img
            src={barang.foto[0]}
            alt={barang.nama}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
              terjual && "opacity-60 grayscale",
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-9 w-9" />
          </div>
        )}
        {terjual && (
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-sm font-extrabold text-white">
            Terjual
          </span>
        )}
        {barang.status === "dipesan" && (
          <span className="absolute left-0 top-2 rounded-r-md bg-accent px-2 py-0.5 text-[0.7rem] font-extrabold text-accent-foreground">
            Dipesan
          </span>
        )}
        {barang.penawaran && (
          <span className="absolute left-0 top-2 inline-flex items-center gap-0.5 rounded-r-md bg-destructive px-2 py-0.5 text-[0.7rem] font-extrabold text-destructive-foreground">
            <Flame className="h-3 w-3" />
            {barang.penawaran.jumlah} penawar
          </span>
        )}
        {diskon > 0 && !terjual && (
          <span className="absolute right-0 top-0 rounded-bl-lg bg-destructive px-1.5 py-0.5 text-[0.7rem] font-extrabold text-destructive-foreground">
            -{diskon}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-2.5">
        <h3 className="line-clamp-2 text-sm leading-snug">{barang.nama}</h3>
        <p className={cn("mt-0.5 font-extrabold", terjual && "text-muted-foreground")}>{labelHarga(barang)}</p>
        {barang.hargaCoret && (
          <p className="text-xs text-muted-foreground line-through">{formatRupiah(barang.hargaCoret)}</p>
        )}
        {barang.penawaran && (
          <p className="mt-0.5 self-start whitespace-nowrap rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-bold text-destructive">
            Tawaran {formatRupiahRingkas(barang.penawaran.tertinggi)}
          </p>
        )}
        {(kondisi || barang.lokasi) && (
          <p className="mt-auto flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
            {kondisi && (
              <span
                className={cn(
                  "flex-shrink-0 rounded border px-1.5 font-bold",
                  /^baru/i.test(kondisi) ? "border-primary/40 text-primary" : "border-border",
                )}
              >
                {kondisi}
              </span>
            )}
            {barang.lokasi && (
              <span className="flex min-w-0 items-center gap-0.5">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{barang.lokasi}</span>
              </span>
            )}
          </p>
        )}
      </div>
    </Link>
  );
};

export const BarangCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
    <Skeleton className="aspect-square rounded-none" />
    <div className="space-y-2 p-2.5">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
);
