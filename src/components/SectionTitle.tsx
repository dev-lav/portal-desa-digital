import { Link } from "react-router-dom";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}

export const SectionTitle = ({ title, subtitle, href, linkLabel = "Semua →" }: SectionTitleProps) => {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-3">
      <div>
        <h2 className="text-xl font-extrabold md:text-2xl">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {href && (
        <Link to={href} className="whitespace-nowrap text-sm font-bold text-primary hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
};
