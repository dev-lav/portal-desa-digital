export const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

// Rp16.166.000 -> "Rp16,17 jt"
export const formatJuta = (amount: number) =>
  `Rp${(amount / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 2 })} jt`;

// 750000 -> "Rp750 rb", 1500000 -> "Rp1,5 jt" (untuk ruang sempit seperti kartu)
export const formatRupiahRingkas = (amount: number) =>
  amount >= 1_000_000
    ? `Rp${(amount / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`
    : amount >= 1_000
      ? `Rp${(amount / 1_000).toLocaleString("id-ID", { maximumFractionDigits: 0 })} rb`
      : formatRupiah(amount);

export const formatTanggal = (date: Date, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) =>
  date.toLocaleDateString("id-ID", options);

export const padRT = (nomor: number) => String(nomor).padStart(2, "0");

export const awalHariIni = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
