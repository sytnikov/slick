import Image from "next/image";

import { Button } from "./ui/button";
import { UserProfile } from "@/types";

interface DashboardUserBarProps {
  user: UserProfile;
}

export default function DashboardUserBar({ user }: DashboardUserBarProps) {
  return (
    <div
      className={
        "flex w-full flex-row items-center justify-between border-2 p-4"
      }
    >
      <div className={"flex flex-row items-center gap-4"}>
        <Image
          src="https:/placehold.co/30"
          alt="Placeholder"
          width={50}
          height={50}
          className={"rounded-sm"}
        />
        Welcome back, {user.first_name} {user.surname} 👋
      </div>

      <div className={"flex flex-row items-center gap-6"}>
        <div>notification</div>
        <Button>Log out</Button>
      </div>
    </div>
  );
}
