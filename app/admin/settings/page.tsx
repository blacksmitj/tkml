import { Header } from "@/components/admin/header";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react";

const SettingsPage = () => {
  return (
    <>
      <div className="flex justify-between">
        <Header title="Settings" subtitle="Edit your profile" />
        <Button>
          <Save className="mr-1" />
          Save
        </Button>
      </div>
    </>
  );
};

export default SettingsPage;
