import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, MessageCircle, Star } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { UmkmCard } from "@/components/konten/UmkmCard";
import { slugUmkm, umkmList, waLink } from "@/data/konten";
import { padRT } from "@/lib/format";

const UmkmDetail = () => {
  const { slug } = useParams();
  const usaha = umkmList.find((u) => slugUmkm(u) === slug);

  if (!usaha) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-2 text-2xl font-extrabold">Usaha tidak ditemukan</h1>
        <p className="mb-6 text-muted-foreground">Mungkin tautannya salah atau usahanya sudah tidak ditampilkan.</p>
        <Link to="/umkm" className="font-bold text-primary hover:underline">
          ← Kembali ke UMKM warga
        </Link>
      </div>
    );
  }

  const rincian = [
    ["Jenis usaha", usaha.jenisUsaha],
    ["Pemilik", usaha.pemilik && usaha.pemilik !== "-" ? usaha.pemilik : ""],
    ["RT", usaha.rt > 0 ? `RT ${padRT(usaha.rt)}` : ""],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  // Usaha sejenis didahulukan
  const lainnya = umkmList
    .filter((u) => u.id !== usaha.id)
    .sort((a, b) => Number(b.jenisUsaha === usaha.jenisUsaha) - Number(a.jenisUsaha === usaha.jenisUsaha))
    .slice(0, 3);

  return (
    <div className="container max-w-3xl pb-10">
      <Link to="/umkm" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        UMKM warga
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-[#8a6a00]">
          {usaha.jenisUsaha}
        </span>
        {typeof usaha.rating === "number" && (
          <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            {usaha.rating.toFixed(1)} di Google Maps
          </span>
        )}
      </div>

      <h1 className="mt-2 text-2xl font-extrabold leading-snug md:text-3xl">{usaha.namaUsaha}</h1>
      {usaha.deskripsi && <p className="mt-2 leading-relaxed text-muted-foreground">{usaha.deskripsi}</p>}

      <div className="mt-5 flex flex-wrap gap-2">
        {usaha.nomorWA && (
          <a
            href={waLink(`Halo ${usaha.namaUsaha}, saya lihat usaha Anda di portal RW 12 Desa Ngijo. Saya ingin bertanya`, usaha.nomorWA)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white hover:bg-[#1ebe5b]"
          >
            <MessageCircle className="h-5 w-5" />
            Chat via WhatsApp
          </a>
        )}
        {usaha.gmapsUrl && (
          <a
            href={usaha.gmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-bold text-foreground hover:bg-secondary"
          >
            <MapPin className="h-5 w-5 text-red-500" />
            Buka di Google Maps
          </a>
        )}
      </div>

      <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card text-sm">
        {rincian.map(([label, nilai]) => (
          <div key={label} className="flex gap-4 px-4 py-2.5">
            <dt className="w-28 flex-shrink-0 text-muted-foreground">{label}</dt>
            <dd className="font-semibold">{nilai}</dd>
          </div>
        ))}
        {usaha.alamat && (
          <div className="flex gap-4 px-4 py-2.5">
            <dt className="w-28 flex-shrink-0 text-muted-foreground">Alamat</dt>
            <dd className="font-semibold">{usaha.alamat}</dd>
          </div>
        )}
        {usaha.jamBuka && (
          <div className="flex gap-4 px-4 py-2.5">
            <dt className="flex w-28 flex-shrink-0 items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Jam buka
            </dt>
            <dd className="font-semibold">{usaha.jamBuka}</dd>
          </div>
        )}
      </dl>

      {usaha.lat != null && usaha.lng != null && (
        <iframe
          title={`Peta lokasi ${usaha.namaUsaha}`}
          src={`https://maps.google.com/maps?q=${usaha.lat},${usaha.lng}&z=17&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-6 h-64 w-full rounded-2xl border border-border"
        />
      )}

      <section className="mt-10">
        <SectionTitle title="UMKM warga lainnya" href="/umkm" />
        <div className="grid gap-2.5 md:grid-cols-3">
          {lainnya.map((u) => (
            <UmkmCard key={u.id} umkm={u} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default UmkmDetail;
