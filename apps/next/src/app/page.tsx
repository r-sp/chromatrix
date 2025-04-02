import type { JSX } from "react";
import Link from "next/link";
import Logo from "../components/logo";

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col min-h-dvh items-center gap-4 justify-center p-4">
      <div className="inline-flex flex-col items-center">
        <Logo />
        <h1 className="text-2xl font-semibold">Chromatrix</h1>
        <p className="text-gray-200">The Holy Colors</p>
      </div>
      <Link
        href="https://github.com/r-sp/chromatrix"
        className="text-matrix-200 font-medium"
        target="_blank"
        rel="nofolow noopener"
      >
        Preview
      </Link>
    </div>
  );
}
