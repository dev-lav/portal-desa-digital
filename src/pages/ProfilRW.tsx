import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pengurusRW, dataRT, rwInfo } from "@/data/mockData";

const ProfilRW = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <SectionTitle
          title="Profil RW 12"
          subtitle="Informasi lengkap tentang RW 12"
        />

        {/* Informasi Dasar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Informasi Dasar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-3">Identitas RW</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nomor RW</p>
                    <p className="font-medium">RW {rwInfo.nomor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Desa/Kelurahan</p>
                    <p className="font-medium">{rwInfo.desa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kecamatan</p>
                    <p className="font-medium">{rwInfo.kecamatan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kabupaten</p>
                    <p className="font-medium">{rwInfo.kabupaten}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-3">Kontak & Layanan</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Alamat Posko</p>
                      <p className="font-medium">{rwInfo.alamatPosko}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Jam Layanan</p>
                      <p className="font-medium">{rwInfo.jamLayanan}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Struktur Pengurus */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Struktur Pengurus RW</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pengurusRW.map((pengurus) => (
                <Card key={pengurus.id} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-primary">
                          {pengurus.nama.charAt(0)}
                        </span>
                      </div>
                      <p className="text-xs text-primary font-semibold mb-1">{pengurus.jabatan}</p>
                      <p className="font-semibold mb-2">{pengurus.nama}</p>
                      {/* {pengurus.kontak && (
                        <a
                          href={`https://wa.me/${pengurus.kontak}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          {pengurus.kontak}
                        </a>
                      )} */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daftar RT */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daftar Rukun Tetangga (RT)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">RT</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Ketua RT</th>
                    {/* <th className="text-left py-3 px-4 font-semibold text-sm">Kontak</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Aksi</th> */}
                  </tr>
                </thead>
                <tbody>
                  {dataRT.map((rt) => (
                    <tr key={rt.nomor} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-semibold">RT {String(rt.nomor).padStart(2, "0")}</span>
                      </td>
                      <td className="py-3 px-4">{rt.ketua}</td>
                      {/* <td className="py-3 px-4 text-sm text-muted-foreground">{rt.kontak}</td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`https://wa.me/${rt.kontak}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3 mr-1" />
                            Hubungi
                          </Button>
                        </a>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Kontak RW */}
        <Card>
          <CardHeader>
            <CardTitle>Hubungi RW 12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href={`https://wa.me/${rwInfo.whatsapp}?text=Halo%20RW%2012,%20saya%20ingin%20bertanya`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full gap-2" size="lg">
                  <Phone className="h-5 w-5" />
                  Hubungi via WhatsApp
                </Button>
              </a>
              <a
                href={`mailto:${rwInfo.email}`}
                className="flex-1"
              >
                <Button variant="outline" className="w-full gap-2" size="lg">
                  <Mail className="h-5 w-5" />
                  Kirim Email
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilRW;
