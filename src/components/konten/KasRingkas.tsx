import { Link } from "react-router-dom";
import { LaporanKas } from "@/data/types";
import { formatJuta, formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

interface KasRingkasProps {
  laporan: LaporanKas;
  tautan?: boolean;
  // Di layar lebar, saldo dan rincian berjajar satu baris (dipakai di Beranda)
  melebar?: boolean;
}

// Kartu saldo kas berlatar hijau tua
export const KasRingkas = ({ laporan, tautan = true, melebar = false }: KasRingkasProps) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-2xl bg-brand p-5 text-brand-foreground",
      melebar && "md:flex md:items-center md:gap-8 md:px-7",
    )}
  >
    <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[22px] border-accent/20" />
    <div className={cn(melebar && "md:flex-1")}>
      <small className="text-sm opacity-80">Saldo kas per akhir {laporan.bulan}</small>
      <div className={cn("mb-4 mt-0.5 text-[2rem] font-extrabold tracking-tight", melebar && "md:mb-0")}>{formatRupiah(laporan.saldoAkhir)}</div>
      {melebar && <span className="hidden text-sm opacity-80 md:block">Saldo awal {formatJuta(laporan.saldoAwal)}</span>}
    </div>
    <div className={cn("grid grid-cols-2 gap-2.5", melebar && "md:w-[340px]")}>
      <div className="rounded-xl bg-white/10 px-3 py-2.5">
        <small className="text-sm opacity-80">Pemasukan</small>
        <b className="block text-[#8fe0a9]">+ {formatJuta(laporan.pemasukan)}</b>
      </div>
      <div className="rounded-xl bg-white/10 px-3 py-2.5">
        <small className="text-sm opacity-80">Pengeluaran</small>
        <b className="block text-[#ffb3a8]">− {formatJuta(laporan.pengeluaran)}</b>
      </div>
    </div>
    {tautan && (
      <div className={cn("mt-3.5 flex items-center justify-between text-sm", melebar && "md:relative md:mt-0")}>
        <span className={cn("opacity-80", melebar && "md:hidden")}>Saldo awal {formatJuta(laporan.saldoAwal)}</span>
        <Link to="/keuangan" className="font-bold text-accent hover:underline">
          Lihat rincian →
        </Link>
      </div>
    )}
  </div>
);
