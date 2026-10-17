import { ReactNode } from "react";
import { useJudulHalaman } from "@/hooks/use-judul-halaman";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

// Kepala halaman hijau tua, senada dengan hero beranda
export const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  useJudulHalaman(title);
  return (
    <div className="relative overflow-hidden bg-brand text-brand-foreground">
      <span className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 animate-putar rounded-full border-[24px] border-dashed border-success/25 motion-reduce:animate-none" />
      <div className="container relative py-8 md:py-12">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl opacity-85">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};
