import { Button } from "../ui/button";
import { BellIcon } from "@radix-ui/react-icons";

import { UserProfile } from "@/types";

interface DashboardUserBarProps {
  user: UserProfile;
}

export default function DashboardUserBar({ user }: DashboardUserBarProps) {
  return (
    <div
      className={
        "flex w-full flex-row items-center justify-between border-2 bg-white p-4"
      }
    >
      <div className={"flex flex-row items-center gap-4"}>
        Welcome back, {user.first_name} {user.surname} 👋
      </div>

      <div className={"flex flex-row items-center gap-6"}>
        <BellIcon />
        <Button>Log out</Button>
      </div>
    </div>
  );
}
