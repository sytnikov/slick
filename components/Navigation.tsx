import Link from "next/link";

import AuthButton from "./AuthButton";

export default function Navigation() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link href="/">
          <h1 className={"text-2xl"}>slick</h1>
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
}
