import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
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
