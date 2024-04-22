import { Button } from "../ui/button";

export default function CurrentMonthEarnings() {
  return (
    <div className={"h-full rounded-md bg-white pb-6 pl-10 pr-10 pt-10"}>
      <div className={"flex h-full flex-col items-start justify-between"}>
        <div>
          <p className={"text-md mb-12 text-xl font-bold"}>
            Current month earnings
          </p>
          <p className={"mb-8 text-5xl font-thin"}>12450.50€</p>
          <p className={"font-thin"}>You're up 5% in sales since last month!</p>
        </div>
        <Button variant={"secondary"}>See all payouts</Button>
      </div>
    </div>
  );
}
