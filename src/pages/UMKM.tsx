import { useState } from "react";
import { Store, Phone, MapPin, Filter } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { umkmList } from "@/data/mockData";

const UMKM = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Semua");

  const jenisUsaha = Array.from(new Set(umkmList.map((u) => u.jenisUsaha)));
  const filters = ["Semua", ...jenisUsaha];

  const filteredUMKM =
    selectedFilter === "Semua"
      ? umkmList
      : umkmList.filter((u) => u.jenisUsaha === selectedFilter);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SectionTitle
          title="UMKM & Jasa Warga"
          subtitle="Dukung usaha dan jasa lokal RW 12"
        />

        {/* Info Banner */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dukung Ekonomi Lokal</h3>
                <p className="text-sm text-muted-foreground">
                  Halaman ini menampilkan daftar UMKM dan jasa yang dikelola warga RW 12. Mari saling mendukung
                  dan mengembangkan ekonomi lokal dengan memilih produk dan jasa dari warga sekitar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter berdasarkan jenis usaha:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* UMKM Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUMKM.map((umkm) => (
            <Card key={umkm.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{umkm.namaUsaha}</CardTitle>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Store className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {umkm.jenisUsaha}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pemilik</p>
                    <p className="font-medium">{umkm.pemilik}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">RT {String(umkm.rt).padStart(2, "0")}</span>
                  </div>

                  {umkm.deskripsi && (
                    <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                      {umkm.deskripsi}
                    </p>
                  )}

                  <a
                    href={`https://wa.me/${umkm.nomorWA}?text=Halo%20${encodeURIComponent(umkm.namaUsaha)},%20saya%20ingin%20bertanya`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2" size="sm">
                      <Phone className="h-4 w-4" />
                      Hubungi via WhatsApp
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUMKM.length === 0 && (
          <div className="text-center py-12">
            <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Tidak ada UMKM dalam kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UMKM;
