"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COPY, t } from "@/content/site";
import type { Locale } from "@/content/types";
import { localizedPath } from "@/lib/i18n";

export default function CookieNotice({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Deferred so the banner never renders during hydration of the first paint.
    const timer = window.setTimeout(() => {
      if (!window.localStorage.getItem("gocuba-cookies")) setVisible(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="cookie-notice"
      role="dialog"
      className="fixed inset-x-0 bottom-0 z-[80] bg-[rgba(0,64,113,1)] px-4 py-4 text-white"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-3 md:flex-row md:items-center">
        <p className="flex-1 text-sm">{t(COPY.cookieText, locale)}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-[#00a99d] px-4 py-2 text-sm font-semibold"
            onClick={() => {
              window.localStorage.setItem("gocuba-cookies", "1");
              setVisible(false);
            }}
          >
            {t(COPY.cookieAccept, locale)}
          </button>
          <Link
            href={localizedPath(locale, "/cookies/")}
            className="bg-[#00a99d] px-4 py-2 text-sm font-semibold"
          >
            {t(COPY.cookiePolicy, locale)}
          </Link>
        </div>
      </div>
    </div>
  );
}
