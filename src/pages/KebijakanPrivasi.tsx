import { Shield } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";

const KebijakanPrivasi = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SectionTitle 
          title="Kebijakan Privasi" 
          subtitle="Portal RW 05 - Desa Sukamaju"
        />

        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Perlindungan Data Warga</h3>
                  <p className="text-sm text-muted-foreground">
                    Portal ini berkomitmen untuk melindungi privasi dan data pribadi warga RW 05 sesuai dengan
                    peraturan perundang-undangan yang berlaku.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 prose prose-sm max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">1. Pengumpulan Informasi</h2>
                <p className="text-muted-foreground">
                  Portal RW 05 adalah situs statis yang tidak mengumpulkan, menyimpan, atau memproses data pribadi
                  warga secara otomatis. Semua data yang ditampilkan di portal ini adalah data agregat dan tidak
                  mengandung informasi pribadi yang dapat mengidentifikasi individu tertentu.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">2. Penggunaan Data</h2>
                <p className="text-muted-foreground mb-3">
                  Data statistik yang ditampilkan di portal ini digunakan hanya untuk tujuan:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Memberikan informasi umum tentang RW 05 kepada warga</li>
                  <li>Transparansi kegiatan dan keuangan RW</li>
                  <li>Memudahkan akses informasi layanan RW</li>
                  <li>Promosi UMKM dan jasa warga lokal</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">3. Komunikasi via WhatsApp</h2>
                <p className="text-muted-foreground">
                  Portal ini menyediakan tautan untuk berkomunikasi dengan pengurus RW melalui WhatsApp. Saat Anda
                  mengklik tautan tersebut, Anda akan diarahkan ke aplikasi WhatsApp dengan template pesan. Kami
                  tidak menyimpan atau mengakses isi komunikasi Anda dengan pengurus RW.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">4. Data UMKM</h2>
                <p className="text-muted-foreground">
                  Informasi UMKM yang ditampilkan di portal ini diberikan dengan persetujuan pemilik usaha untuk
                  tujuan promosi dan kemudahan warga dalam mengakses layanan lokal. Jika Anda adalah pemilik usaha
                  dan ingin mengubah atau menghapus informasi Anda, silakan hubungi pengurus RW.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">5. Keamanan</h2>
                <p className="text-muted-foreground">
                  Portal ini dihosting di GitHub Pages dan menggunakan protokol HTTPS untuk mengamankan koneksi.
                  Karena sifatnya yang statis, portal ini tidak mengumpulkan atau menyimpan data pengguna, sehingga
                  risiko kebocoran data pribadi minimal.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">6. Pembaruan Kebijakan</h2>
                <p className="text-muted-foreground">
                  Kebijakan privasi ini dapat diperbarui sewaktu-waktu sesuai kebutuhan dan perkembangan portal.
                  Warga akan diberitahu melalui pengumuman di portal atau saluran komunikasi RW lainnya jika ada
                  perubahan signifikan.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. Kontak</h2>
                <p className="text-muted-foreground">
                  Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi ini, silakan hubungi
                  pengurus RW 05 melalui kontak yang tersedia di halaman Profil RW.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Terakhir diperbarui: November 2025
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KebijakanPrivasi;
