import type { ReactNode, JSX } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./style.css";

const fontSans = Geist({
  weight: "variable",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const fontMono = Geist_Mono({
  weight: "variable",
  style: "normal",
  display: "swap",
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
});

export const revalidate = 86400;

export const metadata: Metadata = {
  title: {
    default: "Chromatrix: The Holy Colors",
    template: "%s | The Holy Colors",
  },
  description:
    "Explore contemporary color palettes using advanced color spaces for vibrant and harmonious designs.",
  metadataBase: new URL("https://chromatrix.vercel.app"),
  openGraph: {
    siteName: "Chromatrix: The Holy Colors",
    url: "/",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  keywords: "color space, hex, rgb, hsl, hwb, lab, lch, oklab, oklch",
  robots: "index, follow",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props): JSX.Element {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="bg-gray-950 font-mono font-normal text-gray-50">
        {children}
      </body>
    </html>
  );
}
