import { Link } from "react-router-dom";
import {
    Users,
    Home as HomeIcon,
    FileText,
    Calendar,
    Store,
    MessageSquare,
    ArrowRight,
    MapPin,
    ChevronRight,
    TrendingUp,
    Activity
} from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { statistikPenduduk, dataRT, kegiatanList, rwInfo, lembagaList, beritaList } from "@/data/mockData";

const BerandaRevamp = () => {
    const upcomingEvents = kegiatanList
        .filter((k) => k.tanggal >= new Date())
        .sort((a, b) => a.tanggal.getTime() - b.tanggal.getTime())
        .slice(0, 5);

    const latestNews = beritaList
        .sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime())
        .slice(0, 4);

    const totalRT = dataRT.length;

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Hero Section with Glassmorphism */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-primary to-blue-900 text-white pb-24 pt-20 lg:pt-32">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <Badge variant="secondary" className="px-4 py-1 text-sm font-medium bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md">
                                Selamat Datang di Portal Digital
                            </Badge>
                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                                RW {rwInfo.nomor} <span className="text-blue-300">{rwInfo.desa}</span>
                            </h1>
                            <p className="text-lg text-blue-100 max-w-xl leading-relaxed">
                                Platform digital terintegrasi untuk mewujudkan lingkungan {rwInfo.kecamatan} yang modern, transparan, dan terhubung. Nikmati kemudahan akses layanan warga dalam satu genggaman.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/layanan-surat">
                                    <Button size="lg" className="bg-white text-indigo-900 hover:bg-blue-50 border-0 font-semibold shadow-lg shadow-blue-900/20">
                                        <FileText className="mr-2 h-5 w-5" />
                                        Buat Surat
                                    </Button>
                                </Link>
                                <Link to="/pengaduan">
                                    <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                                        <MessageSquare className="mr-2 h-5 w-5" />
                                        Lapor Aduan
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Floating Stats Card - Glass Effect */}
                        <div className="relative hidden lg:block">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
                            <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white shadow-2xl relative">
                                <CardContent className="p-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">Total Penduduk</div>
                                            <div className="text-4xl font-bold flex items-baseline gap-2">
                                                {statistikPenduduk.totalJiwa} <span className="text-lg font-normal text-blue-300">Jiwa</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-400 w-[75%]"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">Kepala Keluarga</div>
                                            <div className="text-4xl font-bold flex items-baseline gap-2">
                                                {statistikPenduduk.totalKK} <span className="text-lg font-normal text-blue-300">KK</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-400 w-[60%]"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">Wilayah RT</div>
                                            <div className="text-4xl font-bold flex items-baseline gap-2">
                                                {totalRT} <span className="text-lg font-normal text-blue-300">RT</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-orange-400 w-[90%]"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">UMKM Aktif</div>
                                            <div className="text-4xl font-bold flex items-baseline gap-2">
                                                {/* Assuming static or calculated later */}
                                                8 <span className="text-lg font-normal text-blue-300">Unit</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-400 w-[45%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Bento Grid Layout */}
            <section className="container mx-auto px-4 py-16 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Quick Access Menu - Spans 2 cols */}
                    <Card className="md:col-span-2 row-span-1 shadow-lg border-muted/50 hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Layanan Digital
                            </CardTitle>
                            <CardDescription>Akses cepat menu layanan warga</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { to: "/profil", icon: HomeIcon, label: "Profil RW", color: "text-blue-500", bg: "bg-blue-50" },
                                    { to: "/data-warga", icon: Users, label: "Data Warga", color: "text-emerald-500", bg: "bg-emerald-50" },
                                    { to: "/kegiatan", icon: Calendar, label: "Kegiatan", color: "text-orange-500", bg: "bg-orange-50" },
                                    { to: "/umkm", icon: Store, label: "UMKM", color: "text-purple-500", bg: "bg-purple-50" },
                                ].map((item) => (
                                    <Link key={item.to} to={item.to} className="group">
                                        <div className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm ${item.bg}`}>
                                            <item.icon className={`h-8 w-8 mb-3 ${item.color} transition-transform group-hover:scale-110`} />
                                            <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Agenda / Events - Spans 1 col but tall */}
                    <Card className="shadow-lg border-muted/50 hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm lg:row-span-2 h-full flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Calendar className="h-5 w-5 text-orange-500" />
                                Agenda
                            </CardTitle>
                            <CardDescription>Jadwal kegiatan terdekat</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 p-0">
                            <ScrollArea className="h-[400px] px-6">
                                <div className="space-y-6 pb-6">
                                    {upcomingEvents.map((event, i) => (
                                        <div key={event.id} className="relative pl-6 border-l-2 border-muted hover:border-primary transition-colors group">
                                            <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-muted group-hover:bg-primary transition-colors"></div>
                                            <div className="mb-1 text-xs font-semibold text-primary uppercase tracking-wide">
                                                {event.tanggal.toLocaleDateString("id-ID", { day: 'numeric', month: 'long' })}
                                            </div>
                                            <h4 className="font-medium text-foreground leading-snug mb-1 group-hover:text-primary transition-colors">{event.nama}</h4>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {event.lokasi}
                                            </p>
                                        </div>
                                    ))}
                                    <Link to="/kegiatan" className="block pt-2">
                                        <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-primary">
                                            Lihat Semua Agenda <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Quick Info / Announcement - Spans 1 col */}
                    <Card className="shadow-lg border-muted/50 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl text-primary">
                                <Activity className="h-5 w-5" />
                                Info Kilat
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-background/60 p-3 rounded-lg border border-primary/10">
                                    <p className="text-sm font-medium text-foreground">Posyandu Balita</p>
                                    <p className="text-xs text-muted-foreground">Senin depan, 08:30 WIB</p>
                                </div>
                                <div className="bg-background/60 p-3 rounded-lg border border-primary/10">
                                    <p className="text-sm font-medium text-foreground">Kerja Bakti RT 03</p>
                                    <p className="text-xs text-muted-foreground">Minggu ini, 07:00 WIB</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* News Section - Spans 3 cols (full width on desktop minus agenda) */}
                    <div className="md:col-span-2 lg:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <SectionTitle title="Berita & Dokumentasi" />
                            <Link to="/kegiatan">
                                <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80">
                                    Berita Lainnya <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {latestNews.slice(0, 3).map((news) => (
                                <Card key={news.id} className="group overflow-hidden border-0 shadow-lg bg-card hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-xl">
                                    <div className="aspect-video relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                                        {news.gambar ? (
                                            <img src={news.gambar} alt={news.judul} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-muted flex items-center justify-center">
                                                <FileText className="h-12 w-12 text-muted-foreground/50" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-3 left-3 right-3 z-20">
                                            <Badge variant="default" className="bg-primary/90 hover:bg-primary text-white backdrop-blur-sm shadow-sm border-0 mb-2">
                                                Berita
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-5 flex-1 flex flex-col">
                                        <div className="flex items-center text-xs text-muted-foreground mb-3">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {news.tanggal.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {news.judul}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                                            {news.ringkasan}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                                            <span className="text-xs font-semibold text-primary flex items-center group-hover:underline">
                                                Baca Selengkapnya
                                            </span>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners / Lembaga Layout */}
            <section className="bg-muted/30 py-16 border-t">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold mb-2">Mitra & Lembaga</h2>
                        <p className="text-muted-foreground">Bersinergi membangun lingkungan yang madani</p>
                    </div>

                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-5xl mx-auto"
                    >
                        <CarouselContent className="-ml-4">
                            {lembagaList.map((lembaga) => (
                                <CarouselItem key={lembaga.id} className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                                    <div className="group bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center h-40">
                                        <div className="w-16 h-16 relative mb-3 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                                            <img src={lembaga.logo} alt={lembaga.nama} className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-xs font-semibold text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                                            {lembaga.nama}
                                        </span>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-4 lg:-left-12" />
                        <CarouselNext className="-right-4 lg:-right-12" />
                    </Carousel>
                </div>
            </section>
        </div>
    );
};

export default BerandaRevamp;
