import { createProgram } from "@/actions/programs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { YearPicker } from "@/components/ui/years-picker";
import { UploadProgramSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ProgramModal = ({ isOpen, onClose }: Props) => {
  const router = useRouter();

  const [progress, setProgress] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UploadProgramSchema>>({
    resolver: zodResolver(UploadProgramSchema),
    defaultValues: {
      name: "",
      year: undefined,
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UploadProgramSchema>) => {
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

    startTransition(() => {
      createProgram(values)
        .then((res) => {
          if (res.success) {
            setTimeout(() => {
              setProgress(100);
            }, 1500);

            onClose();
            router.refresh();
            toast.success("Program berhasil dibuat", {
              description: <p>{res.message}</p>,
            });
          } else {
            setProgress(0);
            toast.error(res.message, {
              description: (
                <p className="text-red-900">
                  {res.error || "Tambah program gagal."}
                </p>
              ),
            });
          }
        })
        .catch((err) => {
          setProgress(0);
          toast.error(err?.message, {
            description: (
              <p className="text-red-500">
                {err?.message || "Terjadi kesalahan saat mengunggah."}
              </p>
            ),
          });
        });
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (!isPending) {
          onClose();
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
          <DialogTitle>Create Program</DialogTitle>
          <DialogDescription>Create program in here!</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-8 my-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Program Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="year"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <YearPicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Program description "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <DialogFooter> */}
              <div className="flex gap-2">
                <Button
                  disabled={isPending}
                  type="submit"
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
              {/* </DialogFooter> */}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
