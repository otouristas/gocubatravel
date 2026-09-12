import Image from "next/image";
import Link from "next/link";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/content/types";

interface LogoProps {
  locale: Locale;
  variant?: "light" | "dark";
  className?: string;
  size?: "xs" | "sm" | "md" | "header" | "lg";
}

export default function Logo({
  locale,
  variant = "light",
  className = "",
  size = "sm",
}: LogoProps) {
  /*
   * Heights are tuned for the wordmark lockup's 5.69:1 aspect ratio. The full
   * "specialist" lockup is 2.66:1, so reusing its old taller classes here would
   * make the logo about twice as wide as the header has room for.
   */
  const heightClasses = {
    xs: "h-4 sm:h-5",
    sm: "h-5 sm:h-6",
    md: "h-5 sm:h-6 md:h-7",
    header: "h-5 sm:h-7 md:h-8",
    lg: "h-6 sm:h-8 md:h-9",
  };

  return (
    <Link
      href={localizedPath(locale, "/")}
      className={`group relative inline-flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.01] ${className}`}
      aria-label="GO CUBA — Easy Travel Planning"
    >
      <div
        className={`relative overflow-hidden rounded-sm transition-all duration-300 ${
          variant === "dark"
            ? "bg-white p-1 shadow-xs ring-1 ring-white/20 hover:brightness-105"
            : "bg-white p-0.5 hover:brightness-105"
        }`}
      >
        {/*
          * The wordmark lockup, not the full "specialist" one. The full lockup's
          * "TRAVEL SPECIALISTS" tagline is only 12.6% of its height, so it needs
          * to render ~87px tall to stay readable — taller than any size here, and
          * below that it degrades into an illegible smudge.
          *
          * width/height carry the wordmark's own viewBox so next/image derives the
          * right aspect ratio; the rendered size comes from heightClasses.
          * `unoptimized` is the documented default for an .svg src — it is set
          * explicitly so enabling images.dangerouslyAllowSVG later cannot start
          * routing this vector through the rasterising optimiser.
          */}
        <Image
          src="/gocuba-wordmark.svg"
          alt="GO CUBA — Easy Travel Planning"
          width={638}
          height={112}
          priority
          unoptimized
          className={`w-auto object-contain transition-all duration-200 ${heightClasses[size]}`}
        />
      </div>
    </Link>
  );
}
