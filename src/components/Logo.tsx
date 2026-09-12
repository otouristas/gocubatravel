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
  const heightClasses = {
    xs: "h-6 sm:h-7",
    sm: "h-7 sm:h-8 md:h-8.5",
    md: "h-8 sm:h-9 md:h-10",
    header: "h-10 sm:h-11 md:h-12",
    lg: "h-11 sm:h-13 md:h-14",
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
        <Image
          src="/gocuba-specialist-logo.svg"
          alt="GO CUBA — Easy Travel Planning"
          width={650}
          height={244}
          priority
          className={`w-auto object-contain transition-all duration-200 ${heightClasses[size]}`}
        />
      </div>
    </Link>
  );
}
