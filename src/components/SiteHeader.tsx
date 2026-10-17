import { Link, useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import logoImg from "@/images/logo.jpeg";
import { rwInfo, waLink } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { menuUtama, isMenuAktif } from "./navigasi";

export const SiteHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container flex h-[var(--tinggi-header)] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoImg} alt="Logo RW 12" className="h-10 w-10 rounded-full" />
          <div className="leading-tight">
            <div className="font-bold">RW {rwInfo.nomor}</div>
            <div className="whitespace-nowrap text-xs text-muted-foreground">
              {rwInfo.desa}
              <span className="hidden sm:inline"> · Karangploso</span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {menuUtama.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground",
                isMenuAktif(item, pathname) && "bg-secondary text-primary hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <MessageCircle className="h-4 w-4" />
          Chat RW
        </a>
      </div>
    </header>
  );
};
