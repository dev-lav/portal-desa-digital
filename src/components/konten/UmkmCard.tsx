import { Link } from "react-router-dom";
import { MessageCircle, MapPin, Star, Clock } from "lucide-react";
import { UMKM } from "@/data/types";
import { linkPeta, slugUmkm, waLink } from "@/data/konten";
import { padRT } from "@/lib/format";
import { cn } from "@/lib/utils";

export const UmkmCard = ({ umkm, className }: { umkm: UMKM; className?: string }) => {
  const info = [umkm.jenisUsaha, umkm.rt > 0 ? `RT ${padRT(umkm.rt)}` : null].filter(Boolean).join(" · ");

  return (
    <div className={cn("flex flex-col gap-2 rounded-2xl border border-border bg-card p-4", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-[#8a6a00]">
          {info}
        </span>
        {typeof umkm.rating === "number" && (
          <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            {umkm.rating.toFixed(1)}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-bold text-foreground">
          <Link to={`/umkm/${slugUmkm(umkm)}`} className="hover:text-primary hover:underline">
            {umkm.namaUsaha}
          </Link>
        </h3>
        {umkm.pemilik && umkm.pemilik !== "-" && <p className="text-xs text-muted-foreground">oleh {umkm.pemilik}</p>}
      </div>

      {umkm.deskripsi && <p className="text-sm text-muted-foreground line-clamp-2">{umkm.deskripsi}</p>}

      {umkm.jamBuka && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{umkm.jamBuka}</span>
        </p>
      )}

      {umkm.alamat && !umkm.deskripsi && (
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2">{umkm.alamat}</span>
        </p>
      )}

      <div className="mt-auto pt-2 flex flex-wrap items-center gap-3 border-t border-border/50">
        {umkm.nomorWA && (
          <a
            href={waLink(`Halo ${umkm.namaUsaha}, saya ingin bertanya`, umkm.nomorWA)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Chat via WA →
          </a>
        )}

        {linkPeta(umkm) && (
          <a
            href={linkPeta(umkm)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
          >
            <MapPin className="h-3.5 w-3.5 text-red-500" />
            Google Maps ↗
          </a>
        )}
      </div>
    </div>
  );
};
