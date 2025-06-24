import { Sidebar } from "@/components/admin/sidebar";
import Container from "@/components/container";
import { Toaster } from "@/components/ui/sonner";
import { getAllPrograms } from "@/data/program";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const programs = await getAllPrograms();
  return (
    <>
      <Sidebar programs={programs} />
      <Toaster />
      <Container>
        <div className="mx-auto h-screen overflow-y-auto">{children}</div>
      </Container>
    </>
  );
};

export default AdminLayout;
