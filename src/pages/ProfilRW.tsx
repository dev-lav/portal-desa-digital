import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { LembagaGrid } from "@/components/konten/LembagaGrid";
import { pengurusRW, dataRT, rwInfo, statistikPenduduk } from "@/data/konten";
import { padRT } from "@/lib/format";

const ProfilRW = () => {
  const identitas = [
    ["Desa", rwInfo.desa],
    ["Kecamatan", rwInfo.kecamatan.replace("Kecamatan ", "")],
    ["Kabupaten", rwInfo.kabupaten.replace("Kabupaten ", "")],
    ["Kepala keluarga", statistikPenduduk.totalKK.toLocaleString("id-ID")],
    ["Penduduk", `${statistikPenduduk.totalJiwa.toLocaleString("id-ID")} jiwa`],
    ["Jumlah RT", `${dataRT.length} RT`],
  ];

  return (
    <>
      <PageHeader title={`Profil RW ${rwInfo.nomor}`} subtitle={`${rwInfo.desa}, ${rwInfo.kecamatan}, ${rwInfo.kabupaten}.`} />

      <div className="container">
        <section className="mt-8">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {identitas.map(([label, nilai]) => (
              <div key={label} className="bg-card p-4">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="font-bold">{nilai}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-8">
          <SectionTitle title="Pengurus RW" />
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {pengurusRW.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-extrabold text-primary">
                  {p.nama.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">{p.jabatan}</p>
                  <p className="font-bold leading-snug">{p.nama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle title="Rukun Tetangga (RT)" href="/kontak" linkLabel="Hubungi →" />
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {dataRT.map((rt) => (
              <div key={rt.nomor} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-square bg-secondary">
                  {rt.foto ? (
                    <img src={rt.foto} alt={`Logo RT ${padRT(rt.nomor)}`} loading="lazy" className="h-full w-full bg-white object-contain p-3" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-extrabold text-primary/40">
                      {padRT(rt.nomor)}
                    </div>
                  )}
                  <span className="absolute left-2 top-2 rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-brand-foreground">
                    RT {padRT(rt.nomor)}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground">Ketua RT</p>
                  <p className="font-bold leading-snug">{rt.ketua}</p>
                  {/* Statistik per RT baru ditampilkan kalau datanya sudah diisi */}
                  {rt.jumlahKK > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {rt.jumlahKK} KK · {rt.jumlahJiwa} jiwa · {rt.jumlahLansia} lansia
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle title="Lembaga & komunitas" />
          <LembagaGrid />
        </section>
      </div>
    </>
  );
};

export default ProfilRW;
