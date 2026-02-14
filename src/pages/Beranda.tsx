import { Link } from "react-router-dom";
import { Users, Home as HomeIcon, FileText, Calendar, DollarSign, Store, MessageSquare } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { statistikPenduduk, dataRT, kegiatanList, rwInfo, lembagaList, beritaList } from "@/data/mockData";

const Beranda = () => {
  const upcomingEvents = kegiatanList
    .filter((k) => k.tanggal >= new Date())
    .sort((a, b) => a.tanggal.getTime() - b.tanggal.getTime())
    .slice(0, 3);

  const latestNews = beritaList
    .sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime())
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
              {rwInfo.desa}, {rwInfo.kecamatan}, {rwInfo.kabupaten}, {rwInfo.provinsi}
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

          <Link to="/pengaduan">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Pengaduan</h3>
                <p className="text-sm text-muted-foreground">
                  Formulir pengaduan
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Berita & Dokumentasi */}
      <section className="container mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <SectionTitle
            title="Berita & Dokumentasi"
            subtitle="Kabar terbaru dan dokumentasi kegiatan RW 12"
          />
          <Link to="/kegiatan">
            <Button variant="outline" size="sm">Lihat Semua</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((news) => (
            <Link key={news.id} to="/kegiatan">
              <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full overflow-hidden flex flex-col">
                <div className="aspect-video w-full bg-muted relative">
                  {news.gambar ? (
                    <img
                      src={news.gambar}
                      alt={news.judul}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                      <FileText className="h-10 w-10" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                    {news.tanggal.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {news.judul}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {news.ringkasan}
                  </p>
                  <div className="text-xs text-primary font-medium mt-auto flex items-center">
                    Baca selengkapnya
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 h-3 w-3"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
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

      {/* Lembaga Section */}
      <section className="container mx-auto px-4 mt-16 mb-16">
        <SectionTitle
          title="Lembaga"
          subtitle="Mitra strategis pembangunan lingkungan RW 12"
        />
        <div className="px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {lembagaList.map((lembaga) => (
                <CarouselItem key={lembaga.id} className="basis-1/2 md:basis-1/4 lg:basis-1/5">
                  <div className="p-1">
                    <Card className="border-0 shadow-none bg-transparent">
                      <CardContent className="flex flex-col items-center justify-center p-4">
                        <div className="w-24 h-24 md:w-32 md:h-32 mb-4 relative flex items-center justify-center transition-transform hover:scale-110 duration-300">
                          <img
                            src={lembaga.logo}
                            alt={lembaga.nama}
                            className="object-contain w-full h-full drop-shadow-sm"
                          />
                        </div>
                        <h3 className="font-medium text-center text-sm md:text-base text-muted-foreground">
                          {lembaga.nama}
                        </h3>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Beranda;
