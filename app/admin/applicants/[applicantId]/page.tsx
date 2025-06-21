import { getApplicantById } from "@/data/applicants";
import { ApplicantClient } from "./components/client";

interface Props {
  params: {
    applicantId: string;
  };
}

const ApplicantPage = async ({ params }: Props) => {
  const { applicantId } = await params;

  if (!applicantId) {
    return <div>Applicant not found</div>;
  }
  const applicants = await getApplicantById(applicantId);

  if (applicants === null) {
    return <div>Applicant not found</div>;
  }

  return (
    <section>
      <ApplicantClient applicant={applicants} />
    </section>
  );
};

export default ApplicantPage;
