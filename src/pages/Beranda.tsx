import { useId, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HardHat, Image as ImageIcon, Sparkles, Wallet } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { HeroBeranda } from "@/components/konten/HeroBeranda";
import { AgendaKosong } from "@/components/konten/AgendaCard";
import { AgendaSorotan } from "@/components/konten/AgendaSorotan";
import { BeritaCard } from "@/components/konten/BeritaCard";
import { RtPicker } from "@/components/konten/RtPicker";
import { KasRingkas } from "@/components/konten/KasRingkas";
import { UmkmCard } from "@/components/konten/UmkmCard";
import { BarangCard } from "@/components/konten/BarangCard";
import { ModalPosterPosyandu } from "@/components/konten/LaporanPosyanduCard";
import { useKatalog } from "@/hooks/use-katalog";
import { LembagaGrid } from "@/components/konten/LembagaGrid";
import { kegiatanList, kegiatanRutin, beritaList, laporanKasBulanan, umkmList, dataRT, statistikPenduduk, laporanPosyandu } from "@/data/konten";
import { awalHariIni, formatRupiah } from "@/lib/format";
import { agendaMendatang } from "@/lib/jadwal";

// Barang teratas di spreadsheet yang masih dijual; disembunyikan kalau katalog kosong atau gagal dimuat
const KatalogPilihan = () => {
  const { data: katalog = [] } = useKatalog();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const pilihan = katalog.filter((b) => b.status !== "terjual").slice(0, 8);
  if (pilihan.length === 0) return null;

  const jumlahTerjual = katalog.filter((b) => b.status === "terjual").length;
  const persenTerjual = Math.round((jumlahTerjual / katalog.length) * 100);
  const { ringkasanDana, rekapPenawaran, rencanaTahapPertama } = laporanPosyandu;

  return (
    <section className="relative mt-8 overflow-hidden rounded-3xl border-2 border-accent/45 bg-gradient-to-br from-card via-background to-secondary p-4 shadow-sm md:p-7">
      <span className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border-[24px] border-accent/15" />

      <div className="relative flex flex-col justify-between gap-3.5 md:flex-row md:items-end">
        <div>
          <div className=" flex items-center justify-between gap-2 md:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Amal Posyandu
            </span>
            <Link
              to="/katalog"
              className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-extrabold text-primary-foreground shadow-sm hover:bg-primary/90 md:hidden"
            >
              Semua ({katalog.length}) →
            </Link>
          </div>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-brand md:text-3xl">Lapak amal posyandu</h2>
          <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
            100% hasil penjualan disalurkan untuk renovasi {laporanPosyandu.namaPosyandu} RW 12.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {jumlahTerjual > 0 && (
            <div className="w-full rounded-2xl border border-border bg-card px-3.5 py-2 shadow-sm md:w-auto">
              <div className="flex items-center justify-between gap-4 text-xs font-bold">
                <span>
                  {jumlahTerjual} dari {katalog.length} barang terjual
                </span>
                <span className="text-primary">{persenTerjual}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted md:w-40">
                <div className="h-full rounded-full bg-primary" style={{ width: `${persenTerjual}%` }} />
              </div>
            </div>
          )}
          <Link
            to="/katalog"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/90 md:inline-flex"
          >
            Semua barang ({katalog.length}) →
          </Link>
        </div>
      </div>

      {/* Ringkasan Laporan Dana & Rencana Revitalisasi Posyandu Permata 12 */}
      <div className="relative mt-4 rounded-2xl border border-primary/20 bg-card/90 p-3.5 shadow-sm md:p-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:gap-5">
            <div className="rounded-xl bg-accent/20 px-3 py-2">
              <p className="flex items-center gap-1 text-[0.7rem] font-bold text-brand">
                <Wallet className="h-3.5 w-3.5" />
                Saldo Dana Saat Ini
              </p>
              <p className="text-base font-extrabold text-brand md:text-lg">
                {formatRupiah(ringkasanDana.saldoDana)}
              </p>
            </div>
            <div className="px-1">
              <p className="text-[0.7rem] font-semibold text-muted-foreground">Total Pemasukan</p>
              <p className="text-sm font-extrabold text-success md:text-base">
                {formatRupiah(ringkasanDana.totalPemasukan)}
              </p>
              <p className="text-[0.68rem] text-muted-foreground">
                Pengeluaran: {formatRupiah(ringkasanDana.totalPengeluaran)}
              </p>
            </div>
            <div className="col-span-2 border-t border-border pt-2 sm:col-span-1 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
              <p className="text-[0.7rem] font-semibold text-muted-foreground">
                Rekap Penawaran ({rekapPenawaran.jumlahBarang} barang)
              </p>
              <p className="text-sm font-extrabold text-primary md:text-base">
                {formatRupiah(rekapPenawaran.totalPenawaran)}
              </p>
              <p className="flex items-center gap-1 text-[0.68rem] text-muted-foreground">
                <HardHat className="h-3 w-3 text-brand" />
                {rencanaTahapPertama.length} agenda revitalisasi tahap 1
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-secondary/70 px-3 py-1.5 text-xs font-extrabold text-primary transition hover:bg-secondary"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              Lihat Poster
            </button>
            <Link
              to={`/kegiatan/${laporanPosyandu.idBerita}`}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-extrabold text-brand transition hover:bg-muted"
            >
              Rincian & Rencana →
            </Link>
          </div>
        </div>
      </div>

      <ModalPosterPosyandu dialogRef={dialogRef} titleId={titleId} />

      <div className="no-scrollbar relative -mx-4 mt-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1 md:-mx-2 md:mt-5 md:gap-3 md:px-2">
        {pilihan.map((b) => (
          <BarangCard
            key={b.id}
            barang={b}
            className="flex-[0_0_58%] snap-start sm:flex-[0_0_32%] lg:flex-[0_0_calc(20%-10px)]"
          />
        ))}
        <Link
          to="/katalog"
          className="group flex flex-[0_0_46%] snap-start flex-col items-center justify-center rounded-2xl border border-accent/45 bg-card/80 p-4 text-center shadow-sm transition hover:bg-card sm:flex-[0_0_28%] lg:flex-[0_0_calc(20%-10px)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-accent transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="h-5 w-5" />
          </span>
          <p className="mt-2.5 text-sm font-extrabold text-brand">Lihat {katalog.length} Barang</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Bantu renovasi posyandu</p>
        </Link>
      </div>
    </section>
  );
};

const Beranda = () => {
  const hariIni = awalHariIni();
  const agenda = agendaMendatang(kegiatanList, kegiatanRutin, hariIni).slice(0, 3);

  const kasTerakhir = laporanKasBulanan[laporanKasBulanan.length - 1];
  const [utama, ...lainnya] = [...beritaList].sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime()).slice(0, 5);

  return (
    <>
      <HeroBeranda />

      <div className="container">
        <section className="mt-8">
          <SectionTitle title="Agenda terdekat" href="/kegiatan" />
          {agenda.length > 0 ? <AgendaSorotan agenda={agenda} /> : <AgendaKosong />}
        </section>

        <KatalogPilihan />

        {utama && (
          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Galeri & Lensa Warga</p>
                <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">Dokumentasi kegiatan</h2>
              </div>
              <Link
                to="/kegiatan"
                className="whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-extrabold text-primary shadow-sm transition hover:bg-secondary"
              >
                Semua ({beritaList.length}) →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:grid-rows-2 md:gap-3">
              <BeritaCard berita={utama} besar className="col-span-2 md:row-span-2" />
              {lainnya.map((b) => (
                <BeritaCard key={b.id} berita={b} />
              ))}
            </div>
          </section>
        )}

        {kasTerakhir && (
          <section className="mt-8">
            <SectionTitle title="Kas RW" />
            <KasRingkas laporan={kasTerakhir} melebar />
          </section>
        )}

        <section className="mt-8">
          <SectionTitle title="Hubungi ketua RT" href="/kontak" linkLabel="Kontak →" />
          <RtPicker awal={3} />
        </section>

        <section className="mt-10">
          <SectionTitle title="Belanja di tetangga" href="/umkm" />
          <div className="no-scrollbar -mx-4 mt-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2.5">
            {umkmList.map((u) => (
              <UmkmCard key={u.id} umkm={u} className="flex-[0_0_82%] sm:flex-[0_0_310px] md:flex-[0_0_320px] snap-start" />
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
