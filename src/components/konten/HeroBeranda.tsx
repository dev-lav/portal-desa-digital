import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Megaphone } from "lucide-react";
import { fotoHero, pengumuman, rwInfo } from "@/data/mockData";
import { formatTanggal } from "@/lib/format";
import { cn } from "@/lib/utils";

const sapaan = () => {
  const jam = new Date().getHours();
  if (jam < 11) return "Selamat pagi";
  if (jam < 15) return "Selamat siang";
  if (jam < 18) return "Selamat sore";
  return "Selamat malam";
};

const KolaseFoto = () => {
  const [ke, setKe] = useState(0);
  const [caption, setCaption] = useState(fotoHero.utama[0].caption);
  const [kanan, bawah] = fotoHero.samping;

  useEffect(() => {
    if (fotoHero.utama.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setKe((i) => (i + 1) % fotoHero.utama.length), 4000);
    return () => clearInterval(id);
  }, []);

  // Caption diganti di tengah transisi agar sinkron dengan foto
  useEffect(() => {
    const id = setTimeout(() => setCaption(fotoHero.utama[ke].caption), 400);
    return () => clearTimeout(id);
  }, [ke]);

  return (
    <div className="relative min-h-[200px] w-full flex-1 max-h-[min(440px,115vw)] md:h-[400px] md:max-h-none md:flex-none" aria-label="Foto kegiatan warga">
      <figure className="polaroid right-0 top-0 z-[1] h-[52%] w-[42%] rotate-6 md:h-[190px]">
        <img src={kanan.src} alt={kanan.caption} className="h-full w-full rounded-sm object-cover" />
        <figcaption>{kanan.caption}</figcaption>
      </figure>

      <figure className="polaroid left-[4%] top-[6%] z-[2] h-[73%] w-[66%] -rotate-3 md:top-3.5 md:h-[290px]">
        <div className="relative h-full w-full">
          {fotoHero.utama.map((foto, i) => (
            <img
              key={foto.src}
              src={foto.src}
              alt={i === ke ? foto.caption : ""}
              className={cn(
                "absolute inset-0 h-full w-full rounded-sm object-cover transition-opacity duration-700",
                i === ke ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
        <figcaption>{caption}</figcaption>
      </figure>

      <figure className="polaroid bottom-0 right-0 z-[3] h-[48%] w-[40%] rotate-[4deg] md:h-[180px]">
        <img src={bawah.src} alt={bawah.caption} className="h-full w-full rounded-sm object-cover" />
        <figcaption>{bawah.caption}</figcaption>
      </figure>

      <div className="absolute bottom-2 left-0 z-[4] -rotate-6 rounded-full bg-destructive px-3 py-2 text-sm font-extrabold text-destructive-foreground shadow-lg md:bottom-5">
        🇮🇩 Semarak warga
      </div>
    </div>
  );
};

export const HeroBeranda = () => (
  <section className="relative flex flex-col overflow-hidden bg-brand pb-3 pt-4 text-brand-foreground max-md:hero-layar-penuh md:pb-16 md:pt-6">
    {/* Motif lingkaran warga dari logo */}
    <span className="pointer-events-none absolute -right-[170px] -top-[150px] h-[420px] w-[420px] animate-putar rounded-full border-[34px] border-dashed border-success/30 motion-reduce:animate-none" />
    <span className="pointer-events-none absolute -bottom-[90px] -left-[110px] h-[220px] w-[220px] rounded-full border-[18px] border-accent/15" />
    <span className="pointer-events-none absolute right-7 top-7 h-2.5 w-2.5 rounded-full bg-destructive" />

    <div className="container relative flex flex-1 flex-col">
      {pengumuman && (
        <Link
          to="/kegiatan"
          className="mb-3.5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-3 text-sm md:mb-8"
        >
          <span className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-destructive">
            <Megaphone className="h-3.5 w-3.5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-denyut rounded-full border-2 border-brand bg-accent motion-reduce:animate-none" />
          </span>
          <span className="min-w-0 flex-1 truncate">
            <b>{pengumuman.judul}</b>{" "}
            <span className="opacity-75">· {formatTanggal(pengumuman.tanggal, { weekday: "short", day: "numeric", month: "short" })}</span>
          </span>
          <ChevronRight className="h-4 w-4 flex-shrink-0 opacity-70" />
        </Link>
      )}

      <div className="flex flex-1 flex-col gap-3.5 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-accent">
            <span className="h-2 w-2 rounded-full bg-[#5ee08a] shadow-[0_0_0_4px_rgba(94,224,138,0.25)]" />
            {sapaan()}, warga RW {rwInfo.nomor}
          </p>
          <h1 className="text-[1.85rem] font-extrabold leading-[1.1] tracking-tight md:text-[3.2rem]">
            Guyub, rukun,
            <br />
            <em className="inline-block -rotate-2 rounded-lg bg-accent px-2 not-italic text-accent-foreground">bareng-bareng</em>
            <br />
            jaga lingkungan.
          </h1>
          <p className="mt-3 hidden max-w-[34ch] opacity-85 md:block md:text-lg">
            Kabar, kegiatan, dan laporan kas RW {rwInfo.nomor} {rwInfo.desa}. Semuanya ada di sini.
          </p>
          <p className="mt-4 hidden text-sm opacity-65 md:block">
            {formatTanggal(new Date(), { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-center md:block">
          <KolaseFoto />
        </div>
      </div>

      <div className="flex justify-center pt-2 md:hidden" aria-hidden>
        <ChevronDown className="h-6 w-6 animate-bounce opacity-60 motion-reduce:animate-none" />
      </div>
    </div>
  </section>
);
