import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 animate-fadeInUp flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Houston, we have a problem :/</h2>
      <p className="mb-4 text-xl">
        Slick could not find the page you were looking for.
      </p>
      <p className="text-xl">
        Go back{" "}
        <Link href="/" className="font-bold hover:underline">
          Home
        </Link>
        .
      </p>
    </section>
  );
}
