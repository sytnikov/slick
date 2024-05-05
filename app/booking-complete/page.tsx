import Link from "next/link";

import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layouts/PageLayout";

export default function page() {
  return (
    <PageLayout>
      <div
        className={"flex w-[50%] flex-1 flex-col items-center justify-center"}
      >
        <h1 className={"mb-8 text-center text-2xl font-semibold"}>
          Congrats! You're on your way to a better car - feel free to browse our
          other services while you wait.
        </h1>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </PageLayout>
  );
}
