import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { menuUtama, isMenuAktif } from "./navigasi";

// Navigasi bawah ala aplikasi, hanya di HP/tablet
export const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid h-[var(--tinggi-nav-bawah)] grid-cols-4 items-center border-t border-border bg-card px-1 pb-[env(safe-area-inset-bottom)] lg:hidden">
      {menuUtama.map((item) => {
        const aktif = isMenuAktif(item, pathname);
        return (
          <Link
            key={item.path}
            to={item.path}
            aria-current={aktif ? "page" : undefined}
            className={cn(
              "flex flex-col items-center gap-0.5 py-1 text-xs font-semibold text-muted-foreground",
              aktif && "text-primary",
            )}
          >
            <span className={cn("rounded-full px-3.5 py-1", aktif && "bg-secondary")}>
              <item.icon className="h-5 w-5" />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
