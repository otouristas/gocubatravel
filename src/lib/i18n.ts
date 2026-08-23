import type { Locale } from "@/content/types";

export const LOCALES: Locale[] = ["el", "en"];
export const DEFAULT_LOCALE: Locale = "el";

export function isLocale(value: string): value is Locale {
  return value === "el" || value === "en";
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`.replace(/\/{2,}/g, "/");
}

export function switchLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0])) {
    parts[0] = next;
    return `/${parts.join("/")}${pathname.endsWith("/") && parts.length > 1 ? "/" : ""}`;
  }
  return localizedPath(next, pathname);
}

export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0])) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}/`.replace(/\/{2,}/g, "/") : "/";
  }
  return pathname.endsWith("/") || pathname === "/" ? pathname : `${pathname}/`;
}
