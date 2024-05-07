import Link from "next/link";

import { useGetStorageAssets } from "@/hooks/useGetStorageAssets";
import { Button } from "../ui/button";
import { HeroSectionProps } from "@/types";

export default function HeroVideoBackgound({
  title,
  description,
}: HeroSectionProps) {
  const { getSpecificWebsiteAsset } = useGetStorageAssets();

  const backgroundVideoSource = getSpecificWebsiteAsset(
    "Home",
    "HeroBackgound.mp4",
  );

  return (
    <header className="relative w-full px-[5%]">
      <div className="container">
        <div className="flex max-h-[60rem] min-h-svh items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-[550px]">
            <h1 className="text-text-alternative mb-5 text-6xl font-bold text-white md:mb-6 md:text-5xl lg:text-7xl">
              {title}
            </h1>
            <p className="text-text-alternative md:text-md text-white">
              {description}
            </p>
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
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <video
          className="absolute inset-0 aspect-video size-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={backgroundVideoSource} type={"video/mp4"} />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </header>
  );
}
