import { Phone, Mail, MapPin, Clock, Home, Users, User } from "lucide-react";
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dataRT.map((rt) => (
                <Card key={rt.nomor} className="bg-muted/30 overflow-hidden hover:shadow-md transition-shadow border-muted flex flex-col">
                  <div className="aspect-square w-full bg-background flex items-center justify-center relative border-b">
                    {rt.foto ? (
                      <img
                        src={rt.foto}
                        alt={`RT ${rt.nomor}`}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground/50">
                        <MapPin className="h-10 w-10 mb-2" />
                        <span className="text-xs font-medium">Foto Wilayah RT {String(rt.nomor).padStart(2, "0")}</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                      RT {String(rt.nomor).padStart(2, "0")}
                    </div>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="mb-4">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Ketua RT</p>
                      <p className="font-semibold text-sm line-clamp-1 text-foreground" title={rt.ketua}>
                        {rt.ketua}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-auto border-t pt-3">
                      <div className="text-center group cursor-help" title={`Jumlah Kepala Keluarga: ${rt.jumlahKK}`}>
                        <div className="flex justify-center mb-1.5 transition-transform group-hover:scale-110">
                          <Home className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-xs font-bold text-foreground">{rt.jumlahKK}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">KK</p>
                      </div>
                      <div className="text-center group cursor-help" title={`Jumlah Penduduk: ${rt.jumlahJiwa}`}>
                        <div className="flex justify-center mb-1.5 transition-transform group-hover:scale-110">
                          <Users className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-xs font-bold text-foreground">{rt.jumlahJiwa}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">Jiwa</p>
                      </div>
                      <div className="text-center group cursor-help" title={`Jumlah Lansia: ${rt.jumlahLansia}`}>
                        <div className="flex justify-center mb-1.5 transition-transform group-hover:scale-110">
                          <User className="h-4 w-4 text-orange-500" />
                        </div>
                        <p className="text-xs font-bold text-foreground">{rt.jumlahLansia}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">Lansia</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
