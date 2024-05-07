import PageLayout from "@/components/layouts/PageLayout";
import HeroVideoBackgound from "@/components/marketing/HeroVideoBackground";

export default async function Index() {
  return (
    <PageLayout>
      <HeroVideoBackgound
        title={"Slick - a better way to look after your car!"}
        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse varius enim in eros elementum tristique. Duis cursus,
        mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
        libero vitae erat.`}
      />
    </PageLayout>
  );
}
