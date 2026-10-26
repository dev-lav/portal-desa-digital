import { Link } from "react-router-dom";
import { rwInfo } from "@/data/mockData";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="container py-8 text-sm text-muted-foreground">
        <p className="font-bold text-foreground">
          RW {rwInfo.nomor} {rwInfo.desa}
        </p>
        <p>
          {rwInfo.alamatPosko} · {rwInfo.jamLayanan}
        </p>
        <p>
          {rwInfo.kecamatan}, {rwInfo.kabupaten}, Jawa Timur
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 font-semibold text-primary">
          <Link to="/profil" className="hover:underline">Profil & pengurus</Link>
          <Link to="/pengaduan" className="hover:underline">Sampaikan aduan</Link>
          <Link to="/umkm" className="hover:underline">UMKM warga</Link>
          <Link to="/katalog" className="hover:underline">Katalog barang</Link>
          <Link to="/kebijakan-privasi" className="hover:underline">Kebijakan privasi</Link>
        </div>
        <p className="mt-6 text-xs">© {new Date().getFullYear()} RW {rwInfo.nomor} {rwInfo.desa}</p>
      </div>
    </footer>
  );
};
