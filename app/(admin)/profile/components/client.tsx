import { Header } from "@/components/header";
import Image from "next/image";

export const ProfileClient = () => {
  return (
    <>
      <Header title="Profile" subtitle="Edit your profile" />
      <div className="flex gap-4 p-12">
        <div>
          <Image
            src={`https://api.dicebear.com/9.x/adventurer/jpg?seed=` + "test"}
            alt=""
            fill
            className="rounded-full"
          />
          <span>Verified</span>
        </div>
        <div>form</div>
      </div>
    </>
  );
};
