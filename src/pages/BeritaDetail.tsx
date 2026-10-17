import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { BeritaCard } from "@/components/konten/BeritaCard";
import { beritaList } from "@/data/mockData";
import { formatTanggal } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useJudulHalaman } from "@/hooks/use-judul-halaman";

const BeritaDetail = () => {
  const { id } = useParams();
  const berita = beritaList.find((b) => b.id === id);
  useJudulHalaman(berita?.judul ?? "Berita tidak ditemukan");

  if (!berita) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-2 text-2xl font-extrabold">Berita tidak ditemukan</h1>
        <p className="mb-6 text-muted-foreground">Mungkin tautannya salah atau beritanya sudah dihapus.</p>
        <Link to="/kegiatan" className="font-bold text-primary hover:underline">
          ← Kembali ke Kegiatan
        </Link>
      </div>
    );
  }

  const lainnya = [...beritaList]
    .filter((b) => b.id !== berita.id)
    .sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime())
    .slice(0, 4);

  // Pakai window.location agar tautan tetap benar di domain mana pun
  const tautan = window.location.href;
  const pesanWA = `${berita.judul}\n\n${berita.ringkasan.trim()}\n\nSelengkapnya: ${tautan}`;

  return (
    <article className="container max-w-3xl">
      <Link to="/kegiatan" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Kegiatan
      </Link>

      <p className="mt-4 text-sm text-muted-foreground">{formatTanggal(berita.tanggal, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
      <h1 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">{berita.judul}</h1>

      {berita.video ? (
        <div className="mt-5 overflow-hidden rounded-2xl bg-black">
          {/* playsInline: di iPhone video diputar di halaman, tidak langsung layar penuh */}
          <video
            src={berita.video.src}
            poster={berita.gambar}
            controls
            playsInline
            preload="metadata"
            className="mx-auto max-h-[75svh] w-full object-contain"
          >
            Browser Anda tidak mendukung pemutar video.{" "}
            <a href={berita.video.src} className="underline">
              Unduh videonya
            </a>
            .
          </video>
        </div>
      ) : (
        berita.gambar && (
          <img src={berita.gambar} alt={berita.judul} className="mt-5 w-full rounded-2xl border border-border object-cover" />
        )
      )}

      {berita.galeri && berita.galeri.length > 0 && (
        <div className={cn("mt-2.5 grid gap-2.5", berita.galeri.length > 1 && "grid-cols-2")}>
          {berita.galeri.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${berita.judul} (foto ${i + 2})`}
              loading="lazy"
              className={cn("w-full rounded-2xl border border-border object-cover", berita.galeri.length > 1 && "aspect-[4/3]")}
            />
          ))}
        </div>
      )}

      <p className="mt-5 text-lg leading-relaxed">{berita.ringkasan.trim()}</p>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(pesanWA)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white hover:bg-[#1ebe5b]"
      >
        <Share2 className="h-5 w-5" />
        Bagikan ke WhatsApp
      </a>

      {lainnya.length > 0 && (
        <section className="mt-12">
          <SectionTitle title="Dokumentasi lainnya" href="/kegiatan" />
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {lainnya.map((b) => (
              <BeritaCard key={b.id} berita={b} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default BeritaDetail;
