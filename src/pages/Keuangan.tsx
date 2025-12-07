import { DollarSign, TrendingUp, TrendingDown, Info } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { laporanKasBulanan, rincianPengeluaran } from "@/data/mockData";

const Keuangan = () => {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const latestKas = laporanKasBulanan[laporanKasBulanan.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SectionTitle
          title="Keuangan & Iuran RW"
          subtitle="Transparansi laporan keuangan RW 12"
        />

        {/* Info Banner */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tentang Transparansi Keuangan</h3>
                <p className="text-sm text-muted-foreground">
                  Data keuangan berikut adalah laporan kas RW. Transparansi keuangan penting untuk
                  membangun kepercayaan dan akuntabilitas pengelolaan dana warga.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saldo Terakhir */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Saldo Akhir</p>
                  <p className="text-xl font-bold text-foreground">{formatRupiah(latestKas.saldoAkhir)}</p>
                  <p className="text-xs text-muted-foreground">{latestKas.bulan}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pemasukan</p>
                  <p className="text-xl font-bold text-foreground">{formatRupiah(latestKas.pemasukan)}</p>
                  <p className="text-xs text-muted-foreground">{latestKas.bulan}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pengeluaran</p>
                  <p className="text-xl font-bold text-foreground">{formatRupiah(latestKas.pengeluaran)}</p>
                  <p className="text-xs text-muted-foreground">{latestKas.bulan}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Laporan Kas Bulanan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ringkasan Kas Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Bulan</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Saldo Awal</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Pemasukan</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Pengeluaran</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Saldo Akhir</th>
                  </tr>
                </thead>
                <tbody>
                  {laporanKasBulanan.map((laporan, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{laporan.bulan}</td>
                      <td className="py-3 px-4 text-right">{formatRupiah(laporan.saldoAwal)}</td>
                      <td className="py-3 px-4 text-right text-success">{formatRupiah(laporan.pemasukan)}</td>
                      <td className="py-3 px-4 text-right text-destructive">{formatRupiah(laporan.pengeluaran)}</td>
                      <td className="py-3 px-4 text-right font-semibold">{formatRupiah(laporan.saldoAkhir)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Rincian Pengeluaran */}
        <Card>
          <CardHeader>
            <CardTitle>Rincian Pengeluaran per Kegiatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Tanggal</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Nama Kegiatan</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Keterangan</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {rincianPengeluaran.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-sm">
                        {item.tanggal.toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 font-medium">{item.namaKegiatan}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{item.keterangan}</td>
                      <td className="py-3 px-4 text-right font-semibold">{formatRupiah(item.nominal)}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/50 font-semibold">
                    <td colSpan={3} className="py-3 px-4 text-right">Total Pengeluaran</td>
                    <td className="py-3 px-4 text-right">
                      {formatRupiah(rincianPengeluaran.reduce((sum, item) => sum + item.nominal, 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Keuangan;
