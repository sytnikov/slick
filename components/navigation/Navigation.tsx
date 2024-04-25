import Link from "next/link";

import AuthButton from "../buttons/AuthButton";
import TopNavigationMenu from "./TopNavigationMenu";

export default function Navigation() {
  return (
    <nav
      className={
        "flex w-full flex-row items-center justify-between border-b-2 px-16 py-4"
      }
    >
      <Link href={"/"}>
        <h1>Slick</h1>
      </Link>
      <div className={"flex flex-row gap-8"}>
        <Link href="/browse">Browse Shops</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <TopNavigationMenu />
    </nav>
  );
}
