import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/navigation/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Slick",
  description: "A better way to mend your car",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
