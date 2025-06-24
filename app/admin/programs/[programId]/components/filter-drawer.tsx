"use client";

import { useEffect, useState } from "react";
import { CitySelect } from "@/components/admin/city-select";
import { ProvinceSelect } from "@/components/admin/province-select";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { SelectPopover } from "@/components/admin/select-popover";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  programId: string;
  onApply: (filters: {
    province?: string | null;
    city?: string | null;
  }) => void;
  initialProvince?: string | null;
  initialCity?: string | null;
}

export const FilterDrawer = ({
  isOpen,
  onClose,
  programId,
  onApply,
  initialProvince = "",
  initialCity = "",
}: Props) => {
  const [province, setProvince] = useState<string | null>(initialProvince);
  const [city, setCity] = useState<string | null>(initialCity);

  console.log({ province, city });

  // Reset saat drawer dibuka
  useEffect(() => {
    if (isOpen) {
      setProvince(initialProvince);
      setCity(initialCity);
    }
  }, [isOpen, initialProvince, initialCity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply({ province, city });
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="flex flex-col gap-6 p-4 justify-start">
        <DrawerHeader className="text-left">
          <DrawerTitle>Filter Search</DrawerTitle>
          <DrawerDescription>
            Filtering search, by province, city, etc.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="grid items-start gap-6">
          <div className="grid gap-3 w-full">
            <Label>Province</Label>
            <SelectPopover
              label="Provinsi"
              placeholder="Pilih provinsi..."
              fetchUrl={`/api/provinces?programId=${programId}`}
              value={province}
              onSelect={(value) => {
                setProvince(value);
                setCity("");
              }}
              disabled={false}
            />
          </div>

          <div className="grid gap-3">
            <Label>City</Label>
            <SelectPopover
              label="City"
              placeholder="Pilih kota..."
              fetchUrl={`/api/cities?programId=${programId}&province=${province}`}
              value={city}
              onSelect={(value) => setCity(value)}
              disabled={!province}
            />
          </div>

          <Button type="submit">Save changes</Button>
        </form>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
