import { PropsWithChildren } from "react";

import Navigation from "../navigation/Navigation";
import TopNavigationMenu from "../navigation/TopNavigationMenu";
import Footer from "../navigation/Footer";

type PageLayoutProps = PropsWithChildren;

export default async function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Navigation
        links={[
          { title: "Home", url: "/" },
          { title: "About", url: "/" },
          { title: "Contact", url: "/" },
        ]}
        buttons={[
          { title: "Log In", variant: "secondary", size: "default", href: "/" },
          {
            title: "Sign Up",
            variant: "default",
            size: "default",
            href: "/sign-up",
          },
        ]}
        children={<TopNavigationMenu />}
      />
      <div className="flex min-h-screen flex-col items-center">{children}</div>
      <Footer
        columnLinks={[
          {
            links: [
              { title: "Home", url: "/" },
              { title: "About", url: "/" },
              { title: "Contact", url: "/" },
            ],
          },
          {
            links: [{ title: "Privacy Policy", url: "/" }],
          },
        ]}
        socialMediaLinks={[
          {
            title: "Facebook",
            url: "/",
            icon: <i className="fab fa-facebook" />,
          },
          {
            title: "Twitter",
            url: "/",
            icon: <i className="fab fa-twitter" />,
          },
          {
            title: "Instagram",
            url: "/",
            icon: <i className="fab fa-instagram" />,
          },
        ]}
        footerText="© 2024 Company Name"
        footerLinks={[
          { title: "Privacy Policy", url: "/" },
          { title: "Terms of Service", url: "/" },
        ]}
      />
    </>
  );
}
