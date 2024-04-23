import { Button } from "../ui/button";

export default function OpenSlots() {
  return (
    <div className={"h-full min-w-[50%] rounded-md bg-white p-8"}>
      <p className={"text-md mb-2 text-xl font-bold"}>Open slots</p>
      <div className={"flex w-full items-start justify-between"}>
        <div className={"max-w-[65%]"}>
          <p className={"text-xs font-light"}>
            We've noticed that you've got some space left over in your calendar,
            perhaps you would like to boost these times slots on our homepage?
          </p>
        </div>
        <Button variant={"secondary"}>Choose a slot</Button>
      </div>
    </div>
  );
}
