"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface YearPickerProps {
  value: number;
  onChange: () => void;
  disabled: boolean;
}

export const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  console.log({ value });
  console.log({ years });
  console.log({ onChange });

  return (
    <Select
      disabled={disabled}
      value={value.toString()}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => {
          return (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
