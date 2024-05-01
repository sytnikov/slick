import Link from "next/link";

import PageLayout from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";

export default async function Index() {
  return (
    <PageLayout>
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <div className="flex max-w-4xl flex-1 animate-fadeInUp flex-col gap-20 px-3">
          <main className="flex flex-1 flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold">
              Slick - a better way to fix your car
            </h1>
            <div className="flex items-center justify-center gap-4">
              <Button asChild variant="default" size="default">
                <Link href="/browse">Browse Shops</Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    </PageLayout>
  );
}
