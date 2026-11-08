import { Link } from "react-router-dom";
import { MessageCircle, MapPin } from "lucide-react";
import { UMKM } from "@/data/types";
import { linkPeta, slugUmkm, waLink } from "@/data/konten";
import { cn } from "@/lib/utils";

// Helper menentukan emoji dan warna banner berdasarkan jenis usaha
const getVisualKategori = (jenis: string) => {
  const j = jenis.toLowerCase();
  if (j.includes("makan") || j.includes("kuliner") || j.includes("ayam") || j.includes("pao") || j.includes("dapur")) {
    return { emoji: "🍗", gradient: "from-amber-800 to-amber-950 text-amber-100" };
  }
  if (j.includes("laundry") || j.includes("cuci")) {
    return { emoji: "🧺", gradient: "from-teal-800 to-emerald-950 text-teal-100" };
  }
  if (j.includes("kue") || j.includes("roti") || j.includes("bakery") || j.includes("cookie")) {
    return { emoji: "🥐", gradient: "from-stone-800 to-amber-950 text-amber-100" };
  }
  if (j.includes("salon") || j.includes("cantik") || j.includes("rambut") || j.includes("skin")) {
    return { emoji: "💈", gradient: "from-purple-950 to-slate-900 text-purple-100" };
  }
  if (j.includes("ikan") || j.includes("daging") || j.includes("bahan")) {
    return { emoji: "🐟", gradient: "from-cyan-900 to-slate-950 text-cyan-100" };
  }
  return { emoji: "🏪", gradient: "from-emerald-900 to-stone-900 text-emerald-100" };
};

// Cek apakah saat ini dalam rentang jam operasional
export const isBukaSekarang = (jamBuka?: string): boolean => {
  if (!jamBuka) return true; // jika tidak ada info jam, anggap sedia
  const match = jamBuka.match(/(\d{1,2})[.:](\d{2})\s*[-–]\s*(\d{1,2})[.:](\d{2})/);
  if (!match) return true;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = parseInt(match[1]) * 60 + parseInt(match[2]);
  const endMinutes = parseInt(match[3]) * 60 + parseInt(match[4]);
  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
};

export const UmkmCard = ({ umkm, className }: { umkm: UMKM; className?: string }) => {
  const visual = getVisualKategori(umkm.jenisUsaha);
  const buka = isBukaSekarang(umkm.jamBuka);
  const petaUrl = linkPeta(umkm);
  const alamatSingkat = (umkm.alamat || umkm.deskripsi || "").replace(/, Ngijo, Karangploso.*$/i, "").replace(/Perumahan |Perum\.? /i, "");

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card shadow-xs transition-all hover:border-primary/50 hover:shadow-md",
        className,
      )}
    >
      {/* Banner Atas Flush dengan Sudut Halus (Shopee Style) */}
      <div className={cn("relative h-24 overflow-hidden bg-gradient-to-r p-3.5 sm:h-28", visual.gradient)}>
        {/* Background Watermark Emoji */}
        <span className="pointer-events-none absolute -bottom-3 -right-2 select-none text-6xl opacity-20 transition-transform group-hover:scale-110 sm:text-7xl">
          {visual.emoji}
        </span>

        {/* Top Row: Badge Wilayah (Kiri) & Status Buka (Kanan) */}
        <div className="relative z-10 flex items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-accent-foreground shadow-xs">
            <span>🌾</span> {umkm.rt > 0 ? `RT ${umkm.rt}` : "RW 12"}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs sm:text-[11px]">
            <span className={cn("h-1.5 w-1.5 rounded-full", buka ? "bg-emerald-400 animate-pulse" : "bg-zinc-400")} />
            {buka ? "Buka Sekarang" : "Tutup"}
          </span>
        </div>

        {/* Bottom Banner Row: Kategori Usaha */}
        <div className="relative z-10 mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {umkm.jenisUsaha}
          </span>
        </div>
      </div>

      {/* Body Konten Kartu */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-2.5">
        <div className="space-y-1.5">
          <h3 className="line-clamp-1 font-extrabold text-sm md:text-base text-foreground leading-snug transition group-hover:text-primary">
            <Link to={`/umkm/${slugUmkm(umkm)}`}>
              {umkm.namaUsaha}
            </Link>
          </h3>

          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <span className="truncate">📍 {alamatSingkat || "Permata Regency 1"}</span>
            <span className="text-[10px] font-normal text-muted-foreground whitespace-nowrap">· ± 2-5 mnt</span>
          </div>

          {umkm.deskripsi && (
            <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
              {umkm.deskripsi}
            </p>
          )}

          {umkm.jamBuka && (
            <p className="text-[11px] text-muted-foreground">
              🕒 Jam: {umkm.jamBuka}
            </p>
          )}
        </div>

        {/* Footer Tombol Aksi */}
        <div className="mt-2.5 flex items-center gap-2 border-t border-border/70 pt-3">
          {umkm.nomorWA ? (
            <a
              href={waLink(`Halo ${umkm.namaUsaha}, saya warga Permata 1 ingin tanya/order`, umkm.nomorWA)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary py-2 px-3 text-xs font-bold text-primary-foreground shadow-xs transition hover:bg-primary/90"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Order WA
            </a>
          ) : (
            <Link
              to={`/umkm/${slugUmkm(umkm)}`}
              className="flex-1 rounded-md bg-secondary py-2 px-3 text-center text-xs font-bold text-secondary-foreground transition hover:bg-secondary/80"
            >
              Lihat Detail
            </Link>
          )}

          {petaUrl && (
            <a
              href={petaUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Rute Google Maps"
              className="inline-flex items-center justify-center gap-1 rounded-md border border-border bg-card px-2.5 py-2 text-xs font-bold text-muted-foreground transition hover:bg-secondary hover:text-red-600"
            >
              <MapPin className="h-3.5 w-3.5 text-red-500" />
              <span className="hidden sm:inline">Maps</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
