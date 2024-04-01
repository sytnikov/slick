import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center animate-fadeInUp">
      <h2 className="text-2xl font-bold mb-4">Houston, we have a problem :/</h2>
      <p className="text-xl mb-4">Slick could not find the page you were looking for.</p>
      <p className="text-xl">
        Go back <Link href="/" className="hover:underline font-bold">Home</Link>.
      </p>
    </section>
  );
}
