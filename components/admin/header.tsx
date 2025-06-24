type Props = {
  title: string;
  subtitle: string | null;
};

export const Header = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-xs">{subtitle}</p>}
    </div>
  );
};
