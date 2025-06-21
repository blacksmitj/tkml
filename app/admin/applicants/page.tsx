import { Header } from "@/components/admin/header";
import { ApplicantsClient } from "./components/client";
import { ButtonUploadExcel } from "./components/button-upload";

const ApplicantsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Header title="Applicants" subtitle="All Applicants TKML" />
        <ButtonUploadExcel />
      </div>
      <ApplicantsClient />
    </div>
  );
};

export default ApplicantsPage;
