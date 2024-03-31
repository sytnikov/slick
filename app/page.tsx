import Link from "next/link";
import AuthButton from "@/components/AuthButton";

import { Button } from "@/components/ui/button";

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="animate-fadeInUp flex max-w-4xl flex-1 flex-col gap-20 px-3">
        <main className="flex flex-1 flex-col justify-center">
          <h2 className="mb-4 text-4xl font-bold">
            Slick - a better way to fix your car
          </h2>
          <div className="flex justify-center gap-4">
            <Button asChild variant="default" size="default">
              <Link href="/browse">Browse Shops</Link>
            </Button>
            <AuthButton />
          </div>
        </main>
      </div>
    </div>
  );
}
