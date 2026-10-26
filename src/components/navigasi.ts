import { Home, Calendar, Wallet, Users, LucideIcon } from "lucide-react";

export interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
  // Halaman lain yang dianggap bagian dari menu ini (untuk penanda aktif)
  cakupan?: string[];
}

export const menuUtama: MenuItem[] = [
  { label: "Beranda", path: "/", icon: Home },
  { label: "Kegiatan", path: "/kegiatan", icon: Calendar },
  { label: "Kas RW", path: "/keuangan", icon: Wallet },
  { label: "Kontak", path: "/kontak", icon: Users, cakupan: ["/profil", "/umkm", "/katalog", "/pengaduan"] },
];

export const isMenuAktif = (item: MenuItem, pathname: string) => {
  if (item.path === "/") return pathname === "/";
  return [item.path, ...(item.cakupan ?? [])].some((p) => pathname === p || pathname.startsWith(`${p}/`));
};
