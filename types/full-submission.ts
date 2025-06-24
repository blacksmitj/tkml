import {
  Business,
  Worker,
  TKMPGroup,
  Document,
  Submission,
  Assessment,
  Applicant,
  User,
} from "@prisma/client";

export type FullSubmission = Submission & {
  applicant: Applicant;
  business: Business | null;
  documents: Document[];
  workers: Worker[];
  reviewer: User | null;
  mentor: User | null;
  group: TKMPGroup | null;
  assessments: Assessment[];
};
