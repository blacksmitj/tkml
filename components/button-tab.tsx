import React from "react";
import { Button } from "./ui/button";
import { IconType } from "react-icons";

type Props = {
  label: string;
  icon: IconType;
  onClick: () => void;
  isActive: boolean;
};

export const ButtonTab = ({ label, icon: Icon, onClick, isActive }: Props) => {
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className="justify-start h-[48px] px-4 cursor-pointer"
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  );
};
