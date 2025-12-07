import { Link } from "react-router-dom";
import { Users, Home as HomeIcon, FileText, Calendar, DollarSign, Store } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statistikPenduduk, dataRT, kegiatanList, rwInfo } from "@/data/mockData";

const Beranda = () => {
  const upcomingEvents = kegiatanList
    .filter((k) => k.tanggal >= new Date())
    .sort((a, b) => a.tanggal.getTime() - b.tanggal.getTime())
    .slice(0, 3);

  const totalRT = dataRT.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Selamat Datang di Portal RW {rwInfo.nomor}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              {rwInfo.desa}, {rwInfo.kecamatan}
            </p>
            <p className="text-base md:text-lg opacity-80">
              Portal digital untuk kemudahan akses informasi, layanan, dan kegiatan warga.
              Mari bersama membangun lingkungan yang lebih baik dan terhubung.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Users}
            label="Total Kepala Keluarga"
            value={statistikPenduduk.totalKK}
            description="Terdaftar di RW 12"
          />
          <StatCard
            icon={Users}
            label="Total Penduduk"
            value={statistikPenduduk.totalJiwa}
            description="Jiwa di RW 12"
          />
          <StatCard
            icon={HomeIcon}
            label="Jumlah RT"
            value={totalRT}
            description="RT 01 s.d. RT 08"
          />
        </div>
      </section>

      {/* Quick Access */}
      <section className="container mx-auto px-4 mt-16">
        <SectionTitle
          title="Akses Cepat"
          subtitle="Temukan informasi dan layanan yang Anda butuhkan"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/profil">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Profil RW</h3>
                <p className="text-sm text-muted-foreground">
                  Struktur pengurus dan kontak
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/layanan-surat">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Layanan Surat</h3>
                <p className="text-sm text-muted-foreground">
                  Informasi pengajuan surat
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/kegiatan">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Kegiatan & Berita</h3>
                <p className="text-sm text-muted-foreground">
                  Agenda dan dokumentasi
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/umkm">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">UMKM Warga</h3>
                <p className="text-sm text-muted-foreground">
                  Dukung usaha lokal
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <SectionTitle
            title="Agenda Terdekat"
            subtitle="Kegiatan yang akan datang"
          />
          <Link to="/kegiatan">
            <Button variant="outline" size="sm">Lihat Semua</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{event.nama}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.tanggal.toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {event.tag}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Waktu:</span>{" "}
                    <span className="font-medium">{event.waktu}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lokasi:</span>{" "}
                    <span className="font-medium">{event.lokasi}</span>
                  </div>
                  {event.deskripsi && (
                    <p className="text-muted-foreground mt-2">{event.deskripsi}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Beranda;
