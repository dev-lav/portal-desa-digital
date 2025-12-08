import { Calendar, MapPin, Clock, Tag } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { kegiatanList, beritaList } from "@/data/mockData";

const Kegiatan = () => {
  const upcomingEvents = kegiatanList
    .filter((k) => k.tanggal >= new Date())
    .sort((a, b) => a.tanggal.getTime() - b.tanggal.getTime());

  const pastEvents = kegiatanList
    .filter((k) => k.tanggal < new Date())
    .sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime());

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      Rutin: "bg-primary/10 text-primary",
      "Kerja Bakti": "bg-success/10 text-success",
      Posyandu: "bg-secondary/10 text-secondary",
      Rapat: "bg-accent/10 text-accent",
      Sosial: "bg-warning/10 text-warning",
    };
    return colors[tag] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SectionTitle
          title="Kegiatan & Berita RW"
          subtitle="Informasi agenda dan dokumentasi kegiatan"
        />

        {/* Agenda Mendatang */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Agenda Mendatang
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{event.nama}</CardTitle>
                    <Badge className={getTagColor(event.tag)}>{event.tag}</Badge>
                  </div>
                  <p className="text-sm text-primary font-medium">
                    {event.tanggal.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{event.waktu}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{event.lokasi}</span>
                    </div>
                    {event.deskripsi && (
                      <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                        {event.deskripsi}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Kegiatan Terlaksana */}
        {pastEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Kegiatan Terlaksana
            </h2>
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-primary">
                            {event.tanggal.getDate()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {event.tanggal.toLocaleDateString("id-ID", { month: "short" })}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-1">
                          <h3 className="font-semibold">{event.nama}</h3>
                          <Badge className={getTagColor(event.tag)}>{event.tag}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.waktu}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.lokasi}
                          </span>
                        </div>
                        {event.deskripsi && (
                          <p className="text-sm text-muted-foreground mt-2">{event.deskripsi}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Berita & Dokumentasi */}
        <div>
          <h2 className="text-xl font-bold mb-6">Berita & Dokumentasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beritaList.map((berita) => (
              <Card key={berita.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                  {berita.gambar ? (
                    <img
                      src={berita.gambar}
                      alt={berita.judul}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  ) : (
                    <Calendar className="h-12 w-12 text-primary/40" />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{berita.judul}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {berita.tanggal.toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{berita.ringkasan}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kegiatan;
