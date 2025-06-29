interface CircleChartProps {
  value: number;
  total: number;
}

export default function CircleChart({ value, total }: CircleChartProps) {
  const percent = (value / total) * 100;

  const bg = `conic-gradient(oklch(75% 0.183 55.934) ${percent}%, #e5e7eb ${percent}% 100%)`;

  return (
    <div className="rounded-md border aspect-square items-center justify-center flex ">
      <div className="flex flex-col items-center gap-6">
        <div
          className="relative w-32 h-32 rounded-full"
          style={{ background: bg }}
        >
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-end font-bold">
            <span className="text-4xl">{value}</span>
            <span className="text-muted-foreground">/{total}</span>
          </div>
          <p>Menunggu untuk seleksi</p>
        </div>
      </div>
    </div>
  );
}
