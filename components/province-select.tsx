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
import { Loader2, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  programId: string;
  placeholder?: string;
  onSelect: (value: string) => void;
  value?: string;
}

export function ProvinceSelect({
  programId,
  placeholder = "Pilih provinsi...",
  onSelect,
  value,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (value && options.length > 0) {
      const matched = options.find((opt) => opt.value === value);
      if (matched) {
        setSelected(matched);
        return;
      }
    }
    if (!value) {
      setSelected(null);
    }
  }, [value, options]);

  // fetch semua provinsi sekali saat popover dibuka
  useEffect(() => {
    if (!open || options.length > 0) return;

    const fetchOptions = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/provinces?programId=${programId}`);
      const json = await res.json();

      const fetched = (json.provinces || [])
        .map((p: string) => ({ label: p, value: p }))
        .sort((a: Option, b: Option) => a.label.localeCompare(b.label));

      setOptions(fetched);
      setIsLoading(false);
    };

    fetchOptions();
  }, [open, programId, options.length]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected?.label ?? (isLoading ? "Memuat..." : placeholder)}
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
            placeholder="Cari provinsi..."
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
                  setSelected(option);
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
}
