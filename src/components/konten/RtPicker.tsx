import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { dataRT, waLink } from "@/data/konten";
import { padRT } from "@/lib/format";
import { cn } from "@/lib/utils";

// Kontak dianggap valid kalau berisi nomor telepon (bukan "-" atau kosong)
const punyaNomor = (kontak: string) => kontak.replace(/\D/g, "").length >= 9;

export const RtPicker = ({ awal = 1 }: { awal?: number }) => {
  const [dipilih, setDipilih] = useState(awal);
  const rt = dataRT.find((r) => r.nomor === dipilih) ?? dataRT[0];

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Pilih RT">
        {dataRT.map((r) => (
          <button
            key={r.nomor}
            role="tab"
            aria-selected={r.nomor === dipilih}
            onClick={(e) => {
              setDipilih(r.nomor);
              e.currentTarget.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
            }}
            className={cn(
              "h-12 min-w-[56px] flex-shrink-0 rounded-xl border border-border bg-card px-3 font-bold text-muted-foreground",
              r.nomor === dipilih && "border-primary bg-primary text-primary-foreground",
            )}
          >
            RT {r.nomor}
          </button>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-3.5 rounded-2xl border border-border bg-card p-3.5">
        {rt.foto ? (
          <img src={rt.foto} alt={`Logo RT ${padRT(rt.nomor)}`} className="h-[72px] w-[72px] flex-shrink-0 rounded-full border border-border bg-white object-contain p-1" />
        ) : (
          <div className="flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-full bg-secondary text-2xl font-extrabold text-primary">
            {padRT(rt.nomor)}
          </div>
        )}
        <div className="min-w-0">
          <small className="text-sm text-muted-foreground">Ketua RT {padRT(rt.nomor)}</small>
          <h3 className="font-bold leading-tight">{rt.ketua}</h3>
          {punyaNomor(rt.kontak) ? (
            <a
              href={waLink(`Halo ${rt.ketua}, saya warga RT ${padRT(rt.nomor)}`, rt.kontak)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-sm font-bold text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              Chat via WA
            </a>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">Nomor belum tersedia. Hubungi lewat pengurus RW.</p>
          )}
        </div>
      </div>
    </div>
  );
};
