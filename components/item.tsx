import { valueFormat } from "@/lib/utils";

interface Props {
  title: string;
  value: string | number | null;
}

export const Item = ({ title, value }: Props) => {
  return (
    <li className="flex flex-col">
      <span className="text-muted-foreground/60">{valueFormat(title)}</span>
      <span className="font-semibold">{valueFormat(value)}</span>
    </li>
  );
};
