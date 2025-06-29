"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  fileUrl: string | null;
}

export default function PDFViewer({ fileUrl }: Props) {
  if (!fileUrl) {
    return null;
  }
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      <Document
        file={`/api/pdf?url=${encodeURIComponent(fileUrl!)}`}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={index} pageNumber={index + 1} width={800} />
        ))}
      </Document>
    </div>
  );
}
