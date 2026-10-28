import { Kegiatan, KegiatanRutin } from "@/data/types";

const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const awalHari = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const selisihHari = (dari: Date, ke: Date) => Math.round((awalHari(ke).getTime() - awalHari(dari).getTime()) / 86_400_000);

const samaHari = (a: Date, b: Date) => selisihHari(a, b) === 0;

export const keteranganUlang = ({ pola }: KegiatanRutin) =>
  pola.jenis === "mingguan" ? `Setiap ${pola.hari.map((h) => namaHari[h]).join(" & ")}` : pola.keterangan;

const kodeHari = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export const tanggalIcs = (d: Date) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;

// Aturan ulang format iCalendar, dipakai Google Calendar dan file .ics
const rruleDari = ({ pola, sampai }: KegiatanRutin) =>
  (pola.jenis === "mingguan"
    ? `FREQ=WEEKLY;BYDAY=${pola.hari.map((h) => kodeHari[h]).join(",")}`
    : `FREQ=DAILY;INTERVAL=${pola.tiapHari}`) + `;UNTIL=${tanggalIcs(sampai)}T235959Z`;

// "Hari ini", "Besok", "4 hari lagi"
export const jarakHari = (tanggal: Date, hariIni: Date) => {
  const n = selisihHari(hariIni, tanggal);
  return n <= 0 ? "Hari ini" : n === 1 ? "Besok" : `${n} hari lagi`;
};

// Semua tanggal kegiatan rutin mulai `dari` (termasuk hari itu) sampai `batas` atau tanggal `sampai`-nya
const jadwalDalam = (rutin: KegiatanRutin, dari: Date, batas: Date, maks = Infinity): Date[] => {
  const mulai = awalHari(rutin.mulai);
  const akhir = awalHari(batas < rutin.sampai ? batas : rutin.sampai);
  const hasil: Date[] = [];
  for (let d = awalHari(dari > mulai ? dari : mulai); d <= akhir && hasil.length < maks; d.setDate(d.getDate() + 1)) {
    const cocok =
      rutin.pola.jenis === "mingguan"
        ? rutin.pola.hari.includes(d.getDay())
        : selisihHari(mulai, d) % rutin.pola.tiapHari === 0;
    if (cocok && !rutin.libur?.some((l) => samaHari(l, d))) hasil.push(new Date(d));
  }
  return hasil;
};

export const jadwalBerikutnya = (rutin: KegiatanRutin, dari: Date): Date | null =>
  jadwalDalam(rutin, dari, rutin.sampai, 1)[0] ?? null;

// Kegiatan sekali jalan yang belum lewat + jadwal kegiatan rutin, urut tanggal.
// Tanpa `hariKeDepan` cuma jadwal terdekat tiap kegiatan rutin; dengan `hariKeDepan` semua jadwal dalam rentang itu.
export const agendaMendatang = (
  kegiatan: Kegiatan[],
  rutin: KegiatanRutin[],
  hariIni: Date,
  hariKeDepan?: number,
): Kegiatan[] => {
  const batas = new Date(hariIni);
  batas.setDate(batas.getDate() + (hariKeDepan ?? 0));
  const dariRutin = rutin.flatMap((r) => {
    const tanggal = hariKeDepan === undefined ? jadwalDalam(r, hariIni, r.sampai, 1) : jadwalDalam(r, hariIni, batas);
    const { pola, mulai, sampai, libur, ...isi } = r;
    const tambahan = { ulang: keteranganUlang(r), aturan: { rrule: rruleDari(r), libur: libur ?? [] } };
    return tanggal.map((t) => ({ ...isi, ...tambahan, tanggal: t }));
  });
  return [...kegiatan.filter((k) => k.tanggal >= hariIni), ...dariRutin].sort(
    (a, b) => a.tanggal.getTime() - b.tanggal.getTime(),
  );
};
