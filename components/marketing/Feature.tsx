import Image from "next/image";
import { useGetStorageAssets } from "@/hooks/useGetStorageAssets";
import { Button, ButtonProps } from "../ui/button";

interface FeatureSectionButtonProps extends ButtonProps {
  title: string;
  href: string;
}

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: FeatureSectionButtonProps[];
};

export type FeatureSectionProps = React.ComponentPropsWithoutRef<"section"> &
  Props;

export default function FeatureSection(props: FeatureSectionProps) {
  const { tagline, heading, description, buttons } = {
    ...props,
  } as Props;

  const { getSpecificWebsiteAsset } = useGetStorageAssets();
  const heroImageUURL = getSpecificWebsiteAsset("Home", "hero.webp");

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-light md:mb-4">{tagline}</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-5xl lg:text-5xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex items-center gap-x-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button
                  key={`${button.title}-${index}`}
                  variant={button.variant}
                  size={button.size}
                >
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Image
              src={heroImageUURL}
              className="w-full object-cover"
              alt={"Hero image"}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
