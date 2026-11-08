import { useEffect, useId, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Coins,
  HardHat,
  HeartHandshake,
  Image as ImageIcon,
  Info,
  Share2,
  ShoppingBag,
  Tag,
  Wallet,
  X,
} from "lucide-react";
import { laporanPosyandu } from "@/data/konten";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ModalPosterPosyanduProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  titleId: string;
}

export const useDialogLightDismiss = (dialogRef: React.RefObject<HTMLDialogElement | null>) => {
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || typeof HTMLDialogElement === "undefined") return;

    // Fallback untuk browser yang belum mendukung atribut deklaratif closedby="any"
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
      return () => dialog.removeEventListener("click", handleBackdropClick);
    }
  }, [dialogRef]);
};

export const ModalPosterPosyandu = ({ dialogRef, titleId }: ModalPosterPosyanduProps) => {
  useDialogLightDismiss(dialogRef);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
      className="m-auto max-h-[90svh] w-[calc(100%-1.5rem)] max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-3 text-foreground shadow-2xl backdrop:bg-black/65 backdrop:backdrop-blur-xs md:p-5"
    >
      <form method="dialog" className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 id={titleId} className="text-sm font-extrabold md:text-base">
            Infografis {laporanPosyandu.namaPosyandu}
          </h3>
          <p className="text-xs text-muted-foreground">Ketuk di luar gambar atau tekan Esc untuk menutup</p>
        </div>
        <button
          type="submit"
          aria-label="Tutup infografis"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-foreground transition hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
      </form>
      <img
        src={laporanPosyandu.poster}
        alt={`Laporan Pendanaan dan Rencana Revitalisasi ${laporanPosyandu.namaPosyandu}`}
        className="w-full rounded-2xl border border-border"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <Link
          to={`/kegiatan/${laporanPosyandu.idBerita}`}
          onClick={() => dialogRef.current?.close()}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-extrabold text-primary-foreground"
        >
          <Share2 className="h-3.5 w-3.5" />
          Buka halaman berita & bagikan WA
        </Link>
        <form method="dialog">
          <button
            type="submit"
            className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold hover:bg-muted"
          >
            Tutup
          </button>
        </form>
      </div>
    </dialog>
  );
};

interface LaporanPosyanduCardProps {
  jumlahTerjual?: number;
  totalKatalog?: number;
  terbukaPenuh?: boolean;
  tampilTombolPoster?: boolean;
  tampilTautanKatalog?: boolean;
  className?: string;
}

export const LaporanPosyanduCard = ({
  jumlahTerjual = 0,
  totalKatalog = 0,
  terbukaPenuh = false,
  tampilTombolPoster = true,
  tampilTautanKatalog = false,
  className,
}: LaporanPosyanduCardProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { ringkasanDana, rincianPemasukan, rincianPengeluaran, rekapPenawaran, rencanaTahapPertama } = laporanPosyandu;

  return (
    <section
      className={cn(
        "overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-secondary/60 p-4 shadow-sm md:p-6",
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-accent">
            <HeartHandshake className="h-3.5 w-3.5" />
            Transparansi Dana · {laporanPosyandu.namaPosyandu}
          </span>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-brand md:text-2xl">
            Laporan Pendanaan & Rencana Revitalisasi
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
            {laporanPosyandu.ucapanTerimaKasih}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tampilTombolPoster && (
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-card px-3.5 py-2 text-xs font-extrabold text-primary shadow-sm transition hover:bg-secondary"
            >
              <ImageIcon className="h-4 w-4" />
              Lihat Poster Infografis
            </button>
          )}
          {tampilTautanKatalog ? (
            <Link
              to="/katalog"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Lihat Lapak Amal
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <Link
              to={`/kegiatan/${laporanPosyandu.idBerita}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <Share2 className="h-3.5 w-3.5" />
              Halaman & Bagikan WA
            </Link>
          )}
        </div>
      </div>

      {/* Ringkasan 4 angka utama */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <div className="rounded-2xl border border-accent/60 bg-accent/20 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand">
            <Wallet className="h-4 w-4 text-brand" />
            Saldo Dana Saat Ini
          </div>
          <p className="mt-1 text-lg font-extrabold text-brand md:text-xl">
            {formatRupiah(ringkasanDana.saldoDana)}
          </p>
          <p className="mt-0.5 text-[0.72rem] text-muted-foreground">Siap untuk tahap pertama</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-success">
            <Coins className="h-4 w-4" />
            Total Pemasukan
          </div>
          <p className="mt-1 text-lg font-extrabold text-success md:text-xl">
            {formatRupiah(ringkasanDana.totalPemasukan)}
          </p>
          <p className="mt-0.5 text-[0.72rem] text-muted-foreground">Dari 5 sumber donasi & amal</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-destructive">
            <ShoppingBag className="h-4 w-4" />
            Total Pengeluaran
          </div>
          <p className="mt-1 text-lg font-extrabold text-destructive md:text-xl">
            {formatRupiah(ringkasanDana.totalPengeluaran)}
          </p>
          <p className="mt-0.5 text-[0.72rem] text-muted-foreground">Reparasi barang sumbangan</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <Tag className="h-4 w-4" />
            Rekap Penawaran Amal
          </div>
          <p className="mt-1 text-lg font-extrabold text-primary md:text-xl">
            {formatRupiah(rekapPenawaran.totalPenawaran)}
          </p>
          <p className="mt-0.5 text-[0.72rem] text-muted-foreground">
            {rekapPenawaran.jumlahBarang} barang tercatat di rekap panitia
          </p>
        </div>
      </div>

      {/* Progres penjualan barang katalog live */}
      {totalKatalog > 0 && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-3.5 py-2.5">
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 text-xs font-bold">
              <span>
                Progres lapak website: {jumlahTerjual} dari {totalKatalog} barang sudah terjual
              </span>
              <span className="text-primary">{Math.round((jumlahTerjual / totalKatalog) * 100)}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(jumlahTerjual / totalKatalog) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Detail rincian dana & rencana 4 tahap menggunakan <details> agar tetap terindeks pencarian halaman */}
      <details open={terbukaPenuh} className="group mt-3.5 rounded-2xl border border-border bg-card">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-extrabold text-brand select-none">
          <span>Rincian Dana, Penawaran Barang & Rencana Revitalisasi Tahap Pertama</span>
          <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
        </summary>

        <div className="border-t border-border p-4 pt-3.5">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Kolom kiri: Rincian Pemasukan & Pengeluaran */}
            <div className="space-y-3.5">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-success">
                  Rincian Pemasukan ({formatRupiah(ringkasanDana.totalPemasukan)})
                </h3>
                <dl className="mt-2 divide-y divide-border rounded-xl border border-border bg-background/60 px-3 text-xs md:text-sm">
                  {rincianPemasukan.map((item) => (
                    <div key={item.keterangan} className="flex items-baseline justify-between gap-3 py-2">
                      <dt className="text-foreground">{item.keterangan}</dt>
                      <dd className="whitespace-nowrap font-bold text-foreground">{formatRupiah(item.nominal)}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-destructive">
                  Rincian Pengeluaran ({formatRupiah(ringkasanDana.totalPengeluaran)})
                </h3>
                <dl className="mt-2 divide-y divide-border rounded-xl border border-border bg-background/60 px-3 text-xs md:text-sm">
                  {rincianPengeluaran.map((item) => (
                    <div key={item.keterangan} className="flex items-baseline justify-between gap-3 py-2">
                      <dt className="text-foreground">{item.keterangan}</dt>
                      <dd className="whitespace-nowrap font-bold text-destructive">{formatRupiah(item.nominal)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Kolom kanan: Contoh Barang Penawaran & Rencana Tahap Pertama */}
            <div className="space-y-3.5">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  Contoh Barang & Nilai Penawaran ({rekapPenawaran.jumlahBarang} barang · {formatRupiah(rekapPenawaran.totalPenawaran)})
                </h3>
                <dl className="mt-2 divide-y divide-border rounded-xl border border-border bg-background/60 px-3 text-xs md:text-sm">
                  {rekapPenawaran.contohBarang.map((item) => (
                    <div key={item.nama} className="flex items-baseline justify-between gap-3 py-2">
                      <dt className="text-foreground">{item.nama}</dt>
                      <dd className="whitespace-nowrap font-bold text-foreground">{formatRupiah(item.nominal)}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs italic text-muted-foreground">
                  <Info className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  {rekapPenawaran.catatan}
                </p>
              </div>
            </div>
          </div>

          {/* Rencana Revitalisasi Tahap Pertama */}
          <div className="mt-4 rounded-2xl border border-primary/25 bg-secondary/50 p-3.5 md:p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-accent">
                <HardHat className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-extrabold text-brand md:text-base">
                Rencana Revitalisasi Tahap Pertama
              </h3>
            </div>

            <ol className="mt-3 grid gap-2 sm:grid-cols-2">
              {rencanaTahapPertama.map((langkah, idx) => (
                <li
                  key={langkah}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-2.5 text-xs font-semibold md:text-sm"
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-destructive text-xs font-extrabold text-destructive-foreground">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{langkah}</span>
                </li>
              ))}
            </ol>

            <p className="mt-2.5 text-xs font-semibold italic text-muted-foreground">
              * {laporanPosyandu.catatanPelaksanaan}
            </p>
          </div>
        </div>
      </details>

      {tampilTombolPoster && <ModalPosterPosyandu dialogRef={dialogRef} titleId={titleId} />}
    </section>
  );
};
