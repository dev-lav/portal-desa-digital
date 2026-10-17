import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
}

export const StatCard = ({ icon: Icon, label, value, description }: StatCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-3 sm:p-6">
        <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <p className="order-2 sm:order-1 text-xs sm:text-sm text-muted-foreground sm:mb-1">{label}</p>
            <p className="order-1 sm:order-2 text-xl sm:text-2xl font-bold text-foreground">{value}</p>
            {description && <p className="hidden sm:block text-xs text-muted-foreground mt-1">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
