import { Icon, LucideIcon, UserRound } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  description: string;
  number: number;
  icon: LucideIcon;
  unit: string;
};

export const TodayItem = ({ description, number, icon: Icon, unit }: Props) => {
  return (
    <div className="flex-1 flex gap-2 bg-white shadow rounded-2xl p-4 border items-center">
      <Icon className="size-10 text-orange-400" />
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">
          {number} {unit}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
