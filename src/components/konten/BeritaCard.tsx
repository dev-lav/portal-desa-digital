import { Link } from "react-router-dom";
import { Camera, FileText, Play, Sparkles } from "lucide-react";
import { Berita } from "@/data/types";
import { formatTanggal } from "@/lib/format";
import { cn } from "@/lib/utils";

interface BeritaCardProps {
  berita: Berita;
  besar?: boolean;
  className?: string;
}

export const BeritaCard = ({ berita, besar = false, className }: BeritaCardProps) => {
  const jumlahFoto = 1 + (berita.galeri?.length ?? 0);

  if (besar) {
    return (
      <Link
        to={`/kegiatan/${berita.id}`}
        className={cn(
          "group relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-3xl border border-border bg-brand shadow-md transition-all duration-300 hover:shadow-xl md:min-h-[420px]",
          className,
        )}
      >
        {berita.gambar ? (
          <img
            src={berita.gambar}
            alt={berita.judul}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/40">
            <FileText className="h-14 w-14" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2 md:inset-x-5 md:top-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Sorotan
          </span>
          {berita.video ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/55 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
              <Play className="h-3.5 w-3.5 fill-accent text-accent" />
              Video{berita.video.durasi ? ` · ${berita.video.durasi}` : ""}
            </span>
          ) : (
            jumlahFoto > 1 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/55 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                <Camera className="h-3.5 w-3.5 text-accent" />
                {jumlahFoto} foto
              </span>
            )
          )}
        </div>

        <div className="relative p-4 text-white md:p-7">
          <small className="text-xs font-bold uppercase tracking-wider text-accent">
            {formatTanggal(berita.tanggal)}
          </small>
          <h3 className="mt-1 text-lg font-extrabold leading-tight group-hover:underline md:text-2xl">
            {berita.judul}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/85 md:mt-2 md:text-sm">
            {berita.ringkasan}
          </p>
          <span className="mt-3 hidden items-center gap-1.5 text-xs font-extrabold text-accent md:inline-flex">
            {berita.video ? "Tonton dokumentasi" : "Baca cerita lengkap"}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/kegiatan/${berita.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
        {berita.gambar ? (
          <img
            src={berita.gambar}
            alt={berita.judul}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <FileText className="h-10 w-10" />
          </div>
        )}
        {berita.video ? (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-brand/90 px-2.5 py-0.5 text-xs font-bold text-accent backdrop-blur-md">
            <Play className="h-3 w-3 fill-current" />
            {berita.video.durasi ?? "Video"}
          </span>
        ) : (
          <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-md">
            {formatTanggal(berita.tanggal, { day: "numeric", month: "short" })}
          </span>
        )}
        {jumlahFoto > 1 && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/55 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-md">
            <Camera className="h-3 w-3" />
            {jumlahFoto}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-1.5 p-2 pt-2">
        <h3 className="line-clamp-2 text-xs font-extrabold leading-snug group-hover:text-primary md:text-sm">
          {berita.judul}
        </h3>
        <span className="text-xs font-bold text-primary">
          {berita.video ? "Putar video →" : jumlahFoto > 1 ? `Lihat ${jumlahFoto} foto →` : "Lihat cerita →"}
        </span>
      </div>
    </Link>
  );
};
