import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { rwInfo } from "@/data/mockData";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info RW */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                12
              </div>
              <div>
                <div className="font-bold text-foreground">RW {rwInfo.nomor}</div>
                <div className="text-sm text-muted-foreground">{rwInfo.desa}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Portal digital untuk kemudahan akses informasi dan layanan warga RW 12.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Kontak Kami</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{rwInfo.alamatPosko}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href={`https://wa.me/${rwInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {rwInfo.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${rwInfo.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {rwInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Jam Layanan */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Jam Layanan</h3>
            <p className="text-sm text-muted-foreground mb-4">{rwInfo.jamLayanan}</p>
            <Link to="/kebijakan-privasi" className="text-sm text-primary hover:underline">
              Kebijakan Privasi
            </Link>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Portal RW 12 - Desa Ngijo. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};
