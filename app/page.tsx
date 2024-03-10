import Link from "next/link";
import AuthButton from "@/components/AuthButton";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col justify-center">
          <h2 className="font-bold text-4xl mb-4">
            Slick - a better way to mend your car
          </h2>
          <div className={"flex gap-4 justify-center"}>
            <Link className={"p-4 bg-green text-white"} href="/browse">
              Browse repair shops
            </Link>
            <AuthButton />
          </div>
        </main>
      </div>
    </div>
  );
}
