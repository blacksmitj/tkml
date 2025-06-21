import { Sidebar } from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <Sidebar />
      <Toaster />
      <main className="h-full pl-[256px]">
        <div className="mx-auto h-screen overflow-auto">
          <section className="p-10">{children}</section>
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
