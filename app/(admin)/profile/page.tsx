import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <div className="flex justify-between">
        <Header title="Profile" subtitle="Edit your profile" />
        <Button>
          <Save className="mr-1" />
          Save
        </Button>
      </div>
    </>
  );
};

export default ProfilePage;
