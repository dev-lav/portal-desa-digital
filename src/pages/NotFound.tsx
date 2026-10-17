import { Link } from "react-router-dom";

const NotFound = () => {
  return (
  <div className="container py-20 text-center">
    <p className="text-6xl font-extrabold text-primary/30">404</p>
    <h1 className="mt-2 text-2xl font-extrabold">Halaman tidak ditemukan</h1>
    <p className="mt-1 text-muted-foreground">Mungkin tautannya salah atau halamannya sudah dipindah.</p>
    <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground">
      Kembali ke Beranda
    </Link>
  </div>
  );
};

export default NotFound;
