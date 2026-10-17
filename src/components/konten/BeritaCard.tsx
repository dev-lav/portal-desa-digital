import { Link } from "react-router-dom";
import { FileText, Play } from "lucide-react";
import { Berita } from "@/data/types";
import { formatTanggal } from "@/lib/format";
import { cn } from "@/lib/utils";

interface BeritaCardProps {
  berita: Berita;
  besar?: boolean;
  className?: string;
}

export const BeritaCard = ({ berita, besar = false, className }: BeritaCardProps) => (
  <Link
    to={`/kegiatan/${berita.id}`}
    className={cn(
      "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md",
      className,
    )}
  >
    <div className={cn("relative w-full overflow-hidden bg-muted", besar ? "aspect-video md:aspect-[21/9]" : "aspect-[4/3]")}>
      {berita.gambar ? (
        <img
          src={berita.gambar}
          alt={berita.judul}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <FileText className="h-10 w-10" />
        </div>
      )}
      {berita.video && (
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-xs font-bold text-white">
          <Play className="h-3.5 w-3.5 fill-current" />
          {berita.video.durasi ?? "Video"}
        </span>
      )}
    </div>
    <div className="flex flex-1 flex-col gap-1 px-3 pb-3 pt-2.5">
      <small className="text-xs text-muted-foreground">
        {formatTanggal(berita.tanggal, besar ? undefined : { day: "numeric", month: "short", year: "numeric" })}
      </small>
      <h3 className={cn("font-bold leading-snug group-hover:text-primary", besar ? "text-lg" : "line-clamp-3 text-[0.95rem]")}>
        {berita.judul}
      </h3>
      {besar && <p className="line-clamp-2 text-sm text-muted-foreground">{berita.ringkasan}</p>}
    </div>
  </Link>
);
