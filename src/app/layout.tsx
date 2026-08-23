import type { Metadata } from "next";
import { Domine, Manrope } from "next/font/google";
import "./globals.css";

const domine = Domine({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advent of Tales — A DnD Adventure Calendar",
  description:
    "A choose-your-own-adventure story set in a DnD world. A new chapter every day in December.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${domine.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
