import { lembagaList } from "@/data/mockData";

export const LembagaGrid = () => (
  <div className="grid grid-cols-4 gap-2.5 md:grid-cols-[repeat(4,120px)]">
    {lembagaList.map((lembaga) => (
      <div key={lembaga.id} className="text-center text-xs font-semibold text-muted-foreground">
        <img
          src={lembaga.logo}
          alt={`Logo ${lembaga.nama}`}
          loading="lazy"
          className="mb-1.5 aspect-square w-full rounded-full border border-border bg-white object-contain p-2"
        />
        {lembaga.nama}
      </div>
    ))}
  </div>
);
