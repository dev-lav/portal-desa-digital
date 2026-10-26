import { useQuery } from "@tanstack/react-query";
import { ambilKatalog } from "@/data/katalog";

// Sheet hasil "Publikasikan ke web" di-cache Google ±5 menit, jadi tidak perlu diambil lebih sering
export const useKatalog = (aktif = true) =>
  useQuery({ queryKey: ["katalog"], queryFn: ambilKatalog, staleTime: 5 * 60_000, enabled: aktif });
