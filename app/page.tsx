import Link from "next/link";
import AuthButton from "@/components/AuthButton";

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="animate-in flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0">
        <main className="flex flex-1 flex-col justify-center">
          <h2 className="mb-4 text-4xl font-bold">
            Slick - a better way to fix your car
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="/browse" className="bg-green p-4 text-white" >
              Browse repair shops
            </Link>
            <AuthButton />
          </div>
        </main>
      </div>
    </div>
  );
}
