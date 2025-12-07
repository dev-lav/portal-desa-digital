import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Users, FileText, Calendar, DollarSign, Store, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { label: "Beranda", path: "/", icon: Home },
  { label: "Profil RW", path: "/profil", icon: Info },
  // { label: "Data Warga", path: "/data-warga", icon: Users },
  // { label: "Layanan Surat", path: "/layanan-surat", icon: FileText },
  { label: "Kegiatan & Berita", path: "/kegiatan", icon: Calendar },
  // { label: "Keuangan", path: "/keuangan", icon: DollarSign },
  // { label: "UMKM Warga", path: "/umkm", icon: Store },
  { label: "Pengaduan", path: "/pengaduan", icon: MessageSquare },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
              12
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-foreground">Portal RW 12</div>
              <div className="text-xs text-muted-foreground">Desa Ngijo</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
