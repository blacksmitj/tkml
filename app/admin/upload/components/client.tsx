"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { YearPicker } from "@/components/ui/years-picker";
import { UploadProgramSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UploadClient = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof UploadProgramSchema>>({
    resolver: zodResolver(UploadProgramSchema),
    defaultValues: {
      name: "",
      year: 0,
    },
  });
  return (
    <div>
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-8 w-[400px]">
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
              </FormItem>
            )}
          />
          <FormField
            name="year"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Year</FormLabel>
                <FormControl>
                  <YearPicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default UploadClient;
