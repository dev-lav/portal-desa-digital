import { CalendarX, MessageCircle } from "lucide-react";
import { Kegiatan } from "@/data/types";
import { waLink } from "@/data/mockData";
import { formatTanggal } from "@/lib/format";
import { cn } from "@/lib/utils";

const warnaTag: Record<Kegiatan["tag"], string> = {
  Rutin: "bg-secondary text-primary",
  "Kerja Bakti": "bg-secondary text-primary",
  Posyandu: "bg-accent/20 text-[#8a6a00]",
  Rapat: "bg-muted text-muted-foreground",
  Sosial: "bg-destructive/10 text-destructive",
};

export const TagLabel = ({ tag }: { tag: Kegiatan["tag"] }) => (
  <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wider", warnaTag[tag])}>
    {tag}
  </span>
);

export const AgendaCard = ({ kegiatan, redup = false }: { kegiatan: Kegiatan; redup?: boolean }) => (
  <div className="flex overflow-hidden rounded-2xl border border-border bg-card">
    <div
      className={cn(
        "flex w-[76px] flex-shrink-0 flex-col items-center justify-center py-3 text-brand-foreground",
        redup ? "bg-muted-foreground" : "bg-brand",
      )}
    >
      <small className="text-[0.7rem] font-bold uppercase opacity-80">{formatTanggal(kegiatan.tanggal, { weekday: "short" })}</small>
      <b className="my-0.5 text-[1.7rem] leading-none">{kegiatan.tanggal.getDate()}</b>
      <small className="text-[0.7rem] font-bold uppercase opacity-80">{formatTanggal(kegiatan.tanggal, { month: "short" })}</small>
    </div>
    <div className="min-w-0 flex-1 px-3.5 py-3">
      <TagLabel tag={kegiatan.tag} />
      <h3 className="mb-1 mt-1.5 font-bold leading-snug">{kegiatan.nama}</h3>
      <p className="text-sm text-muted-foreground">
        {kegiatan.waktu} · {kegiatan.lokasi}
      </p>
      {kegiatan.deskripsi && <p className="mt-1 text-sm text-muted-foreground">{kegiatan.deskripsi}</p>}
    </div>
  </div>
);

export const AgendaKosong = () => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-6 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
      <CalendarX className="h-6 w-6 text-muted-foreground" />
    </div>
    <div>
      <p className="font-bold">Belum ada agenda terjadwal</p>
      <p className="text-sm text-muted-foreground">Hubungi pengurus RW untuk info kegiatan terbaru.</p>
    </div>
    <a
      href={waLink("Halo, saya ingin menanyakan agenda kegiatan RW 12")}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-primary hover:bg-secondary"
    >
      <MessageCircle className="h-4 w-4" />
      Tanya pengurus
    </a>
  </div>
);
