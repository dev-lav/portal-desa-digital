import { CalendarDays, Clock, MapPin, Megaphone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { AgendaCard, AgendaKosong } from "@/components/konten/AgendaCard";
import { AgendaDaftar } from "@/components/konten/AgendaDaftar";
import { BeritaCard } from "@/components/konten/BeritaCard";
import { kegiatanList, kegiatanRutin, beritaList, pengumuman } from "@/data/konten";
import { awalHariIni, formatTanggal } from "@/lib/format";
import { agendaMendatang } from "@/lib/jadwal";

const Kegiatan = () => {
  const hariIni = awalHariIni();
  const mendatang = agendaMendatang(kegiatanList, kegiatanRutin, hariIni, 366);
  const terlaksana = kegiatanList
    .filter((k) => k.tanggal < hariIni)
    .sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime());
  const berita = [...beritaList].sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime());

  return (
    <>
      <PageHeader title="Kegiatan" subtitle="Agenda, pengumuman, dan dokumentasi kegiatan warga RW 12." />

      <div className="container">
        {pengumuman && (
          <section className="mt-8">
            <div className="rounded-2xl border border-border border-l-[6px] border-l-destructive bg-card p-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-destructive">
                <Megaphone className="h-3.5 w-3.5" />
                Pengumuman
              </span>
              <h2 className="mb-1 mt-2 text-lg font-bold leading-snug">{pengumuman.judul}</h2>
              {pengumuman.isi && <p className="text-muted-foreground">{pengumuman.isi}</p>}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-semibold">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {formatTanggal(pengumuman.tanggal, { weekday: "long", day: "numeric", month: "long" })}
                </span>
                {pengumuman.waktu && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {pengumuman.waktu}
                  </span>
                )}
                {pengumuman.lokasi && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {pengumuman.lokasi}
                  </span>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="mt-8">
          <SectionTitle title="Agenda mendatang" />
          {mendatang.length > 0 ? (
            <AgendaDaftar agenda={mendatang} />
          ) : (
            <AgendaKosong />
          )}
        </section>

        <section className="mt-8">
          <SectionTitle title="Dokumentasi" subtitle="Ketuk foto untuk melihat detail dan membagikannya." />
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
            {berita.map((b) => (
              <BeritaCard key={b.id} berita={b} />
            ))}
          </div>
        </section>

        {terlaksana.length > 0 && (
          <section className="mt-8">
            <SectionTitle title="Sudah terlaksana" />
            <div className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-3">
              {terlaksana.map((k) => (
                <AgendaCard key={k.id} kegiatan={k} redup />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Kegiatan;
