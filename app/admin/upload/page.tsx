import { Header } from "@/components/admin/header";
import { Form } from "@/components/ui/form";
import UploadClient from "./components/client";

const UploadPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Header title="Applicants Upload" subtitle="Upload All Applicants" />
      </div>
      <UploadClient />
    </div>
  );
};

export default UploadPage;
