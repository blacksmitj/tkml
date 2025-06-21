import {
  Applicant,
  Business,
  ApplicantDocument,
  Relative,
  Worker,
  SelectionTeam,
  TKMPGroup,
} from "@prisma/client";

export type FullApplicant = Applicant & {
  business: Business | null;
  document: ApplicantDocument | null;
  relatives: Relative[];
  worker: Worker | null;
  selectionTeam: SelectionTeam;
  group: TKMPGroup;
};
