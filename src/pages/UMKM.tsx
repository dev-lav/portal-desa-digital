import { useState } from "react";
import { Store } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { UmkmCard } from "@/components/konten/UmkmCard";
import { umkmList, waLink } from "@/data/konten";
import { cn } from "@/lib/utils";

const UMKM = () => {
  const [filter, setFilter] = useState("Semua");
  const kategori = ["Semua", ...Array.from(new Set(umkmList.map((u) => u.jenisUsaha)))];
  const daftar = filter === "Semua" ? umkmList : umkmList.filter((u) => u.jenisUsaha === filter);

  return (
    <>
      <PageHeader title="UMKM warga" subtitle="Belanja dan pakai jasa dari tetangga sendiri. Dukung usaha warga RW 12." />

      <div className="container">
        <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1">
          {kategori.map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={cn(
                "flex-shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-muted-foreground",
                filter === k && "border-primary bg-primary text-primary-foreground",
              )}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-2.5 md:grid-cols-2 lg:grid-cols-3">
          {daftar.map((u) => (
            <UmkmCard key={u.id} umkm={u} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl bg-secondary p-5 md:flex-row md:items-center">
          <Store className="h-8 w-8 flex-shrink-0 text-primary" />
          <div className="flex-1">
            <p className="font-bold">Punya usaha dan ingin ditampilkan di sini?</p>
            <p className="text-sm text-muted-foreground">Kirim nama usaha, jenis usaha, dan nomor WA ke pengurus.</p>
          </div>
          <a
            href={waLink("Halo, saya ingin mendaftarkan usaha saya di halaman UMKM RW 12")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Daftarkan usaha
          </a>
        </div>
      </div>
    </>
  );
};

export default UMKM;
