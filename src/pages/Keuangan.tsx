import { Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { KasRingkas } from "@/components/konten/KasRingkas";
import { laporanKasBulanan, rincianPengeluaran } from "@/data/konten";
import { formatRupiah, formatTanggal } from "@/lib/format";

const Keuangan = () => {
  const kasTerakhir = laporanKasBulanan[laporanKasBulanan.length - 1];
  const riwayat = [...laporanKasBulanan].reverse();
  const totalRincian = rincianPengeluaran.reduce((sum, item) => sum + item.nominal, 0);
  const terbesar = Math.max(...rincianPengeluaran.map((r) => r.nominal), 1);

  return (
    <>
      <PageHeader title="Kas RW" subtitle="Laporan kas RW 12 secara terbuka untuk seluruh warga." />

      <div className="container">
        {kasTerakhir && (
          <section className="mt-8 md:max-w-xl">
            <KasRingkas laporan={kasTerakhir} tautan={false} />
            <p className="mt-2.5 flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
              Data terakhir: {kasTerakhir.bulan}. Pertanyaan soal kas bisa disampaikan ke bendahara lewat pengurus RW.
            </p>
          </section>
        )}

        {rincianPengeluaran.length > 0 && (
          <section className="mt-8">
            <SectionTitle title="Uang kas dipakai untuk apa?" subtitle={kasTerakhir ? `Rincian pengeluaran ${kasTerakhir.bulan}` : undefined} />
            <div className="divide-y divide-border rounded-2xl border border-border bg-card">
              {[...rincianPengeluaran]
                .sort((a, b) => b.nominal - a.nominal)
                .map((item) => (
                  <div key={item.id} className="px-4 py-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold">{item.namaKegiatan}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.keterangan} · {formatTanggal(item.tanggal, { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <p className="whitespace-nowrap font-bold">{formatRupiah(item.nominal)}</p>
                    </div>
                    {/* Batang proporsi pengeluaran */}
                    <div className="mt-2 h-1.5 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(item.nominal / terbesar) * 100}%` }} />
                    </div>
                  </div>
                ))}
              <div className="flex items-baseline justify-between bg-muted/60 px-4 py-3 font-extrabold">
                <span>Total</span>
                <span>{formatRupiah(totalRincian)}</span>
              </div>
            </div>
          </section>
        )}

        <section className="mt-8">
          <SectionTitle title="Riwayat per bulan" />
          <div className="grid gap-2.5 md:grid-cols-2">
            {riwayat.map((laporan) => (
              <div key={laporan.bulan} className="rounded-2xl border border-border bg-card p-4">
                <p className="mb-2 font-bold">{laporan.bulan}</p>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <dt className="text-muted-foreground">Saldo awal</dt>
                  <dd className="text-right">{formatRupiah(laporan.saldoAwal)}</dd>
                  <dt className="text-muted-foreground">Pemasukan</dt>
                  <dd className="text-right text-success">+ {formatRupiah(laporan.pemasukan)}</dd>
                  <dt className="text-muted-foreground">Pengeluaran</dt>
                  <dd className="text-right text-destructive">− {formatRupiah(laporan.pengeluaran)}</dd>
                  <dt className="border-t border-border pt-1 font-bold">Saldo akhir</dt>
                  <dd className="border-t border-border pt-1 text-right font-bold">{formatRupiah(laporan.saldoAkhir)}</dd>
                </dl>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Keuangan;
