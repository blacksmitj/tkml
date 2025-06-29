import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

type Props = {
  number: number;
  label: string;
  icon: IconType;
  variant: "danger" | "success";
};

export const InfoChart = ({ number, label, icon: Icon, variant }: Props) => {
  return (
    <div className="w-full rounded-md border flex items-center px-10 py-4">
      <Icon
        className={cn(
          "h-10 w-10 mr-10",
          variant === "danger" && "text-rose-700",
          variant === "success" && "text-orange-400"
        )}
      />
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-bold">{number}</span>
        <p>{label}</p>
      </div>
    </div>
  );
};
