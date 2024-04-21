import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
      <p className="flex gap-1">
        Powered by
        <Link
          href="https://orionmc.fi"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          The Slick project
        </Link>
      </p>
    </footer>
  );
}
