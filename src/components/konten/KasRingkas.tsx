import { Link } from "react-router-dom";
import { LaporanKas } from "@/data/types";
import { formatJuta, formatRupiah } from "@/lib/format";

interface KasRingkasProps {
  laporan: LaporanKas;
  tautan?: boolean;
}

// Kartu saldo kas berlatar hijau tua
export const KasRingkas = ({ laporan, tautan = true }: KasRingkasProps) => (
  <div className="relative overflow-hidden rounded-2xl bg-brand p-5 text-brand-foreground">
    <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[22px] border-accent/20" />
    <small className="text-sm opacity-80">Saldo kas per akhir {laporan.bulan}</small>
    <div className="mb-4 mt-0.5 text-[2rem] font-extrabold tracking-tight">{formatRupiah(laporan.saldoAkhir)}</div>
    <div className="grid grid-cols-2 gap-2.5">
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
      <div className="mt-3.5 flex items-center justify-between text-sm">
        <span className="opacity-80">Saldo awal {formatJuta(laporan.saldoAwal)}</span>
        <Link to="/keuangan" className="font-bold text-accent hover:underline">
          Lihat rincian →
        </Link>
      </div>
    )}
  </div>
);
