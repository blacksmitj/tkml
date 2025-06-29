import { valueFormat } from "@/lib/utils";

interface Props {
  title: string;
  value: string | number | null;
}

export const Item = ({ title, value }: Props) => {
  return (
    <li className="flex flex-col">
      <span className="text-muted-foreground/50">{valueFormat(title)}</span>
      {valueFormat(value)}
    </li>
  );
};
