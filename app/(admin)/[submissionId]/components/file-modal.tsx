"use client";

import PDFViewer from "@/components/PDFViewer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isPDF } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface Props {
  title?: string;
  description?: string;
  fileUrl?: string | null;
  open: boolean;
  onClose: () => void;
}

export function FileModal({
  title,
  description,
  fileUrl,
  open,
  onClose,
}: Props) {
  if (!fileUrl) {
    return null;
  }

  const [origin, setOrigin] = useState("center center");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[50vw]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description && description}</DialogDescription>
        </DialogHeader>
        <div className="h-[60vh]">
          <div
            className="relative h-full overflow-hidden w-full"
            onMouseMove={handleMouseMove}
          >
            {isPDF(fileUrl) ? (
              <iframe
                src={fileUrl}
                title={title}
                width="100%"
                height="100%"
                style={{
                  transformOrigin: origin,
                }}
              />
            ) : (
              <Image
                alt={`Dokumen ${title}`}
                src={fileUrl}
                fill
                style={{
                  transformOrigin: origin,
                }}
                className="object-contain transition-transform duration-300 hover:scale-200"
                priority
              />
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
