import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-foreground/10 flex w-full justify-center border-t p-8 text-center text-xs">
      <p className="flex gap-1">
        Powered by
        <Link
          href="https://orionmc.fi"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Matti Sirokov
        </Link>
      </p>
    </footer>
  );
}
