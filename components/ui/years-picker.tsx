"use client";

import { parse } from "path";
import { FormControl } from "./form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

interface YearPickerProps {
  value: number;
  onChange: (year: number) => void;
  disabled: boolean;
}

export const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <Select
      disabled={disabled}
      value={value !== undefined ? value.toString() : ""}
      onValueChange={(val) => onChange(parseInt(val))}
    >
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
      </FormControl>
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
