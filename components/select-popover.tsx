"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  placeholder?: string;
  fetchUrl: string;
  onSelect: (value: string) => void;
  value: string | null;
  disabled: boolean;
}

export const SelectPopover = ({
  label,
  placeholder = "Pilih...",
  fetchUrl,
  onSelect,
  value,
  disabled,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("value", { value });

  // Fetch options on open
  useEffect(() => {
    if (!open || options.length > 0) return;

    const fetchOptions = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(fetchUrl);
        const json = await res.json();

        const raw: string[] = Array.isArray(json.provinces)
          ? json.provinces
          : json.cities;

        const opts = raw
          .map((v) => ({ label: v, value: v }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setOptions(opts);
      } catch (err) {
        console.error("Failed to fetch options:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [open, fetchUrl, options.length]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
          disabled={disabled}
        >
          {(() => {
            if (value === null) return placeholder;

            const selectedOption = options.find((opt) => opt.value === value);
            if (selectedOption) return selectedOption.label;

            if (!selectedOption && value) return value;

            return isLoading ? "Memuat..." : placeholder;
          })()}
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="end">
        <Command>
          <CommandInput
            placeholder={`Cari ${label?.toLowerCase() ?? "data"}...`}
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>Tidak ditemukan</CommandEmpty>
            {filteredOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
