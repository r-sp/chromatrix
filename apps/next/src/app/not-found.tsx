import type { Metadata } from "next";
import type { JSX } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Could not find requested resource",
};

export default function NotFound(): JSX.Element {
  return (
    <div className="flex flex-col min-h-dvh items-center gap-4 justify-center p-4">
      <div className="inline-flex flex-col items-center">
        <h1 className="text-2xl font-semibold">Not Found</h1>
        <p>Could not find requested resource</p>
      </div>
      <Link href="/" className="text-matrix-200 font-medium">
        Return Home
      </Link>
    </div>
  );
}
