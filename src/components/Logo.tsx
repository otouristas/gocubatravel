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

/**
 * The full lockup: "GO | CUBA" over "TRAVEL SPECIALISTS".
 *
 * The tagline is only 12.6% of the artwork's height, and because the lockup
 * scales as one piece its legibility is set purely by the rendered WIDTH —
 * roughly `width * 0.047` pixels tall. So the sizes below are chosen to spend
 * the width each context actually has (measured against the header's own
 * layout) rather than to a uniform height, which is what previously squashed
 * the tagline into an illegible smudge.
 */
const LOCKUP = {
  light: "/gocuba-specialist-logo.svg",
  dark: "/gocuba-specialist-logo-dark.svg",
} as const;

export default function Logo({
  locale,
  variant = "light",
  className = "",
  size = "sm",
}: LogoProps) {
  /*
   * Lockup aspect ratio is 2.66:1, so each step also sets the width: h-12 is
   * 128px wide, h-16 is 170px, h-20 is 213px. The header has ~137px to spend at
   * 375px viewport and ~307px from 768px up, so it steps up with the breakpoints
   * instead of staying narrow and unreadable on desktop. h-11 is the mobile
   * ceiling: at h-12 the logo is 128px and pushes the "CUBA AI" pill beside it
   * onto a second line.
   */
  const heightClasses = {
    xs: "h-9 sm:h-10",
    sm: "h-10 sm:h-12",
    md: "h-12 sm:h-14 md:h-16",
    header: "h-11 sm:h-16 md:h-20",
    lg: "h-14 sm:h-18 md:h-22",
  };

  return (
    <Link
      href={localizedPath(locale, "/")}
      className={`group relative inline-flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.01] ${className}`}
      aria-label="GO CUBA — Travel Specialists"
    >
      {/*
        * No background plate. The logo sits directly on the surface; the dark
        * lockup carries a white wordmark so it reads on dark backgrounds without
        * a white box behind it.
        *
        * width/height are the artwork's own viewBox so next/image derives the
        * right aspect ratio; the rendered size comes from heightClasses.
        * `unoptimized` is the documented default for an .svg src — set
        * explicitly so enabling images.dangerouslyAllowSVG later cannot start
        * routing this vector through the rasterising optimiser.
        */}
      <Image
        src={LOCKUP[variant]}
        alt="GO CUBA — Travel Specialists"
        width={650}
        height={244}
        priority
        unoptimized
        className={`w-auto object-contain transition-all duration-200 ${heightClasses[size]}`}
      />
    </Link>
  );
}
