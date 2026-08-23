"use client";

import { useEffect } from "react";
import type { Locale } from "@/content/types";

export default function DocumentLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
