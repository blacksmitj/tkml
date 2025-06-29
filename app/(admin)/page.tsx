import { Header } from "@/components/header";
import { TodayItem } from "@/components/today-item";
import { BadgeX, CheckCheck, OctagonAlert, UserRound } from "lucide-react";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Header title="Dashboard" subtitle="Report simplify dashboard TKML" />
      <div className="flex flex-col gap-6 w-full mt-[150px] bg-white rounded-2xl p-8 border overflow-scroll">
        <h1 className="text-2xl font-bold">TKML Hari Ini</h1>
        <div className="flex gap-4">
          <TodayItem
            icon={UserRound}
            number={33}
            unit="orang"
            description="Assessor"
          />
          <TodayItem
            icon={CheckCheck}
            number={489}
            unit="orang"
            description="TKML Approved"
          />
          <TodayItem
            icon={BadgeX}
            number={18}
            unit="orang"
            description="TKML Rejected"
          />
          <TodayItem
            icon={OctagonAlert}
            number={345}
            unit="orang"
            description="TKML Pending"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
