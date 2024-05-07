"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, ButtonProps } from "../ui/button";
import { ChevronDown, XIcon } from "lucide-react";

type LinkProps = {
  title: string;
  url: string;
};

type MenuLinkProps = LinkProps & {
  subLinks?: LinkProps[];
};

interface NavigationButtonProps extends ButtonProps {
  href: string;
}

type Props = {
  links: MenuLinkProps[];
  buttons: NavigationButtonProps[];
  children: React.ReactNode;
};

export type NavigationProps = React.ComponentPropsWithoutRef<"section"> & Props;

export default function Navigation(props: NavigationProps) {
  const { links, children } = {
    ...props,
  } as Props;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 flex w-full items-center border-b border-gray-300 bg-white lg:min-h-20 lg:px-[5%]">
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="md:min-h-18 flex min-h-16 items-center justify-between px-[5%] lg:min-h-full lg:px-0">
          <Link href={"/"}>
            <h1 className={"text-2xl font-bold"}>Slick</h1>
          </Link>
          <Button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <XIcon className="size-6" />
          </Button>
        </div>
        <div
          className={`overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto] ${mobileMenuOpen ? "" : "hidden"} lg:block`}
        >
          {links.map((link, index) => (
            <div
              key={`${link.title}-${index}`}
              className="first:pt-4 lg:first:pt-0"
            >
              {link.subLinks && link.subLinks.length > 0 ? (
                <NavItemDropdown subLinks={link.subLinks} title={link.title} />
              ) : (
                <Link
                  href={link.url}
                  className="text-md focus-visible:ring-border-primary relative mx-auto block py-3 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 lg:px-4 lg:py-2 lg:text-base"
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
            {children}
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavItemDropdown = ({
  title,
  subLinks,
}: {
  title: string;
  subLinks: LinkProps[];
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <Button
        className="text-md focus-visible:ring-border-primary flex w-full items-center justify-between gap-2 py-3 text-left ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <div>
          <ChevronDown className="size-4" />
        </div>
      </Button>
      {dropdownOpen && (
        <ul className="lg:border-border-primary bg-white lg:absolute lg:border lg:p-2 lg:[--y-close:25%]">
          {subLinks.map((subLink, index) => (
            <li
              key={`${subLink.title}-${index}`}
              className="text-md relative mx-auto whitespace-nowrap py-3 pl-[5%] text-left align-top lg:px-4 lg:py-2 lg:text-base"
            >
              <a
                href={subLink.url}
                className="focus-visible:ring-border-primary ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {subLink.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
