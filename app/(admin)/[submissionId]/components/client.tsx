"use client";

import Header from "./header";
import Business from "./business";
import { FullSubmission } from "@/types/full-submission";
import { Documents } from "./documents";
import {
  HiBackspace,
  HiLocationMarker,
  HiLogout,
  HiOfficeBuilding,
  HiPaperClip,
  HiPhone,
  HiUser,
} from "react-icons/hi";
import { useState } from "react";
import { ButtonTab } from "@/components/button-tab";
import Profile from "./profile";
import { Address } from "./address";
import { Contact } from "./contact";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

type Props = {
  submission: FullSubmission;
};

export const SubmissionClient = ({ submission }: Props) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="flex h-fit min-h-screen m-8 rounded-md bg-white border-2 border-secondary shadow-2xl/10 px-8">
      <div className="flex h-full fixed w-[200px] flex-col gap-2 pt-[130px]">
        <ButtonTab
          label="Profile"
          icon={HiUser}
          isActive={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <ButtonTab
          label="Contact"
          icon={HiPhone}
          isActive={activeTab === "contact"}
          onClick={() => setActiveTab("contact")}
        />
        <ButtonTab
          label="Alamat"
          icon={HiLocationMarker}
          isActive={activeTab === "address"}
          onClick={() => setActiveTab("address")}
        />
        <ButtonTab
          label="Business"
          icon={HiOfficeBuilding}
          isActive={activeTab === "business"}
          onClick={() => setActiveTab("business")}
        />
        <ButtonTab
          label="Documents"
          icon={HiPaperClip}
          isActive={activeTab === "documents"}
          onClick={() => setActiveTab("documents")}
        />
        <ButtonTab
          label="Back"
          icon={IoArrowBack}
          isActive={activeTab === "back"}
          onClick={() => router.back()}
        />
      </div>
      <div className="pl-[200px] w-full">
        <div className="flex flex-col gap-y-8 p-8">
          {/* Header */}
          <Header submission={submission} />
          {activeTab === "business" && (
            <Business business={submission.business} />
          )}
          {activeTab === "documents" && (
            <Documents documents={submission.documents} />
          )}
          {activeTab === "address" && (
            <Address
              applicant={submission.applicant}
              business={submission.business}
            />
          )}
          {activeTab === "profile" && (
            <Profile applicant={submission.applicant} />
          )}
          {activeTab === "contact" && (
            <Contact applicant={submission.applicant} />
          )}
        </div>
      </div>
    </div>
  );
};
