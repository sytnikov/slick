import { getShopsMonthlyEarnings } from "@/server/repair-shops/actions";

import { Button } from "../ui/button";

interface CurrentMonthEarningsProps {
  repairShopID: number;
}

export default function CurrentMonthEarnings({
  repairShopID: shopID,
}: CurrentMonthEarningsProps) {
  const totalEarnings = getShopsMonthlyEarnings(shopID);
  return (
    <div className={"rounded-md bg-white pb-6 pl-10 pr-10 pt-10"}>
      <div className={"flex h-full flex-col items-start justify-between"}>
        <div>
          <p className={"text-md mb-12 text-xl font-bold"}>
            Current month earnings
          </p>
          <p className={"mb-8 text-5xl font-thin"}>{totalEarnings}€</p>
          <p className={"mb-8 font-thin"}>
            You're up 5% in sales since last month!
          </p>
        </div>
        <Button variant={"secondary"}>See all payouts</Button>
      </div>
    </div>
  );
}
