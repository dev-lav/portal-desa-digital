import { MessageCircle } from "lucide-react";
import { UMKM } from "@/data/types";
import { waLink } from "@/data/mockData";
import { padRT } from "@/lib/format";
import { cn } from "@/lib/utils";

export const UmkmCard = ({ umkm, className }: { umkm: UMKM; className?: string }) => {
  const info = [umkm.jenisUsaha, umkm.rt > 0 ? `RT ${padRT(umkm.rt)}` : null].filter(Boolean).join(" · ");

  return (
    <div className={cn("flex flex-col gap-1.5 rounded-2xl border border-border bg-card p-3.5", className)}>
      <span className="self-start rounded-full bg-accent/20 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-[#8a6a00]">
        {info}
      </span>
      <h3 className="font-bold">{umkm.namaUsaha}</h3>
      {umkm.pemilik && umkm.pemilik !== "-" && <p className="text-sm">oleh {umkm.pemilik}</p>}
      {umkm.deskripsi && <p className="flex-1 text-sm text-muted-foreground">{umkm.deskripsi}</p>}
      <a
        href={waLink(`Halo ${umkm.namaUsaha}, saya ingin bertanya`, umkm.nomorWA)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        <MessageCircle className="h-4 w-4" />
        Chat via WA →
      </a>
    </div>
  );
};
