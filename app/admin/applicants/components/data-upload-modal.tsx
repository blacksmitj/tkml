import { useCallback, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";

import * as XLSX from "xlsx";
import { expectedHeaders } from "@/lib/expected-headers";
import { Progress } from "@/components/ui/progress";
import { uploadDataRows } from "@/actions/upload-data-rows";
import { ApplicantUploadRow } from "@/types/applicant-upload";
import { UploadStatus } from "@/types/upload-status";
import { uploadStatusMessage } from "@/lib/upload-status-message";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DataUploadModal = ({ isOpen, onClose }: Props) => {
  const [progress, setProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [matchHeader, setMatchHeader] = useState(0);
  const [dataRows, setDataRows] = useState<ApplicantUploadRow[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((files: any) => {
      if (!files || files.length === 0) {
        setUploadStatus("invalid");
        return;
      }

      const droppedFile = files[0];

      // Validasi tipe MIME dan ekstensi file
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
      ];
      const validExtensions = [".xlsx", ".xls"];
      const isValidType = validTypes.includes(droppedFile.type);
      const isValidExt = validExtensions.some((ext) =>
        droppedFile.name.endsWith(ext)
      );

      if (!isValidType && !isValidExt) {
        setUploadStatus("invalid");
        return;
      }

      setFileName(droppedFile.name);
      setUploadStatus("loading");
      setProgress(10);

      const reader = new FileReader();
      reader.onload = (event) => {
        setProgress(40);
        startTransition(() => {
          try {
            const binaryStr = event.target?.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            setProgress(70);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet, {
              header: 1,
            }) as string[][];

            const fileHeaders =
              jsonData[0]?.map((h) => String(h).trim().toLowerCase()) ?? [];

            const matchedHeaders = expectedHeaders.filter((h) =>
              fileHeaders.includes(h)
            );

            setMatchHeader(matchedHeaders.length);

            setProgress(90);

            if (matchedHeaders.length === 0) {
              setUploadStatus("headerInvalid");
              return;
            }

            // jika valid, lanjut proses
            const dataRows = XLSX.utils.sheet_to_json<ApplicantUploadRow>(
              sheet,
              { raw: false }
            );
            setProgress(100);
            setDataRows(dataRows);
            setUploadStatus("success");
          } catch (err) {
            console.error("Gagal parsing:", err);
            setUploadStatus("error");
          }
        });
      };

      reader.onerror = () => {
        setUploadStatus("error");
      };

      reader.readAsBinaryString(droppedFile);
    }, []),
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
    disabled: isPending,
  });

  const resetForm = () => {
    setFileName("");
    setDataRows([]);
    setProgress(0);
    setUploadStatus("idle");
  };

  const onSubmit = () => {
    if (dataRows.length === 0) {
      return;
    }
    setUploadStatus("loading");
    setProgress(10);

    let fakeProgress = 10;

    const interval = setInterval(() => {
      fakeProgress += 10;
      if (fakeProgress >= 90) {
        clearInterval(interval); // Stop di 90
      } else {
        setProgress(fakeProgress);
      }
    }, 1000); // 1 detik sekali naik 10%

    const plainRows = JSON.parse(JSON.stringify(dataRows));
    startTransition(() => {
      uploadDataRows(plainRows)
        .then((res) => {
          if (res.success) {
            setTimeout(() => {
              setProgress(100);
            }, 1500);
            setUploadStatus("success");
            toast.success(
              `${res.inserted} data berhasil, ${res.skipped} duplikat di-skip.`
            );

            resetForm();
            onClose();
          } else {
            setProgress(0);
            setUploadStatus("error");
            toast.error(res.message || "Upload gagal.");
            console.log(res.error);
          }
        })
        .catch((err) => {
          setProgress(0);
          setUploadStatus("error");
          toast.error(err?.message || "Terjadi kesalahan saat mengunggah.");
        });
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (!isPending) {
          onClose(); // hanya tutup jika tidak sedang upload
        }
      }}
    >
      <DialogContent
        onEscapeKeyDown={(e) => {
          if (isPending) e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          if (isPending) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Upload Data</DialogTitle>
          <DialogDescription>Upload data excel in here!</DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={cn(
            "border-dashed border-2 p-10 rounded-2xl flex flex-col gap-2 items-center justify-center cursor-pointer",
            isPending && "opacity-50 cursor-progress"
          )}
        >
          <Input {...getInputProps()} type="file" className="hidden" />
          {!fileName &&
            (isDragActive ? (
              <p className="text-muted-foreground">Got here!</p>
            ) : (
              <p className="text-muted-foreground">
                Grab your Excel file here!
              </p>
            ))}

          <div className="flex flex-col gap-2">
            {fileName && (
              <p className="mt-2 text-sm font-medium text-blue-700">
                📄 File: {fileName}
              </p>
            )}

            {uploadStatus === "loading" && <Progress value={progress} />}

            {uploadStatusMessage[uploadStatus].text && (
              <p
                className={`${uploadStatusMessage[uploadStatus].color} text-sm`}
              >
                {uploadStatusMessage[uploadStatus].text}
              </p>
            )}

            {uploadStatus === "success" && (
              <p className="mt-2 text-sm font-medium text-blue-700">
                👌 Header valid: {matchHeader}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <Button
              disabled={isPending || uploadStatus !== "success"}
              onClick={onSubmit}
              className="cursor-pointer"
            >
              Upload
            </Button>
            <Button
              disabled={isPending}
              variant={"secondary"}
              onClick={onClose}
              className="cursor-pointer"
            >
              Back
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
