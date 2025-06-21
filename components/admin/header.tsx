type Props = {
  title: string;
  subtitle: string;
};

export const Header = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-xs">{subtitle}</p>
    </div>
  );
};
