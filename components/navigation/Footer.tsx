import Link from "next/link";

type Links = {
  title: string;
  url: string;
};

type ColumnLinks = {
  links: Links[];
};

type socialMediaLinks = Links & {
  icon: React.ReactNode;
};

type FooterLink = {
  title: string;
  url: string;
};

type Props = {
  columnLinks: ColumnLinks[];
  socialMediaLinks: socialMediaLinks[];
  footerText: string;
  footerLinks: FooterLink[];
};

export type Footer4Props = React.ComponentPropsWithoutRef<"section"> & Props;

export default function Footer(props: Footer4Props) {
  const { footerText, columnLinks, footerLinks, socialMediaLinks } = {
    ...props,
  } as Props;
  return (
    <footer className="md:py-18 border-grey-100 border-t-2 px-[5%] py-12 lg:py-20">
      <div className="container">
        <div className="md:pb-18 grid grid-cols-1 items-center justify-center justify-items-center gap-x-[4vw] gap-y-12 pb-12 lg:grid-cols-[0.25fr_1fr_0.25fr] lg:justify-between lg:gap-y-4 lg:pb-20">
          <div className="lg:justify-self-start">
            <Link href={"/"}>
              <h1 className={"text-2xl font-bold"}>Slick</h1>
            </Link>
          </div>
          {columnLinks.map((column, index) => (
            <ul
              key={`column-${index}`}
              className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start"
            >
              {column.links.map((link, linkIndex) => (
                <li
                  key={`${link.title}-${linkIndex}`}
                  className="font-semibold"
                >
                  <Link href={link.url} className="focus-visible:outline-none">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
          <div className="flex items-start justify-start justify-items-center gap-x-3 lg:justify-self-end">
            {socialMediaLinks.map((link, index) => (
              <Link
                key={`${link.title}-${index}`}
                href={link.url}
                className="focus-visible:outline-none"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-center justify-center justify-items-center pt-6 text-sm md:flex-row md:gap-x-6 md:pt-8">
          <p className="mt-8 md:mt-0">{footerText}</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-center justify-items-center gap-x-0 gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks.map((link, index) => (
              <li
                key={`${link.title}-${index}`}
                className="underline decoration-black underline-offset-1 "
              >
                <Link href={link.url} className="focus-visible:outline-none">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
