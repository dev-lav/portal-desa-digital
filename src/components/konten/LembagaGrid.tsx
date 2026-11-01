import { lembagaList } from "@/data/konten";

export const LembagaGrid = () => (
  <div className="grid grid-cols-4 gap-2.5 md:grid-cols-[repeat(auto-fill,minmax(130px,1fr))] md:gap-4">
    {lembagaList.map((lembaga) => (
      <div key={lembaga.id} className="text-center text-xs font-semibold text-muted-foreground">
        <img
          src={lembaga.logo}
          alt={`Logo ${lembaga.nama}`}
          loading="lazy"
          className="mx-auto mb-1.5 aspect-square w-full md:max-w-[140px] rounded-full border border-border bg-white object-contain p-2"
        />
        {lembaga.nama}
      </div>
    ))}
  </div>
);
