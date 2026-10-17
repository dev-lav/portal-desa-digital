import { SectionTitle } from "@/components/SectionTitle";
import { HeroBeranda } from "@/components/konten/HeroBeranda";
import { AgendaCard, AgendaKosong } from "@/components/konten/AgendaCard";
import { KasRingkas } from "@/components/konten/KasRingkas";
import { BeritaCard } from "@/components/konten/BeritaCard";
import { RtPicker } from "@/components/konten/RtPicker";
import { UmkmCard } from "@/components/konten/UmkmCard";
import { LembagaGrid } from "@/components/konten/LembagaGrid";
import { kegiatanList, beritaList, laporanKasBulanan, umkmList, dataRT, statistikPenduduk } from "@/data/mockData";
import { awalHariIni } from "@/lib/format";
import { useJudulHalaman } from "@/hooks/use-judul-halaman";

const Beranda = () => {
  useJudulHalaman();
  const hariIni = awalHariIni();
  const agenda = kegiatanList
    .filter((k) => k.tanggal >= hariIni)
    .sort((a, b) => a.tanggal.getTime() - b.tanggal.getTime())
    .slice(0, 3);

  const [utama, ...lainnya] = [...beritaList].sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime()).slice(0, 5);
  const kasTerakhir = laporanKasBulanan[laporanKasBulanan.length - 1];

  return (
    <>
      <HeroBeranda />

      <div className="container">
        <div className="md:grid md:grid-cols-[1.4fr_1fr] md:items-start md:gap-6">
          <section className="mt-8">
            <SectionTitle title="Agenda terdekat" href="/kegiatan" />
            {agenda.length > 0 ? (
              <div className="grid gap-2.5">
                {agenda.map((k) => (
                  <AgendaCard key={k.id} kegiatan={k} />
                ))}
              </div>
            ) : (
              <AgendaKosong />
            )}
          </section>

          {kasTerakhir && (
            <section className="mt-8">
              <SectionTitle title="Kas RW" />
              <KasRingkas laporan={kasTerakhir} />
            </section>
          )}
        </div>

        {utama && (
          <section className="mt-8">
            <SectionTitle title="Dokumentasi kegiatan" href="/kegiatan" />
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
              <BeritaCard berita={utama} besar className="col-span-2 md:col-span-4" />
              {lainnya.map((b) => (
                <BeritaCard key={b.id} berita={b} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-8">
          <SectionTitle title="Hubungi ketua RT" href="/kontak" linkLabel="Kontak →" />
          <RtPicker awal={3} />
        </section>

        <section className="mt-8">
          <SectionTitle title="Belanja di tetangga" href="/umkm" />
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1.5">
            {umkmList.map((u) => (
              <UmkmCard key={u.id} umkm={u} className="flex-[0_0_78%] snap-start md:flex-[0_0_calc(33.33%-7px)]" />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle title="Lembaga & komunitas" href="/profil" linkLabel="Profil →" />
          <LembagaGrid />
        </section>

        <section className="mt-10 rounded-2xl bg-secondary p-5">
          <h2 className="text-lg font-extrabold">Tentang RW 12 Desa Ngijo</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            RW 12 berada di Desa Ngijo, Kecamatan Karangploso, Kabupaten Malang, Jawa Timur. Wilayahnya terdiri
            dari {dataRT.length} RT dengan {statistikPenduduk.totalKK.toLocaleString("id-ID")} kepala keluarga dan{" "}
            {statistikPenduduk.totalJiwa.toLocaleString("id-ID")} jiwa. Portal ini berisi kabar kegiatan,
            dokumentasi, laporan kas, serta kontak pengurus dan ketua RT untuk warga Ngijo.
          </p>
        </section>
      </div>
    </>
  );
};

export default Beranda;
