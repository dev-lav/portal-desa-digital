import { ReactNode } from "react";
import { CalendarDays, CalendarPlus, Clock, MapPin, Repeat } from "lucide-react";
import { Kegiatan } from "@/data/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { awalHariIni, formatTanggal } from "@/lib/format";
import { jarakHari } from "@/lib/jadwal";
import { tautanBagikanWa, tautanGoogleCalendar, unduhIcs } from "@/lib/kalender";
import { cn } from "@/lib/utils";

export const IkonWa = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.7C5.8.7.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.7-1.5a11.3 11.3 0 0 0 5.74 1.47h.01c6.26 0 11.35-5.1 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
  </svg>
);

// Pilihan "Simpan ke kalender": Google Calendar untuk Android/laptop, file .ics untuk iPhone & Outlook
export const MenuKalender = ({ kegiatan, children }: { kegiatan: Kegiatan; children: ReactNode }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="rounded-xl">
      <DropdownMenuItem asChild>
        <a href={tautanGoogleCalendar(kegiatan)} target="_blank" rel="noopener noreferrer">
          Google Calendar
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => unduhIcs(kegiatan)}>Kalender iPhone / Outlook</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Ulang = ({ teks }: { teks: string }) => (
  <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
    <Repeat className="h-3.5 w-3.5" />
    {teks}
  </span>
);

export const TanggalMini = ({ tanggal }: { tanggal: Date }) => (
  <div className="w-10 flex-shrink-0 text-center leading-tight">
    <small className="block text-[0.7rem] font-bold uppercase text-muted-foreground">
      {formatTanggal(tanggal, { weekday: "short" })}
    </small>
    <b className="block text-xl">{tanggal.getDate()}</b>
    <small className="block text-[0.7rem] font-bold uppercase text-muted-foreground">
      {formatTanggal(tanggal, { month: "short" })}
    </small>
  </div>
);

// Tombol ikon simpan ke kalender + bagikan ke WA untuk baris agenda
export const AksiIkon = ({ kegiatan, className }: { kegiatan: Kegiatan; className?: string }) => (
  <div className={cn("flex flex-shrink-0 items-center gap-1", className)}>
    <MenuKalender kegiatan={kegiatan}>
      <button
        type="button"
        aria-label={`Simpan ${kegiatan.nama} ke kalender`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-secondary"
      >
        <CalendarPlus className="h-[18px] w-[18px]" />
      </button>
    </MenuKalender>
    <a
      href={tautanBagikanWa(kegiatan)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Bagikan ${kegiatan.nama} ke WhatsApp`}
      className="flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-secondary"
    >
      <IkonWa className="h-[18px] w-[18px]" />
    </a>
  </div>
);

// Agenda terdekat ditonjolkan sebagai kartu undangan, sisanya jadi baris ringkas di bawahnya
export const AgendaSorotan = ({ agenda, className }: { agenda: Kegiatan[]; className?: string }) => {
  const hariIni = awalHariIni();
  const [utama, ...lainnya] = agenda;
  if (!utama) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card",
        lainnya.length > 0 && "md:grid md:grid-cols-[1.3fr_1fr]",
        className,
      )}
    >
      <div className="relative overflow-hidden p-5 md:p-7">
        <span
          className={cn(
            "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[22px] border-secondary",
            lainnya.length > 0 && "md:hidden",
          )}
        />
        <div className="relative flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-primary">
            {jarakHari(utama.tanggal, hariIni)}
          </span>
          {utama.ulang ? <Ulang teks={utama.ulang} /> : <span className="text-xs font-semibold text-muted-foreground">{utama.tag}</span>}
        </div>

        <h3 className="relative mt-3 text-xl font-extrabold leading-snug md:text-2xl">{utama.nama}</h3>

        <ul className="mt-2.5 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 flex-shrink-0 text-primary" />
            {formatTanggal(utama.tanggal, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
            {utama.waktu}
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
            {utama.lokasi}
          </li>
        </ul>
        {utama.deskripsi && <p className="mt-2.5 text-sm text-muted-foreground">{utama.deskripsi}</p>}

        <div className="mt-4 grid grid-cols-2 gap-2 sm:flex">
          <MenuKalender kegiatan={utama}>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90"
            >
              <CalendarPlus className="h-4 w-4" />
              <span className="sm:hidden">Simpan</span>
              <span className="hidden sm:inline">Simpan ke kalender</span>
            </button>
          </MenuKalender>
          <a
            href={tautanBagikanWa(utama)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-primary hover:bg-secondary"
          >
            <IkonWa className="h-4 w-4" />
            <span className="sm:hidden">Bagikan</span>
            <span className="hidden sm:inline">Bagikan ke WA</span>
          </a>
        </div>
      </div>

      {lainnya.length > 0 && (
        <div className="border-t border-border md:border-l md:border-t-0">
          <p className="px-5 pt-4 text-[0.7rem] font-extrabold uppercase tracking-wider text-muted-foreground">
            Berikutnya
          </p>
          <ul className="divide-y divide-border">
            {lainnya.map((k) => (
              <li key={`${k.id}-${k.tanggal.getTime()}`} className="flex items-center gap-3.5 px-5 py-3">
                <TanggalMini tanggal={k.tanggal} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-snug">{k.nama}</p>
                  <p className="text-sm text-muted-foreground">
                    {k.waktu} · {k.lokasi}
                  </p>
                  {k.ulang && <Ulang teks={k.ulang} />}
                </div>
                <AksiIkon kegiatan={k} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
