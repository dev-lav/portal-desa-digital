import { useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CalendarPlus,
  Check,
  ChevronDown,
  Clock,
  HandHeart,
  LucideIcon,
  MapPin,
  PersonStanding,
  Repeat,
  Share2,
} from "lucide-react";
import { KategoriKegiatan, Kegiatan, kategoriKegiatan } from "@/data/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuKalender } from "@/components/konten/AgendaSorotan";
import { awalHariIni, formatTanggal } from "@/lib/format";
import { jarakHari, selisihHari } from "@/lib/jadwal";
import { bagikan } from "@/lib/kalender";
import { cn } from "@/lib/utils";

// Dipakai sebagai siluet kalau kegiatan belum punya gambar `ilustrasi`
const ikonKategori: Record<KategoriKegiatan, LucideIcon> = {
  Olahraga: PersonStanding,
  Keagamaan: BookOpen,
  Sosial: HandHeart,
  Lainnya: CalendarDays,
};

const kunciBulan = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;

const LabelDekat = ({ tanggal, hariIni }: { tanggal: Date; hariIni: Date }) =>
  selisihHari(hariIni, tanggal) <= 7 ? (
    <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-primary">
      {jarakHari(tanggal, hariIni)}
    </span>
  ) : null;

const InfoAcara = ({ kegiatan }: { kegiatan: Kegiatan }) => (
  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
    <span className="inline-flex items-center gap-1.5">
      <Clock className="h-4 w-4" />
      {kegiatan.waktu}
    </span>
    <span className="inline-flex items-center gap-1.5">
      <MapPin className="h-4 w-4" />
      {kegiatan.lokasi}
    </span>
    {kegiatan.ulang && (
      <span className="inline-flex items-center gap-1.5">
        <Repeat className="h-4 w-4" />
        {kegiatan.ulang}
      </span>
    )}
  </div>
);

// Kartu besar untuk acara paling dekat di bagian atas halaman Kegiatan
const AgendaUtama = ({ kegiatan, hariIni }: { kegiatan: Kegiatan; hariIni: Date }) => {
  const Ikon = ikonKategori[kegiatan.kategori];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/60 p-5 md:flex md:items-center md:gap-8 md:px-8 md:py-6">
      <div className="pointer-events-none absolute -bottom-4 right-4 h-36 w-36 opacity-[0.12] md:bottom-0 md:right-[21rem] md:h-full md:w-40 md:opacity-[0.14]">
        {kegiatan.ilustrasi ? (
          <img src={kegiatan.ilustrasi} alt="" className="h-full w-full object-contain object-bottom" />
        ) : (
          <Ikon className="h-full w-full text-primary" strokeWidth={1.25} />
        )}
      </div>

      <div className="relative flex items-center gap-5 md:flex-1 md:gap-8">
        <div className="w-[5.5rem] flex-shrink-0 border-r border-primary/20 pr-4 text-center leading-none md:w-28 md:pr-8">
          <small className="block whitespace-nowrap text-[0.7rem] font-extrabold uppercase tracking-wider text-muted-foreground md:text-xs">
            {formatTanggal(kegiatan.tanggal, { month: "short", year: "numeric" })}
          </small>
          <b className="my-1.5 block text-[2.6rem] font-extrabold tracking-tight text-brand md:text-[3.4rem]">
            {String(kegiatan.tanggal.getDate()).padStart(2, "0")}
          </b>
          <small className="block text-[0.7rem] font-extrabold uppercase tracking-wider text-muted-foreground md:text-xs">
            {formatTanggal(kegiatan.tanggal, { weekday: "long" })}
          </small>
        </div>
        <div className="min-w-0 flex-1">
          <LabelDekat tanggal={kegiatan.tanggal} hariIni={hariIni} />
          <h3 className="mb-2 mt-1.5 text-lg font-extrabold leading-snug md:text-2xl">{kegiatan.nama}</h3>
          <InfoAcara kegiatan={kegiatan} />
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-2 md:mt-0 md:flex md:flex-shrink-0">
        <MenuKalender kegiatan={kegiatan}>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground hover:bg-brand/90"
          >
            <CalendarPlus className="h-4 w-4" />
            <span className="sm:hidden">Simpan</span>
            <span className="hidden sm:inline">Tambah ke kalender</span>
          </button>
        </MenuKalender>
        <button
          type="button"
          onClick={() => bagikan(kegiatan)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-card px-4 py-2.5 text-sm font-bold text-primary hover:bg-secondary"
        >
          <Share2 className="h-4 w-4" />
          Bagikan
        </button>
      </div>
    </div>
  );
};

const tombolBulat = "flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 text-primary hover:bg-secondary";

const BarisAcara = ({ kegiatan, hariIni }: { kegiatan: Kegiatan; hariIni: Date }) => (
  <li className="flex items-center gap-4 rounded-2xl bg-card py-3.5 pl-4 pr-3 shadow-[0_1px_2px_rgba(16,40,30,0.06)] md:gap-6 md:px-6">
    <div className="w-11 flex-shrink-0 border-r border-border pr-4 text-center leading-tight md:w-20 md:pr-6">
      <b className="block text-2xl font-extrabold">{String(kegiatan.tanggal.getDate()).padStart(2, "0")}</b>
      <small className="block text-[0.7rem] font-bold uppercase text-muted-foreground">
        {formatTanggal(kegiatan.tanggal, { month: "short" })}
      </small>
    </div>
    <div className="min-w-0 flex-1">
      <div className="mb-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <p className="font-bold leading-snug md:text-[1.05rem]">{kegiatan.nama}</p>
        <LabelDekat tanggal={kegiatan.tanggal} hariIni={hariIni} />
      </div>
      <InfoAcara kegiatan={kegiatan} />
    </div>
    <div className="flex flex-shrink-0 flex-col gap-1.5 md:flex-row md:gap-2">
      <MenuKalender kegiatan={kegiatan}>
        <button type="button" aria-label={`Tambah ${kegiatan.nama} ke kalender`} className={tombolBulat}>
          <CalendarPlus className="h-[18px] w-[18px]" />
        </button>
      </MenuKalender>
      <button type="button" aria-label={`Bagikan ${kegiatan.nama}`} onClick={() => bagikan(kegiatan)} className={tombolBulat}>
        <Share2 className="h-[18px] w-[18px]" />
      </button>
    </div>
  </li>
);

// Agenda lengkap: acara terdekat ditonjolkan, lalu daftar per hari yang bisa difilter per kategori & bulan
export const AgendaDaftar = ({ agenda }: { agenda: Kegiatan[] }) => {
  const hariIni = awalHariIni();
  const daftarBulan = [...new Map(agenda.map((k) => [kunciBulan(k.tanggal), k.tanggal])).entries()];
  const [kategori, setKategori] = useState<KategoriKegiatan | "Semua">("Semua");
  const [bulan, setBulan] = useState(daftarBulan[0]?.[0]);

  const bulanTerpilih = daftarBulan.find(([kunci]) => kunci === bulan)?.[1];
  const tersaring = agenda.filter(
    (k) => kunciBulan(k.tanggal) === bulan && (kategori === "Semua" || k.kategori === kategori),
  );
  const perHari = tersaring.reduce<Kegiatan[][]>((grup, k) => {
    const terakhir = grup[grup.length - 1];
    if (terakhir && selisihHari(terakhir[0].tanggal, k.tanggal) === 0) terakhir.push(k);
    else grup.push([k]);
    return grup;
  }, []);

  return (
    <div>
      <AgendaUtama kegiatan={agenda[0]} hariIni={hariIni} />

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
          {(["Semua", ...kategoriKegiatan] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKategori(k)}
              className={cn(
                "flex-shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                kategori === k
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-card text-foreground hover:bg-secondary",
              )}
            >
              {k}
            </button>
          ))}
        </div>

        {bulanTerpilih && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-sm font-bold hover:bg-secondary md:self-auto"
              >
                <CalendarDays className="h-4 w-4 text-primary" />
                {formatTanggal(bulanTerpilih, { month: "long", year: "numeric" })}
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              {daftarBulan.map(([kunci, tanggal]) => (
                <DropdownMenuItem key={kunci} onSelect={() => setBulan(kunci)} className="gap-2">
                  <Check className={cn("h-4 w-4", kunci !== bulan && "invisible")} />
                  {formatTanggal(tanggal, { month: "long", year: "numeric" })}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {perHari.length > 0 ? (
        <div className="mt-6 space-y-6">
          {perHari.map((acara) => (
            <div key={acara[0].tanggal.getTime()}>
              <h3 className="mb-2.5 text-sm font-bold text-muted-foreground">
                {formatTanggal(acara[0].tanggal, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </h3>
              <ul className="space-y-2.5">
                {acara.map((k) => (
                  <BarisAcara key={k.id} kegiatan={k} hariIni={hariIni} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
          Belum ada agenda {kategori === "Semua" ? "" : `${kategori.toLowerCase()} `}di bulan ini.
        </p>
      )}
    </div>
  );
};
