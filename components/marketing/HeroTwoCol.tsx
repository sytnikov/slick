import Link from "next/link";
import { Button } from "../ui/button";
import { HeroSectionProps } from "@/types";

export default function Hero({ title, description }: HeroSectionProps) {
  return (
    <header className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid animate-fadeInUp grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex gap-x-4 md:mt-8">
              <Link href={"/browse"}>
                <Button size={"lg"}>Browse repair shops</Button>
              </Link>
              <Link href={"/"}>
                <Button variant={"secondary"} size={"lg"}>
                  What's this about?
                </Button>
              </Link>
            </div>
          </div>
          <img
            src={"https://relume-assets.s3.amazonaws.com/placeholder-image.svg"}
            className="w-full object-cover"
            alt={""}
          />
        </div>
      </div>
    </header>
  );
}
