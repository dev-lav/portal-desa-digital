import { Users, UserCheck, Briefcase, Baby } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statistikPenduduk, dataRT } from "@/data/mockData";

const DataWarga = () => {
  const { totalKK, totalJiwa, komposisiUsia, pekerjaan } = statistikPenduduk;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SectionTitle
          title="Data & Statistik Warga"
          subtitle="Data agregat penduduk RW 12 (data dummy untuk demo)"
        />

        {/* Ringkasan Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Kepala Keluarga"
            value={totalKK}
            description="Keluarga terdaftar"
          />
          <StatCard
            icon={UserCheck}
            label="Total Penduduk"
            value={totalJiwa}
            description="Jiwa di RW 12"
          />
        </div>

        {/* Komposisi Usia */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Komposisi Berdasarkan Usia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <Baby className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{komposisiUsia.balita}</p>
                <p className="text-sm text-muted-foreground">Balita</p>
                <p className="text-xs text-muted-foreground mt-1">0-5 tahun</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold">{komposisiUsia.usiaSekolah}</p>
                <p className="text-sm text-muted-foreground">Usia Sekolah</p>
                <p className="text-xs text-muted-foreground mt-1">6-17 tahun</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <Briefcase className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold">{komposisiUsia.produktif}</p>
                <p className="text-sm text-muted-foreground">Produktif</p>
                <p className="text-xs text-muted-foreground mt-1">18-60 tahun</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <UserCheck className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold">{komposisiUsia.lansia}</p>
                <p className="text-sm text-muted-foreground">Lansia</p>
                <p className="text-xs text-muted-foreground mt-1">60+ tahun</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pekerjaan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Komposisi Berdasarkan Pekerjaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Karyawan/Pegawai", value: pekerjaan.karyawan, color: "bg-primary" },
                { label: "Pedagang/Wiraswasta", value: pekerjaan.pedagang, color: "bg-secondary" },
                { label: "Petani/Buruh Tani", value: pekerjaan.petani, color: "bg-success" },
                { label: "Lainnya", value: pekerjaan.lainnya, color: "bg-muted-foreground" },
              ].map((item) => {
                const percentage = ((item.value / totalJiwa) * 100).toFixed(1);
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.value} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tabel per RT */}
        <Card>
          <CardHeader>
            <CardTitle>Data per Rukun Tetangga</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">RT</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Jumlah KK</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Jumlah Jiwa</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Lansia</th>
                  </tr>
                </thead>
                <tbody>
                  {dataRT.map((rt) => (
                    <tr key={rt.nomor} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-semibold">RT {String(rt.nomor).padStart(2, "0")}</td>
                      <td className="py-3 px-4 text-right">{rt.jumlahKK}</td>
                      <td className="py-3 px-4 text-right">{rt.jumlahJiwa}</td>
                      <td className="py-3 px-4 text-right">{rt.jumlahLansia}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/50 font-semibold">
                    <td className="py-3 px-4">Total</td>
                    <td className="py-3 px-4 text-right">{totalKK}</td>
                    <td className="py-3 px-4 text-right">{totalJiwa}</td>
                    <td className="py-3 px-4 text-right">{komposisiUsia.lansia}</td>
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

export default DataWarga;
