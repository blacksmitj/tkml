import { valueFormat } from "@/lib/utils";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  title?: string;
  description?: string;
};

export const HeaderPoint = ({
  icon: Icon,
  title = "Business",
  description,
}: Props) => {
  return (
    <div className="flex gap-4 items-center">
      <Icon className="w-10 h-10 text-primary-500" />
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold capitalize">{valueFormat(title)}</h2>
        <span className="capitalize text-muted-foreground">
          {description && valueFormat(description)}
        </span>
      </div>
    </div>
  );
};
